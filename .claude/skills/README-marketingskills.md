# Marketing Skills (Corey Haines) — instaladas no projeto

Origem: https://github.com/coreyhaines31/marketingskills (v2.11.1, commit `5b2c000`, licença MIT — ver `LICENSE-marketingskills`).

- `.claude/skills/<skill>/` → 50 skills (SKILL.md + references). As pastas `evals/` foram removidas (servem só para testar as skills).
- `.claude/tools/` → registro de ferramentas/integrações que as skills citam via `../../tools/...`.

O Claude Code carrega essas skills automaticamente ao abrir este repositório. Para usar uma skill, digite `/copywriting` (por exemplo) ou apenas descreva a tarefa.

**Comece por `/product-marketing`**: ela gera `.agents/product-marketing.md` com produto, público e posicionamento. As outras skills leem esse arquivo antes de agir.

## Atualizar
```bash
git clone --depth 1 https://github.com/coreyhaines31/marketingskills.git /tmp/ms
cp -r /tmp/ms/skills/. .claude/skills/ && cp -r /tmp/ms/tools/. .claude/tools/
find .claude/skills -type d -name evals -prune -exec rm -rf {} +
```
