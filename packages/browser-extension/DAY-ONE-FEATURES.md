# Day-one features (Phase 7.0+)

The passive discovery sensor is invisible on its own, so the extension also ships explicit,
user-initiated features that are useful immediately and that lean on the existing UnClick platform.
All four stay on the safe side of the consent boundary: they are user-clicked reads and saves, not
autonomous acting-as-you.

See `docs/connectors/browser-extension-starter-plan.md` for the full plan.

## 1. Redaction preview

Prove the trust contract by letting the user see it. `src/redaction-report.ts` produces a
**value-free** report of what stripping did to an exchange: which names were kept (query params,
header names, body field paths), whether the path was templated, and how many values were dropped.
The report itself contains no captured values (there is a canary test for this). The panel exposes a
"Redaction preview (try it)" box where a user pastes a URL and sees the kept names and dropped-value
count, computed entirely on device.

## 2. Save to Memory

Surface the Memory half of UnClick from any page. `src/memory.ts` builds the `save_fact` MCP call
and the HTTP request (the API key goes only in the Authorization header; there is a test asserting it
never appears in the body). Wired two ways: a right-click context menu ("Save selection / page to
UnClick Memory") and a "Save this page to Memory" button in the panel. The key is stored locally via
the options page and sent only to the configured UnClick endpoint over HTTPS.

## 3. Connection + signals status

`src/status.ts` summarizes the user's connections (connected vs needs-attention) and unread signals
into a compact toolbar badge and a status line in the panel. The summarizers tolerate response shape
drift, so a changed API response degrades gracefully rather than breaking. The badge shows the signal
count (capped at 99+), or a "!" when a connection needs attention.

## 4. Learn-this-site + coverage

`src/coverage.ts` gives honest counts (endpoints, reads, writes) for a host rather than a fake
completeness percentage, and decides when to offer to learn a new site: only when the site has no
clean OAuth connector, has not already been learned, and the user has not turned capture off. The
panel shows the coverage label next to each host.

## Safety note

None of these add autonomous action. They are explicit, user-initiated reads and saves. Acting on
sites (Loaner / Co-Pilot), public upload, alias-email autofill, and mandate signing remain deferred
behind the consent boundary per the main plan.

## Tests

`src/*.test.ts` covers all four modules (redaction canary, save_fact request building and key-safety,
status summarization and badge logic, coverage counts and learn-offer logic). Run with
`npx vitest run` from the package.
