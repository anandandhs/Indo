---
name: Indo
description: Workforce procurement and management for UK food production and retail — People Powering Business.
colors:
  night-shift-green: "#0c2e27"
  canopy-green: "#1e5a2b"
  line-green: "#2b7032"
  signal-lime: "#aed218"
  signal-lime-bright: "#c2e23c"
  ivory-floor: "#f6f4ee"
  warm-stone: "#e7e2d8"
  stone-rule: "#d6cfc2"
  paper: "#ffffff"
  ink: "#13261f"
  ink-soft: "#4b5a54"
  ink-faint: "#6b7872"
  on-dark-muted: "#c9dccb"
  on-dark-subtle: "#93a89b"
  rule-dark: "#2f4f47"
  error-red: "#a83226"
  error-soft: "#f7e9e5"
  lime-soft: "#eef4d6"
typography:
  display:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.5rem + 3.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline-1:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.86rem + 2.1vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  headline-2:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.675rem + 1.33vw, 2.875rem)"
    fontWeight: 800
    lineHeight: 1.07
    letterSpacing: "-0.028em"
  statement:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.39rem + 0.95vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline-3:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.018em"
  title-small:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.078rem + 0.19vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  stat:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.71vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "DM Sans, DM Sans Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.14rem + 0.19vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "DM Sans, DM Sans Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "DM Sans, DM Sans Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "DM Sans, DM Sans Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.4
  kicker:
    fontFamily: "Manrope, Manrope Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  none: "0px"
spacing:
  gutter-mobile: "1rem"
  gutter-tablet: "2rem"
  gutter-desktop: "3.5rem"
  container-max: "88rem"
  section-tight: "5rem"
  section-standard: "8rem"
  section-generous: "11rem"
components:
  button-primary:
    backgroundColor: "{colors.night-shift-green}"
    textColor: "{colors.ivory-floor}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.line-green}"
    textColor: "{colors.ivory-floor}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory-floor}"
  button-signal:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.night-shift-green}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-signal-hover:
    backgroundColor: "{colors.signal-lime-bright}"
    textColor: "{colors.night-shift-green}"
  button-ghost-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-floor}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-ghost-on-dark-hover:
    backgroundColor: "{colors.ivory-floor}"
    textColor: "{colors.night-shift-green}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  kicker-tag:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.night-shift-green}"
    typography: "{typography.kicker}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
---

# Design System: Indo

## Overview

**Creative North Star: "The Shift Floor"**

Indo's visual system borrows the logic of a well-run production floor: deep night-shift green for authority, an ivory working surface, and a single lime signal that marks where to act. Nothing is ornamental. Structure comes from bands of tone, hairline rules and a disciplined twelve-column grid, the way a site is organised by lanes and stations rather than decoration. The mood is established, practical and human: confident about years of operational experience, grounded in real food production and retail work, and warm toward the people who do it.

Photography carries the humanity. Real operatives on real lines, in hairnets and gloves, appear large and unframed, often bleeding to the viewport edge. Type carries the authority: Manrope at heavy weights with tight tracking for headlines, DM Sans for calm, readable running text. Colour is restrained; the deep green and ivory do most of the work, and lime is spent only where a visitor should look or act.

The system is flat by conviction. Corners are square, depth comes from tonal bands, and the few moving parts (a lime marker that slides on hover, a photograph that settles into place) answer a person's action or arrive once.

**Key Characteristics:**
- Deep green and ivory as the two dominant surfaces, with warm stone for secondary bands.
- One signal colour (lime), reserved for action, focus on dark surfaces and the specialism tag.
- Square corners everywhere; hairline rules and tonal bands instead of shadows and cards-on-cards.
- Heavy Manrope headlines with tight tracking; DM Sans body capped near 70 characters per line.
- Large, real, people-at-work photography; no illustrations, no stock handshakes.

## Colors

A deep green and ivory palette drawn directly from the Indo logo, with a single lime signal and solid green-tinted neutrals for text on dark surfaces.

### Primary
- **Night-Shift Green** (night-shift-green): the brand's deep green and the system's authority colour. Dark bands (experience stats, frozen-food specialism sections, footer), primary buttons, the text colour of every heading on light surfaces.
- **Signal Lime** (signal-lime): the brand lime. Calls to action on dark surfaces, the "Our specialism" tag, active navigation underline, the sliding marker in buttons, statistic figures, small square markers and focus outlines on dark surfaces. Signal Lime Bright (signal-lime-bright) is its hover state only.

