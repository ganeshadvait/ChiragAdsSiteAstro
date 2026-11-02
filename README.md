# Chirag Global Hospitals – Ads Site (Astro)

Astro port of the Next.js site at https://github.com/ganeshadvait/chirag.
Pure Astro: no React or other UI framework.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output for Vercel in .vercel/output
npm run check    # type-check .astro and .ts files
```

## Structure

```
public/                    images, videos, icons (unchanged from the Next.js site)
src/
  pages/                   one .astro file per route (same URLs as before)
    api/leads/submit.ts    lead form proxy → api.advaitlabs.com
  layouts/BaseLayout.astro <head>, GTM, Google Translate bootstrap, DM Sans font, global CSS
  components/              all UI as .astro components
  data/doctorsdata.ts      doctor profiles
  constants/contact.ts     per-page phone number rules, WhatsApp URL
  lib/Image.astro          <img> helper with `fill` / `priority` (ex next/image)
  lib/loopSlider.ts        shared infinite-loop swipe slider (treatment options, pediatric conditions)
  lib/utils.ts             cn() class merging (used by the reviews carousel)
  styles/globals.css       Tailwind v4 + site styles
```

## How it works

- Pages are prerendered to static HTML by default. Ad landing routes with a
  `[slug]` segment (e.g. `/piles/<anything>`), the doctor department/profile
  routes and the leads API are server-rendered (`export const prerender = false`)
  so any slug works. Per-slug overrides (phone, hero, FAQs) live in each page's
  `contentMap`.
- The page phone number is resolved on the server with
  `getPhoneForPath(Astro.url.pathname)`.
- Interactive components (forms, popups, FAQs, sliders, read-more, language
  switcher) render their initial state as HTML and add behaviour with a
  component `<script>`. Scripts find their component by a `data-*` attribute
  and initialise every instance, because a component can appear more than once
  on a page (e.g. the sidebar form is rendered for desktop and mobile).
- `ContactCta.astro` renders a WhatsApp link; on mobile its script switches it
  to `tel:` with the page phone number.

## Deployment

Configured for Vercel via `@astrojs/vercel`. To self-host on Node instead,
install `@astrojs/node` and swap the adapter in `astro.config.mjs`.
