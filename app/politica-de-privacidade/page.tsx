import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Legal, LegalSection } from "@/components/legal";
import { BreadcrumbSchema } from "@/components/schema";
import { site } from "@/lib/site";

/**
 * ⚠️ RASCUNHO — NÃO PUBLICAR SEM REVISÃO JURÍDICA.
 *
 * Este texto foi escrito a partir do que o site de fato faz: coleta de dados
 * por formulário, tracking publicitário via GTM server-side, Meta Pixel e GA4.
 * Ele reflete a operação real, o que já é mais do que a maior parte das
 * políticas por aí. Mas política de privacidade é peça jurídica, e há campos
 * que só o titular pode preencher.
 *
 * PENDENTE antes de publicar (ver docs/PENDENCIAS.md):
 *  - razão social e CNPJ;
 *  - e-mail do encarregado de dados (pode ser o próprio Diego);
 *  - confirmação das ferramentas efetivamente em uso e prazos de retenção;
 *  - revisão por advogado.
 */

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Quais dados são coletados neste site, para que são usados, com quem são compartilhados e como exercer seus direitos sob a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Política de privacidade", href: "/politica-de-privacidade" },
        ]}
      />

      <PageHeader
        kicker="Legal"
        title="Política de privacidade"
        trail={[
          { name: "Política de privacidade", href: "/politica-de-privacidade" },
        ]}
        standfirst="Quais dados este site coleta, por quê, com quem são compartilhados e como você exerce seus direitos."
      />

      <Legal atualizadoEm="19 de setembro de 2026">
        <LegalSection n="01" titulo="Quem é o responsável">
          <p>
            Este site é operado por {site.name}, conduzido por {site.person},
            com base em {site.region}. Para qualquer assunto relativo a dados
            pessoais, o contato é{" "}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection n="02" titulo="Quais dados são coletados">
          <p>
            <strong className="font-medium text-ink">
              Dados que você informa.
            </strong>{" "}
            Ao preencher o formulário de diagnóstico: nome, nome da empresa,
            e-mail, telefone, endereço do site ou perfil (se você informar),
            momento do negócio, faixa de investimento em mídia e a descrição do
            desafio que você escrever.
          </p>
          <p>
            <strong className="font-medium text-ink">
              Dados de navegação.
            </strong>{" "}
            Páginas visitadas, origem do acesso, tipo de dispositivo e
            navegador, e interações como cliques em botões de contato. Esses
            dados são coletados por cookies e tecnologias semelhantes, descritos
            na{" "}
            <Link href="/politica-de-cookies" className="link">
              política de cookies
            </Link>
            .
          </p>
          <p>
            Este site não coleta dados sensíveis, não processa pagamentos e não
            é destinado a menores de 18 anos.
          </p>
        </LegalSection>

        <LegalSection n="03" titulo="Para que os dados são usados">
          <ul>
            <li>Responder ao seu contato e conduzir a conversa de diagnóstico.</li>
            <li>Elaborar proposta comercial, quando for o caso.</li>
            <li>
              Entender como as pessoas usam o site, para melhorá-lo. Em base
              agregada.
            </li>
            <li>
              Medir o desempenho de campanhas publicitárias e exibir anúncios a
              quem já visitou o site (remarketing).
            </li>
            <li>Cumprir obrigações legais e fiscais.</li>
          </ul>
          <p>
            Seus dados não são vendidos, alugados nem cedidos para terceiros com
            finalidade comercial própria deles.
          </p>
        </LegalSection>

        <LegalSection n="04" titulo="Com que base legal">
          <p>
            Os dados do formulário são tratados com base na{" "}
            <strong className="font-medium text-ink">
              execução de procedimentos preliminares a contrato
            </strong>{" "}
            a seu pedido (art. 7º, V, da LGPD) — você os enviou justamente para
            que eu responda.
          </p>
          <p>
            Cookies de análise e de publicidade dependem do{" "}
            <strong className="font-medium text-ink">seu consentimento</strong>{" "}
            (art. 7º, I), recolhido no aviso exibido na primeira visita e
            revogável a qualquer momento.
          </p>
          <p>
            Cookies estritamente necessários ao funcionamento do site dispensam
            consentimento.
          </p>
        </LegalSection>

        <LegalSection n="05" titulo="Com quem os dados são compartilhados">
          <p>
            Apenas com fornecedores que viabilizam a operação, cada um no limite
            do necessário:
          </p>
          {/* ⚠️ ESTA LISTA NÃO É DECORATIVA.
              A LGPD exige informar com quem os dados são compartilhados
              (art. 9º, III e art. 18, VII). Omitir um processador que de fato
              vê o tráfego é infração, não economia de texto.

              Em 20/09/2026 os cabeçalhos de produção mostram DOIS
              intermediários: `Server: cloudflare` + `CF-RAY` (Cloudflare na
              frente, terminando TLS) e `x-vercel-id` + `x-vercel-cache`
              (Vercel servindo a aplicação). Os dois entram aqui.

              Se a hospedagem mudar, esta lista muda junto, ANTES do deploy.
              Ver docs/PENDENCIAS.md. */}
          <ul>
            <li>
              <strong className="font-medium text-ink">Cloudflare</strong> —
              rede de distribuição e proteção do domínio. Intermedia todo o
              acesso ao site.
            </li>
            <li>
              <strong className="font-medium text-ink">Vercel</strong> —
              hospedagem da aplicação.
            </li>
            <li>
              <strong className="font-medium text-ink">Google</strong> —
              Analytics, Tag Manager e Google Ads, para medição e publicidade.
            </li>
            <li>
              <strong className="font-medium text-ink">Meta</strong> — Pixel,
              para medição e publicidade no Facebook e Instagram.
            </li>
            <li>
              <strong className="font-medium text-ink">WhatsApp (Meta)</strong> —
              quando você opta por falar por esse canal.
            </li>
          </ul>
          <p>
            Alguns desses fornecedores processam dados fora do Brasil. A
            transferência internacional ocorre nos termos do art. 33 da LGPD, com
            as salvaguardas contratuais oferecidas por cada um deles.
          </p>
        </LegalSection>

        <LegalSection n="06" titulo="Por quanto tempo">
          <p>
            Dados de contato comercial são mantidos de 6 meses a 1 ano após o
            último contato, conforme o andamento da tratativa. Dados de clientes
            com contrato seguem os prazos fiscais aplicáveis, que são maiores.
            Dados de navegação seguem a retenção configurada em cada ferramenta.
          </p>
          <p>Você pode pedir a exclusão antes disso, salvo obrigação legal em contrário.</p>
        </LegalSection>

        <LegalSection n="07" titulo="Seus direitos">
          <p>A LGPD garante a você, a qualquer momento e sem custo:</p>
          <ul>
            <li>confirmar se há tratamento de dados seus e acessá-los;</li>
            <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>
              pedir anonimização, bloqueio ou eliminação de dados desnecessários
              ou tratados em desconformidade;
            </li>
            <li>pedir a portabilidade a outro fornecedor;</li>
            <li>revogar o consentimento e pedir a eliminação dos dados;</li>
            <li>ser informado sobre com quem os dados foram compartilhados;</li>
            <li>opor-se a um tratamento feito sem consentimento.</li>
          </ul>
          <p>
            Para exercer qualquer um deles, escreva para{" "}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>.
            O prazo de resposta é de até 15 dias.
          </p>
        </LegalSection>

        <LegalSection n="08" titulo="Segurança">
          <p>
            O site é servido exclusivamente por conexão criptografada (HTTPS). O
            acesso aos dados de contato é restrito a quem conduz o atendimento.
            Nenhum sistema é imune a incidentes; em caso de incidente com risco
            relevante, você e a ANPD serão comunicados, conforme o art. 48 da
            LGPD.
          </p>
        </LegalSection>

        <LegalSection n="09" titulo="Mudanças nesta política">
          <p>
            Quando esta política mudar, a data de atualização no topo muda
            junto. Alterações relevantes na forma de tratamento serão informadas
            no próprio site.
          </p>
        </LegalSection>
      </Legal>
    </>
  );
}
