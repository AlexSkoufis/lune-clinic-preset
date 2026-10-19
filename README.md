# Lune — Dental & Aesthetic Clinic Preset

A light, friendly homepage for a **fictional** dental and aesthetic clinic in Kifisia, Athens. Soft white paper, pale mint and blush surfaces, one coral accent; Bricolage Grotesque + Figtree. The smiles are drawn in code and the team are monogram cards, so there are no stock faces anywhere.

Next.js 15 (static export) · GSAP 3 + ScrollTrigger · Lenis · plain CSS. No UI libraries.

```bash
npm install
npm run dev       # dev output goes to .next-dev, so builds never disturb a running dev server
npm run build     # static site in ./out — upload anywhere
npm run images    # rebuild responsive AVIF/WebP after changing photos in assets-src/
```

## Signature pieces

| Section | What it does |
|---|---|
| Hero | A smile drawn in SVG straightens and brightens as the page loads. A "next available" chip is worked out from the opening hours in the clinic's own time zone. |
| Statement | The clinic's promise brightens word by word with scroll, with the key phrases in coral, then four figures count up. |
| Treatments | A price list with Dental / Aesthetic tabs. Each row opens to show the detail, duration, number of visits and a Book button. |
| Treatment finder | Three questions score the treatments and recommend a first appointment, which can be booked in one tap. |
| Before / after | The same SVG smile, driven by a slider: whitening changes the shade (with a live shade-guide readout), aligners straighten, veneers even out the shape. A native range input, so it works with touch and arrow keys. |
| Cost estimator | Tick treatments, pick a payment plan (in full, 6, 12 or 24 months) and the total and monthly amount count to their new values. |
| Team | Monogram cards with role, focus and languages. |
| Clinic | Photo mosaic, opening hours with today marked, a live open/closed line and an emergency card. |
| Booking | Reason → clinician → day and time (some slots taken) → comforts and details, with a live summary. Any Book button on the page opens it with the treatment already chosen. Demo only. |
| Reviews & FAQ | Review cards and an accordion of the questions patients ask. |

## Re-skin

- **Copy & data** — `lib/content.ts`: clinic details, navigation, hero, statement, stats, treatments and prices, finder questions, before/after cases, payment plans, team, opening hours, booking slots, comforts, reviews, FAQ, footer.
- **Photos** — drop `<key>.jpg` into `assets-src/`, add the key to `ImageKey`, run `npm run images`. Credits in `assets-src/CREDITS.md`.
- **Colour** — tokens at the top of `app/globals.css` (`--paper`, `--mint`, `--blush`, `--coral`, `--ink`, radius `--r`).
- **Type** — `app/layout.tsx`.
- **Team photos** — `components/Team.tsx` uses monograms; swap `.person__mono` for an `<Img>` to use portraits.
- **The smile** — `components/Smile.tsx`. Tooth sizes and how crooked each starts are in the `TEETH` table.

## Connecting the booking form

`components/Booking.tsx` collects everything in state and does nothing on submit. Send it to your booking system or an email service in the `submit` function. Availability comes from `bookingDays()` in `lib/schedule.ts`, where "taken" slots are simulated: replace that with your real availability.

## Accessibility & motion

`prefers-reduced-motion` turns off smoothing, entrance animations, the hero sequence and the counting figures (final values are shown). Tabs, accordions, the finder, the slider, the estimator and the booking steps are all real buttons and inputs with visible focus.

## Important

Lune, its team, prices, figures and reviews are fictional. Nothing on the page is medical advice. The regulatory line in the footer is a placeholder: a real clinic must replace it with its licence and registration details, and should have its claims, prices and finance wording checked against the rules that apply to it.
