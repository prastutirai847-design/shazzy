# Campus Kart design system

Campus Kart borrows Apple's *principles* — a restrained palette, a compact semantic
type scale, and one consistent icon weight — without using Apple branding, assets,
or bundled typefaces. The interface uses the platform system UI font and Lucide
icons.

## Sources of truth

Tokens live in `src/styles/tokens.css`. Base element styles live in
`src/styles/global.css`. Change the token, not the component, when a value needs to
move.

## Typography

### Apple-documented facts

- Apple's Human Interface Guidelines use a default text size of 17 pt on iOS and
  iPadOS and 13 pt on macOS, with minimums of 11 pt and 10 pt respectively.
- The iOS semantic ramp is: Large Title, Title 1–3, Headline, Body, Callout,
  Subhead, Footnote, Caption 1–2, and Overline. Each level carries its own weight,
  line height, and tracking rather than being derived from one base size.
- SF Pro is licensed only for designing and developing on Apple platforms. It may
  not be embedded or distributed on the web, so Campus Kart does not bundle it.
- Apple recommends limiting the number of type sizes, using weight and colour for
  hierarchy, and respecting Dynamic Type rather than shrinking text to fit.

Sources:
- https://developer.apple.com/design/human-interface-guidelines/typography
- https://developer.apple.com/fonts/
- https://developer.apple.com/fonts/system-fonts/

### Campus Kart implementation

| Token | Desktop size | Line | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `--type-display-*` | 52px | 1.06 | 600 | -0.03em | Home hero statement only |
| `--type-title-1-*` | 30–36px | 1.16 | 600 | -0.02em | Page titles, listing title |
| `--type-title-2-*` | 24–28px | 1.25 | 600 | -0.018em | Section headings |
| `--type-title-3-*` | 18–21px | 1.35 | 600 | -0.01em | Card/panel headings |
| `--type-headline-*` | 17px | 1.3 | 600 | -0.012em | Compact headings, lead copy |
| `--type-body-*` | 15px | 1.5 | 400 | -0.003em | Body copy, descriptions |
| `--type-callout-*` | 14px | 1.45 | 500 | 0 | Chips, compact controls |
| `--type-subhead-*` | 13px | 1.4 | 500 | 0 | Dense secondary labels |
| `--type-footnote-*` | 12px | 1.4 | 400 | 0 | Metadata, helper text |
| `--type-caption-*` | 11px | 1.3 | 500 | 0.01em | Badges, compact labels |
| `--type-overline-*` | 11px | 1.3 | 600 | 0.06em | Uppercase eyebrow labels |
| `--type-navigation-*` | 14px | 1.4 | 500 | 0 | Sidebar and category navigation |
| `--type-product-title-*` | 15px | 1.35 | 500 | 0 | Listing card titles |
| `--type-price-*` | 16–20px | 1.3 | 600 | -0.01em | Listing-detail price |
| `--type-price-card-*` | 18px | 1.25 | 600 | -0.01em | Listing-card price |
| `--type-button-*` | 15px | 1.2 | 600 | 0 | Primary and secondary buttons |
| `--type-fine-*` | 11px | 1.45 | 400 | 0 | Legal and demo fine print |

Role tokens map product concerns onto the core ramp. `--type-metadata-*` aliases
footnote; `--type-price-*` and `--type-price-card-*` share weight and tracking but
use different sizes so the detail price stays distinct without dominating.

Rules:

- Use the smallest set that works. Body copy stays at 15px; 11px is reserved for
  captions, badges, and fine print, never for paragraphs.
- The display, page, section, and subheading sizes are fluid `clamp()` tokens in
  `tokens.css`. Components consume the token directly; do not add another local
  `clamp()` or a mobile font-size override.
- Mobile floors are 32px display, 28px page title, 24px section, and 18px
  subheading. The desktop targets above are reached without a breakpoint jump.
- Eyebrow/overline text pairs `--type-overline-*` with `text-transform: uppercase`;
  the modest positive tracking keeps small caps legible.
- Numerals in prices and counts use `font-variant-numeric: tabular-nums`.
- Negative tracking only appears at 17px and above. Footnote, caption, metadata,
  navigation, and product-title text stay at zero; body copy uses -0.003em. Do not
  fake weights with `text-shadow` or synthetic bold.

