# Head Volley Clash screenshots

The gallery on /projects/head-volley-clash/ reads this folder automatically.

The seven current promotional screenshots were downloaded from the official
Google Play listing on 2026-11-16 and replace the previous four screenshots.
`images.json` defines their order and EN/PT captions; `sources.json` records
the official image URLs, dimensions and SHA-256 hashes. The first image also
appears in the Recruiter/Studio highlights and case-study cover, uncropped.
With a manifest present, add new screenshots to it explicitly; numbered-file
discovery below is a fallback for galleries without a manifest.

Name files 01, 02, 03 ... (.webp .png .jpg .jpeg). They are picked up in
order, with no file to edit. Discovery stops at the first missing number,
so keep the numbering contiguous.

If you ever want to keep an arbitrary filename, or add a caption, list it
in an images.json here instead:

    [
      { "src": "boss-fight.webp",
        "caption": { "en": "Match in progress", "pt": "Partida em andamento" } },
      { "src": "shop.webp" }
    ]

Manifest entries come first, then any numbered files not already listed,
so the two approaches can coexist.

Gallery images are stored as WebP, resized to at most 1280px wide. To add
a new one, convert it the same way (WebP, quality 82, max 1280px) so the
page stays light.

The gallery handles 1 image (arrows and dots hide themselves) up to 24.
