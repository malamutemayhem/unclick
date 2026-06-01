// Schema <-> handler contract guard.
//
// Every connector tool advertises an inputSchema with `required` params.
// Agents can ONLY pass those names (most schemas set additionalProperties:false),
// so if a handler reads a param under a DIFFERENT name than the schema requires,
// the tool is broken through its own published contract -- the value the agent
// sends is silently ignored and the call fails with "X is required".
//
// This is exactly the class of bug that shipped in reddit_search (schema asked
// for `q`, handler read `query`) and a batch of others. QC/XPass did not catch
// it because nothing checked that the advertised contract matched the code.
//
// This guard closes that gap. For each tool it calls the real handler with a
// Proxy `args` that records every property the handler touches (including reads
// inside helpers like requireCredential, and destructuring), with network
// stubbed out. It then asserts every required schema param was actually read.
//
// Because it observes runtime property access, it is immune to re-exports,
// shared helpers, typed casts, and multi-function source files -- the things
// that make static source scanning unreliable.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { ADDITIONAL_TOOLS, ADDITIONAL_HANDLERS } from "../tool-wiring.js";

// A truthy, numeric- and string-coercible sentinel so simple validations
// (`if (!args.x)`, `Number(args.x)`, `args.x.trim()`) pass and the handler
// proceeds far enough to read all of its params before hitting the stubbed
// network and stopping.
const SENTINEL = "1";

// Tools whose handlers cannot be probed by this technique. Each is verified by
// hand to read its required params; the reason it can't be probed is noted.
//   email_*: use raw imap/nodemailer sockets (not fetch) and a `must_confirm
//            === true` gate; they read to/subject/body/uid/query/folder
//            directly (email-tool.ts) but a string sentinel never satisfies a
//            socket handshake or a strict `=== true` check.
const SKIP = new Set<string>([
  "email_send",
  "email_read_inbox",
  "email_search",
  "email_get",
  "email_mark_read",
  "email_delete",
]);

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// ---------------------------------------------------------------------------
// Static fallback: does the handler's own function body mention a param?
//
// The runtime probe can miss a param that is read as a `?? args.x` fallback
// (the proxy returns a truthy value for the first operand) or only inside a
// branch the probe didn't take. So a param is treated as honoured if EITHER
// the handler accessed it at runtime OR its name appears as a whole word in
// the handler's own function body. We scope to the function body (not the
// whole file) so sibling tools in a multi-tool file don't mask a real miss.
// ---------------------------------------------------------------------------
const wiringSrc = fs.readFileSync(path.join(SRC_DIR, "tool-wiring.ts"), "utf8");

// fnName -> source file (from `import { ... } from "./x.js"`)
const importMap: Record<string, string> = {};
{
  const re = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*"(\.\/[^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(wiringSrc))) {
    const file = path.join(SRC_DIR, m[2].replace(/\.js$/, ".ts"));
    for (const raw of m[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (name) importMap[name] = file;
    }
  }
}

// toolName -> handler fn name (from the ADDITIONAL_HANDLERS block)
const handlerFn: Record<string, string> = {};
{
  const start = wiringSrc.indexOf("export const ADDITIONAL_HANDLERS");
  const blob = start >= 0 ? wiringSrc.slice(start) : "";
  const re = /^\s*([a-z0-9_]+):\s*(.+?),?\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(blob))) {
    const rhs = m[2];
    const argName = (rhs.match(/^\(?\s*([A-Za-z0-9_]+)\s*\)?\s*=>/) || [])[1];
    let fn: string | undefined;
    if (argName) fn = (rhs.match(new RegExp(`([A-Za-z0-9_]+)\\s*\\(\\s*${argName}\\b`)) || [])[1];
    if (!fn) fn = (rhs.match(/=>\s*([A-Za-z0-9_]+)\s*\(/) || rhs.match(/^([A-Za-z0-9_]+)$/) || [])[1];
    if (fn) handlerFn[m[1]] = fn;
  }
}

const fileCache: Record<string, string> = {};
function readSrc(p: string): string {
  if (!(p in fileCache)) fileCache[p] = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
  return fileCache[p];
}

function extractFnBody(src: string, fn: string): string | null {
  const pats = [
    new RegExp(`export\\s+async\\s+function\\s+${fn}\\b`),
    new RegExp(`export\\s+function\\s+${fn}\\b`),
    new RegExp(`async\\s+function\\s+${fn}\\b`),
    new RegExp(`function\\s+${fn}\\b`),
    new RegExp(`(?:export\\s+)?const\\s+${fn}\\s*=`),
  ];
  for (const re of pats) {
    const mm = src.match(re);
    if (!mm || mm.index === undefined) continue;
    const open = src.indexOf("{", mm.index);
    if (open < 0) continue;
    let depth = 0;
    for (let i = open; i < src.length; i++) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}" && --depth === 0) return src.slice(mm.index, i + 1);
    }
    return src.slice(mm.index);
  }
  return null;
}