### Weight mapping

| Weight | Role | Examples |
| --- | --- | --- |
| 400 | Regular | Body copy, descriptions, secondary metadata |
| 500 | Medium | Navigation labels, product titles, input labels, compact controls |
| 600 | Semibold | Section headings, selected navigation, primary emphasis, accent phrases |
| 700 | Bold | Reserved for future brand statements; unused in the current UI |

Display, page, section, and subheading tokens use 600. Controls, navigation, and
product titles use 500. On Windows, `Segoe UI` exposes Regular, Semilight, Semibold,
and Bold rather than a true Medium; the browser maps 500 to the nearest available
face. Do not depend on a visible difference between 400 and 500 on that platform.

### Font stack

| Role | Family |
| --- | --- |
| UI and display | `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` |
| Monospace (technical values, future use) | `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace` |

No webfont is bundled or distributed. `-apple-system` resolves to the native system
UI face on Apple platforms (SF Pro Text for small sizes and SF Pro Display at large
optical sizes). Windows resolves to Segoe UI (Segoe UI Variable where available),
Android resolves to Roboto through `sans-serif`, and Linux resolves to the distro's
sans-serif. Campus Kart therefore looks native everywhere, but only Apple devices
render SF Pro.

SF Pro assets must not be downloaded from unofficial sources, embedded, or shipped
with the public web application. If an exact SF Pro comparison is required, use a
legitimately obtained install on a permitted Apple design machine; it remains a
local preview, not a production dependency. SF Compact and SF Pro Rounded are not
used because this is a neutral marketplace interface, not watchOS UI or a playful
brand.

`font-optical-sizing: auto` is declared on `body` so each platform font can use its
own optical-size behaviour. We do not force `font-variation-settings`, which would
override native font selection. Optical sizing is font-dependent; confirm the
computed value in the browser rather than assuming every platform exposes an axis.

Verified on Windows 11 with Chrome 155: SF Pro, SF Pro Text, and SF Pro Display
are not installed, so the app renders Segoe UI. On that platform `font-weight: 500`
resolves to the Semibold face (identical measured width to 600) because Segoe UI
has no Medium; 400 and 700 remain distinct. The production build requests no font
files. SF Pro rendering must be checked separately on an Apple device.

Type readback at 1440px: hero 52px/600, page title 36px/600, section 28px/600,
subheading 21px/600, body 15px/400, navigation 14px/500, product title 15px/500,
card price 18px/600, detail price 19.44px/600, button 15px/600, metadata 12px/400,
and fine print 11px/400. At 390px the fluid headings settle at 32.29/28.31/24.14/
18.16px. Home, Search, and Listing pages report no horizontal overflow at 1440px
or 390px. Browser-measured display, page, section, and subheading line heights and
tracking match the tokens above.

## Icons

Lucide is the only icon set. Stroke weight is always **1.8** (`--icon-stroke`); the
104px watermark uses 1.2 and the hand-drawn logo mark is exempt.

| Token | Size | Example |
| --- | --- | --- |
| `--icon-xs` | 14px | Inline metadata, checkmarks, compact arrows |
| `--icon-sm` | 16px | Search fields, back links, small actions |
| `--icon-md` | 18px | Standard buttons and quick actions |
| `--icon-lg` | 20px | Sidebar/tab-bar navigation, top-bar actions |
| `--icon-xl` | 24px | Feature/empty-state glyphs, sell button |
| `--icon-2xl` | 26px | Image fallback glyph |
| `--icon-3xl` | 30px | Large empty-state glyph |

Alignment rules:

- Icons and adjacent text sit in a flex container with `align-items: center` and a
  6–8px gap (`--icon-gap` is 6px). Never rely on baseline alignment.
- `svg` is `display: block; flex: none` globally so icons cannot be squeezed by
  long labels.
- Icon-only controls use a square hit target of at least 34px and an explicit
  `aria-label`.
- Decorative icons are `aria-hidden="true"`; meaningful icons get a label on the
  parent control.
- Do not mix filled and outlined icons in the same control. Filled hearts are the
  single intentional exception to show saved state.

## Colour and surfaces

The palette stays Apple-adjacent but is Campus Kart's own. It uses a neutral ink
hierarchy, one blue action family, and semantic success/accent colours. Contrast
is measured with WCAG 2.2 relative luminance: 4.5:1 for normal text and 3:1 for
non-text controls, icons, and focus indicators.

