// Lane 8 - Baskets engine test harness.
//
// Runs UCB.pipeline.run over every fixture in ./fixtures and scores the
// detected baskets against ./eval.json. Built to the frozen contracts in
// BASKETS_ENGINE_PLAN.md Section 3, so it works against whatever subset of
// the engine is present: it loads the baskets/*.js files that exist (in the
// same order as index.html) and only scores baskets that actually register
// in UCB.baskets. Unimplemented lanes show as "pending", never as failures.
//
// Runtime: a non-rendering DOM (jsdom). The Region.area contract says no
// layout reads are required, so a real browser is not needed to run or score
// the pipeline. The pre-installed Chromium is reserved for visual snapshots,
// which this scoring harness does not need.
//
// Usage:
//   node harness.mjs                 run + score, exit 1 only on a fixture error
//   node harness.mjs --strict        also enforce the eval.json precision/recall floors
//   node harness.mjs --json          print a machine-readable JSON report
//   node harness.mjs --quiet         print only the one-line CI summary
//   node harness.mjs <name> [<name>] run only the named fixtures (substring match)
//
// Env:
//   UCB_FOUNDATION_DIR   directory holding segment.js / core.js / etc.
//                        (default: this file's directory)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE_DIR = path.join(HERE, 'fixtures');
const EVAL_PATH = path.join(HERE, 'eval.json');
const FOUNDATION_DIR = process.env.UCB_FOUNDATION_DIR
  ? path.resolve(process.env.UCB_FOUNDATION_DIR)
  : HERE;

// index.html load order. core.js loads last so the registry is populated
// before pipeline.run is defined. Missing files are simply skipped.
const LOAD_ORDER = [
  'segment.js',
  'fingerprint.js',
  'learn.js',
  'frame.js',
  'media.js',
  'shape-mcp.js',
  'core.js',
];

const args = process.argv.slice(2);
const FLAGS = new Set(args.filter((a) => a.startsWith('--')));
const NAME_FILTERS = args.filter((a) => !a.startsWith('--'));
const STRICT = FLAGS.has('--strict');
const JSON_OUT = FLAGS.has('--json');
const QUIET = FLAGS.has('--quiet');

function fail(message) {
  process.stdout.write(`FAIL  baskets harness: ${message}\n`);
  process.exit(1);
}

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// --- DOM runtime -----------------------------------------------------------

async function makeWindow(baseUrl) {
  let JSDOM;
  try {
    ({ JSDOM } = await import('jsdom'));
  } catch (e) {
    fail(
      'jsdom is not installed. Run the workspace install (bun install / npm install) ' +
        'so the harness has a DOM to run the engine in.'
    );
  }
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: baseUrl,
    pretendToBeVisual: true,
    runScripts: 'outside-only',
  });
  return dom.window;
}

function loadFoundation(win) {
  const loaded = [];
  for (const file of LOAD_ORDER) {
    const full = path.join(FOUNDATION_DIR, file);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, 'utf8');
    // Foundation files attach to window.UCB. eval runs them in the window's
    // global scope so DOMParser / document / window resolve naturally.
    win.eval(src);
    loaded.push(file);
  }
  return loaded;
}

// --- normalisation ---------------------------------------------------------

function makeNormaliser(aliases) {
  const map = aliases || {};
  return function normalise(kind) {
    if (kind == null) return null;
    const k = String(kind).trim().toLowerCase();
    if (!k) return null;
    return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : k;
  };
}

// Collect the set of basket kinds present in a CanonicalBlock[] tree.
function collectKinds(blocks, normalise, out) {
  if (!Array.isArray(blocks)) return out;
  for (const b of blocks) {
    if (!b || typeof b !== 'object') continue;
    const k = normalise(b.kind);
    if (k) out.add(k);
    if (Array.isArray(b.items)) collectKinds(b.items, normalise, out);
  }
  return out;
}

// Count repeated sibling groups (repeat >= 3) anywhere in a Region tree.
function countRepeatGroups(region, seen) {
  if (!region || typeof region !== 'object') return 0;
  if (seen.has(region)) return 0;
  seen.add(region);
  let n = 0;
  if (region.kind === 'group' && Number(region.repeat) >= 3) n += 1;
  for (const child of region.children || []) n += countRepeatGroups(child, seen);
  for (const item of region.items || []) n += countRepeatGroups(item, seen);
  return n;
}

// --- main ------------------------------------------------------------------

