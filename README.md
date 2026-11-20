# Reaperborn Forge

Portfólio estático bilíngue de Otávio Antonio, com identidade visual dark fantasy, modos Recruiter/Studio, quatro estudos de caso e currículos em português e inglês.

## Revisão

- Recruiter: `/?view=recruiter&lang=pt` (modo padrão).
- Studio: `/?view=studio&lang=pt`.
- Inglês: substituir `lang=pt` por `lang=en`.
- Páginas HTML dos currículos: `assets/resumes/content.json` (espelha os PDFs) → `node tools/build-resumes.mjs`.
- PDFs públicos: `assets/cv/Otavio_Rosindo_CV_Game_Designer_PT.pdf` e `assets/cv/Otavio_Rosindo_CV_Game_Designer_EN.pdf` (copiados do Drive, nao gerados).

O site não exige instalação ou build no servidor. Os utilitários abaixo servem apenas para manutenção e verificação.

## Preparar e testar

Requer Node.js 24 e Microsoft Edge instalado para o teste de navegador no Windows. Outro executável Chromium pode ser indicado em `RF_BROWSER`.

```powershell
npm.cmd ci --prefix tools
node tools/build-resumes.mjs
node tools/validate.mjs
node tools/package-site.mjs
node tools/browser-check.mjs
```

O último comando serve o pacote `dist/` temporariamente, testa desktop/tablet/celular e grava `artifacts/browser-report.json` e capturas em `artifacts/screenshots/`. O servidor e o navegador de teste são encerrados automaticamente.

Para revisar manualmente:

```powershell
node tools/preview.mjs dist
```

Abrir `http://127.0.0.1:4173/?view=recruiter&lang=pt`. Encerrar com Ctrl+C.

## Publicação

O repositório existente usa GitHub Pages. A raiz contém o site pronto para esse fluxo. O diretório `dist/` contém apenas arquivos públicos e também pode ser enviado a qualquer hospedagem estática, preservando os caminhos. A configuração de hospedagem não foi alterada.

Para criar um ZIP independente:

```powershell
powershell.exe -ExecutionPolicy Bypass -File tools/archive.ps1
```

O script exige testes de navegador aprovados para o mesmo manifesto e verifica todos os arquivos do ZIP por SHA-256. O manifesto `artifacts/publication-manifest.json` registra tamanho e hash de cada arquivo preparado. `dist/`, `artifacts/`, cache npm e dependências locais ficam fora do Git.

## Atualizar galerias

Editar `images.json` na pasta de imagens de cada jogo e adicionar os arquivos correspondentes. O manifesto define a ordem e as legendas EN/PT; se não existir, a galeria procura arquivos numerados. As sete capturas de HVC foram obtidas da página atual na Google Play, com fontes registradas em `assets/HeadVolleyClash/sources.json`. As capturas de TRT foram feitas em 20/11/2026 a partir da build atual do repositório do jogo.
