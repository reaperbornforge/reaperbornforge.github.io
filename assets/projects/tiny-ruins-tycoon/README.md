# Tiny Ruins Tycoon screenshots

The gallery on /projects/tiny-ruins-tycoon/ reads this folder automatically.

The seven captures here keep their original filenames and are pinned, in order
and with bilingual captions, by images.json.

To add more, name files 01, 02, 03 ... (.png .jpg .jpeg .webp). They are picked
up in order, with no file to edit. Discovery stops at the first missing number,
so keep the numbering contiguous. Numbered files appear AFTER the images.json
entries.

Still missing for this page, if they ever get captured:
  - the Modern era, so the placeholder-art state is visible rather than only described
  - the food / hunger panel, once the priority interface exists

If you ever want to keep an arbitrary filename, or add a caption, list it in
images.json here:

    [
      { "src": "farm-panel.png",
        "caption": { "en": "The Farm panel", "pt": "O painel da Farm" } },
      { "src": "modern-era.png" }
    ]

Manifest entries come first, then any numbered files not already listed, so the
two approaches can coexist.

The gallery handles 1 image (arrows and dots hide themselves) up to 24.
