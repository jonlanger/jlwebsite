# Design system

Internal reference for building UI on this site. Not rendered anywhere. When a
pattern below exists, use it instead of restyling by hand; when you add a new
reusable pattern, add it here.

Stack: Tailwind v4 (CSS-first config in `src/app/globals.css`), shadcn
(`base-nova` style) on Base UI primitives, `class-variance-authority` for
variants, `lucide-react` icons.

## Principles

- **Semantic tokens only.** Use `bg-background`, `text-muted-foreground`,
  `border-border`, etc. Never raw palette classes (`stone-800`) or hex values
  in components; they break light/dark.
- **Size in rem.** The text-size setting scales the root font
  (Default 100%, Medium 118%, Large 136%). Heights, padding and type in
  rem-based Tailwind units (`h-11`, `px-4`, `text-base`) scale with it; `px`
  values don't. Avoid `h-[32px]`-style arbitrary pixel sizes for anything
  interactive.
- **One control height.** Interactive controls a visitor clicks to navigate
  or choose are `h-11` (44px at Default, a comfortable touch target).
- **Reuse before restyle.** Shared pieces live in `src/components/ui/` and
  `src/lib/*-variants.ts`.

## Tokens

Defined in `src/app/globals.css` (`:root` for light, `.dark` for dark),
mapped onto Tailwind's stone palette.

| Token | Use |
| --- | --- |
| `background` / `foreground` | Page surface and primary text |
| `card` / `card-foreground` | Raised surfaces (cards, accordion items at `bg-card/60`) |
| `muted` / `muted-foreground` | Quiet fills (`bg-muted/50` trays, `hover:bg-muted/40`) and secondary text |
| `primary` / `primary-foreground` | Filled buttons |
| `border`, `input`, `ring` | Hairlines, field borders, focus rings |
| `destructive` | Errors only |

Radius: `--radius` is `0.625rem`. Use `rounded-lg` for containers and
controls, `rounded-md` for elements nested inside them (segments),
`rounded-xl` for cards.

## Typography

Montserrat for both `font-sans` and `font-heading` (loaded in
`src/app/layout.tsx`).

| Role | Classes |
| --- | --- |
| Page title (h1) | `font-heading text-4xl font-extrabold tracking-tight md:text-5xl` |
| Section heading (h2) | `font-heading text-2xl font-bold tracking-tight md:text-3xl` |
| Sub-section (h3) | `font-heading text-xl font-semibold tracking-tight` |
| Card / accordion title | `font-heading text-lg font-semibold tracking-tight` |
| Lead paragraph | `text-lg leading-relaxed text-muted-foreground` |
| Body | `text-base leading-relaxed text-muted-foreground` |
| Caption / description | `text-sm leading-relaxed text-muted-foreground` |
| Eyebrow label | `text-[11px] font-semibold uppercase tracking-widest text-muted-foreground` |

## Layout

From `src/lib/content-layout.ts` and `src/components/page-shell.tsx`:

- `PageShell`: page gutter (`px-6 md:px-10 lg:px-14`) and vertical rhythm
  (`py-20 md:py-28`), max `6xl`.
- `contentColumnClass`: the 900px reading column. All interior content sits in
  it.
- `contentInnerGridClass` / `contentInnerStackClass`: two-column grid and
  vertical stack inside the column.

## Components

### Button: `src/components/ui/button.tsx`, `src/lib/button-variants.ts`

Use `<Button>` for actions, or `buttonVariants()` on a `Link`/`a`.

| Size | Height | Use |
| --- | --- | --- |
| `xl` | `h-11` | Primary calls to action (hero, contact) |
| `lg` | `h-9` | Secondary actions, text links styled as buttons (`variant: "link"`) |
| `default` | `h-8` | Compact actions inside dense UI |
| `sm`, `xs`, `icon-*` | | Toolbars and icon buttons |

Variants: `default` (filled), `outline`, `secondary`, `ghost`, `link`,
`destructive`. Pair a filled CTA with an `outline` one; don't put two filled
buttons side by side.

### Segmented control: `src/lib/segmented-control-variants.ts`

A tray of mutually exclusive options. Used by the project category filter
(horizontal, `Link`s) and the Appearance / Text size settings (vertical,
`button`s).

```tsx
<nav className={segmentedControlVariants({ className: "mt-10" })}>
  <Link className={segmentVariants({ active: isActive })} … />
</nav>

<div role="group" aria-label="Appearance"
  className={segmentedControlVariants({ orientation: "vertical" })}>
  <button aria-pressed={selected}
    className={segmentVariants({ active: selected, orientation: "vertical" })} … />
</div>
```

- Segments are `h-11 text-base`, the same height as `xl` buttons.
- Mark the current option: `aria-current="page"` for navigation links,
  `aria-pressed` for setting toggles.
- Use `vertical` when the options don't fit on one line (e.g. the 22rem
  sidebar) instead of letting them wrap.

### Accordion: `src/components/ui/accordion.tsx`

Base UI accordion with the site styling: each `AccordionItem` is a bordered
card, `AccordionTrigger` adds the chevron, `AccordionPanel` adds the divider
and padding.

```tsx
<Accordion defaultValue={["a"]} multiple>
  <AccordionItem value="a">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionPanel>…</AccordionPanel>
  </AccordionItem>
</Accordion>
```

- Uncontrolled `defaultValue` must keep a stable identity in client
  components; capture it once with `useState(() => …)` (see
  `project-product-showcase.tsx`).
- To make a single collapsed item hug its label and expand to full width:
  `className="w-fit has-[[data-panel-open]]:w-full"` on `Accordion`.

### Card: `src/components/ui/card.tsx`

`rounded-xl bg-card ring-1 ring-foreground/10`. Use for grouped content
blocks and project tiles.

### Other primitives

`breadcrumb.tsx`, `separator.tsx` in `src/components/ui/` follow shadcn
defaults.

## Accessibility checklist

- Every interactive element shows `focus-visible` ring styling (the shared
  variants include it).
- Icons next to text are `aria-hidden`; icon-only controls get an
  `aria-label`.
- Check new UI at all three text sizes and in both themes.
