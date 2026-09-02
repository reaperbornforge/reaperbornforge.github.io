# Legacy of Allard screenshots

The gallery on /projects/legacy-of-allard/ reads this folder automatically.

The six Steam screenshots here keep their original filenames and are pinned,
in order and with bilingual captions, by images.json.

To add more, name files 01, 02, 03 ... (.png .jpg .jpeg .webp). They are
picked up in order, with no file to edit. Discovery stops at the first
missing number, so keep the numbering contiguous. Numbered files appear
AFTER the images.json entries.

Best candidates for this page:
  - destructible terrain mid-match, ideally before/after the same map
  - the Sliver equip screen, showing the four Q/W/E/R slots

If you ever want to keep an arbitrary filename, or add a caption, list it
in an images.json here instead:

    [
      { "src": "sliver-equip.png",
        "caption": { "en": "Equipping a mixed Sliver", "pt": "Equipando um Sliver misto" } },
      { "src": "terrain.png" }
    ]

Manifest entries come first, then any numbered files not already listed,
so the two approaches can coexist.

The gallery handles 1 image (arrows and dots hide themselves) up to 24.
