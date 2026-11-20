# Tiny Ruins Tycoon screenshots

The gallery on /projects/tiny-ruins-tycoon/ reads this folder automatically.

The ten captures here (taken 2026-11-20 from the current repository build, at
1920x1080, across Ruins, Settlement, Arcane and Modern) are pinned, in order and
with bilingual captions, by images.json.

To add more, name files 01, 02, 03 ... (.webp .png .jpg .jpeg). They are picked
up in order, with no file to edit. Discovery stops at the first missing number,
so keep the numbering contiguous. Numbered files appear AFTER the images.json
entries.

Still missing for this page, if they ever get captured:
  - the Celestial era
  - the food / hunger panel, once the priority interface exists

If you ever want to keep an arbitrary filename, or add a caption, list it in
images.json here:

    [
      { "src": "farm-panel.webp",
        "caption": { "en": "The Farm panel", "pt": "O painel da Farm" } },
      { "src": "modern-era.webp" }
    ]

Manifest entries come first, then any numbered files not already listed, so the
two approaches can coexist.

Gallery images are stored as WebP, resized to at most 1280px wide. To add
a new one, convert it the same way (WebP, quality 82, max 1280px) so the
page stays light.

The gallery handles 1 image (arrows and dots hide themselves) up to 24.
