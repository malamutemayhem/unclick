# @unclick/browser

The reading-first, agent-native core of the UnClick Browser (stage **B1** of
`docs/connectors/unclick-browser-plan.md`).

It does one thing well: turn any HTML page into a clean **UnClick Doc** (a closed
vocabulary of ~12 core blocks), then render that doc identically everywhere. The
same UnClick Doc is what an agent reads, so a single conversion serves both the
human reader and the agent. Speed and consistency come from the format, not from
a heavy engine.

## API

```ts
import { htmlToUnclickDoc, renderUnclickDoc, renderHtml } from "@unclick/browser";

const doc = htmlToUnclickDoc(html, { url, maxImageWidth: 640 });
const page = renderUnclickDoc(doc, { theme: "dark" });

// or in one step:
const page2 = renderHtml(html, { theme: "light" });
```

- `htmlToUnclickDoc(html, opts)` - dependency-free HTML -> UnClick Doc. Strips
  scripts/styles/head noise, keeps the semantic skeleton, caps image sizes.
- `renderUnclickDoc(doc, opts)` - UnClick Doc -> one consistent, themed,
  reading-first HTML document. All text is escaped; media stays external.
- `renderHtml(html, opts)` - convenience: HTML straight to clean HTML.
- `isUnclickDoc` / `assertUnclickDoc` - structural validation, zero deps.

## Scope (B1)

This stage handles clean, reasonably well-formed article/document HTML. Messy
real-world extraction (the Tier-0 auto-convert path) runs a readability pass
upstream and then feeds this same block mapping. The native system-webview shell
(Tauri/WRY) wraps this core and is the next stage.

## Develop

```bash
cd packages/browser
npm install
npm test            # vitest
npm run build       # tsc -> dist
npm run build && npm run demo   # writes demo/out-*.html
```

No runtime dependencies. The converter ships its own small HTML tokenizer on
purpose, so the reader stays lean and auditable.
