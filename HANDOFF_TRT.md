# Handoff — case Tiny Ruins Tycoon (18/11/2026)

## Estado

Case `projects/tiny-ruins-tycoon/index.html` reescrito (EN/PT) com base no
repositório do jogo (`Tiny-Ruins-Tycoon`, branch `audit/fixes`, 18/11/2026).
Validador (`node tools/validate.mjs`) passa. `dist/` e o ZIP em `artifacts/`
NÃO foram regenerados. Sem push.

Fontes lidas no jogo: `CLAUDE.md`, `Docs/design/FECHAMENTO.md`,
`Tools/calendar_report.md`, `Tools/economy_report.md`, `Audit/99_resumo.md`,
`Audit/HANDOFF.md`, `Audit/fixes_log.md`, `Assets/ART_TODO.md` e o código
(`BuffManager`, `Building`, `TinykinWorker`, `SaveManager`, assets de dados).

## Regras do autor (não violar)

- Todas as decisões de design são do autor; IA só como apoio de programação.
- Tudo no case pertence à versão final; nem tudo estará no prólogo jogável.
- O build público do itch.io é um protótipo anterior (botão diz "earlier").
- Nenhum jogador externo testou; números são de simulador, não de playtest.

## O que mudou

- Texto: contexto (auditoria de 30/10), decisões 01–05, processo (tabela
  GDD vs jogo + tabela de auditoria), resultado (estado das eras + calendário
  simulado), lições. Piso combinado agora 20%/5x (código), banco sem teto,
  comida como refeição especial (cobertura 56/48/65/78%).
- Figuras: gráfico de custo mantido (rotulado "fórmula base"); gráfico da
  comida refeito com faixa-alvo 50–70% (classe `track-band` no fim de
  `assets/case.css`).
- Galeria: 7 capturas novas (`11_`–`17_*.webp`) em `images.json`; as 7 antigas
  continuam em disco, fora do manifesto. Ver `assets/projects/tiny-ruins-tycoon/README.md`.

## Pendências

1. **Capturas novas**, após o autor liberar (o outro terminal está mexendo no
   jogo). Plano, ~6 prints 16:9 1920x1080, Guardian fechado, sem recursos de
   debug se possível: Ruins inicial; gaveta do projeto aberta; Settlement com
   Tinykin/obra/Collect All; Arcane completa; Diário > Explore (expedição);
   Celestial com Divine Fountain ou tela de ascensão. Converter para WebP
   (q82, 1280 px), trocar em `images.json`, manter os antigos em disco.
2. **Marcar no texto o que entra no prólogo jogável**, quando o autor definir
   o escopo (hoje só há avisos gerais na logline, nota de evidência, Contexto
   e Resultado).
3. **Não verificados no jogo** (mantidos como tal no case): aparelho real,
   comida online/offline integrada em Play, compra de bênção e ascensão em
   Play. Atualizar se o autor testar.
4. **Fora do escopo desta edição:** cartões da home, `content.json` e PDFs do
   currículo ainda dizem "3 de 5 eras jogáveis"; o currículo tem alterações
   não commitadas do autor.
5. Se a branch `audit/fixes` for mesclada/publicada, ajustar a nota de
   evidência ("ainda sem merge nem publicação").
6. Regenerar `dist/`/ZIP (`tools/package-site.mjs`) no fluxo de publicação.

## Armadilhas

- `index.html` do case usa CRLF; editar por script/Edit de linha única.
- Não deixar `tools/_*.mjs` temporários; não matar `node.exe` globalmente.
