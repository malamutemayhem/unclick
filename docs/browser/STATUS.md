# UnClick Browser lane - live status

Last updated: 2026-07-02 (v0.7.0 pushed on `claude/unclick-browser-app`, PR #1594)

## What ships today

- Windows installer, built by `.github/workflows/build-browser-app.yml`, published
  to the `browser-app-latest` release as `UnClick-Browser-Setup.exe` with a signed
  `latest.json`. Installed copies auto-update silently on launch.
- Website download button (`src/pages/UnClickBrowser.tsx`) points straight at the
  installer.

## App state (v0.7.0)

- Zen reading engine (`apps/unclick-browser/web/baskets/`): article bodies, card
  grids, heroes, carousels, tables, content lists, masthead-with-nav, footers,
  ad/sponsored filtering, ranked lists, wiki-style interleaved bodies, SPA
  metadata synthesis. Verified against 18 archetype fixtures.
- Shell: tabs, reading list (Ctrl+D), history + address suggestions, session
  restore, find-in-page (Ctrl+F), zoom, persistent theme, load watchdog with
  Esc-to-stop, per-image size caps (`image_sizes` HEAD probe).
- JS-rendered sites: `render_url` loads the page once in a hidden webview and
  feeds Zen the rendered DOM (12s cap, window always destroyed, remote IPC
  limited to the snapshot event via `src-tauri/capabilities/render.json`).
- Interactive pages (captcha/login/web apps) get the "Open in your browser"
  panel backed by the `open_external` command.

## How to prove changes

- Engine: run the block-tree harness against the fixtures in a checkout with
  chromium available, or `node apps/unclick-browser/eval/harness.mjs` with
  `UCB_FOUNDATION_DIR=web/baskets` and jsdom installed.
- Shell: headless chromium smoke of `web/index.html` with a stubbed
  `window.__TAURI__.core.invoke` (fetch_url/render_url/image_sizes).
- Rust: compile-proven only by the Windows CI build; there is no local Tauri
  runtime in the worker containers.

## Open loops

- Stage 3 render pass needs real-user validation on Windows (hidden window
  behavior, JS-heavy news sites, memory on repeated renders).
- Wiki-style pages: the page H1 outside the content container is still dropped
  (masthead carries the site name; section headings survive).
- The eval harness fixtures under `apps/unclick-browser/eval/` predate the
  current engine; the richer archetype fixtures live in worker scratch space
  and should be committed here in a follow-up.
- Mac/Linux builds not started (website copy says "coming soon").
- Browser extension (`packages/browser-extension`) is a separate lane: read-only
  shape capture, consent boundary work not yet approved.