async function main() {
  if (!fs.existsSync(EVAL_PATH)) fail(`missing eval.json at ${EVAL_PATH}`);
  if (!fs.existsSync(FIXTURE_DIR)) fail(`missing fixtures dir at ${FIXTURE_DIR}`);
  const spec = loadJSON(EVAL_PATH);
  const normalise = makeNormaliser(spec.aliases);
  const thresholds = spec.thresholds || {};

  let fixtures = spec.fixtures || [];
  if (NAME_FILTERS.length) {
    fixtures = fixtures.filter((f) =>
      NAME_FILTERS.some((n) => f.file.includes(n) || (f.category || '').includes(n))
    );
  }
  if (!fixtures.length) fail('no fixtures matched');

  const baseUrl = 'https://fixture.local/';
  const win = await makeWindow(baseUrl);
  const loaded = loadFoundation(win);

  const UCB = win.UCB;
  const haveEngine = UCB && UCB.pipeline && typeof UCB.pipeline.run === 'function';
  const registered = new Set(
    UCB && UCB.baskets ? Object.keys(UCB.baskets).map((k) => normalise(k)).filter(Boolean) : []
  );

  // Aggregated confusion counts per basket type (only for registered baskets).
  const counts = {}; // type -> { tp, fp, fn }
  const pending = {}; // type -> count of fixtures that expect it but it is not registered
  const bump = (type, field) => {
    if (!counts[type]) counts[type] = { tp: 0, fp: 0, fn: 0 };
    counts[type][field] += 1;
  };

  const rows = [];
  let fixtureErrors = 0;
  let nativeMismatches = 0;
  let segMismatches = 0;

  for (const fx of fixtures) {
    const file = path.join(FIXTURE_DIR, fx.file);
    const row = { file: fx.file, category: fx.category, error: null };
    if (!fs.existsSync(file)) {
      row.error = 'fixture file missing';
      fixtureErrors += 1;
      rows.push(row);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    const expect = fx.expect || {};
    const expected = new Set((expect.baskets || []).map(normalise).filter(Boolean));

    // Engine off (no pipeline.run): this is the v0.5.x baseline. Nothing to
    // score and nothing can regress, so skip rather than error. Stays green.
    if (!haveEngine) {
      row.skipped = true;
      row.pending = [...expected].sort();
      rows.push(row);
      continue;
    }

    let result = null;
    let detected = new Set();
    try {
      result = UCB.pipeline.run(html, baseUrl);
      if (!result || typeof result !== 'object' || !Array.isArray(result.blocks)) {
        throw new Error('pipeline.run did not return { blocks: [] }');
      }
      detected = collectKinds(result.blocks, normalise, new Set());
    } catch (e) {
      row.error = String((e && e.message) || e);
      fixtureErrors += 1;
      rows.push(row);
      continue;
    }

    // Lane 1 segmentation check (best effort, only if UCB.segment exists).
    let repeatGroups = null;
    if (UCB && typeof UCB.segment === 'function') {
      try {
        const doc = new win.DOMParser().parseFromString(html, 'text/html');
        const ctx = {
          doc,
          base: baseUrl,
          host: 'fixture.local',
          framework: null,
          learned: null,
        };
        const root = UCB.segment(ctx);
        repeatGroups = countRepeatGroups(root, new Set());
      } catch (e) {
        repeatGroups = null; // segmentation failure is reported, not fatal here
      }
    }

    // Score per basket type, splitting active (registered) vs pending.
    const universe = new Set([...expected, ...detected, ...registered]);
    for (const type of universe) {
      const exp = expected.has(type);
      const det = detected.has(type);
      if (!registered.has(type)) {
        if (exp) pending[type] = (pending[type] || 0) + 1;
        continue;
      }
      if (exp && det) bump(type, 'tp');
      else if (exp && !det) bump(type, 'fn');
      else if (!exp && det) bump(type, 'fp');
    }

    // usedNative expectation (soft). A "usedNative: false" expectation is only
    // enforceable once at least one of the fixture's expected baskets is
    // actually registered; otherwise a partial engine legitimately falls back
    // to native and should not be penalised for lanes that do not exist yet.
    const usedNative = !!(result.usedNative || result.blocks.length === 0);
    const activeExpectedCount = [...expected].filter((t) => registered.has(t)).length;
    const nativeEnforceable = expect.usedNative === true || activeExpectedCount > 0;
    row.usedNative = usedNative;
    if (typeof expect.usedNative === 'boolean' && expect.usedNative !== usedNative && nativeEnforceable) {
      row.nativeMismatch = true;
      nativeMismatches += 1;
    }

    // repeatGroups expectation (soft).
    if (typeof expect.repeatGroups === 'number' && repeatGroups != null) {
      row.repeatGroups = repeatGroups;
      if (repeatGroups < expect.repeatGroups) {
        row.segMismatch = true;
        segMismatches += 1;
      }
    } else if (repeatGroups != null) {
      row.repeatGroups = repeatGroups;
    }

    row.blocks = result.blocks.length;
    row.expected = [...expected].sort();
    row.detected = [...detected].sort();
    row.missing = [...expected].filter((t) => registered.has(t) && !detected.has(t)).sort();
    row.pending = [...expected].filter((t) => !registered.has(t)).sort();
    // "extra" means a registered basket fired where it was not expected (a real
    // precision miss). Unregistered nested item labels (e.g. crumb/stat/slide)
    // are not baskets and are not reported here.
    row.extra = [...detected].filter((t) => registered.has(t) && !expected.has(t)).sort();
    rows.push(row);
  }

  // Aggregate metrics over registered baskets.
  let TP = 0;
  let FP = 0;
  let FN = 0;
  const perBasket = {};
  for (const [type, c] of Object.entries(counts)) {
    TP += c.tp;
    FP += c.fp;
    FN += c.fn;
    perBasket[type] = {
      tp: c.tp,
      fp: c.fp,
      fn: c.fn,
      precision: c.tp + c.fp ? c.tp / (c.tp + c.fp) : null,
      recall: c.tp + c.fn ? c.tp / (c.tp + c.fn) : null,
    };
  }
  const precision = TP + FP ? TP / (TP + FP) : null;
  const recall = TP + FN ? TP / (TP + FN) : null;

  const report = {
    foundationLoaded: loaded,
    haveEngine,
    registeredBaskets: [...registered].sort(),
    fixtures: rows,
    perBasket,
    overall: { tp: TP, fp: FP, fn: FN, precision, recall },
    pendingBaskets: pending,
    fixtureErrors,
    nativeMismatches,
    segMismatches,
  };

  // --- gate ---
  const errGate = fixtureErrors <= (thresholds.maxFixtureErrors ?? 0);
  let qualityGate = true;
  const reasons = [];
  if (!errGate) reasons.push(`${fixtureErrors} fixture error(s)`);
  if (STRICT) {
    if (typeof thresholds.precision === 'number' && precision != null && precision < thresholds.precision) {
      qualityGate = false;
      reasons.push(`precision ${precision.toFixed(2)} < ${thresholds.precision}`);
    }
    if (typeof thresholds.recall === 'number' && recall != null && recall < thresholds.recall) {
      qualityGate = false;
      reasons.push(`recall ${recall.toFixed(2)} < ${thresholds.recall}`);
    }
    if (nativeMismatches) reasons.push(`${nativeMismatches} usedNative mismatch(es)`);
    if (segMismatches) reasons.push(`${segMismatches} segmentation shortfall(s)`);
    if (nativeMismatches || segMismatches) qualityGate = false;
  }
  const passed = errGate && qualityGate;
  report.passed = passed;
  report.reasons = reasons;

  if (JSON_OUT) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  } else if (!QUIET) {
    printHuman(report, { strict: STRICT });
  }

  const pct = (v) => (v == null ? '  n/a' : `${(v * 100).toFixed(0).padStart(3)}%`);
  const summary =
    `${passed ? 'PASS' : 'FAIL'}  baskets harness: ` +
    `${rows.length} fixtures, ${fixtureErrors} errors | ` +
    `precision ${pct(precision)} recall ${pct(recall)} | ` +
    `engine=${haveEngine ? 'on' : 'off'} baskets=${registered.size}` +
    (reasons.length ? ` | ${reasons.join('; ')}` : '');
  process.stdout.write(summary + '\n');

  process.exit(passed ? 0 : 1);
}