### Secondary
- **Line Green** (line-green): the brand green (#38963e), darkened until it passes AA as text on ivory (5.5:1). Used for the second line of the hero headline, the Why Indo statements, text links, list markers and the primary button's hover.
- **Canopy Green** (canopy-green): a deeper brand green used only for the closing call-to-action panel, so it separates from the Night-Shift footer beneath it while keeping ivory text at 7.5:1.

### Neutral
- **Ivory Floor** (ivory-floor): the page canvas and the text colour on dark surfaces.
- **Warm Stone** (warm-stone): secondary bands (services, client relationships, alternate service sections) and the enquiry form panel.
- **Stone Rule** (stone-rule): hairline dividers and input borders on light surfaces; also the surface behind loading photographs.
- **Paper** (paper): raised surfaces only: form inputs, alert panels and hovered cards.
- **Ink** (ink), **Ink Soft** (ink-soft), **Ink Faint** (ink-faint): primary text, secondary text, and placeholder text (placeholders sit on Paper only, 4.6:1).
- **On-Dark Muted** (on-dark-muted), **On-Dark Subtle** (on-dark-subtle), **Rule Dark** (rule-dark): secondary text, tertiary text and outline-button borders, and hairlines on Night-Shift and Canopy surfaces.
- **Error Red** (error-red) with **Error Soft** (error-soft), and **Lime Soft** (lime-soft): error text and error panels, and the success panel.

### Named Rules
**The One Signal Rule.** Lime marks where to look or act: a call to action, the specialism tag, an active state, a focus ring on dark surfaces. It never fills large areas and never decorates.

**The Solid Ink Rule.** Text on dark green uses the solid On-Dark tokens, never translucent ivory. Contrast must not depend on what sits behind the text.

## Typography

**Display Font:** Manrope (with a size-matched Arial fallback)
**Body Font:** DM Sans (with a size-matched Arial fallback)

**Character:** Manrope at 700–800 gives headlines a solid, engineered confidence; DM Sans at 400 keeps running text open and calm. Both are geometric sans faces, so the pairing's contrast comes from weight and size rather than style.

### Hierarchy
- **Display** (800, 44px → 80px, 0.98): the home hero headline only.
- **Headline 1** (800, 38px → 60px, 1.03): page titles and the closing call-to-action statement.
- **Headline 2** (800, 32px → 46px, 1.07): section headings.
- **Statement** (800, 26px → 36px, 1.08): large-type list items that carry a section: Why Indo reasons, frozen product and role lists, other-industry links.
- **Headline 3** (700, 22px → 28px, 1.18): card titles, industry key points, the "value to you" line.
- **Title Small** (700, 18px → 20px, 1.3): process stages, definition terms, compact rows, form section titles.
- **Lead** (400, 19px → 21px, 1.55): the paragraph that follows a heading.
- **Body** (400, 17px, 1.6): running text, held to about 70 characters per line.
- **Small** (400, 15px, 1.6): card summaries, captions, footer links, form notes.
- **Label** (700 Manrope, 15px, 1.4): buttons, navigation (at 600), form labels, link calls to action.
- **Meta** (400, 14px, 1.5): breadcrumbs, helper text, the legal line.
- **Kicker** (700 Manrope, 13px, 1.3, sentence case): short tags that name what follows, such as "Our specialism" or "Step 2".
- **Stat** (800, 26px → 44px, 1.0): figures in the experience band.

### Named Rules
**The Step Rule.** Adjacent heading roles sit about 1.3× apart (80 → 60 → 46 → 36 → 28 → 20). Never introduce a size between two roles; pick the role.

**The Sentence Case Rule.** Headings and kickers are sentence case; button and link labels follow the brief's Title Case. Nothing is set in all caps.

## Layout

A twelve-column grid inside a container that caps at 88rem, with gutters of 16px on phones, 32px from 640px and 56px from 1280px. Compositions are asymmetric: headline columns take seven columns against a five-column photo or intro, and the home hero's photograph bleeds off the right edge of the viewport. Imagery that sits beside text alternates sides down a page.

Vertical rhythm uses three section tiers rather than one repeated interval: tight (64px → 80px) for a continuation of the section above, standard (88px → 128px) by default, and generous (112px → 176px) for the frozen-food specialism, where the story deserves room. Adjacent sections alternate between Ivory Floor, Warm Stone and Night-Shift Green bands, so a change of topic is also a change of surface.

On phones, content stacks in DOM order with the heading first; photography goes full width, the experience statistics stay two-up, and the enquiry form follows straight after the contact introduction. Grids reflow by content: long words break or hyphenate rather than widening the page at 200% text size.

### Named Rules
**The Heading-First Rule.** The DOM always leads with the heading and text; photography is placed beside it visually, never ahead of it in reading order.

## Elevation & Depth

The system is flat. Depth comes from tonal bands (Ivory Floor, Warm Stone, Night-Shift Green, Canopy Green) and from 1px hairlines in Stone Rule or Rule Dark, not from shadows. Cards and panels sit on the surface they belong to; a hovered card brightens to Paper rather than lifting. The single exception is an element that genuinely floats over a photograph, such as the hero's specialism card, which carries one soft, offset shadow tinted with Night-Shift Green.

### Shadow Vocabulary
- **Float over photo** (`box-shadow: 0 18px 40px -20px` in Night-Shift Green at 50%): only for a panel overlaid on photography.
- **Header rule** (`box-shadow: 0 1px 0` in Ink at 10%): the sticky header's bottom edge once the page scrolls.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest and stay flat on hover. A shadow is permitted only where an element physically overlaps a photograph.

## Shapes

Square corners throughout: buttons, inputs, cards, photographs, tags and panels all have a 0px radius. The only round forms are the circle in the Indo logo itself. Small solid squares act as the system's marks: list bullets (8px), the lime marker inside buttons (6px), label markers and the stepped progress bars in the About approach. Photographs are cropped to fixed aspect ratios (4:3, 3:4, 4:5, 21:9) and open with a horizontal clip reveal rather than a fade.

### Named Rules
**The Square Mark Rule.** Markers, bullets and indicators are solid squares in Signal Lime or Line Green. No circles, chevrons or icon-font glyphs stand in for them.

## Components

Squared, sturdy, unfussy: the controls read like industrial signage rather than app chrome.

### Buttons
- **Shape:** square corners (0px), 48px minimum height, 12px 24px padding, Label typography.
- **Primary:** Night-Shift Green fill with Ivory text; the default call to action on light surfaces.
- **Signal:** Signal Lime fill with Night-Shift text; the call to action on dark surfaces.
- **Secondary:** transparent with a 1px Ink border at 25%; fills with Ink on hover.
- **Ghost on dark:** transparent with an On-Dark Subtle border; fills with Ivory on hover.
- **Hover / Focus:** colour transitions over 300ms with an ease-out-quart curve; a 6px square marker after the label slides 4px right on hover; pressing nudges the button down 1px. Focus shows a 2px Line Green outline (Signal Lime on dark surfaces) offset by 3px.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** the surface they sit on (Ivory Floor or Warm Stone); hover brightens to Paper.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** grids of cards share 1px Stone Rule hairlines, drawn as the gap between tiles.
- **Internal Padding:** 28px–32px.
- **Service card:** a custom geometric icon, a Headline 3 title, a Small summary and a "How It Works" link; a 4px Signal Lime rule along the top grows from 18% to full width on hover.

### Inputs / Fields
- **Style:** Paper background, 1px Stone Rule border, square corners, 14px 16px padding, 16px text (never smaller, so iOS does not zoom on focus).
- **Focus:** border turns Night-Shift Green with a 2px Line Green ring.
- **Error:** border turns Error Red; the message appears beneath with a 6px Error Red square, and an error summary panel in Error Soft lists every problem as a link to its field.

### Navigation
- **Desktop:** Label typography at 600 in Ink Soft, Ink when active, with a 3px Signal Lime underline that scales in from the left. The primary call to action sits at the right.
- **Header:** sticky; Ivory Floor at rest, frosted Ivory with a hairline once the page scrolls.
- **Mobile:** a two-line toggle opens a full-height Night-Shift Green panel with Statement-sized links separated by Rule Dark hairlines, the active page in Signal Lime, and a full-width Signal button at the foot.

### Industry Card (signature)
A tall photograph (3:4) under a Night-Shift Green gradient that rises from the bottom, with an Ivory Headline 3 title, an On-Dark Muted summary and a Signal Lime link. The photograph zooms 5% over 1.4s on hover while the text panel lifts 6px. The frozen-food card carries the Signal Lime "Our specialism" kicker tag and sits offset downward in the three-card row.

### Experience Band (signature)
A Night-Shift Green band of four figures in Stat typography and Signal Lime, each over an On-Dark Muted Small label, divided by Rule Dark hairlines; four-up on desktop, two-up on phones.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px) on buttons, fields, cards, tags and photographs.
- **Do** build depth from tonal bands (Ivory Floor, Warm Stone, Night-Shift Green) and 1px hairlines.
- **Do** spend Signal Lime only on calls to action, active and focus states, the specialism tag and small square markers.
- **Do** use the named type roles and section tiers; when a size seems missing, choose the nearest role.
- **Do** use real photography of people at work in food production and retail, shown large and cropped to the system's aspect ratios.
- **Do** use the solid On-Dark tokens for any text on Night-Shift or Canopy Green.

### Don't:
- **Don't** round corners or add card shadows; the only shadow is for a panel floating over a photograph.
- **Don't** fill large areas with Signal Lime or use it as decoration.
- **Don't** use translucent ivory for text on dark surfaces.
- **Don't** set labels or headings in all caps, or place a small label above a heading.
- **Don't** use illustrations, AI-generated business graphics, handshake or conference-table stock photography.
- **Don't** let running text exceed about 70 characters per line.
