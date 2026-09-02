# Studio view poster art

The poster grid on `/?view=studio` (§02, "Artifacts in the forge") reads its art
from this folder. One file per title, WebP, sized for a 2x display of the
630x500 poster box, so roughly 1260px wide. All five titles have art today.

    head-volley-clash.webp
    legacy-of-allard.webp
    tiny-ruins-tycoon.webp
    escape-adventure.webp
    sharp-memories.webp

Grid order is most finished to least: Head Volley Clash, Legacy of Allard,
Tiny Ruins Tycoon, Escape Adventure, Sharp Memories.

## Adding a new title

Convert its cover the same way the others were made:

    from PIL import Image
    im = Image.open("assets/Some_Title_itch_cover_630x500.png")
    if im.width > 1260:
        im = im.resize((1260, round(im.height * 1260 / im.width)), Image.LANCZOS)
    im.convert("RGB").save("assets/posters/some-title.webp", "WEBP",
                           quality=84, method=6)

Then copy one of the five poster blocks in `index.html` and swap the art path,
title, kind, logline pair and CTA.

If a title has no art yet, the stylesheet still carries a placeholder frame:
give the `.poster-art` div the class `is-empty` and put this inside it instead
of the `<img>`:

    <div>
      <div class="poster-empty-mark">RF</div>
      <div class="poster-empty-txt"><span class="i18n-en">In the forge</span><span class="i18n-pt">Na forja</span></div>
    </div>

## Card states

A card is one of three shapes. They share a box model, so switching between them
reflows nothing in the grid:

- **Linked** — an `<a class="poster" href="..." target="_blank" rel="noreferrer">`.
  Used by the four titles that have an itch.io page.
- **Modal** — a `<button type="button" class="poster poster-soon" data-modal="ID">`,
  which opens `#ID`. Used by Sharp Memories: no build and no page, so the card
  opens an excerpt of the text instead of going anywhere.
- **Inert** — a `<div class="poster poster-soon">`, clickable by nothing. Nothing
  uses this today; it is the shape to fall back to if a card should not react.

`poster-soon` also goes on the badge to mute it. Put it on the CTA row too only
when the card does nothing on click — a card that opens a modal keeps the accent
CTA, because it is actionable.

To turn the Sharp Memories card into a linked one when it gets a page: swap the
`<button type="button" ... data-modal="...">` for an `<a href="..." target="_blank"
rel="noreferrer">`, drop `poster-soon` from the badge, and use the CTA pair from a
linked card. The modal markup can stay or go; nothing else references it.

## Why these are separate from /assets/*_itch_cover_630x500.png

The recruiter view still points at the original PNG covers and is deliberately
left untouched. These WebP copies exist so the studio view, which shows five
posters at once, does not pull several MB of PNG. If the recruiter cards are ever
repointed at these files, the PNGs can go.
