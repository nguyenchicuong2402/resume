# Resume

Personal resume stored in the open [JSON Resume](https://jsonresume.org/) format and rendered with the Art School Modern theme.

## Requirements

- Node.js 24 or newer
- Corepack enabled (`corepack enable`)
- Playwright Chromium for PDF export (`pnpm exec playwright install chromium`)

The project pins pnpm through the `packageManager` field, so no global `resume-cli` installation is required.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server watches `resume.json` and serves the rendered resume at <http://localhost:4000>.

## Validation and builds

```bash
pnpm validate
pnpm build:html
pnpm build:pdf
pnpm check
```

Generated files are written to `dist/` and are not committed. HTML builds need no browser; PDF builds use the Playwright-managed Chromium installation.

## Source of truth

- `resume.json`: resume content following the canonical JSON Resume schema
- `override.css`: small print-layout adjustments layered on top of the upstream theme
- `images/avatar.jpg`: local profile image asset
- `package.json`: pinned toolchain and repeatable project commands
- `tools/build-pdf.mjs`: browser-based PDF export that inlines the print overrides

The installed `jsonresume-theme-art-school-modern` package owns rendering, while `resuml` provides validation, local preview, and exports. This repository intentionally does not maintain a fork of the theme.

## Nx workspace integration

This project can be moved into an Nx workspace as a lightweight tooling project. Keep `resume.json` and the image under a dedicated project root, add explicit `validate`, `build`, and `serve` targets, and let the workspace root own pnpm and the lockfile. Do not copy this standalone `packageManager` field or lockfile into the monorepo.
