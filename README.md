# WebExplore

**Explore. Discover. Connect.** A local-first website discovery library with 1,057 curated directory records across 12 categories.

## Run it

The application is built with plain HTML, CSS and JavaScript so it can be opened directly without Node.js, npm, a server, API keys or a backend:

1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Start exploring.

All core directory features work offline after the files are extracted. Website visits, remote favicons and the optional Inter web font require an Internet connection. If your browser restricts local file behavior, run `python -m http.server 4173` from the project folder and open `http://localhost:4173` (optional).

## Features

- 1,057 directory entries across all 12 categories.
- Homepage, category browser, all websites, featured and curated trending views.
- Search by name, domain, description, category and tags; Ctrl/Cmd+K shortcut.
- Category, pricing and platform filters; sorting and result counts.
- Website details, external links and related entries.
- Favorites, saved websites, recently viewed and custom collections.
- Side-by-side comparison for up to three websites.
- Light, dark and system theme settings, plus a subtle animated ambient background that respects reduced-motion preferences.
- Personal-data export/import in the dedicated `.webexre` format (JSON-based and backward-compatible with earlier `.json` backups), clear history and reset controls.
- Responsive desktop, tablet and mobile layouts with larger, clearer text and 44px touch targets.
- High-contrast dark theme with coordinated dark surfaces, readable text, borders, focus states and controls; system theme follows the device setting.
- Safer local storage handling, corrected list/collection pagination, real tag filtering and improved backup restoration.
- Original supplied SVG artwork copied unchanged to `public/logo.svg` and `public/favicon.svg`.

## Data notes

`src/data/websites.json` is the editable source dataset. `src/data/websites.js` is its browser-loadable mirror, included so the site runs from `file://` without `fetch()` or ES modules. If you edit the JSON dataset, regenerate the `window.WEBSITES` mirror in `src/data/websites.js` so direct `file://` use remains supported. Pricing is deliberately marked `unknown` unless supported by a verified dataset value. Entries are labeled `unverified`; the site does not claim live verification. Descriptions are conservative category-level summaries rather than detailed live product claims.

## Validation

Run `node scripts/validate.js` to check unique IDs, unique official hostnames, URL shape, category coverage and required fields. Run `npm test` to execute the data validation and dependency-free interaction smoke tests. Run `npm run build` to validate and create a deployable `dist/` folder. No package installation is required for these optional checks.

## Production build and deploy (Vercel)

This project includes `vercel.json` with an explicit static build configuration. In Vercel, import the repository and set **Root Directory** to the folder that contains `index.html`, `package.json`, `scripts/` and `src/`. Leave the framework as **Other** (or let `vercel.json` control the build), use `npm run build` as the build command and `dist` as the output directory. The included build script copies `index.html`, `public/` and `src/` into `dist/`. Do not set the output directory to `public` because the application entrypoint is `index.html` at the project root.

For a manual static upload, upload the contents of `dist/` (not the source folder nested one level deeper). For local use, keep opening the root `index.html` directly; no build step is needed. No environment variables or backend are needed.

## Backup format

The **Export .webexre** action downloads `webexplore-backup.webexre`. The file contains JSON data with the existing WebExplore backup format identifier so it can be validated and restored by the app. Import accepts `.webexre` and legacy `.json` backup files. Keep backup files private because they may contain your saved websites and browsing history.

## Privacy

Favorites, saved websites, history, collections and preferences are stored in browser LocalStorage. No account or WebExplore backend is used. External websites, favicon services and the optional Google Fonts request are governed by their own policies.
