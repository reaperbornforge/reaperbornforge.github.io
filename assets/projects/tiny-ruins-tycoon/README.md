# Tiny Ruins Tycoon screenshots

The gallery on /projects/tiny-ruins-tycoon/ reads this folder automatically.

## Current set (18 Nov 2026)

`images.json` pins seven captures of the development build, in order and with
bilingual captions: `11_ruins_projeto`, `12_settlement_farm`,
`13_arcane_collect_all`, `14_modern_placeholder`, `15_farm_interior`,
`16_comida_prioridade`, `17_diario`.

Source: `Tiny-Ruins-Tycoon/Audit/img/` in the game repository (files
`mvp_02`, `mvp_07`, `mvp_04`, `fase1/after2_16x9_Modern_built`, `mvp_08`,
`fix_UI-05_comida`, `fase4/journal_16x9`), converted to WebP, quality 82,
1280 px wide. They were taken with debug shortcuts and some placeholder art on
screen, and the captions say so.

## Earlier set (kept on disk, not in the gallery)

`01_ruins_inicio`, `03_settlement_expandindo`, `04_settlement_completa`,
`06_arcane_completa`, `07_arcane_objetivos`, `08_guardian_dialogo` and
`09_painel_arcaneforge` document the build before the retention rework (old HUD,
objectives panel, capped bank). They were kept as a precaution and removed from
`images.json`. Re-add an entry there to show one again.

## Adding more

Add an entry to `images.json`:

    { "src": "name.webp",
      "caption": { "en": "...", "pt": "..." } }

Gallery images are stored as WebP, resized to at most 1280px wide (quality 82).
The gallery handles 1 image up to 24.

Still worth capturing, if the game gets there: a Celestial/ascension screen and
the Modern era with real Workshop and Power Core art.