| Token | Value | Role | Minimum contrast |
| --- | --- | --- | --- |
| `--color-ink` | `#1d1d1f` | Headings, body copy, control labels | 15.46 on canvas; 16.83 on white |
| `--color-ink-secondary` | `#6e6e73` | Supporting copy, metadata, inactive navigation | 4.66 on canvas; 5.07 on white |
| `--color-ink-tertiary` | `#6f6f74` | Counts, placeholders, briefly scanned metadata | 4.59 on canvas; 5.00 on white |
| `--color-primary` | `#0071e3` | Filled primary actions, selected fills, focus | 4.70 with white; 4.54 at hover |
| `--color-primary-text` | `#0062cc` | Text links, active navigation, selected labels | 4.67 on primary-soft over canvas |
| `--color-success` | `#1f7a36` | Success and trust text | 4.90 on success-soft |
| `--color-accent-ink` | `#8a4b00` | Warning/attention text | 6.20 on accent-soft |
| `--color-border-solid` | `#d2d2d7` | Opaque dividers and rules | Non-text only |

Rules:

- The Apple HIG tertiary reference `#86868B` reaches only 3.62:1 on white, so it
  is not used for normal-size text. `#6f6f74` keeps the neutral hierarchy while
  clearing 4.5:1 on both white and canvas. It sits close to secondary by design;
  reserve it for short metadata, not descriptions or helper paragraphs.
- Build hierarchy with the ink tokens, not opacity. Do not put secondary or
  tertiary text on `--color-primary-soft` over canvas or on `--color-canvas-deep`;
  those combinations fall to roughly 4.0:1. Use `--color-ink`, or
  `--color-primary-text` on a blue-tinted fill.
- `--color-primary` is a fill and focus colour. For small blue text on canvas use
  `--color-primary-text` instead, because the fill blue reaches only 4.31:1 there.
- White labels on primary actions must be solid `--color-ink-inverse`, never
  translucent white. Hover brightness stays at `1.02`; increasing it pushes white
  text below 4.5:1.
- Focus uses a solid 3px `--color-focus` ring. Inputs that replace the outline
  use a solid focus border plus the soft ring, not a translucent border alone.
- Icon tiles are neutral by default: `--color-canvas` fill, standard border, and
  secondary icon. Reserve filled brand tiles for selected states and primary
  actions. Soft success/brand fills remain semantic signals for trust and empty
  states, not a default decoration for every icon.
- Gradients are limited to the logo and the single blue sell panel. Use the
  defined brand/action colours there; do not add decorative page gradients.
- Borders are translucent ink for structure and interaction states.
  `--color-border-solid` is reserved for opaque dividers.
- Purely decorative separators such as the `·` metadata dot are `aria-hidden`
  and exempt from text-contrast requirements.

Use the existing `--color-*` and `--gradient-*` tokens for all semantic text,
icon, surface, and action colours. Do not add new opaque hex values in component
CSS; translucent overlays and shadows may remain literal `rgba()` until a shared
token is justified. Accessibility thresholds take precedence over matching a
reference colour exactly.

## Spacing, radius, and elevation

- Spacing follows a 4px base (`--space-2xs` through `--space-4xl`).
- Radii: 6px controls, 8px compact surfaces, 12px cards/inputs, 16–24px panels,
  pill for badges and chips.
- One card shadow (`--shadow-card`), one raised shadow for overlays and hover
  (`--shadow-raised`). Avoid stacking multiple decorative shadows.
- Interactive targets are at least 34×34px on pointer devices and 44×44px for
  primary mobile actions.

## Motion

- Durations: 150ms feedback, 250ms transitions, 400ms entrances.
- Standard easing is `--ease-out`; springs are reserved for small state changes
  such as the wishlist heart.
- All non-essential motion is disabled under `prefers-reduced-motion: reduce`.

## Contributing

When adding a screen:

1. Pick sizes from the semantic ramp; do not write px font sizes in module CSS.
2. Pick an icon size from the icon scale and leave `strokeWidth` at 1.8.
3. Use `--space-*`, `--radius-*`, and `--color-*` tokens instead of literals.
4. Verify keyboard focus, contrast, and reduced-motion behaviour.
