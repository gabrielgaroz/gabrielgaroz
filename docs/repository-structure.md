# Repository structure

This repository contains the source for `gabrielgaroz.com`, an Astro site built
as static HTML, CSS, and JavaScript and deployed through GitHub Pages.

The structure keeps content, presentation, page composition, analytics, and
deployment separate so each can evolve without requiring unrelated changes.

## Directory map

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Builds and deploys main to GitHub Pages
├── docs/
│   ├── development.md          # Local setup, checks, analytics, and deployment
│   └── repository-structure.md # Architecture and ownership of repository files
├── public/
│   ├── assets/                 # Images and other files served without processing
│   ├── CNAME                   # GitHub Pages custom domain
│   ├── favicon.svg             # Browser icon
│   └── robots.txt              # Search-crawler directives
├── src/
│   ├── components/             # Reusable page and behavior components
│   ├── data/                   # Typed content and profile configuration
│   ├── layouts/                # Shared HTML document shell and metadata
│   ├── lib/                    # Provider-independent browser utilities
│   ├── pages/                  # File-based routes
│   └── styles/                 # Site-wide design tokens and CSS
├── .env.example                # Example local analytics configuration
├── .node-version               # Exact Node.js version used locally and in CI
├── astro.config.mjs            # Site URL, base path, and static output settings
├── package.json                # Dependencies, Node requirement, and npm scripts
├── package-lock.json           # Reproducible dependency versions
└── tsconfig.json               # Strict TypeScript configuration
```

Generated directories such as `node_modules/`, `.astro/`, and `dist/` are not
committed. Local `.env` files are also ignored.

## Application flow

The home page is assembled in this order:

```text
src/pages/index.astro
  └── src/layouts/BaseLayout.astro
      ├── document metadata and structured data
      ├── src/components/ProfileCard.astro
      │   └── content from src/data/profile.ts
      ├── src/styles/global.css
      └── src/components/Analytics.astro
          └── src/lib/analytics.ts
```

`src/pages/index.astro` is the route entry point. It supplies page-specific SEO
text, selects the shared layout, and composes the profile component.

`src/layouts/BaseLayout.astro` owns the common HTML document, canonical URL,
Open Graph and Twitter metadata, JSON-LD person data, favicon, global stylesheet,
and analytics loader.

`src/components/ProfileCard.astro` renders the visible profile interface. It
receives typed data instead of embedding biography and link content directly.

`src/data/profile.ts` is the source of truth for the name, role, biography,
portrait, primary action, and social links. Its TypeScript interfaces make
unsupported or incomplete content changes fail during checks.

## Styling

`src/styles/global.css` contains the current visual system and component styles.
The palette is expressed as custom properties near the top of the file:

- Anor Gold: `#d6a62e`
- Wizard Blue: `#26384a`
- Valinor Parchment: `#f2ebdd`

New shared design tokens belong there. Styles that become specific to a large,
self-contained component can later move into that component's Astro file.

## Static assets

Files under `public/` are copied to the deployment root without bundling or
fingerprinting. Use this directory for stable public assets such as portraits,
favicons, downloadable files, and crawler configuration.

Astro processes source code under `src/` and writes the production result to
`dist/`. Nothing in `dist/` should be edited manually.

## Analytics boundary

`src/components/Analytics.astro` decides whether analytics should load. It loads
only in production when `PUBLIC_POSTHOG_KEY` is available.

`src/lib/analytics.ts` owns provider initialization and the site's typed event
API. Components declare events with `data-analytics-*` attributes and do not call
PostHog directly. Keeping that boundary makes it possible to change providers or
add another destination without rewriting the interface components.

## Deployment flow

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. GitHub checks out the repository.
2. an exact Node.js and npm toolchain is installed;
3. lifecycle-script-free `npm ci` restores the locked dependency graph;
4. Astro type-checks and builds the static site;
5. the generated artifact is uploaded;
6. GitHub Pages deploys it to `gabrielgaroz.com`.

The workflow reads `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST` from GitHub
Actions repository variables. Public browser configuration belongs in those
variables; secrets and private API keys must never use an Astro `PUBLIC_` name.

## Where future changes belong

- Edit personal content or social links in `src/data/profile.ts`.
- Add a route by creating a file such as `src/pages/projects.astro`.
- Add reusable interface sections under `src/components/`.
- Put shared page chrome and metadata behavior under `src/layouts/`.
- Add global tokens and shared styling to `src/styles/global.css`.
- Put browser-side integrations behind a module in `src/lib/`.
- Put stable, directly served files under `public/`.
- Change hosting automation only in `.github/workflows/` and the relevant Astro
  configuration.

Astro renders components to static HTML by default. Add client-side JavaScript or
a UI framework integration only for features that require browser state. If the
site later requires server rendering, authentication, or backend APIs, the same
source structure can remain while the Astro output mode and hosting adapter are
changed.
