# Innoferra — Marketing Website

Single-page marketing site for [innoferra.ai](https://innoferra.ai), built with
[Astro](https://astro.build) + Tailwind CSS. Fully static — no server runtime, no
database — and deploys to GitHub Pages via GitHub Actions.

## Local development

Requires Node.js ≥ 22.12.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build into ./dist
npm run preview   # serve the production build locally
```

## Before launch — one placeholder to fill in

In [`src/components/Contact.astro`](src/components/Contact.astro) (top of the file):

| Placeholder | Replace with |
|---|---|
| `FORM_ENDPOINT` | Your Formspree form URL, e.g. `https://formspree.io/f/abcdwxyz` |

The public contact email is set to `ir@innoferra.ai` (same file), and is shown
both as a visible mailto link and as the fallback address in the form's error
state.

### Setting up the contact form (Formspree, free tier)

1. Create an account at [formspree.io](https://formspree.io) and click **New form**.
2. Set the form's email to wherever submissions should be delivered.
3. Copy the form's endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
4. Paste it as the `FORM_ENDPOINT` value in `src/components/Contact.astro`.

The form posts name, email, company, and message. It includes a honeypot field
(`_gotcha`) that Formspree uses to silently drop spam-bot submissions. With
JavaScript enabled, submissions go via `fetch` with inline success/error states;
with JavaScript disabled, the form falls back to a normal POST and Formspree
shows its hosted confirmation page.

## Deploying to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually) — `.github/workflows/deploy.yml`
   builds the site and publishes it.

The workflow uses `withastro/action`, which automatically sets the correct `site`
and `base` for the repository — so the site works both at
`https://<username>.github.io/<repo-name>/` and, later, at the custom domain.
No config change is needed when moving between the two.

> **Note:** `public/CNAME` contains `innoferra.ai`. While that file is present,
> GitHub Pages will try to serve the site at the custom domain. If you want to
> test at `https://<username>.github.io/<repo-name>/` **before** DNS is set up,
> delete `public/CNAME`, deploy, and restore it when you're ready to go live.

## Custom domain (innoferra.ai)

1. Keep `public/CNAME` (containing exactly `innoferra.ai`) in the repo — it is
   copied into every build so the custom domain survives redeploys.
2. At your DNS provider, add:
   - **A records** for the apex `innoferra.ai` pointing to GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - *(optional)* a **CNAME record** for `www.innoferra.ai` →
     `<username>.github.io`
3. In **Settings → Pages**, enter `innoferra.ai` under **Custom domain** and
   wait for the DNS check to pass.
4. Enable **Enforce HTTPS** once GitHub has provisioned the certificate
   (usually within an hour).

## Project structure

```
src/
  layouts/Base.astro         # <head>, meta/OG tags, skip link, reveal + parallax scripts
  pages/index.astro          # single page composing all sections
  components/
    Nav.astro                # fixed nav + mobile menu
    Hero.astro               # value prop + primary CTA
    Stack.astro              # animated 4-layer platform diagram (power → tokens)
    Services.astro           # GPU Cloud + AI Token Factory offerings
    CtaBand.astro            # mid-page conversion band
    Technology.astro         # animated token-flow diagram + technology story
    Team.astro               # collective team pedigree
    Contact.astro            # form (Formspree) + mailto + offices  ← placeholders here
    Footer.astro
  styles/global.css          # Tailwind theme tokens + animation keyframes
public/
  CNAME                      # custom domain for GitHub Pages
  favicon.svg
.github/workflows/deploy.yml # build + publish to GitHub Pages
```

## Accessibility & performance notes

- All motion (scroll reveals, diagram animations, parallax) is disabled under
  `prefers-reduced-motion: reduce`.
- Scroll-reveal hiding only applies when JavaScript runs, so content is fully
  visible with JavaScript disabled.
- Fonts are self-hosted (Fontsource) — no third-party requests at runtime.
- Diagrams are inline SVG/CSS (no image downloads, no animation library).
