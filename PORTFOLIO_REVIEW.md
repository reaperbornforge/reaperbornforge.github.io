# Revisão editorial e técnica — 16/11/2026

## Escopo e fontes

Atualização local do site existente em GitHub Pages. Versões Recruiter e Studio, quatro estudos de caso e currículos EN/PT. Identidade visual preservada. Nenhuma nova competência ou experiência foi inventada.

- Currículos anteriores: fonte para nome completo, formação FIAP concluída em 2020, certificações, idiomas e experiência complementar.
- Conteúdo anterior dos cases: fonte para decisões, atribuições e exemplos técnicos. Não houve auditoria do código-fonte dos jogos nesta revisão.
- Autor, nesta conversa: confirmou reworks majoritariamente visuais em HVC e TRT, sem alteração das competências. Confirmou início de HVC em janeiro de 2025 e de Escape Adventure em 2026; datas reconciliadas no site e nos currículos.
- [Google Play — Head Volley Clash](https://play.google.com/store/apps/details?id=com.DarkReaper.HeadVolleyClash): publicação, anúncios, IAP e atualização em 08/11/2026. O texto público continha observações editoriais entre colchetes; elas não foram reproduzidas como funcionalidades confirmadas.
- [Steam — Legacy of Allard](https://store.steampowered.com/app/2378100/Legacy_of_Allard/): lançamento a anunciar, desenvolvedora/publicadora Fernit Studios. A contribuição pessoal em design é distinta do crédito do estúdio.
- [itch.io — Tiny Ruins Tycoon](https://zdarkreaper.itch.io/tiny-ruins-tycoon): protótipo, três eras jogáveis, Unity e divulgação de assistência de IA.
- [itch.io — Escape Adventure](https://zdarkreaper.itch.io/escape-adventure): prólogo de quatro fases, inglês/português, três dificuldades e recursos separados para tiro e stamina.

## Correções

- Resumo Recruiter identifica o profissional pelo nome e distingue jogo publicado, protótipo e página na Steam.
- Removidas inferências de retenção a partir de instalações ou MAU. Gráficos antigos de aquisição permanecem identificados como dados históricos relatados pelo autor, sem exportação original no repositório.
- Removida promessa de lançamento em dezembro de Legacy of Allard. Programação/backend/rede atribuídos ao sócio, conforme o case existente.
- Currículos não atribuem reações elementais ou programação de rede ao candidato.
- Reworks de HVC/TRT registrados em ambos os modos e cases. Imagens existentes permanecem como registros anteriores, sem simular capturas novas.
- Contagens de testes do Escape Adventure contextualizadas como registro anterior; não representam execução de testes Unity nesta revisão.
- Barras decorativas de carga do estúdio removidas para não parecerem indicadores reais.
- Studio encaminha aos mesmos cases; Recruiter passa a ser a entrada padrão, mantendo `?view=studio`.
- Acrescentados foco visível, link para saltar ao conteúdo, respeito a movimento reduzido, navegação interna dos cases e regras responsivas compartilhadas.
- A seleção de idioma atualiza a URL, preservando os demais parâmetros, para que uma URL explícita não reverta o idioma ao recarregar.
- Navegação entre home e cases preserva Studio/Recruiter e idioma. Galerias com manifestos não disparam mais sondagens de imagens inexistentes.
- Corrigidos estouros de largura no cabeçalho de tablet e nos gráficos/tabelas de celular, detectados em navegador real. Texto dos cards Recruiter ampliado para 15px.
- Removidos rótulos de autoavaliação “Expert/Advanced” do protótipo Studio, preservando as competências e deixando a evidência dos projetos sustentar o posicionamento.

## Currículos e manutenção

Fonte editável: `assets/resumes/content.json`. Versões HTML: `assets/resumes/en.html` e `pt.html`. Os caminhos públicos dos PDFs foram preservados.

Ferramentas isoladas do site, sem dependências de runtime:

```powershell
npm.cmd install --prefix tools
node tools/build-resumes.mjs
node tools/validate.mjs
```

Dependências locais instaladas em `tools/node_modules/`, com versões fixadas e `tools/package-lock.json`. Instalação reproduzível com `npm.cmd ci --prefix tools`. Os scripts de PDF/estrutura também aceitam `RF_TOOLS_MODULES` para uso com módulos temporários.

## Pendências factuais

- Início de TRT divergia entre PDFs (2024) e site (2026); não confirmado. Essa data foi omitida nas novas versões.
- Capturas novas de HVC/TRT ainda não foram fornecidas. Não apresentar imagens antigas como prova dos reworks.
- Relatórios originais do Play Console não estão no repositório. Os números históricos não foram promovidos a resultados atuais ou utilizados no resumo dos currículos.
- Situação atual da migração de rede e de funcionalidades internas exige fonte do projeto; o portfólio preserva o relato anterior com atribuição.
- Os links de builds foram consultados como páginas públicas, sem jogar ou testar os executáveis.

## Publicação

Alterações implementadas no checkout. Pacote estático gerado em `dist/`, com arquivos públicos, página 404, robots.txt, sitemap e `.nojekyll`. ZIP de entrega em `artifacts/Reaperborn-Forge-publicacao.zip`, validado contra `artifacts/publication-manifest.json`. Sem push ou implantação; pronto para revisão e publicação no fluxo existente de GitHub Pages ou outra hospedagem estática.

## Validação realizada

- Oito documentos HTML com um único landmark principal, IDs únicos, scripts válidos e texto sem sinais de perda de codificação.
- 133 referências locais verificadas, incluindo arquivos e âncoras; imagens dos manifests de galerias presentes.
- 16 combinações de idioma, modo e preferência de movimento, incluindo modo ausente/inválido. Validação da persistência do idioma na URL.
- Dois PDFs de uma página, com texto extraível, nomes dos quatro projetos, contato, formação, data de atualização e links clicáveis. Conteúdo dentro dos limites da página.
- `git diff --check` sem erros.
- Edge/Chromium: 64 combinações de página, idioma e viewport em 320, 390, 768 e 1440px; sem estouro horizontal, erros JavaScript ou falhas HTTP locais. Galerias, modal/teclado, retorno ao Studio, idioma após recarga e downloads PDF testados.
- Capturas completas de Recruiter/Studio e prévias rasterizadas dos PDFs em `artifacts/screenshots/`; inspeção visual realizada. O pedido posterior do usuário para testar e entregar o resultado autorizou a revisão em navegador.
- `artifacts/browser-report.json` contém o resultado e o hash do manifesto testado. `tools/archive.ps1` exige esse resultado aprovado e verifica cada arquivo do ZIP por SHA-256.
- Não houve teste dos jogos executáveis nem teste em aparelhos físicos. Os testes responsivos usam viewports do navegador.
