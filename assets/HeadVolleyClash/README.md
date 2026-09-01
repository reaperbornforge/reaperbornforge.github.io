# Head Volley Clash screenshots

The gallery on /projects/head-volley-clash/ reads this folder automatically.

Name files 01, 02, 03 ... (.png .jpg .jpeg .webp). They are picked up in
order, with no file to edit. Discovery stops at the first missing number,
so keep the numbering contiguous.

If you ever want to keep an arbitrary filename, or add a caption, list it
in an images.json here instead:

    [
      { "src": "boss-fight.png",
        "caption": { "en": "Match in progress", "pt": "Partida em andamento" } },
      { "src": "shop.png" }
    ]

Manifest entries come first, then any numbered files not already listed,
so the two approaches can coexist.

The gallery handles 1 image (arrows and dots hide themselves) up to 24.
