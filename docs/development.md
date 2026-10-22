# Site development

This site is built with Astro and deployed as static files to GitHub Pages.

## Local development

The build toolchain is pinned to Node.js 26.8.2 and npm 11.19.1. Use a version
manager that reads `.node-version`, then install exactly what is recorded in the
lockfile:

```sh
npm ci --ignore-scripts
npm run dev
```

Astro starts a local development server and prints its URL.

## Quality checks

```sh
npm run check
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Languages

English is always served at `/`; Spanish is available at `/es/`. Visitors choose
the language through the **English / Español** navigation. Both pages are
prerendered HTML and the switch works without JavaScript. The site does not use
browser language, location, cookies, or saved preferences to redirect visitors.
Returning to `/` always shows English.

Astro's built-in i18n configuration sets `en` as the unprefixed default locale.
Language links are generated with `astro:i18n` so they also respect an optional
`ASTRO_SITE_BASE_PATH`. Trailing slashes match GitHub Pages directory URLs.

The English profile content lives in `src/data/profile.ts`. Spanish content,
translated interface labels, and metadata for both languages live in
`src/data/localization.ts`. Both routes render the same `ProfilePage` and
`ProfileCard` components. Update both translations when changing profile copy.

Each page has its own `lang`, canonical URL, translated metadata and structured
data, reciprocal `hreflang` links for `en` and `es`, and an `x-default` link to
English. Language names appear in their own languages, and the active language
is identified with `aria-current="page"`.

When validating changes, check both routes, use the switch in both directions,
and confirm that requesting `/` with a Spanish `Accept-Language` header still
returns English. Check `dist/index.html` and `dist/es/index.html` after building.

## Mobile rendering

Page backgrounds and the decorative grid scroll with the document instead of
remaining fixed to the viewport. This avoids mixing fixed and scrolling
background layers during native scrolling.

At widths up to `48rem`, and on devices whose primary pointer is coarse and
cannot hover, the masked grid and large card shadow are disabled to further
reduce painting work. Desktop pointer devices above this breakpoint retain the
grid and shadow. These rules apply to both languages through the shared stylesheet.

Keep scrolling native: avoid adding JavaScript scroll handlers or restoring
fixed backgrounds to the mobile rules. When changing decorative effects, check
both languages at phone, tablet, and desktop widths, including the longer
Spanish page, and inspect scrolling on a physical mobile device when available.

## Analytics

PostHog is loaded only in production builds that define `PUBLIC_POSTHOG_KEY`.
Local development therefore does not send test traffic by default.

The initial configuration is privacy-conscious and cookieless. With the matching
project settings enabled, it records `$pageview`, `$pageleave`, `$web_vitals`,
and the `contact_clicked` event from the primary LinkedIn and secondary email
actions, distinguished by their destination and placement. The analytics module
also reserves `social_link_clicked` for future social links. Autocapture,
person profiles, session recording, surveys, heatmaps, and automatic exception
capture are disabled.

Web vitals capture is controlled remotely by the PostHog project setting. Do not
set `capture_performance: false` in `src/lib/analytics.ts`; that client-side
override also disables `$web_vitals`, regardless of the project setting. Regular
autocapture can remain disabled because web vitals autocapture is independent.

To activate analytics:

1. Create a PostHog Cloud project in the US or EU region.
2. In the PostHog project settings, enable cookieless web analytics. PostHog
   discards cookieless events unless this project setting is enabled.
3. In the PostHog Web analytics settings, enable web vitals autocapture for CLS,
   FCP, LCP, and INP.
4. Copy the project token and ingestion host from the PostHog web snippet.
5. In the GitHub repository, open **Settings → Secrets and variables → Actions →
   Variables** and add `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST`.
6. Run the deployment workflow, then open the production site and confirm
   `$pageview` and `$web_vitals` appear in PostHog's live events view. Web vitals
   are flushed after a short delay, and INP requires an interaction such as a
   click or tap.

For a local production-mode verification, copy `.env.example` to `.env`, replace
the example values, then run:

```sh
npm run build
npm run preview
```

The project token is embedded in browser code by design; never put a PostHog
personal API key in a `PUBLIC_` variable.

All application code sends events through `src/lib/analytics.ts`. Keep provider
calls there so PostHog can be replaced or supplemented without rewriting site
components.

## Project structure

See [Repository structure](repository-structure.md) for the complete directory
map, application flow, ownership boundaries, and extension points.

Add a file such as `src/pages/projects.astro` to create a new route. Interactive components can be added using Astro components or a UI framework integration when a feature genuinely needs client-side state.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`. The workflow builds the Astro project and deploys the generated static artifact to GitHub Pages.

Pull requests targeting `main` run the same toolchain verification, checks, and
build, and upload the resulting Pages artifact. The deploy job is skipped for
pull requests. Feature-branch pushes do not publish hosted previews; use the
local development or production preview server before merging. The merged
`main` commit is built again and deployed by its own workflow run.

The custom domain is declared in `public/CNAME` and in `astro.config.mjs`. GitHub Pages must use **GitHub Actions** as its deployment source, and the domain's DNS records must point to GitHub Pages before HTTPS can be enabled.

## Reproducibility and supply-chain controls

- Direct npm dependencies use exact versions, and all transitive packages are
  fixed by `package-lock.json` with registry integrity hashes.
- CI installs with `npm ci --ignore-scripts`; it cannot update the lockfile and
  does not execute dependency lifecycle scripts.
- Node.js, npm, and the Ubuntu runner family are explicit rather than floating.
- Every GitHub Action is pinned to a full commit SHA. The adjacent version
  comment is informational and must not replace the SHA.
- Build and deploy jobs receive separate minimum permissions. The build job
  cannot deploy, and checkout does not retain credentials.

Updates are intentional changes: update the exact version and lockfile together,
review the diff, run the quality checks, and commit both. GitHub-hosted runner
images and the two repository analytics variables remain external build inputs;
they cannot be made immutable from within this repository.
