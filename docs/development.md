# Site development

This site is built with Astro and deployed as static files to GitHub Pages.

## Local development

Requirements: Node.js 22.12 or newer.

```sh
npm install
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

## Analytics

PostHog is loaded only in production builds that define `PUBLIC_POSTHOG_KEY`.
Local development therefore does not send test traffic by default.

The initial configuration is privacy-conscious and cookieless. It records page
views, page leaves, and the explicitly named `contact_clicked` and
`social_link_clicked` events. Autocapture, person profiles, session recording,
surveys, heatmaps, performance collection, and automatic exception capture are
disabled.

To activate analytics:

1. Create a PostHog Cloud project in the US or EU region.
2. In the PostHog project settings, enable cookieless web analytics. PostHog
   discards cookieless events unless this project setting is enabled.
3. Copy the project token and ingestion host from the PostHog web snippet.
4. In the GitHub repository, open **Settings → Secrets and variables → Actions →
   Variables** and add `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST`.
5. Run the deployment workflow, then confirm a visit appears in PostHog's live
   events view.

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

The custom domain is declared in `public/CNAME` and in `astro.config.mjs`. GitHub Pages must use **GitHub Actions** as its deployment source, and the domain's DNS records must point to GitHub Pages before HTTPS can be enabled.