function printHuman(report, opts) {
  const line = (s) => process.stdout.write(s + '\n');
  line('');
  line(`Foundation loaded : ${report.foundationLoaded.join(', ') || '(none)'}`);
  line(`Engine present    : ${report.haveEngine ? 'yes' : 'no'}`);
  line(`Registered baskets: ${report.registeredBaskets.join(', ') || '(none)'}`);
  line('');
  line('Per fixture:');
  const pad = (s, n) => String(s).padEnd(n);
  line('  ' + pad('fixture', 24) + pad('blocks', 8) + pad('native', 8) + pad('groups', 8) + 'detected / missing / pending');
  for (const r of report.fixtures) {
    if (r.error) {
      line('  ' + pad(r.file, 24) + 'ERROR  ' + r.error);
      continue;
    }
    if (r.skipped) {
      line('  ' + pad(r.file, 24) + 'skipped (engine off)');
      continue;
    }
    const detail =
      `[${r.detected.join(',') || '-'}]` +
      (r.missing.length ? ` miss:[${r.missing.join(',')}]` : '') +
      (r.pending.length ? ` pend:[${r.pending.join(',')}]` : '') +
      (r.extra.length ? ` extra:[${r.extra.join(',')}]` : '');
    line(
      '  ' +
        pad(r.file, 24) +
        pad(r.blocks, 8) +
        pad(r.usedNative ? 'yes' : 'no', 8) +
        pad(r.repeatGroups == null ? '-' : r.repeatGroups, 8) +
        detail
    );
  }
  line('');
  line('Per basket (registered only):');
  const keys = Object.keys(report.perBasket).sort();
  if (!keys.length) line('  (no registered baskets scored yet)');
  for (const k of keys) {
    const b = report.perBasket[k];
    const p = b.precision == null ? 'n/a' : (b.precision * 100).toFixed(0) + '%';
    const rc = b.recall == null ? 'n/a' : (b.recall * 100).toFixed(0) + '%';
    line(`  ${k.padEnd(14)} precision ${String(p).padStart(4)}  recall ${String(rc).padStart(4)}  (tp ${b.tp} fp ${b.fp} fn ${b.fn})`);
  }
  const pend = Object.keys(report.pendingBaskets).sort();
  if (pend.length) {
    line('');
    line('Pending baskets (expected but no lane registered them yet):');
    for (const k of pend) line(`  ${k.padEnd(14)} expected in ${report.pendingBaskets[k]} fixture(s)`);
  }
  line('');
}

main().catch((e) => fail(String((e && e.stack) || e)));
