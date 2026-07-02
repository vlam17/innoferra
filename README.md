# Innoferra — Marketing Website

Single-page marketing site for [innoferra.ai](https://innoferra.ai). **Plain HTML +
CSS — no JavaScript, no build step, no dependencies.** Upload the files as-is and
GitHub Pages serves them directly.

## Files

```
index.html    — the whole site (all sections)
styles.css    — theme, layout, and all animations (pure CSS)
favicon.svg
assets/fonts/ — self-hosted Inter + Space Grotesk (no third-party requests)
CNAME         — custom domain (innoferra.ai) for GitHub Pages
.nojekyll     — tells GitHub Pages to serve files without Jekyll processing
```

## Contact

There is no contact form — the contact section shows a `mailto:` button
(`ir@innoferra.ai`) and the two office addresses. Nothing to configure.

## Deploying to GitHub Pages (drag-and-drop)

1. Create a **public** repository at github.com/new (check "Add a README" so the
   uploader works; this README will replace it).
2. **Add file → Upload files** → drag in everything in this folder
   (`index.html`, `styles.css`, `favicon.svg`, `assets`, `CNAME`, `.nojekyll`) →
   commit to `main`.
3. **Settings → Pages → Build and deployment → Source** = **Deploy from a branch**,
   branch `main`, folder `/ (root)`. No Actions workflow needed.

> While `CNAME` is present, GitHub serves the site only at `innoferra.ai`. To
> preview at `https://<username>.github.io/<repo>/` before DNS is ready, skip the
> `CNAME` file during upload and add it later.

## Custom domain (innoferra.ai)

1. At your DNS provider, add **A records** for the apex `innoferra.ai`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (optionally a CNAME record for `www` → `<username>.github.io`).
2. In **Settings → Pages**, set **Custom domain** = `innoferra.ai`, wait for the
   DNS check, then enable **Enforce HTTPS**.

## Design notes

- All asset paths are relative, so the site works at a project path
  (`github.io/repo/`) and at the custom domain without changes.
- Animations (energy beam, token streams, glow, hover states) are pure CSS.
  Scroll-triggered reveals use CSS scroll-driven animations where the browser
  supports them (Chrome/Edge); other browsers simply show content immediately.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- Works fully with JavaScript disabled — there is none.
