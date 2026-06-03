Atualizar `public/robots.txt` para permitir todos os crawlers (incluindo bots de IA), bloquear pastas privadas e referenciar o sitemap.

Conteúdo final:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://fintelmannd.com.br/sitemap.xml
```

Observações:
- O `Disallow` de `/admin/` e `/dashboard/` fica apenas no bloco `User-agent: *` (regra geral aplicável a todos), conforme solicitado de manter `Allow: /` explícito para os bots nomeados.
- A URL informada é um domínio; usarei `https://fintelmannd.com.br/sitemap.xml` como caminho padrão do sitemap. Nenhum arquivo `sitemap.xml` será criado nesta tarefa.