import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface Endpoint {
  method: Method;
  path: string;
  desc: string;
  auth?: string;
}

interface Group {
  id: string;
  title: string;
  description: string;
  endpoints: Endpoint[];
}

const methodColor: Record<Method, string> = {
  GET: "text-sky-400 bg-sky-400/10",
  POST: "text-emerald-400 bg-emerald-400/10",
  PATCH: "text-amber-400 bg-amber-400/10",
  DELETE: "text-rose-400 bg-rose-400/10",
};

const groups: Group[] = [
  {
    id: "link-in-bio",
    title: "Link-in-Bio",
    description: "Create and manage shareable link pages. Pages can contain links, social profiles, themes, and custom domains.",
    endpoints: [
      { method: "POST",   path: "/v1/links/pages",                             desc: "Create a new link page",                     auth: "links:write" },
      { method: "GET",    path: "/v1/links/pages",                             desc: "List all link pages",                         auth: "links:read" },
      { method: "GET",    path: "/v1/links/pages/:page_id",                    desc: "Get a single page",                           auth: "links:read" },
      { method: "PATCH",  path: "/v1/links/pages/:page_id",                    desc: "Update page title, slug, or visibility",      auth: "links:write" },
      { method: "DELETE", path: "/v1/links/pages/:page_id",                    desc: "Delete a page (soft delete)",                 auth: "links:write" },
      { method: "POST",   path: "/v1/links/pages/:page_id/links",              desc: "Add a link to a page",                        auth: "links:write" },
      { method: "GET",    path: "/v1/links/pages/:page_id/links",              desc: "List all links on a page",                    auth: "links:read" },
      { method: "PATCH",  path: "/v1/links/pages/:page_id/links/:id",          desc: "Update a link (label, URL, position)",        auth: "links:write" },
      { method: "DELETE", path: "/v1/links/pages/:page_id/links/:id",          desc: "Remove a link",                               auth: "links:write" },
      { method: "POST",   path: "/v1/links/pages/:page_id/socials",            desc: "Add a social profile link",                   auth: "links:write" },
      { method: "GET",    path: "/v1/links/pages/:page_id/socials",            desc: "List social links",                           auth: "links:read" },
      { method: "DELETE", path: "/v1/links/pages/:page_id/socials/:id",        desc: "Remove a social link",                        auth: "links:write" },
      { method: "POST",   path: "/v1/links/pages/:page_id/theme",              desc: "Apply a built-in theme",                      auth: "links:write" },
      { method: "PATCH",  path: "/v1/links/pages/:page_id/theme",              desc: "Customise colours, fonts, or custom CSS",     auth: "links:write" },
      { method: "GET",    path: "/v1/themes",                                   desc: "List available themes",                      auth: "links:read" },
      { method: "POST",   path: "/v1/links/domains",                           desc: "Add a custom domain",                         auth: "links:write" },
      { method: "GET",    path: "/v1/links/domains",                           desc: "List custom domains",                         auth: "links:read" },
      { method: "DELETE", path: "/v1/links/domains/:domain",                   desc: "Remove a custom domain",                      auth: "links:write" },
      { method: "GET",    path: "/v1/links/pages/:page_id/analytics",          desc: "Summary: views, clicks, CTR",                 auth: "links:read" },
      { method: "GET",    path: "/v1/links/pages/:page_id/analytics/timeseries", desc: "Analytics over time (hourly/daily/weekly)", auth: "links:read" },
      { method: "GET",    path: "/v1/links/pages/:page_id/analytics/top-links",  desc: "Most clicked links",                        auth: "links:read" },
      { method: "GET",    path: "/v1/links/pages/:page_id/analytics/geo",        desc: "Visitor breakdown by country",              auth: "links:read" },
      { method: "GET",    path: "/v1/links/pages/:page_id/analytics/devices",    desc: "Device type breakdown",                     auth: "links:read" },
      { method: "POST",   path: "/track/:page_id/click",                       desc: "Track a link click",                          auth: "Public" },
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    description: "Manage booking types, availability schedules, and appointments. Public booking routes don't require authentication.",
    endpoints: [
      { method: "POST",   path: "/v1/schedule/event-types",                    desc: "Create a booking type",                       auth: "schedule:write" },
      { method: "GET",    path: "/v1/schedule/event-types",                    desc: "List booking types",                          auth: "schedule:read" },
      { method: "GET",    path: "/v1/schedule/event-types/:id",                desc: "Get a booking type",                          auth: "schedule:read" },
      { method: "PATCH",  path: "/v1/schedule/event-types/:id",                desc: "Update duration, name, or settings",          auth: "schedule:write" },
      { method: "DELETE", path: "/v1/schedule/event-types/:id",                desc: "Delete a booking type",                       auth: "schedule:write" },
      { method: "POST",   path: "/v1/schedule/schedules",                      desc: "Create an availability schedule",             auth: "schedule:write" },
      { method: "GET",    path: "/v1/schedule/schedules",                      desc: "List availability schedules",                 auth: "schedule:read" },
      { method: "PATCH",  path: "/v1/schedule/schedules/:id",                  desc: "Update availability windows",                 auth: "schedule:write" },
      { method: "DELETE", path: "/v1/schedule/schedules/:id",                  desc: "Delete a schedule",                           auth: "schedule:write" },
      { method: "GET",    path: "/v1/schedule/event-types/:id/slots",          desc: "Get available time slots",                    auth: "schedule:read" },
      { method: "GET",    path: "/v1/schedule/calendar/busy",                  desc: "Get busy periods from connected calendars",   auth: "schedule:read" },
      { method: "POST",   path: "/v1/schedule/bookings",                       desc: "Create a booking",                            auth: "schedule:write" },
      { method: "GET",    path: "/v1/schedule/bookings",                       desc: "List all bookings",                           auth: "schedule:read" },
      { method: "GET",    path: "/v1/schedule/bookings/:id",                   desc: "Get a single booking",                        auth: "schedule:read" },
      { method: "PATCH",  path: "/v1/schedule/bookings/:id",                   desc: "Update booking details",                      auth: "schedule:write" },
      { method: "POST",   path: "/v1/schedule/bookings/:id/cancel",            desc: "Cancel a booking",                            auth: "schedule:write" },
      { method: "POST",   path: "/v1/schedule/bookings/:id/reschedule",        desc: "Reschedule a booking",                        auth: "schedule:write" },
      { method: "GET",    path: "/v1/schedule/bookings/stats",                 desc: "Booking volume and conversion stats",         auth: "schedule:read" },
      { method: "GET",    path: "/schedule/:slug",                             desc: "Public booking page",                         auth: "Public" },
      { method: "GET",    path: "/schedule/:slug/slots",                       desc: "Get available slots (no auth)",               auth: "Public" },
      { method: "POST",   path: "/schedule/:slug/book",                        desc: "Create a booking (no auth)",                  auth: "Public" },
      { method: "GET",    path: "/schedule/:slug/bookings/:ref",               desc: "Get a booking by reference",                  auth: "Public" },
      { method: "POST",   path: "/schedule/:slug/bookings/:ref/cancel",        desc: "Cancel a booking (requires cancel token)",    auth: "Public" },
      { method: "POST",   path: "/schedule/:slug/bookings/:ref/reschedule",    desc: "Reschedule (requires reschedule token)",      auth: "Public" },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Subscribe to events from any tool. Deliveries are signed with HMAC-SHA256.",
    endpoints: [
      { method: "POST",   path: "/v1/webhooks",         desc: "Create a webhook endpoint",   auth: "webhooks:write" },
      { method: "GET",    path: "/v1/webhooks",         desc: "List webhook endpoints",       auth: "webhooks:read" },
      { method: "GET",    path: "/v1/webhooks/:id",     desc: "Get a webhook endpoint",       auth: "webhooks:read" },
      { method: "PATCH",  path: "/v1/webhooks/:id",     desc: "Update URL, events, or status", auth: "webhooks:write" },
      { method: "DELETE", path: "/v1/webhooks/:id",     desc: "Delete a webhook endpoint",   auth: "webhooks:write" },
      { method: "GET",    path: "/v1/webhooks/:id/deliveries", desc: "List delivery attempts", auth: "webhooks:read" },
      { method: "POST",   path: "/v1/webhooks/:id/test", desc: "Send a test event",           auth: "webhooks:write" },
    ],
  },
  {
    id: "api-keys",
    title: "API Keys",
    description: "Manage your API keys and scopes.",
    endpoints: [
      { method: "POST",   path: "/v1/keys",     desc: "Create a new API key",  auth: "keys:write" },
      { method: "GET",    path: "/v1/keys",     desc: "List API keys",         auth: "keys:read" },
      { method: "PATCH",  path: "/v1/keys/:id", desc: "Update key name/scopes", auth: "keys:write" },
      { method: "DELETE", path: "/v1/keys/:id", desc: "Revoke an API key",     auth: "keys:write" },
    ],
  },
  // ── Utility Tools ─────────────────────────────────────────────────────────
  {
    id: "random",
    title: "Random",
    description: "Cryptographically secure random generation using Node's built-in CSPRNG.",
    endpoints: [
      { method: "POST", path: "/v1/random/number",   desc: "Random number in a configurable range",           auth: "random:use" },
      { method: "POST", path: "/v1/random/string",   desc: "Random string with configurable charset",         auth: "random:use" },
      { method: "POST", path: "/v1/random/password", desc: "Random password with complexity options",         auth: "random:use" },
      { method: "POST", path: "/v1/random/pick",     desc: "Pick random item(s) from an array",              auth: "random:use" },
      { method: "POST", path: "/v1/random/shuffle",  desc: "Shuffle an array (Fisher-Yates)",                auth: "random:use" },
      { method: "POST", path: "/v1/random/color",    desc: "Random color in hex, RGB, or HSL",               auth: "random:use" },
    ],
  },
  {
    id: "uuid",
    title: "UUID",
    description: "Generate and inspect UUIDs. All generation uses Node's crypto.randomUUID().",
    endpoints: [
      { method: "POST", path: "/v1/uuid/v4",       desc: "Generate one or more UUIDv4s",               auth: "uuid:use" },
      { method: "POST", path: "/v1/uuid/validate",  desc: "Check if a string is a valid UUID",         auth: "uuid:use" },
      { method: "POST", path: "/v1/uuid/parse",     desc: "Parse UUID into RFC 4122 field components", auth: "uuid:use" },
    ],
  },
  {
    id: "cron",
    title: "Cron",
    description: "Parse, validate, build, and calculate next run times for cron expressions.",
    endpoints: [
      { method: "POST", path: "/v1/cron/parse",    desc: "Convert cron expression to human-readable description", auth: "cron:use" },
      { method: "POST", path: "/v1/cron/next",     desc: "Get next N occurrences after an optional start time",   auth: "cron:use" },
      { method: "POST", path: "/v1/cron/validate", desc: "Validate expression with field-level feedback",         auth: "cron:use" },
      { method: "POST", path: "/v1/cron/build",    desc: "Build a cron expression from natural language params",  auth: "cron:use" },
    ],
  },
  {
    id: "timestamp",
    title: "Timestamp",
    description: "Convert, diff, add to, and format timestamps. Accepts ISO 8601, Unix seconds, or Unix ms.",
    endpoints: [
      { method: "POST", path: "/v1/timestamp/now",     desc: "Current time in ISO, Unix seconds, Unix ms, UTC",   auth: "timestamp:use" },
      { method: "POST", path: "/v1/timestamp/convert", desc: "Convert timestamp to all formats",                  auth: "timestamp:use" },
      { method: "POST", path: "/v1/timestamp/diff",    desc: "Difference between two timestamps",                 auth: "timestamp:use" },
      { method: "POST", path: "/v1/timestamp/add",     desc: "Add a duration (years/months/days/hours/…) to a timestamp", auth: "timestamp:use" },
      { method: "POST", path: "/v1/timestamp/format",  desc: "Format a timestamp with a YYYY/MM/DD/HH/mm/ss pattern", auth: "timestamp:use" },
    ],
  },
  {
    id: "qr",
    title: "QR Code",
    description: "Generate QR codes. Returns image bytes directly (PNG or SVG).",
    endpoints: [
      { method: "POST", path: "/v1/qr", desc: "Generate a QR code — returns PNG or SVG bytes", auth: "qr:write" },
    ],
  },
  {
    id: "units",
    title: "Units",
    description: "Convert values between units of length, weight, volume, data, speed, time, and temperature.",
    endpoints: [
      { method: "POST", path: "/v1/units/convert", desc: "Convert a value from one unit to another",     auth: "units:use" },
      { method: "POST", path: "/v1/units/list",    desc: "List all supported categories and unit names", auth: "units:use" },
    ],
  },
  // ── Text Tools ─────────────────────────────────────────────────────────────
  {
    id: "transform",
    title: "Transform",
    description: "Common text transformations: case conversion, slugification, truncation, stripping, and reversal.",
    endpoints: [
      { method: "POST", path: "/v1/transform/case",     desc: "Convert text to upper/lower/title/sentence/camel/snake/kebab/pascal", auth: "transform:use" },
      { method: "POST", path: "/v1/transform/slug",     desc: "Convert text to a URL-friendly slug",                                  auth: "transform:use" },
      { method: "POST", path: "/v1/transform/truncate", desc: "Truncate text at N characters with optional ellipsis",                 auth: "transform:use" },
      { method: "POST", path: "/v1/transform/count",    desc: "Word, character, sentence, paragraph counts + reading time",           auth: "transform:use" },
      { method: "POST", path: "/v1/transform/strip",    desc: "Strip HTML tags and decode common entities",                           auth: "transform:use" },
      { method: "POST", path: "/v1/transform/reverse",  desc: "Reverse a string (Unicode-safe)",                                      auth: "transform:use" },
    ],
  },
  {
    id: "regex",
    title: "Regex",
    description: "Test, replace, extract, and split text with regular expressions. ReDoS-protected with a 100 KB input cap.",
    endpoints: [
      { method: "POST", path: "/v1/regex/test",     desc: "Find all matches with capture groups and positions", auth: "regex:use" },
      { method: "POST", path: "/v1/regex/replace",  desc: "Replace matches — supports $1 $2 backreferences",   auth: "regex:use" },
      { method: "POST", path: "/v1/regex/extract",  desc: "Extract all matches as a flat array of strings",    auth: "regex:use" },
      { method: "POST", path: "/v1/regex/split",    desc: "Split a string by a regex pattern",                 auth: "regex:use" },
      { method: "POST", path: "/v1/regex/validate", desc: "Check if a pattern compiles, return any error",     auth: "regex:use" },
    ],
  },
  {
    id: "markdown",
    title: "Markdown",
    description: "Process Markdown documents: render to HTML, strip to plain text, extract headings, and lint.",
    endpoints: [
      { method: "POST", path: "/v1/markdown/to-html", desc: "Convert Markdown to HTML",                      auth: "markdown:use" },
      { method: "POST", path: "/v1/markdown/to-text", desc: "Strip Markdown formatting, return plain text",  auth: "markdown:use" },
      { method: "POST", path: "/v1/markdown/toc",     desc: "Extract table of contents from headings",       auth: "markdown:use" },
      { method: "POST", path: "/v1/markdown/lint",    desc: "Basic lint: unclosed fences, broken links, empty headings", auth: "markdown:use" },
    ],
  },
  {
    id: "lorem",
    title: "Lorem",
    description: "Generate placeholder content: lorem ipsum text and realistic fake data for names, emails, and addresses.",
    endpoints: [
      { method: "POST", path: "/v1/lorem/paragraphs", desc: "Generate N paragraphs of lorem ipsum",      auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/sentences",  desc: "Generate N lorem ipsum sentences",          auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/words",      desc: "Generate N lorem ipsum words",              auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/text",       desc: "Generate text of approximate char length",  auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/list",       desc: "Generate N short list items",               auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/name",       desc: "Generate fake first/last/full names",       auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/email",      desc: "Generate fake email addresses",             auth: "lorem:use" },
      { method: "POST", path: "/v1/lorem/address",    desc: "Generate fake US street addresses",         auth: "lorem:use" },
    ],
  },
  {
    id: "diff",
    title: "Diff",
    description: "Compare text at the file, line, or word level. Apply unified diff patches.",
    endpoints: [
      { method: "POST", path: "/v1/diff/text",  desc: "Unified diff between two strings (patch format)",   auth: "diff:use" },
      { method: "POST", path: "/v1/diff/lines", desc: "Line-by-line diff with line numbers and change type", auth: "diff:use" },
      { method: "POST", path: "/v1/diff/words", desc: "Word-level diff with added/removed/unchanged tokens", auth: "diff:use" },
      { method: "POST", path: "/v1/diff/patch", desc: "Apply a unified diff patch to a source string",      auth: "diff:use" },
    ],
  },
  {
    id: "count",
    title: "Count",
    description: "Count words, characters, sentences, and paragraphs, and estimate reading time.",
    endpoints: [
      { method: "POST", path: "/v1/count/text", desc: "Word, char, sentence, paragraph counts + reading time", auth: "count:use" },
    ],
  },
  {
    id: "humanize",
    title: "Humanize",
    description: "Rule-based AI text humanizer. Rewrites, scores, and suggests improvements — no external AI calls.",
    endpoints: [
      { method: "POST", path: "/v1/humanize/rewrite", desc: "Rewrite AI text to sound more natural (tone + strength)", auth: "humanize:use" },
      { method: "POST", path: "/v1/humanize/detect",  desc: "Score text 0–100 for AI-writing patterns",               auth: "humanize:use" },
      { method: "POST", path: "/v1/humanize/suggest", desc: "Return line-level improvement suggestions",               auth: "humanize:use" },
    ],
  },
  // ── Data Tools ─────────────────────────────────────────────────────────────
  {
    id: "json",
    title: "JSON",
    description: "Format, query, flatten, diff, merge, and generate schemas for JSON documents.",
    endpoints: [
      { method: "POST", path: "/v1/json/format",    desc: "Pretty-print with configurable indent (2, 4, or tab)", auth: "json:use" },
      { method: "POST", path: "/v1/json/minify",    desc: "Strip all whitespace",                                  auth: "json:use" },
      { method: "POST", path: "/v1/json/query",     desc: "Dot-notation / JSONPath query",                         auth: "json:use" },
      { method: "POST", path: "/v1/json/flatten",   desc: "Nested object → flat dot-notation keys",                auth: "json:use" },
      { method: "POST", path: "/v1/json/unflatten", desc: "Flat dot-notation keys → nested object",                auth: "json:use" },
      { method: "POST", path: "/v1/json/diff",      desc: "Compare two JSON objects, return added/removed/changed", auth: "json:use" },
      { method: "POST", path: "/v1/json/merge",     desc: "Deep-merge two or more JSON objects",                   auth: "json:use" },
      { method: "POST", path: "/v1/json/schema",    desc: "Infer a JSON Schema draft-07 from a sample document",   auth: "json:use" },
    ],
  },
  {
    id: "csv",
    title: "CSV",
    description: "Parse, generate, query, sort, and analyze CSV files (up to 10 MB).",
    endpoints: [
      { method: "POST", path: "/v1/csv/parse",    desc: "Parse CSV string to JSON array of row objects",      auth: "csv:use" },
      { method: "POST", path: "/v1/csv/generate", desc: "Convert JSON array to CSV string",                   auth: "csv:use" },
      { method: "POST", path: "/v1/csv/query",    desc: "Filter rows by column conditions (equals/contains/gt/lt)", auth: "csv:use" },
      { method: "POST", path: "/v1/csv/sort",     desc: "Sort rows by one or more columns",                   auth: "csv:use" },
      { method: "POST", path: "/v1/csv/columns",  desc: "List column names and inferred types",               auth: "csv:use" },
      { method: "POST", path: "/v1/csv/stats",    desc: "Min, max, mean, sum for numeric columns",            auth: "csv:use" },
    ],
  },
  {
    id: "validate",
    title: "Validate",
    description: "Validate common formats: email, URL, phone, JSON, credit card (Luhn), IP address, and color values.",
    endpoints: [
      { method: "POST", path: "/v1/validate/email",       desc: "Validate email address format",                   auth: "validate:use" },
      { method: "POST", path: "/v1/validate/url",         desc: "Validate URL format (optional reachability check)", auth: "validate:use" },
      { method: "POST", path: "/v1/validate/phone",       desc: "Basic phone number format validation",            auth: "validate:use" },
      { method: "POST", path: "/v1/validate/json",        desc: "Validate JSON string, return parsed value or error", auth: "validate:use" },
      { method: "POST", path: "/v1/validate/credit-card", desc: "Validate credit card via Luhn algorithm",         auth: "validate:use" },
      { method: "POST", path: "/v1/validate/ip",          desc: "Validate IPv4 or IPv6 address",                   auth: "validate:use" },
      { method: "POST", path: "/v1/validate/color",       desc: "Validate hex, RGB, RGBA, or HSL color values",    auth: "validate:use" },
    ],
  },
  {
    id: "encode",
    title: "Encode / Decode",
    description: "Encode and decode text in Base64, URL percent-encoding, HTML entities, and hex.",
    endpoints: [
      { method: "POST", path: "/v1/encode/base64", desc: "Encode text to Base64",              auth: "encode:use" },
      { method: "POST", path: "/v1/decode/base64", desc: "Decode Base64 to text",              auth: "encode:use" },
      { method: "POST", path: "/v1/encode/url",    desc: "URL percent-encode a string",        auth: "encode:use" },
      { method: "POST", path: "/v1/decode/url",    desc: "URL percent-decode a string",        auth: "encode:use" },
      { method: "POST", path: "/v1/encode/html",   desc: "HTML-encode special characters",     auth: "encode:use" },
      { method: "POST", path: "/v1/decode/html",   desc: "HTML-decode entities",               auth: "encode:use" },
      { method: "POST", path: "/v1/encode/hex",    desc: "Encode text to hexadecimal",         auth: "encode:use" },
      { method: "POST", path: "/v1/decode/hex",    desc: "Decode hexadecimal to text",         auth: "encode:use" },
    ],
  },
  {
    id: "og",
    title: "OG",
    description: "Extract Open Graph, Twitter Card, and standard meta tags from any public URL.",
    endpoints: [
      { method: "POST", path: "/v1/og/extract", desc: "Scrape OG / Twitter Card / meta tags from a URL", auth: "og:use" },
    ],
  },
  // ── Media Tools ────────────────────────────────────────────────────────────
  {
    id: "image",
    title: "Image",
    description: "Process images via base64 strings. Supports JPEG, PNG, WebP, and AVIF (up to ~7.5 MB raw).",
    endpoints: [
      { method: "POST", path: "/v1/image/resize",    desc: "Resize to width × height (cover/contain/fill/inside/outside)", auth: "image:use" },
      { method: "POST", path: "/v1/image/convert",   desc: "Convert between JPEG, PNG, WebP, AVIF",                       auth: "image:use" },
      { method: "POST", path: "/v1/image/compress",  desc: "Compress with a quality parameter (1–100)",                   auth: "image:use" },
      { method: "POST", path: "/v1/image/metadata",  desc: "Extract dimensions, format, size, color space",               auth: "image:use" },
      { method: "POST", path: "/v1/image/crop",      desc: "Crop with x, y, width, height",                               auth: "image:use" },
      { method: "POST", path: "/v1/image/rotate",    desc: "Rotate by degrees (−360 to 360)",                             auth: "image:use" },
      { method: "POST", path: "/v1/image/grayscale", desc: "Convert to grayscale",                                        auth: "image:use" },
    ],
  },
  {
    id: "color",
    title: "Color",
    description: "Convert color formats, generate palettes, mix colors, and calculate WCAG contrast ratios.",
    endpoints: [
      { method: "POST", path: "/v1/color/convert",  desc: "Convert between hex, RGB, HSL, and HSV",                         auth: "color:use" },
      { method: "POST", path: "/v1/color/palette",  desc: "Generate complementary/analogous/triadic/… palette",            auth: "color:use" },
      { method: "POST", path: "/v1/color/mix",      desc: "Blend two colors with an optional weight (0–1)",                 auth: "color:use" },
      { method: "POST", path: "/v1/color/contrast", desc: "WCAG contrast ratio with AA/AAA pass/fail grades",              auth: "color:use" },
      { method: "POST", path: "/v1/color/lighten",  desc: "Lighten a color by percentage points of HSL lightness",         auth: "color:use" },
      { method: "POST", path: "/v1/color/darken",   desc: "Darken a color by percentage points of HSL lightness",          auth: "color:use" },
    ],
  },
  // ── Network Tools ──────────────────────────────────────────────────────────
  {
    id: "ip",
    title: "IP",
    description: "Parse and inspect IP addresses, perform subnet math, and check CIDR range membership.",
    endpoints: [
      { method: "POST", path: "/v1/ip/lookup",  desc: "Return caller's IP from CF-Connecting-IP / X-Forwarded-For", auth: "ip:use" },
      { method: "POST", path: "/v1/ip/parse",   desc: "Parse IP: version, decimal, binary, private/loopback/multicast", auth: "ip:use" },
      { method: "POST", path: "/v1/ip/subnet",  desc: "Subnet math from CIDR: network, broadcast, first/last host, host count", auth: "ip:use" },
      { method: "POST", path: "/v1/ip/range",   desc: "Check whether an IPv4 address falls within a CIDR range",        auth: "ip:use" },
      { method: "POST", path: "/v1/ip/convert", desc: "Convert IPv4 between dotted-decimal, decimal, binary, and hex",  auth: "ip:use" },
    ],
  },
  {
    id: "hash",
    title: "Hash",
    description: "Compute cryptographic hashes and HMACs. Supports MD5, SHA1, SHA256, SHA512.",
    endpoints: [
      { method: "POST", path: "/v1/hash",        desc: "Compute a hash of text (algorithm: md5/sha1/sha256/sha512)", auth: "hash:use" },
      { method: "POST", path: "/v1/hash/verify", desc: "Constant-time comparison of text against a known hash",      auth: "hash:use" },
      { method: "POST", path: "/v1/hash/hmac",   desc: "Compute an HMAC with a secret key",                          auth: "hash:use" },
    ],
  },
  {
    id: "dns",
    title: "DNS",
    description: "Perform DNS lookups for A, AAAA, MX, TXT, CNAME, NS, and SOA records.",
    endpoints: [
      { method: "POST", path: "/v1/dns/lookup", desc: "Resolve a single record type for a domain", auth: "dns:use" },
      { method: "POST", path: "/v1/dns/all",    desc: "Resolve all record types in one request",   auth: "dns:use" },
    ],
  },
  {
    id: "headers",
    title: "Headers",
    description: "Inspect HTTP response headers and grade security headers for any public URL.",
    endpoints: [
      { method: "POST", path: "/v1/headers/inspect",  desc: "Fetch and return all response headers for a URL",         auth: "headers:use" },
      { method: "POST", path: "/v1/headers/security", desc: "Grade HSTS, CSP, X-Frame-Options, and 7 other headers",  auth: "headers:use" },
    ],
  },
  {
    id: "ping",
    title: "Ping",
    description: "Check URL uptime, measure response time, inspect SSL certificates, and follow redirects.",
    endpoints: [
      { method: "POST", path: "/v1/ping/check", desc: "Check a single URL — status, latency, SSL, redirects", auth: "ping:use" },
      { method: "POST", path: "/v1/ping/batch", desc: "Check up to 10 URLs concurrently",                      auth: "ping:use" },
    ],
  },
  // ── Security Tools ─────────────────────────────────────────────────────────
  {
    id: "secret",
    title: "Secret",
    description: "Store one-time secrets encrypted with AES-256-GCM. Secrets are destroyed on first read.",
    endpoints: [
      { method: "POST", path: "/v1/secret/create", desc: "Create an encrypted one-time secret (max 7-day TTL)", auth: "secret:write" },
      { method: "POST", path: "/v1/secret/view",   desc: "Decrypt and destroy a secret (one-read guarantee)",   auth: "secret:read" },
      { method: "POST", path: "/v1/secret/exists", desc: "Check if a secret exists without revealing it",       auth: "secret:read" },
    ],
  },
  // ── Storage Tools ──────────────────────────────────────────────────────────
  {
    id: "kv",
    title: "KV Store",
    description: "Persistent key-value storage with optional TTL expiration and atomic increment.",
    endpoints: [
      { method: "POST", path: "/v1/kv/set",       desc: "Create or overwrite a key (optional TTL in seconds)", auth: "kv:write" },
      { method: "POST", path: "/v1/kv/get",       desc: "Retrieve a value by key",                              auth: "kv:read" },
      { method: "POST", path: "/v1/kv/delete",    desc: "Remove a key (idempotent)",                            auth: "kv:write" },
      { method: "POST", path: "/v1/kv/list",      desc: "List live keys with optional prefix filter",           auth: "kv:read" },
      { method: "POST", path: "/v1/kv/exists",    desc: "Check whether a key exists (and hasn't expired)",      auth: "kv:read" },
      { method: "POST", path: "/v1/kv/increment", desc: "Atomically increment a numeric value",                 auth: "kv:write" },
    ],
  },
  {
    id: "paste",
    title: "Paste",
    description: "Store and retrieve text snippets with optional syntax language and expiry.",
    endpoints: [
      { method: "POST",   path: "/v1/paste/create",   desc: "Create a paste (up to 1 MB, max 1-year TTL)",    auth: "paste:write" },
      { method: "POST",   path: "/v1/paste/list",     desc: "List pastes (most recent first)",                 auth: "paste:read" },
      { method: "GET",    path: "/v1/paste/:id",      desc: "Retrieve a paste with metadata",                  auth: "paste:read" },
      { method: "DELETE", path: "/v1/paste/:id",      desc: "Delete a paste",                                  auth: "paste:write" },
      { method: "POST",   path: "/v1/paste/:id/raw",  desc: "Get raw text content (no metadata)",              auth: "paste:read" },
    ],
  },
  {
    id: "shorten",
    title: "URL Shortener",
    description: "Shorten URLs, track click counts, and perform public redirects.",
    endpoints: [
      { method: "POST", path: "/v1/shorten",            desc: "Shorten a URL, receive a 6-char code", auth: "shorten:write" },
      { method: "GET",  path: "/v1/shorten/:code/stats", desc: "Click stats for a short URL",          auth: "shorten:read" },
      { method: "GET",  path: "/r/:code",               desc: "Public redirect (no auth required)",   auth: "Public" },
    ],
  },
  {
    id: "health",
    title: "Health",
    description: "Service status check. No authentication required.",
    endpoints: [
      { method: "GET", path: "/health", desc: "Returns API status and version", auth: "Public" },
    ],
  },
];

const ALL_SCOPES = [
  "links:read", "links:write",
  "schedule:read", "schedule:write",
  "webhooks:read", "webhooks:write",
  "keys:read", "keys:write",
  "random:use", "uuid:use", "cron:use", "timestamp:use", "qr:write", "units:use",
  "transform:use", "regex:use", "markdown:use", "lorem:use", "diff:use", "count:use", "humanize:use",
  "json:use", "csv:use", "validate:use", "encode:use", "og:use",
  "image:use", "color:use",
  "ip:use", "hash:use", "dns:use", "headers:use", "ping:use",
  "secret:read", "secret:write",
  "kv:read", "kv:write",
  "paste:read", "paste:write",
  "shorten:read", "shorten:write",
];

const EndpointRow = ({ ep }: { ep: Endpoint }) => (
  <div className="flex flex-col gap-1.5 border-t border-border/30 px-5 py-4 sm:flex-row sm:items-start sm:gap-4 hover:bg-card/30 transition-colors">
    <span className={`inline-flex w-fit shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px] font-bold ${methodColor[ep.method]}`}>
      {ep.method}
    </span>
    <code className="font-mono text-xs text-heading flex-1 break-all leading-relaxed">{ep.path}</code>
    <span className="text-xs text-body sm:w-56 shrink-0">{ep.desc}</span>
    <span className={`font-mono text-[10px] shrink-0 ${ep.auth === "Public" ? "text-sky-400/70" : "text-muted-foreground"}`}>
      {ep.auth}
    </span>
  </div>
);

const DocsPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-28">
      <FadeIn>
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
          API Reference
        </span>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Documentation</h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-4 max-w-2xl text-body text-lg leading-relaxed">
          The UnClick API is RESTful, returns JSON, and uses Bearer token authentication.
          Base URL: <code className="font-mono text-sm bg-card/50 px-2 py-0.5 rounded">https://api.unclick.world</code>
        </p>
      </FadeIn>

      {/* Auth note */}
      <FadeIn delay={0.15}>
        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/[0.03] p-5">
          <h2 className="text-sm font-medium text-heading">Authentication</h2>
          <p className="mt-2 text-sm text-body">
            Pass your API key as a Bearer token:{" "}
            <code className="font-mono text-xs bg-card/50 px-1.5 py-0.5 rounded">Authorization: Bearer YOUR_API_KEY</code>.
            Get a free key at <a href="/#install" className="text-primary underline underline-offset-4">unclick.world</a>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_SCOPES.map((scope) => (
              <span key={scope} className="font-mono text-[10px] rounded border border-border/40 px-2 py-0.5 text-muted-foreground">{scope}</span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Tool groups */}
      <div className="mt-16 space-y-16">
        {groups.map((group, i) => (
          <FadeIn key={group.id} delay={i * 0.04}>
            <section id={group.id}>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-heading">{group.title}</h2>
                <a href={`#${group.id}`} className="font-mono text-xs text-muted-foreground hover:text-body transition-colors">#{group.id}</a>
              </div>
              <p className="mt-2 text-sm text-body">{group.description}</p>
              <div className="mt-4 overflow-hidden rounded-xl border border-border/40 bg-card/20">
                {group.endpoints.map((ep) => (
                  <EndpointRow key={ep.method + ep.path} ep={ep} />
                ))}
              </div>
            </section>
          </FadeIn>
        ))}
      </div>

      {/* Rate limits */}
      <FadeIn>
        <div className="mt-16 rounded-lg border border-border/40 bg-card/30 p-6">
          <h2 className="text-lg font-semibold text-heading">Rate limits</h2>
          <p className="mt-2 text-sm text-body">
            Free tier: 500 requests/day per API key. Rate limit headers are included in every response.
            Exceeded limits return <code className="font-mono text-xs bg-card/50 px-1.5 py-0.5 rounded">429 Too Many Requests</code>.
          </p>
        </div>
      </FadeIn>

      {/* Errors */}
      <FadeIn>
        <div className="mt-6 rounded-lg border border-border/40 bg-card/30 p-6">
          <h2 className="text-lg font-semibold text-heading">Errors</h2>
          <p className="mt-2 text-sm text-body mb-4">All errors return a JSON body with a <code className="font-mono text-xs bg-card/50 px-1.5 py-0.5 rounded">code</code> and <code className="font-mono text-xs bg-card/50 px-1.5 py-0.5 rounded">message</code> field.</p>
          <div className="space-y-2">
            {[
              { code: "400", label: "bad_request", desc: "Invalid request body or missing required fields" },
              { code: "401", label: "unauthorized", desc: "Missing or invalid API key" },
              { code: "403", label: "forbidden", desc: "Valid key but insufficient scope" },
              { code: "404", label: "not_found", desc: "Resource not found or belongs to another org" },
              { code: "429", label: "rate_limit_exceeded", desc: "Too many requests" },
              { code: "500", label: "internal_error", desc: "Something went wrong on our end" },
            ].map((e) => (
              <div key={e.code} className="flex items-center gap-4 text-sm">
                <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">{e.code}</span>
                <code className="w-40 shrink-0 font-mono text-xs text-heading">{e.label}</code>
                <span className="text-body text-xs">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </main>
    <Footer />
  </div>
);

export default DocsPage;
