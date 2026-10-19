# Gabriel Garoz — professional website

Source for [gabrielgaroz.com](https://gabrielgaroz.com/), an informational
professional profile covering software engineering and architecture, AI and
automation, websites and applications, and cloud and platform engineering.

The site uses Astro and TypeScript to generate static HTML, CSS, and JavaScript.
GitHub Actions builds and deploys it to GitHub Pages.

## Languages

| Language | Route | Live page |
| --- | --- | --- |
| English (default) | `/` | [English](https://gabrielgaroz.com/) |
| Spanish | `/es/` | [Español](https://gabrielgaroz.com/es/) |

English is always the default regardless of location or browser language.
Visitors can choose Spanish through the **English / Español** links. Language
switching works without JavaScript and does not save a preference or redirect
visitors automatically. Both pages include localized metadata and reciprocal
language-alternate links.

## Develop locally

Use the Node.js version in `.node-version` and the npm version pinned in
`package.json`, then run:

```sh
npm ci --ignore-scripts
npm run dev
```

Open the local URL printed by Astro. To check and preview the production build:

```sh
npm run check
npm run build
npm run preview
```

The generated site is written to `dist/`, which is not committed.

## Where to make changes

- **English profile and shared identity/contact details:** `src/data/profile.ts`.
- **Spanish profile, interface labels, and metadata:** `src/data/localization.ts`.
- **Page composition and language navigation:** `src/components/`.
- **Document metadata and structured data:** `src/layouts/BaseLayout.astro`.
- **Design tokens and responsive styles:** `src/styles/global.css`.
- **Portrait, favicon, and other static files:** `public/`.

Update both translations when changing profile content. Keep analytics provider
code in `src/lib/analytics.ts`; production analytics loads only when its public
project configuration is supplied.

## Documentation

- [Repository structure](docs/repository-structure.md): directory map,
  rendering flow, responsibilities, and extension points.
- [Development guide](docs/development.md): toolchain, local checks, language
  behavior, analytics setup, deployment, and supply-chain controls.

## Deployment

Pull requests targeting `main` run the checks and build, without deploying.
Merging to `main` triggers the GitHub Pages production deployment through
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Feature branches do not have hosted preview URLs; use the local development or
production preview server to review changes before merging.

<p align="center"><span style="color:white">──────────────────────────────────</span></p>
<p align="center"><i><span style="color:white">"All we have to decide is what to do with the time that is given us."</span></i></p>
<p align="center"><span style="color:white">──────────────────────────────────</span></p>
