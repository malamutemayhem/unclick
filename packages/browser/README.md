# UnClick Browser - B1 reader core

The reading-first, agent-native conversion core of the UnClick Browser (stage
**B1** of `docs/connectors/unclick-browser-plan.md`).

Turn any HTML page into a clean **UnClick Doc** (a closed vocabulary of ~12 core
blocks), then render that doc identically everywhere. The same UnClick Doc is
what an agent reads, so a single conversion serves both the human reader and the
agent. Speed and consistency come from the format, not from a heavy engine.

## Modules

- `src/format.ts` - the UnClick Doc types plus dependency-free validators.
- `src/convert.ts` - `htmlToUnclickDoc`: HTML -> UnClick Doc. Strips
  scripts/styles/head noise, keeps the semantic skeleton, caps image sizes.
- `src/render.ts` - `renderUnclickDoc`: UnClick Doc -> one consistent, themed,
  fully escaped HTML surface. Media stays external.
- `src/index.ts` - `renderHtml` convenience (HTML straight to clean HTML).

## Notes

Zero runtime dependencies; the converter ships its own small HTML tokenizer so
the reader stays lean and auditable. Tests live in `src/__tests__/` and run with
the repo's root `vitest` suite (`npm test`), including canaries that prove no
real values survive a capture and that page text cannot inject markup into the
render. This is a plain module folder, not an npm workspace, so it adds nothing
to the root lockfile. The native system-webview shell that wraps this core is
the next stage (see the build plan).