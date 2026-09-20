import type { Config } from "tailwindcss";

/**
 * Sistema de design: duas superfícies (papel e grafite), um acento em dois
 * pontos de luminosidade — um por superfície, mesma matiz.
 *
 * Todos os tokens vivem em app/globals.css. Aqui eles só são expostos ao
 * Tailwind. Nenhuma cor literal deve aparecer em componente.
 */
export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Escala de 4px. Substitui a escala padrão para que não exista valor fora do sistema.
    // Esta escala SUBSTITUI a do Tailwind, então os números não significam o
    // que significam num projeto padrão: aqui `11` é 6rem, não 2.75rem.
    // Os meios-passos existem para correção óptica (um respiro de 6px antes de
    // uma linha de apoio, por exemplo) e precisam estar declarados: sem eles,
    // `mt-1.5` não gera CSS nenhum e falha em silêncio.
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.5rem",
      6: "2rem",
      7: "2.5rem",
      8: "3rem",
      9: "4rem",
      10: "5rem",
      11: "6rem",
      12: "8rem",
      13: "10rem",
      section: "var(--space-section)",
      gutter: "var(--space-gutter)",
    },
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        gold: "var(--gold)",
        "gold-bright": "var(--gold-bright)",
        "gold-deep": "var(--gold-deep)",
        "gold-ink": "var(--gold-ink)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
      },
      boxShadow: {
        gold: "var(--shadow-gold)",
        deep: "var(--shadow-deep)",
      },
      fontSize: {
        // Escala tipográfica fluida. O piso é o tamanho no telefone.
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        label: ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.06em" }],
        sm: ["0.9375rem", { lineHeight: "1.6" }],
        base: ["1.0625rem", { lineHeight: "1.65" }],
        lead: ["clamp(1.15rem, 0.4vw + 1.05rem, 1.35rem)", { lineHeight: "1.55" }],
        h4: ["clamp(1.15rem, 0.5vw + 1rem, 1.4rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.4rem, 1vw + 1.1rem, 1.9rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.9rem, 2.2vw + 1.2rem, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
        h1: ["clamp(2.4rem, 4.2vw + 1.1rem, 4.4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        // O piso é o tamanho no telefone, não no desktop. Um piso de 2.6rem
        // parece razoável numa tela grande e quebra a manchete em quatro linhas
        // num aparelho de 375px, empurrando o CTA para fora da primeira tela.
        title: ["clamp(2.15rem, 6vw + 0.8rem, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        measure: "62ch",
        "measure-tight": "54ch",
        column: "44rem",
        spread: "76rem",
        wide: "92rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        DEFAULT: "0.6rem",
        lg: "0.9rem",
        xl: "1.25rem",
        full: "999px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "rise-in": "rise-in 520ms cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
