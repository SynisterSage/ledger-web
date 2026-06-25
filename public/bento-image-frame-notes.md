# Bento Image Frame Notes

Use this when placing a finished marketing image or video frame inside a Ledger bento card.

## Goal

Make the image feel like it was designed for the frame, not squeezed into it.

The key is to match:
- the frame ratio
- the exported asset ratio
- the breakpoint behavior

If those three do not line up, you get one of two problems:
- `object-cover` crops too much
- `object-contain` leaves empty space

## General Rules

- Keep the outer bento card shape stable.
- Put the visual in a dedicated inner frame.
- Let the image fill that frame edge to edge.
- Do not add extra borders around the image itself.
- Use one image asset for desktop and one for mobile/tablet if the compositions differ.

## Desktop

Desktop usually has more horizontal room and can support a wider, more staged composition.

Recommended approach:
- Use the desktop export for `lg` and above.
- Match the frame to the desktop asset aspect ratio.
- Prefer `object-cover` if the composition is meant to crop slightly.
- Prefer `object-contain` only when the artwork must stay fully visible.

For the Search bento, the desktop frame works best when it matches the asset ratio closely and stays vertically centered.

## Mobile and Tablet

Mobile and tablet often need a different crop from desktop.

Recommended approach:
- Use the mob/tablet export below `lg`.
- Keep the frame a little shorter and more compact.
- Avoid making the frame taller than the artboard unless the asset is meant to fill extra space.
- If the image sits too low, trim the frame first before changing the crop.

If mobile/tablet looks zoomed in:
- the frame is usually too small for the asset ratio
- or the asset is being forced into `object-cover` against the wrong ratio

If mobile/tablet shows empty space:
- the frame is usually too tall
- or `object-contain` is exposing the natural aspect ratio without enough frame height

## Practical Pattern

Use this pattern for bento visuals:

```tsx
<div className="relative isolate aspect-[5/3] w-full overflow-hidden sm:aspect-[5/3] lg:aspect-[63/50]">
  <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
    <source media="(min-width: 1024px)" srcSet="/path/to/desktop.webp" />
    <img
      src="/path/to/mobtab.webp"
      alt=""
      aria-hidden="true"
      className="h-full w-full rounded-[inherit] object-cover object-center"
    />
  </picture>
</div>
```

Then tune only these three things:
- `aspect-[...]` on the wrapper
- the desktop `source`
- the mobile/tablet `img` asset

## What To Adjust First

When a visual looks wrong, adjust in this order:

1. Frame aspect ratio
2. Asset selection by breakpoint
3. `object-fit`
4. `object-position`

Do not start with random padding or borders. That usually hides the problem instead of fixing it.

## Current Ledger Pattern

For the homepage assistant bento boxes:

- Shared Workspaces:
  - desktop asset for `lg` and up
  - mob/tablet asset below `lg`
  - frame should stay clean and cropped to the card shape

- Search:
  - desktop asset for `lg` and up
  - mob/tablet asset below `lg`
  - frame should match the exported art ratio so the bottom edge lands naturally

- Desktop animated frames:
  - use a small pre-rendered sequence of desktop assets
  - cycle only on `lg` and above
  - keep mob/tablet static with a single fallback image
  - preload the desktop frames so the loop feels like a short GIF instead of a flash

## Reminder

If the image still feels off after matching the aspect ratio, the next thing to check is the exported artboard itself, not the card shell.