// Corpus for static analysis = the handler's own body PLUS the bodies of any
// same-file helper functions it calls (one or two levels deep). This catches
// params read inside a shared credential resolver (e.g. `args.api_token ??
// args.api_key`) WITHOUT pulling in sibling tool handlers in the same file
// (which would mask a real miss, e.g. calc_compound_interest reading
// args.principal hiding that calc_mortgage reads loan_amount).
function handlerCorpus(fn: string, file: string): string {
  const src = readSrc(file);
  const seen = new Set<string>();
  let corpus = "";
  const collect = (name: string, depth: number) => {
    if (depth > 2 || seen.has(name)) return;
    seen.add(name);
    const body = extractFnBody(src, name);
    if (!body) return;
    corpus += "\n" + body;
    let m: RegExpExecArray | null;
    const callRe = /([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
    while ((m = callRe.exec(body))) {
      const callee = m[1];
      // only follow other LOCAL functions, not the tool's siblings-by-accident:
      // a sibling tool handler is reachable only if this handler calls it,
      // which connectors do not do, so following calls is safe.
      if (callee !== name) collect(callee, depth + 1);
    }
  };
  collect(fn, 0);
  return corpus;
}

function handlerReadsFromArgs(tool: string, param: string): boolean {
  const fn = handlerFn[tool];
  if (!fn) return false;
  const file = importMap[fn];
  if (!file) return false; // inline / re-export: rely on the runtime signal
  const corpus = handlerCorpus(fn, file);
  if (!corpus) return false;
  const p = param.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match reads OFF THE ARGS OBJECT only, not bare tokens (a handler may use
  // the schema name as an API-side string key, e.g. set("q", query), while
  // reading the value from a differently-named arg -- that is still a bug).
  return (
    new RegExp(`args\\s*\\.\\s*${p}\\b`).test(corpus) ||                 // args.param
    new RegExp(`args\\s*\\[\\s*["']${p}["']\\s*\\]`).test(corpus) ||      // args["param"]
    new RegExp(`\\{[^}]*\\b${p}\\b[^}]*\\}\\s*=\\s*args\\b`).test(corpus) // { param } = args
  );
}

// Set every env var the connectors read to a sentinel, so credential gates
// (`process.env.X ?? args.x`) pass and the handler reaches its data params.
function harvestEnvVars(): string[] {
  const names = new Set<string>();
  let m: RegExpExecArray | null;
  for (const file of fs.readdirSync(SRC_DIR)) {
    if (!file.endsWith(".ts")) continue;
    const text = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
    // literal reads: process.env.FOO
    const re = /process\.env\.([A-Z0-9_]+)/g;
    while ((m = re.exec(text))) names.add(m[1]);
    // dynamic reads via requireCredential -> CONNECTOR_SETUP `envVar: "FOO"`
    const env = /envVar:\s*"([A-Z0-9_]+)"/g;
    while ((m = env.exec(text))) names.add(m[1]);
  }
  return [...names];
}

function recordingArgs(seen: Set<string>): Record<string, unknown> {
  return new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop === "symbol") return undefined;
        if (prop === "then") return undefined; // never look like a thenable
        seen.add(prop);
        return SENTINEL;
      },
      has(_t, prop) {
        if (typeof prop === "string") seen.add(prop);
        return true;
      },
      ownKeys() {
        return [];
      },
      getOwnPropertyDescriptor() {
        return { configurable: true, enumerable: true, value: SENTINEL };
      },
    },
  ) as Record<string, unknown>;
}

describe("schema<->handler contract", () => {
  const realFetch = globalThis.fetch;
  const savedEnv: Record<string, string | undefined> = {};

  beforeAll(() => {
    // Satisfy credential gates so handlers run past them to their data params.
    for (const name of harvestEnvVars()) {
      savedEnv[name] = process.env[name];
      process.env[name] = "1";
    }
    // Fake-success network so token-first flows (Twitch/IGDB OAuth) and paged
    // handlers proceed far enough to read every data param. We only observe
    // which args are accessed; response shape does not matter.
    globalThis.fetch = (async () =>
      ({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        json: async () => ({}),
        text: async () => "",
        arrayBuffer: async () => new ArrayBuffer(0),
      }) as unknown as Response) as unknown as typeof fetch;
  });

  afterAll(() => {
    globalThis.fetch = realFetch;
    for (const [name, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  const requiredOf = (t: { inputSchema: unknown }): string[] => {
    const r = (t.inputSchema as { required?: unknown })?.required;
    return Array.isArray(r) ? (r as string[]) : [];
  };
  const withRequired = ADDITIONAL_TOOLS.filter((t) => requiredOf(t).length > 0);

  for (const tool of withRequired) {
    const required = requiredOf(tool);
    const handler = ADDITIONAL_HANDLERS[tool.name];
    if (!handler || SKIP.has(tool.name)) continue;

    it(`${tool.name} reads every required param`, async () => {
      const seen = new Set<string>();
      try {
        await handler(recordingArgs(seen));
      } catch {
        // expected: network sentinel, or coercion errors on the sentinel value
      }
      const ignored = required.filter((p) => !seen.has(p) && !handlerReadsFromArgs(tool.name, p));
      expect(
        ignored,
        `${tool.name}: schema requires [${required.join(", ")}] but the handler never reads [${ignored.join(", ")}] (it reads: ${[...seen].join(", ") || "nothing"})`,
      ).toEqual([]);
    });
  }
});
