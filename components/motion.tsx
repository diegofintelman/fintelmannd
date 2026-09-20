"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * `useLayoutEffect` avisa no servidor, onde não existe layout para medir.
 * Este alias usa o efeito de layout no navegador e o efeito comum no servidor,
 * que é o padrão consagrado para esse caso.
 */
const useEfeitoDeLayout =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ==========================================================================
   Camada de movimento.

   Três decisões que sustentam o resto:

   1. **O conteúdo nunca depende da animação.** O HTML sai do servidor já
      visível; o JS é que esconde o bloco, antes da primeira pintura, para
      poder animá-lo. Se o script falhar, nada some.
   2. **Um só observador e um só laço de rAF** para a página inteira. Um
      IntersectionObserver por elemento, ou um listener de scroll por camada,
      é o que faz site com parallax travar no celular.
   3. **Só `transform` e `opacity`.** Qualquer outra propriedade sai da GPU.
   ========================================================================== */

/** Revela o bloco quando ele entra na tela. Dispara uma vez e solta o observador. */
export function Revelar({
  children,
  direcao = "baixo",
  atraso = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direcao?: "baixo" | "esquerda" | "direita" | "escala";
  /** Em milissegundos. Use escada de 60 a 90ms; acima disso o leitor ultrapassa. */
  atraso?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  /**
   * Três estados, todos renderizados pelo React.
   *
   *   inicial  → sem `data-revelar`: o bloco nasce VISÍVEL
   *   escondido → `data-revelar` aplicado, esperando entrar na tela
   *   revelado  → anima para a posição final
   *
   * Por que passar pelo estado `inicial` em vez de já nascer escondido:
   *
   *  - o HTML do servidor e a primeira renderização do cliente ficam
   *    idênticos, então não há aviso de hidratação;
   *  - se o JS não carregar, ou quebrar, o conteúdo simplesmente fica lá.
   *    Esconder no CSS e depender do JS para revelar transforma qualquer
   *    falha de script em página em branco.
   *
   * E por que o estado mora no React, e não numa classe adicionada à mão:
   * porque `classList.add` numa árvore que o React controla **é desfeito na
   * primeira reconciliação**. O bloco revelava e voltava a sumir. Quem manda
   * no `className` é quem renderiza.
   */
  const [estado, setEstado] = useState<"inicial" | "escondido" | "revelado">(
    "inicial"
  );

  useEfeitoDeLayout(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Esconde antes da primeira pintura: `useLayoutEffect` libera a atualização
    // de estado de forma síncrona, então não pisca.
    setEstado("escondido");

    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      // Já na tela: anima na carga. Dois quadros, porque num só o navegador
      // funde o estado escondido com o revelado e não anima nada.
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setEstado("revelado"))
      );
      return () => cancelAnimationFrame(id);
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEstado("revelado");
          observador.disconnect();
        }
      },
      // `threshold: 0` dispara em qualquer pedacinho visível. Com um limiar
      // maior, um bloco mais alto que a tela pode entrar pelo rodapé e nunca
      // atingir a fração exigida — e fica escondido para sempre.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    observador.observe(el);

    // Rede de segurança: se o observador não disparar por qualquer motivo
    // (aba em segundo plano, layout que muda depois, navegador exótico), o
    // conteúdo aparece mesmo assim. Animação é enfeite; conteúdo escondido é
    // defeito.
    const seguranca = window.setTimeout(() => setEstado("revelado"), 2600);

    return () => {
      observador.disconnect();
      window.clearTimeout(seguranca);
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref polimórfico por tag; todas são HTMLElement.
      ref={ref}
      data-revelar={
        estado === "inicial"
          ? undefined
          : direcao === "baixo"
            ? ""
            : direcao
      }
      style={{ ["--atraso" as string]: `${atraso}ms` }}
      className={cn(estado === "revelado" && "revelado", className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Camada de parallax.
 *
 * `velocidade` é a fração do deslocamento da rolagem: 0.2 move um quinto do
 * scroll (fundo, parece longe), -0.1 move contra (frente). Acima de ~0.35 o
 * efeito deixa de ler como profundidade e passa a ler como defeito.
 *
 * O cálculo roda num único `requestAnimationFrame` compartilhado e só para
 * elementos visíveis — parallax calculado fora da tela é trabalho jogado fora.
 */
export function Parallax({
  children,
  velocidade = 0.18,
  className,
}: {
  children: React.ReactNode;
  velocidade?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No telefone o efeito é reduzido: a tela é curta, o deslocamento fica
    // exagerado, e o custo por quadro pesa mais.
    const fator = window.innerWidth < 768 ? velocidade * 0.45 : velocidade;

    return registrarCamada(el, fator);
  }, [velocidade]);

  return (
    <div ref={ref} data-parallax className={className}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- motor -- */

type Camada = { el: HTMLElement; fator: number; visivel: boolean };

const camadas = new Set<Camada>();
let laco: number | null = null;
let observadorVisibilidade: IntersectionObserver | null = null;

function registrarCamada(el: HTMLElement, fator: number) {
  const camada: Camada = { el, fator, visivel: false };
  camadas.add(camada);

  if (!observadorVisibilidade) {
    observadorVisibilidade = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          for (const c of camadas) {
            if (c.el === entrada.target) c.visivel = entrada.isIntersecting;
          }
        }
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
  }
  observadorVisibilidade.observe(el);

  if (laco === null) laco = requestAnimationFrame(quadro);

  return () => {
    camadas.delete(camada);
    observadorVisibilidade?.unobserve(el);
    el.style.removeProperty("--deslocamento");
    if (camadas.size === 0 && laco !== null) {
      cancelAnimationFrame(laco);
      laco = null;
    }
  };
}

function quadro() {
  const alturaJanela = window.innerHeight;

  for (const camada of camadas) {
    if (!camada.visivel) continue;
    const caixa = camada.el.getBoundingClientRect();
    // Distância do centro do elemento ao centro da tela, em pixels.
    const doCentro = caixa.top + caixa.height / 2 - alturaJanela / 2;
    const deslocamento = -doCentro * camada.fator;
    camada.el.style.setProperty("--deslocamento", `${deslocamento.toFixed(2)}px`);
  }

  laco = requestAnimationFrame(quadro);
}

/* ------------------------------------------------------------------ halo -- */

/**
 * Halo que segue o ponteiro dentro do cartão.
 *
 * Escreve duas custom properties; o desenho é todo CSS. Em toque não faz nada,
 * e o cartão fica com a borda, que já basta.
 */
export function Halo({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "a";
}) {
  const ref = useRef<HTMLElement>(null);

  function aoMover(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const caixa = el.getBoundingClientRect();
    el.style.setProperty("--halo-x", `${e.clientX - caixa.left}px`);
    el.style.setProperty("--halo-y", `${e.clientY - caixa.top}px`);
  }

  return (
    <Tag
      // @ts-expect-error — ref polimórfico por tag; todas são HTMLElement.
      ref={ref}
      onPointerMove={aoMover}
      className={cn("card", className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Contagem progressiva para números REAIS.
 *
 * Existe só porque números reais aparecem no site (anos de operação, projetos
 * entregues). **Não use para número que você não consegue provar** — ver a
 * regra 1 do AGENTS.md.
 */
export function Contador({
  ate,
  sufixo = "",
  className,
}: {
  ate: number;
  sufixo?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(ate);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const duracao = 1200;
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          // easeOutExpo: chega rápido e assenta, em vez de arrastar no fim.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValor(Math.round(eased * ate));
          if (t < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
      },
      { threshold: 0.4 }
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [ate]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {valor}
      {sufixo}
    </span>
  );
}
