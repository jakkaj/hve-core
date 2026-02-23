# Deep DevTools Comparison: HVE Core vs MS Learn Architecture Center

**Generated**: 2026-02-19 via Chrome DevTools computed style extraction
**MS Learn Theme**: Light mode
**HVE Core Theme**: Dark mode (browser preference)
**Both pages**: 1649px viewport width

## Element-by-Element Comparison

### HERO SECTION

| Property | MS Learn (Light) | HVE Core (Dark) | Match? | Fix |
|----------|-----------------|-----------------|--------|-----|
| Background color | `rgb(0, 91, 161)` (#005ba1) | `rgba(0,0,0,0)` (transparent — gradient covers it) | ✅ | — |
| Background image | External SVG URL `background-image-pattern-plus.b22b3aa4.svg` | Inline data URI SVG | ✅ Close | — |
| Background size | `200px` | `200px` | ✅ | — |
| Padding | `0px 24px` | `40px 32px` | ❌ | MS Learn has NO vertical padding on the hero element — vertical spacing comes from `.hero-content` padding |
| Text align | `start` (left) | `start` (left) | ✅ | — |
| Height | `210px` | `176px` | ❌ | Ours is shorter |
| Width | `1649px` (full) | `1649px` (full) | ✅ | — |
| **Hero content max-width** | `800px` | `1200px` | ❌ | MS Learn hero content is only 800px wide |
| **Hero content padding** | `32px 48px 32px 0px` | (inherited from hero 40px) | ❌ | MS Learn uses asymmetric padding — 32px top, 48px right, 32px bottom, 0 left |

### HERO TITLE (H1)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Font size | `40px` (2.5rem) | `44px` (2.75rem) | ❌ | Ours is too big — MS Learn is 40px |
| Font weight | `600` | `600` | ✅ | — |
| Line height | `45px` | `55px` | ❌ | Ours is too loose |
| Color | `rgb(255,255,255)` | `rgb(255,255,255)` | ✅ | — |
| Margin | `0 0 24px` | `0 0 8px` | ❌ | MS Learn has 24px below title, ours has 8px |

### HERO SUBTITLE (P)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Font size | `16px` (1rem) | `20px` (1.25rem) | ❌ | Ours is too big — MS Learn is 16px body text |
| Line height | `25.6px` | `33px` | ❌ | Ours is too loose |
| Color | `rgb(255,255,255)` | `rgb(255,255,255)` | ✅ | — |
| Opacity | (none) | `0.9` | ❌ | MS Learn has NO opacity — full white |

### ICON CARDS (Highlighted Content)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Background | `rgb(255,255,255)` (white) | `rgb(37,37,37)` (#252525 — dark section-bg) | ❌ | In light mode MS Learn cards are WHITE, not gray. Our dark mode is using `--ms-learn-section-bg` which is correct for dark. Need to check light mode. |
| Border | `1px solid transparent` | `1px solid transparent` | ✅ | — |
| Border radius | `2px` | `2px` | ✅ | — |
| Padding | `16px 0 0` | `16px 0 0` | ✅ | — |
| Box shadow | `0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.11)` | `none` | ❌ HIGH | MS Learn icon cards DO have the subtle shadow! We removed it but shouldn't have |
| Width | `518px` (in 3-col on 1649) | `363px` | ❌ | MS Learn cards are wider — they use the full container width |
| Height | `100px` | `82px` | ❌ | MS Learn cards are taller |

### CARD TITLE (Link)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Color | `rgb(15,108,189)` (#0f6cbd — primary!) | `rgb(224,224,224)` (#e0e0e0 — body text) | ❌ HIGH | MS Learn card titles are PRIMARY BLUE, not body text! We changed this wrong |
| Font size | `16px` | `16px` | ✅ | — |
| Font weight | `600` | `600` | ✅ | — |
| Text decoration | `none` | `none` | ✅ | — |

### CARD SUPERTITLE

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Color | `rgb(22,22,22)` (#161616 — body text) | `rgb(224,224,224)` (#e0e0e0 — dark body) | ✅ (both body) | — |
| Font size | `12px` | `12px` | ✅ | — |
| Text transform | `uppercase` | `uppercase` | ✅ | — |

### CARD ICON

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Width | `64px` | full width (361px!) | ❌ HIGH | Our icon container is not constrained — takes full card width |
| Height | `64px` | `64px` | ✅ | — |
| Type | `<img>` external SVG (colorful) | Inline SVG `currentColor` (monochrome) | ❌ MEDIUM | MS Learn uses actual colored icons (purple/orange gradients) |

### BOX CARDS (Product Directory)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Background | `rgb(255,255,255)` | `rgb(41,41,41)` | ✅ (dark equiv) | — |
| Border | `1px solid transparent` | `1px solid transparent` | ✅ | — |
| Border radius | `0px` | `0px` | ✅ | — |
| Box shadow | `0 1.6px 3.6px rgba(0,0,0,0.13)...` | Same | ✅ | — |
| Padding | `24px` | `24px` | ✅ | — |
| Width | `382px` (4-col) | `282px` (4-col narrower container) | ❌ | MS Learn uses full-width container |
| **Has icon** | YES — 48×48 `<img>` | NO | ❌ MEDIUM | MS Learn box cards have 48×48 icons above the title |

### BOX CARD TITLE

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Font size | `18px` | `16px` | ❌ | MS Learn is 18px, ours is 16px |
| Font weight | `600` | `600` | ✅ | — |

### SECTION HEADINGS (H2)

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Font size | `34px` (2.125rem) | `24px` (1.5rem) | ❌ HIGH | MS Learn h2 is much bigger |
| Font weight | `600` | `700` | ❌ | MS Learn is 600, ours is 700 (bold) |
| Line height | `44.2px` | (default) | ❌ | — |

### CONTAINERS & LAYOUT

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Main max-width | `none` (full) | `none` (full) | ✅ | — |
| Highlight container max-width | `calc(100% - 48px)` | `1200px` | ❌ HIGH | MS Learn is nearly full-width with 24px margins, NOT a fixed 1200px container |
| Highlight container padding | `24px 0` vert | `24px 32px` | ❌ | — |
| Product container max-width | `calc(100% - 48px)` | `1200px` | ❌ HIGH | Same issue |
| Product container padding | `48px 0` | `32px` | ❌ | MS Learn has more vertical padding |

### FOOTER

| Property | MS Learn | HVE Core | Match? | Fix |
|----------|---------|----------|--------|-----|
| Background | `rgb(232,230,223)` (#e8e6df) | (warm gray) | ✅ | — |
| Padding | `48px 24px` | (default) | ❌ | MS Learn has substantial footer padding |

## Priority Fix List

### 🔴 CRITICAL (Visually Wrong)

1. **Card titles should be PRIMARY BLUE** (`--ifm-color-primary`), not body text color — we changed this incorrectly in the last fix
2. **Icon cards need subtle shadow** — `box-shadow: rgba(0,0,0,0.13) 0px 1.6px 3.6px, rgba(0,0,0,0.11) 0px 0.3px 0.9px` — MS Learn cards ARE NOT flat
3. **Icon container width 64px** — currently taking full card width, must be `flex-shrink: 0; width: 64px`
4. **Container max-width should be `calc(100% - 48px)` NOT `1200px`** — MS Learn is nearly full-width with 24px side margins
5. **Section heading size 34px** — ours is only 24px, huge visual difference

### 🟡 HIGH (Noticeable)

6. **Hero title is 40px** not 44px, with 24px margin-bottom (not 8px)
7. **Hero subtitle is 16px** not 20px, no opacity (full white)
8. **Hero content max-width is 800px** (not 1200px) with padding `32px 48px 32px 0`
9. **Hero has 0 vertical padding** — all spacing from `.hero-content` internal padding
10. **Box card title is 18px** not 16px
11. **Section heading weight is 600** not 700
12. **Icon card background should be WHITE in light mode** (not gray `#f2f2f2`)

### 🟢 MEDIUM

13. Box cards need 48×48 icons (currently no icons)
14. MS Learn icons are colorful SVGs (purple/orange gradients), not monochrome `currentColor`
