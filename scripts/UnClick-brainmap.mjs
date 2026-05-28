#!/usr/bin/env node

import crypto from "node:crypto";
import { existsSync, realpathSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

export const GENERATED_PATH = "docs/UnClick-brainmap.generated.md";
export const GENERATED_DATA_PATH = "docs/UnClick-brainmap.generated.json";

const CORE_SOURCES = [
  "AUTOPILOT.md",
  "FLEET_SYNC.md",
  "docs/unclick-context-boot-packet.md",
  "docs/agent-observability.md",
  "docs/pinballwake-nudgeonly-api.md",
  "docs/pinballwake-igniteonly-api.md",
  "docs/fleet-worker-roles.md",
  "docs/adr/0005-two-layer-admin-gating.md",
  "docs/adr/0006-orchestrator-is-user-chat.md",
  "src/App.tsx",
  "src/pages/admin/AdminShell.tsx",
  "src/pages/admin/AdminSkills.tsx",
  "src/lib/skillLibrary.ts",
  "src/lib/skillLibrarySeeds.ts",
  ".github/workflows/ci.yml",
  ".github/workflows/brainmap-auto-update.yml",
  "package.json",
];

const ALIASES = [
  ["EnterprisePass", "CompliancePass", "Enterprise readiness checks need a public-safe product name."],
  ["QualityPass", "SlopPass", "Old QualityPass references now resolve to SlopPass."],
  ["Fishbowl", "Boardroom", "Internal worker discussion becomes a user-facing room name."],
  ["To-Do List", "Jobs", "Task queue language maps to the current admin Jobs surface."],
  ["Heartbeat", "Heartbeat Master", "The copy policy that teaches scheduled seats how to pulse."],
  ["NudgeOnlyAPI", "NudgeOnly", "Low-risk receipt nudges, never source-of-truth mutation."],
  ["IgniteOnlyAPI", "IgniteOnly", "Verified worker wake packets, never build, merge, or completion state."],
];

const WORKERS = [
  ["Coordinator", "Routes work, chooses the next room, and keeps lanes aligned."],
  ["Builder", "Implements focused code or content changes from a scoped packet."],
  ["Tester", "Runs proof and reports what passed or blocked."],
  ["Reviewer", "Checks quality, regressions, and missing tests."],
  ["Safety Checker", "Protects secrets, auth, destructive actions, and release gates."],
  ["Ledger", "Records proof, receipts, approvals, and rollback evidence."],
  ["Publisher", "Moves approved work toward deployment and public proof."],
  ["Improver", "Turns repeated pain into system improvements."],
];

const ROUTE_WRAPPER_COMPONENTS = new Set(["Navigate", "RequireAdmin", "RequireAuth"]);

const SEAT_INDUCTION = [
  [
    "1",
    "Load UnClick Memory",
    "Read standing rules, recent facts, and source-linked context before interpreting the work.",
    "UnClick Memory",
    "mcp__unclick__.load_memory",
  ],
  [
    "2",
    "Log, then read Orchestrator",
    "Save the accepted turn, read Orchestrator continuity, and treat it as context rather than queue authority.",
    "Orchestrator",
    "/admin/orchestrator",
  ],
  [
    "3",
    "Open Boardroom Jobs",
    "Use Jobs as the source of truth for active work, proof state, blockers, and safe next action.",
    "Boardroom Jobs",
    "/admin/jobs",
  ],
  [
    "4",
    "Pass through Brainmap",
    "Use the generated ecosystem map to find current routes, tools, rooms, workers, aliases, and safety gates.",
    "Ecosystem Brainmap",
    "/admin/brainmap",
  ],
  [
    "5",
    "Choose the Launchpad lane",
    "Route the work through the safest current Autopilot lane before acting or handing off.",
    "Launchpad",
    "/admin/pinballwake",
  ],
  [
    "6",
    "Ask Crews Council if needed",
    "Run Council Lite on material work, then prompt full Crews Council for launch, risk, mixed proof, or broad XPass evidence.",
    "Crews Council",
    "scripts/pinballwake-launchpad-room.mjs",
  ],
  [
    "7",
    "Check proof gates",
    "Name required PR, commit, test, CI, live, screenshot, CopyRoom, or NO_CODE_NEEDED proof before closing.",
    "Proof Ledger",
    "docs/agent-observability.md",
  ],
  [
    "8",
    "Dogtest the outcome",
    "Run the focused local tests and browser or live proof that match the touched surface.",
    "XPass and CI",
    "package.json",
  ],
  [
    "9",
    "Reply and log proof",
    "End with PASS or BLOCKER, proof link or id, cleanup state, and next safe step.",
    "Boardroom and Orchestrator",
    "/admin/jobs",
  ],
];

const DIVISIONS = [
  ["Admin surfaces", "Private operator views and internal control panels."],
  ["Public surfaces", "Public product, docs, marketplace, and user-facing routes."],
  ["Tools", "MCP and gateway capabilities available to seats."],
  ["Rooms", "PinballWake and Boardroom lanes that route work."],
  ["Workers and seats", "Human and AI roles that move work through the system."],
  ["Passes and gates", "Quality, proof, safety, and fidelity checks."],
  ["Wrappers and protocols", "Thin harnesses, bridges, policies, and routing helpers."],
  ["Automations", "Scheduled jobs, wake routes, cron workflows, and recurring checks."],
  ["Ledgers and proof", "Receipts, audits, evidence, and proof-of-work surfaces."],
  ["Source of truth", "Canonical state, queue, memory, and context surfaces."],
  ["Modules and apps", "Apps, packages, and product modules that make up UnClick."],
  ["Launch and onboarding", "Launchpad, Heartbeat, Brainmap, and first-seat orientation."],
];

const STATIC_SYSTEMS = [
  ["Launch and onboarding", "Launchpad", "route", "Control hub that points seats to the next safe operating lane.", "scripts/pinballwake-launchpad-room.mjs", "/admin/pinballwake"],
  ["Launch and onboarding", "Crews Council Induction", "judgement prompt", "Launchpad prompt that runs Council Lite on material work and asks for a full Crews Council only when launch, risk, mixed proof, or broad XPass evidence needs judgement.", "scripts/pinballwake-launchpad-room.mjs", "/admin/pinballwake"],
  ["Launch and onboarding", "Heartbeat Master", "policy", "Canonical schedule prompt and procedure for safe heartbeat seats.", "src/pages/admin/AdminSeatHeartbeat.tsx", "/admin/agents/heartbeat"],
  ["Launch and onboarding", "Ecosystem Brainmap", "map", "Generated sitemap and system map that teaches seats what UnClick contains.", "src/pages/admin/AdminBrainmap.tsx", "/admin/brainmap"],
  ["Source of truth", "Boardroom Jobs", "queue", "Primary work source for open, in-progress, done, and dropped chips.", "src/pages/admin/AdminJobs.tsx", "/admin/jobs"],
  ["Source of truth", "Orchestrator", "context", "Continuity stream and story layer that helps seats understand what happened.", "src/pages/admin/AdminOrchestrator.tsx", "/admin/orchestrator"],
  ["Source of truth", "Memory Library", "memory", "Source-linked facts, sessions, context, and generated memory shelves.", "src/pages/admin/AdminMemory.tsx", "/admin/memory"],
  ["Passes and gates", "CopyRoom", "fidelity gate", "Exact-copy room for code, docs, tables, notes, and source text so seats do not retype drift-prone material.", "docs/UnClick-brainmap.generated.md", ""],
  ["Passes and gates", "FidelityPass", "fidelity gate", "Checks exactness and invariant preservation when copying, refactoring, or translating content.", "scripts/fidelitycopy.test.mjs", ""],
  ["Passes and gates", "CommonSensePass", "judgment gate", "Plain-reasoning gate used before healthy, done, merge-ready, or PASS claims.", "api/commonsensepass-bridge.test.ts", ""],
  ["Passes and gates", "WakePass", "wake gate", "Verifies ACKs, stale handoffs, and worker wake requests before motion claims.", "docs/pinballwake-igniteonly-api.md", ""],
  ["Wrappers and protocols", "NudgeOnly", "bridge", "Low-risk receipt nudges that never mutate source-of-truth state.", "docs/pinballwake-nudgeonly-api.md", ""],
  ["Wrappers and protocols", "IgniteOnly", "bridge", "Verified worker wake packets only, never build, merge, or completion state.", "docs/pinballwake-igniteonly-api.md", ""],
  ["Wrappers and protocols", "SeatRelay", "claim lifecycle", "Stale release, smart reassignment, and bonded handoff for stuck worker claims.", "docs/UnClick-brainmap.generated.md", ""],
  ["Ledgers and proof", "Proof Ledger", "ledger", "Structured evidence, proof freshness, receipts, and DONE trust surface.", "docs/agent-observability.md", ""],
  ["Modules and apps", "Skills Library", "skill library", "Read-only starter pack of UnClick-native skills, hardwired rails, hybrid workflows, and portable skill packages.", "src/pages/admin/AdminSkills.tsx", "/admin/skills"],
  ["Modules and apps", "JobSmith", "app", "CV, cover-letter, job application, and rules/checklist engine.", "apps/jobsmith/package.json", "/admin/jobsmith"],
  ["Modules and apps", "AutoPilotKit", "automation module", "Internal automation bolt-on for proof-first work motion.", "AUTOPILOT.md", ""],
  ["Workers and seats", "Cursor Builder Seat", "seat", "External builder lane used for scoped code work and PRs.", "docs/fleet-worker-roles.md", ""],
  ["Workers and seats", "Claude Reviewer Seat", "seat", "External reviewer lane used for independent checks and proof review.", "docs/fleet-worker-roles.md", ""],
  ["Workers and seats", "Codex Builder Seat", "seat", "Codex lane used for scoped implementation, routing, and proof updates.", "docs/fleet-worker-roles.md", ""],
];

const PAGE_MEANINGS = {
  AdminAnalytics: "Internal analytics view for platform signals and usage.",
  AdminAuditLog: "Internal audit trail for sensitive admin actions.",
  AdminBrainmap: "Generated ecosystem map that teaches seats what UnClick is.",
  AdminCodebase: "Internal source and architecture orientation surface.",
  AdminDashboard: "Front door for current operator state.",
  AdminJobs: "Operational job and task queue.",
  AdminKeychain: "Passport and credential connection health.",
  AdminMemory: "Admin view of persistent memory, facts, sessions, and recall.",
  AdminOrchestrator: "Readable continuity stream for seats and operator context.",
  AdminPinballWake: "PinballWake rooms, wake routes, and automation visibility.",
  AdminSeatHeartbeat: "Master heartbeat copy policy for scheduled AI seats.",
  AdminSettings: "Account and admin configuration.",
  AdminSystemHealth: "Health checks and operational status.",
  AdminSkills: "Read-only starter pack of UnClick-native skills, native rails, and portable SKILL.md packages.",
  AdminTools: "Apps, tools, and connector capability surface.",
  AdminUsers: "Internal user management.",
  AdminYou: "Personal account, identity, and access panel.",
  BrainMap: "Legacy Memory Brain Map component kept distinct from ecosystem Brainmap.",
  Fishbowl: "Boardroom discussion surface for worker coordination.",
};

const PUBLIC_PAGE_MEANINGS = {
  Index: "Public home and first explanation of UnClick.",
  Memory: "Public memory product page.",
  Tools: "Public tools marketplace entry point.",
  Developers: "Developer-facing entry point.",
  DeveloperDocs: "Developer documentation.",
  DeveloperSubmit: "Tool submission flow.",
  Crews: "Public Crews explanation and entry point.",
  BuildDesk: "Build and project work surface.",
  DogfoodReport: "Public dogfood proof report.",
  Pricing: "Plans, billing, and packaging.",
  Privacy: "Privacy policy.",
  Terms: "Terms of service.",
  Login: "Sign-in page.",
  Signup: "Sign-up page.",
  Dispatch: "Dispatch and message handoff surface.",
  NewToAI: "Beginner-friendly AI orientation.",
};

function titleFromName(name) {
  return name
    .replace(/\.(tsx|ts|mjs|md|json)$/i, "")
    .replace(/^Admin/, "Admin ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentence(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.endsWith(".") ? text : `${text}.`;
}

function meaningForPage(file) {
  const base = path.basename(file, path.extname(file));
  if (PAGE_MEANINGS[base]) return PAGE_MEANINGS[base];
  if (PUBLIC_PAGE_MEANINGS[base]) return PUBLIC_PAGE_MEANINGS[base];
  if (file.includes("/tools/")) return `Tool page for ${titleFromName(base)}.`;
  if (file.includes("/arena/")) return `Arena page for ${titleFromName(base)}.`;
  if (file.includes("/admin/crews/")) return `Crews admin page for ${titleFromName(base)}.`;
  if (file.includes("/admin/memory/")) return `Memory admin panel for ${titleFromName(base)}.`;
  if (file.includes("/admin/")) return `Admin surface for ${titleFromName(base)}.`;
  return `User-facing page for ${titleFromName(base)}.`;
}

function meaningForComponent(component, file) {
  if (PAGE_MEANINGS[component]) return PAGE_MEANINGS[component];
  if (PUBLIC_PAGE_MEANINGS[component]) return PUBLIC_PAGE_MEANINGS[component];
  return meaningForPage(file);
}

function displayPageName(component, file) {
  const sourceBase = path.basename(file, path.extname(file));
  if (component.endsWith("Page") && (PAGE_MEANINGS[sourceBase] || PUBLIC_PAGE_MEANINGS[sourceBase])) {
    return titleFromName(sourceBase);
  }
  return titleFromName(component.replace(/Page$/, ""));
}

function meaningForTool(file) {
  const base = path.basename(file, ".ts").replace(/-tool$/, "");
  const name = titleFromName(base);
  if (base === "nudgeonly") return "NudgeOnly low-token receipt bridge and advisory classifier.";
  if (base === "igniteonly") return "IgniteOnly verified worker wake packet bridge.";
  if (base === "heartbeat-protocol") return "Canonical heartbeat policy served to scheduled seats.";
  if (base.includes("testpass")) return "TestPass proof and test orchestration capability.";
  if (base.includes("uxpass")) return "UXPass experience verification capability.";
  return `${name} MCP capability, available through the UnClick tool gateway.`;
}

function displayToolName(file) {
  const base = path.basename(file, ".ts").replace(/-tool$/, "");
  if (base === "nudgeonly") return "NudgeOnly";
  if (base === "igniteonly") return "IgniteOnly";
  if (base === "heartbeat-protocol") return "Heartbeat Protocol";
  return titleFromName(base);
}

function resolveImportPath(importPath) {
  if (!importPath.startsWith(".")) return null;
  const normalized = path.posix.normalize(path.posix.join("src", importPath));
  return normalized.replace(/^\.\//, "");
}

function parseRouteEntries(appSource) {
  const imports = new Map();
  const defaultImportPattern = /import\s+([A-Za-z_$][\w$]*)\s+from\s+"([^"]+)"/g;
  for (const match of appSource.matchAll(defaultImportPattern)) {
    const resolved = resolveImportPath(match[2]);
    if (resolved) imports.set(match[1], resolved);
  }

  const namedImportPattern = /import\s+\{([^}]+)\}\s+from\s+"([^"]+)"/g;
  for (const match of appSource.matchAll(namedImportPattern)) {
    const resolved = resolveImportPath(match[2]);
    if (!resolved) continue;
    for (const rawName of match[1].split(",")) {
      const [imported, alias] = rawName.trim().split(/\s+as\s+/);
      const name = (alias || imported || "").trim();
      if (name) imports.set(name, resolved);
    }
  }

  const entries = [];
  const routePattern = /<Route\s+path="([^"]+)"[\s\S]*?element=\{([\s\S]*?)\}\s*\/?>/g;
  for (const match of appSource.matchAll(routePattern)) {
    const rawPath = match[1];
    if (!rawPath || rawPath === "*") continue;
    const components = [...match[2].matchAll(/<([A-Z][A-Za-z0-9_]*)\b/g)]
      .map((componentMatch) => componentMatch[1])
      .filter((component) => !ROUTE_WRAPPER_COMPONENTS.has(component));
    const component = components[0];
    if (!component) continue;
    const source = imports.get(component);
    if (!source) continue;
    const route = rawPath.startsWith("/") ? rawPath : `/admin/${rawPath}`;
    entries.push({ route, component, source });
  }

  return entries
    .filter((entry) => !entry.source.includes("/components/"))
    .sort((a, b) => `${a.route}|${a.component}`.localeCompare(`${b.route}|${b.component}`));
}

async function collectRouteEntries(root) {
  return parseRouteEntries(await readText(root, "src/App.tsx"));
}

async function walk(root, start, predicate) {
  const dir = path.join(root, start);
  if (!existsSync(dir)) return [];
  const out = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", "dist", "build", ".git", ".claude"].includes(entry.name)) await visit(full);
      } else if (!predicate || predicate(full)) {
        out.push(path.relative(root, full).replaceAll("\\", "/"));
      }
    }
  }
  await visit(dir);
  return out.sort();
}

async function readText(root, rel) {
  try {
    return (await readFile(path.join(root, rel), "utf8")).replace(/\r\n/g, "\n");
  } catch {
    return "";
  }
}

function hash(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 12);
}

async function manifestRows(root, files) {
  const rows = [];
  for (const rel of files) {
    const text = await readText(root, rel);
    rows.push([rel, text ? hash(text) : "missing", text ? `${text.length}` : "0"]);
  }
  return rows;
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\|/g, "\\|")).join(" | ")} |`),
  ].join("\n");
}

function routeForPage(file) {
  const base = path.basename(file, path.extname(file));
  if (file === "src/pages/admin/AdminBrainmap.tsx") return "/admin/brainmap";
  if (base === "AdminSeatHeartbeat") return "/admin/agents/heartbeat";
  if (base.startsWith("Admin")) return `/admin/${base.replace(/^Admin/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
  if (file.includes("/tools/")) return `/tools/${base.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
  if (file.includes("/arena/")) return `/arena/${base.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
  return base === "Index" ? "/" : `/${base.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
}

function roomName(file) {
  return titleFromName(path.basename(file, ".mjs").replace(/^pinballwake-/, "").replace(/-room$/, ""));
}

function normalizeId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueRows(rows) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    const key = [row.division, row.kind, row.name, row.source, row.route || ""].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out.sort((a, b) =>
    `${a.division}|${a.kind}|${a.name}`.localeCompare(`${b.division}|${b.kind}|${b.name}`),
  );
}

function inventoryItem(division, name, kind, meaning, source, route = "", tags = []) {
  return {
    id: normalizeId(`${division}-${kind}-${name}-${source}-${route || "no-route"}`),
    division,
    name,
    kind,
    meaning: sentence(meaning),
    source,
    route,
    tags,
  };
}

function meaningForScript(file) {
  const base = path.basename(file, ".mjs");
  if (base.includes("pinballwake")) return "PinballWake room, wake, or routing script used by the automation lane.";
  if (base.includes("brainmap")) return "Brainmap generator or freshness check.";
  if (base.includes("autopilot")) return "Autopilot coordination, proof, or wake helper.";
  if (base.includes("receipt")) return "Receipt bridge or proof trail helper.";
  if (base.includes("wake")) return "Wake routing, ACK, or stale-handling helper.";
  return `${titleFromName(base)} operational script.`;
}

function meaningForWorkflow(file) {
  const base = path.basename(file, path.extname(file));
  if (base.includes("brainmap")) return "Scheduled workflow that regenerates the ecosystem Brainmap.";
  if (base.includes("ci")) return "Continuous integration checks for build, tests, and proof safety.";
  if (base.includes("wake")) return "GitHub-triggered wake and routing workflow.";
  return `${titleFromName(base)} GitHub automation workflow.`;
}

function meaningForModule(file) {
  const base = path.basename(file, path.extname(file));
  if (file.startsWith("apps/jobsmith/")) return "JobSmith application module for CV, checklist, and rule-pack work.";
  if (file.startsWith("api/")) return "Server endpoint or helper used by UnClick admin, memory, workers, or tools.";
  if (file.startsWith("packages/")) return "Shared package used by UnClick tools, MCP, or worker lanes.";
  if (file.includes("/lib/")) return `${titleFromName(base)} shared frontend logic.`;
  return `${titleFromName(base)} UnClick module.`;
}

function classifyConceptFile(file) {
  const lower = file.toLowerCase();
  if (/(\.test\.|__tests__|\.spec\.)/.test(lower)) return null;
  if (lower.includes("brainmap")) return ["Launch and onboarding", "brainmap source"];
  if (lower.includes("heartbeat")) return ["Launch and onboarding", "heartbeat source"];
  if (lower.includes("jobsmith")) return ["Modules and apps", "app module"];
  if (lower.includes("autopilot")) return ["Automations", "autopilot module"];
  if (lower.includes("nudgeonly") || lower.includes("igniteonly") || lower.includes("pushonly")) return ["Wrappers and protocols", "bridge"];
  if (lower.includes("wakepass") || lower.includes("testpass") || lower.includes("uxpass") || lower.includes("safetypass") || lower.includes("fidelity")) return ["Passes and gates", "pass"];
  if (lower.includes("ledger") || lower.includes("receipt") || lower.includes("proof")) return ["Ledgers and proof", "proof module"];
  if (lower.includes("orchestrator") || lower.includes("boardroom") || lower.includes("memory")) return ["Source of truth", "state module"];
  return null;
}

async function collectBrainmapModel(root) {
  const pages = await walk(root, "src/pages", (file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"));
  const routeEntries = await collectRouteEntries(root);
  const routedSources = new Set(routeEntries.map((entry) => entry.source));
  const componentPages = pages.filter((file) => !routedSources.has(file));
  const toolFiles = await walk(root, "packages/mcp-server/src", (file) => file.endsWith("-tool.ts") || file.endsWith("heartbeat-protocol.ts"));
  const roomScripts = await walk(root, "scripts", (file) => /pinballwake-.*-room\.mjs$/.test(file));
  const workflowFiles = await walk(root, ".github/workflows", (file) => /\.(yml|yaml)$/.test(file));
  const scriptFiles = await walk(root, "scripts", (file) => /\.(mjs|js|ts)$/.test(file));
  const appPackageFiles = await walk(root, "apps", (file) => file.endsWith("package.json"));
  const packageFiles = await walk(root, "packages", (file) => file.endsWith("package.json"));
  const apiFiles = await walk(root, "api", (file) => /\.(ts|js)$/.test(file) && !file.endsWith(".test.ts"));
  const srcLibFiles = await walk(root, "src/lib", (file) => /\.(ts|tsx)$/.test(file) && !file.endsWith(".test.ts"));
  const skillFiles = await walk(root, "seed/skills", (file) => file.endsWith(".skill.md"));
  const packageJson = JSON.parse(await readText(root, "package.json") || "{}");
  const packageScripts = Object.entries(packageJson.scripts || {}).sort();
  const conceptFiles = [...new Set([...scriptFiles, ...apiFiles, ...srcLibFiles])];
  const sourceFiles = [
    ...new Set([
      ...CORE_SOURCES,
      ...skillFiles,
      ...routeEntries.map((entry) => entry.source),
      ...roomScripts,
      ...toolFiles.slice(0, 40),
      ...workflowFiles,
    ]),
  ];
  const manifest = await manifestRows(root, sourceFiles);

  const pageRows = routeEntries.map(({ route, component, source }) => [
    route,
    displayPageName(component, source),
    sentence(meaningForComponent(component, source)),
    source,
  ]);

  const toolRows = toolFiles.map((file) => [
    displayToolName(file),
    sentence(meaningForTool(file)),
    file,
  ]);

  const roomRows = roomScripts.map((file) => [
    roomName(file),
    `PinballWake room logic generated from ${file}.`,
    file,
  ]);

  const ciRows = packageScripts
    .filter(([name, command]) => /test|build|lint|brainmap/i.test(`${name} ${command}`))
    .map(([name, command]) => [name, command]);

  const inventory = uniqueRows([
    ...STATIC_SYSTEMS.map(([division, name, kind, meaning, source, route]) =>
      inventoryItem(division, name, kind, meaning, source, route),
    ),
    ...routeEntries.map(({ route, component, source }) =>
      inventoryItem(
        route.startsWith("/admin/") || route === "/admin" ? "Admin surfaces" : "Public surfaces",
        displayPageName(component, source),
        route.startsWith("/admin/") || route === "/admin" ? "admin page" : "public page",
        meaningForComponent(component, source),
        source,
        route,
      ),
    ),
    ...componentPages.map((file) =>
      inventoryItem("Modules and apps", titleFromName(path.basename(file)), "component", meaningForPage(file), file),
    ),
    ...toolFiles.map((file) =>
      inventoryItem("Tools", displayToolName(file), "MCP tool", meaningForTool(file), file),
    ),
    ...roomScripts.map((file) =>
      inventoryItem("Rooms", roomName(file), "PinballWake room", `PinballWake room logic generated from ${file}.`, file),
    ),
    ...WORKERS.map(([name, meaning]) =>
      inventoryItem("Workers and seats", name, "worker role", meaning, "docs/fleet-worker-roles.md"),
    ),
    ...workflowFiles.map((file) =>
      inventoryItem("Automations", titleFromName(path.basename(file)), "workflow", meaningForWorkflow(file), file),
    ),
    ...scriptFiles
      .filter((file) => /(wake|autopilot|receipt|brainmap|pinballwake|queue|heartbeat)/i.test(file))
      .map((file) => inventoryItem("Automations", titleFromName(path.basename(file)), "script", meaningForScript(file), file)),
    ...appPackageFiles.map((file) =>
      inventoryItem("Modules and apps", titleFromName(path.dirname(file).split("/").at(-1)), "app", meaningForModule(file), file),
    ),
    ...packageFiles.map((file) =>
      inventoryItem("Modules and apps", titleFromName(path.dirname(file).split("/").at(-1)), "package", meaningForModule(file), file),
    ),
    ...skillFiles.map((file) =>
      inventoryItem(
        "Modules and apps",
        titleFromName(path.basename(file).replace(/\.skill\.md$/, "")),
        "skill package",
        "Agent Skills-compatible starter package with provenance, safety, and native-mode metadata.",
        file,
        "/admin/skills",
      ),
    ),
    ...conceptFiles
      .map((file) => {
        const classification = classifyConceptFile(file);
        if (!classification) return null;
        return inventoryItem(classification[0], titleFromName(path.basename(file)), classification[1], meaningForModule(file), file);
      })
      .filter(Boolean),
  ]);

  const divisionCounts = new Map(inventory.map((item) => [item.division, 0]));
  for (const item of inventory) divisionCounts.set(item.division, (divisionCounts.get(item.division) ?? 0) + 1);

  return {
    schema_version: "brainmap-v2",
    title: "UnClick Ecosystem Brainmap",
    summary: "Generated sitemap, system map, and tool-worker tree for private UnClick onboarding.",
    owner_visibility: {
      route: "/admin/brainmap",
      audience: "private yellow admin",
      owner_email: "creativelead@malamutemayhem.com",
    },
    counts: {
      divisions: DIVISIONS.length,
      inventory: inventory.length,
      source_manifest: manifest.length,
      pages: pageRows.length,
      tools: toolRows.length,
      rooms: roomRows.length,
      workers: WORKERS.length,
    },
    divisions: DIVISIONS.map(([name, meaning]) => ({
      id: normalizeId(name),
      name,
      meaning,
      count: divisionCounts.get(name) ?? 0,
    })),
    inventory,
    pageRows,
    inductionRows: SEAT_INDUCTION,
    toolRows,
    roomRows,
    workerRows: WORKERS,
    aliasRows: ALIASES,
    ciRows,
    source_manifest: manifest.map(([source, sourceHash, bytes]) => ({
      source,
      hash: sourceHash,
      bytes: Number(bytes),
    })),
  };
}

function inventoryTableRows(inventory) {
  return inventory.map((item) => [
    item.division,
    item.kind,
    item.name,
    item.meaning,
    item.route || "-",
    item.source,
  ]);
}

export async function generateBrainmapData({ root = process.cwd() } = {}) {
  const model = await collectBrainmapModel(root);
  return `${JSON.stringify(model, null, 2)}\n`;
}

export async function generateBrainmap({ root = process.cwd() } = {}) {
  const model = await collectBrainmapModel(root);
  const manifest = model.source_manifest.map(({ source, hash: sourceHash, bytes }) => [source, sourceHash, bytes]);

  return [
    "# UnClick Ecosystem Brainmap",
    "",
    "Internal admin only. Auto-generated from tracked source so new AI seats can understand UnClick without a separate handover.",
    "",
    "## Brainmap Data Contract",
    "",
    `- Schema: \`${model.schema_version}\`.`,
    "- This markdown is paired with `docs/UnClick-brainmap.generated.json` for the private admin visual tree.",
    "- The JSON inventory is grouped by division so seats can quickly discover tools, rooms, wrappers, workers, modules, passes, ledgers, and source-of-truth surfaces.",
    "- The generator reruns in CI and on a schedule. New tracked surfaces appear after the generator sees their source paths.",
    "",
    "## Source Manifest",
    "",
    table(["Source", "Hash", "Bytes"], manifest),
    "",
    "## Division Index",
    "",
    table(["Division", "Meaning", "Items"], model.divisions.map((division) => [division.name, sentence(division.meaning), division.count])),
    "",
    "## UnClick Structure",
    "",
    "- UnClick is the platform: tools, memory, agents, proof, and admin surfaces.",
    "- Launchpad is the control hub for Autopilot work.",
    "- Crews Council induction is a Launchpad prompt, not a new Pass product; it uses Council Lite for light dissent and asks for full Crews only when judgement is needed.",
    "- Rooms are the operational stages that route work through research, planning, build, proof, review, safety, merge, publish, repair, and improvement.",
    "- Heartbeat Master at `/admin/agents/heartbeat` teaches scheduled AI seats how to pulse safely.",
    "- Heartbeat policy changes must update the `/admin/agents/heartbeat` source and verify the MASTER induction text. Memory and Brainmap entries are pointers, not the runtime MASTER.",
    "- Ecosystem Brainmap at `/admin/brainmap` teaches seats what the system is and what each surface means.",
    "",
    "## Seat Induction Path",
    "",
    "Every seat should pass through this path before acting on UnClick work. It keeps Brainmap complementary to Launchpad induction: Brainmap explains the map, Launchpad chooses the lane, and Jobs/proof decide what can move.",
    "",
    table(["Step", "Action", "Why it matters", "Surface", "Pointer"], model.inductionRows),
    "",
    "## Pages and Meaning",
    "",
    table(["Route", "Page", "Meaning", "Source"], model.pageRows),
    "",
    "## Tool Families and Meaning",
    "",
    table(["Tool family", "Meaning", "Source"], model.toolRows),
    "",
    "## Tool and Worker Tree",
    "",
    table(["Division", "Kind", "Name", "Meaning", "Route", "Source"], inventoryTableRows(model.inventory)),
    "",
    "## Public/Internal Alias Table",
    "",
    table(["Internal name", "Public name", "Meaning"], model.aliasRows),
    "",
    "## Rooms List",
    "",
    table(["Room", "Meaning", "Source"], model.roomRows),
    "",
    "## Workers List",
    "",
    table(["Worker", "Meaning"], model.workerRows),
    "",
    "## Safety Rules",
    "",
    "- Admin-only surfaces use `RequireAdmin` and must also be hidden from non-admin sidebar navigation.",
    "- Brainmap visual admin is owner-only for `creativelead@malamutemayhem.com` inside the Yellow Private Admin lane.",
    "- NudgeOnly can request receipt or escalation only. Trusted lanes verify before action.",
    "- IgniteOnly can request worker wake packets only. Trusted lanes still build, review, merge, and record proof.",
    "- Heartbeats must never print keys or credentials.",
    "- Generated Brainmap changes must come from source updates plus regenerated artifacts, not hand editing the generated files.",
    "- Proof should include TestPass, Reviewer, Safety Checker, and Ledger-style evidence where applicable.",
    "",
    "## Launchpad Route",
    "",
    "- Launchpad routes work from Coordinator to Builder, Tester, Reviewer, Safety Checker, and Ledger PASS.",
    "- Launchpad checks Council induction so Council Lite is always visible on material work, and full Crews appears when launch, risk, mixed XPass proof, or broad evidence needs judgement.",
    "- Launchpad readiness is represented in `scripts/pinballwake-launchpad-room.mjs` and related tests.",
    "- User-facing control lives in Autopilot admin surfaces, with worker discussion in Boardroom.",
    "",
    "## Ledger Rules",
    "",
    "- Ledger records proof, approvals, receipts, worker status, rollback notes, and audit trails.",
    "- PASS means proof exists and cleanup is done.",
    "- BLOCKER means a safe reason, checked progress, and next fix are recorded.",
    "- Receipts should use source links, run ids, commit ids, PRs, or generated artifact hashes.",
    "",
    "## CI and Stale Guard",
    "",
    table(["Script", "Command"], model.ciRows),
    "",
    "- `node scripts/UnClick-brainmap.mjs --check` fails if `docs/UnClick-brainmap.generated.md` is stale.",
    "- `node scripts/UnClick-brainmap.mjs --check` also fails if `docs/UnClick-brainmap.generated.json` is stale.",
    "- `node --test scripts/UnClick-brainmap.test.mjs` verifies required sections and meaning rows.",
    "",
  ].join("\n");
}

async function main() {
  const root = process.cwd();
  const target = path.join(root, GENERATED_PATH);
  const dataTarget = path.join(root, GENERATED_DATA_PATH);
  const generated = await generateBrainmap({ root });
  const generatedData = await generateBrainmapData({ root });
  const check = process.argv.includes("--check");
  const existing = await readText(root, GENERATED_PATH);
  const existingData = await readText(root, GENERATED_DATA_PATH);
  if (check) {
    let stale = false;
    if (existing !== generated) {
      console.error(`${GENERATED_PATH} is stale. Run node scripts/UnClick-brainmap.mjs.`);
      stale = true;
    }
    if (existingData !== generatedData) {
      console.error(`${GENERATED_DATA_PATH} is stale. Run node scripts/UnClick-brainmap.mjs.`);
      stale = true;
    }
    if (stale) process.exitCode = 1;
    return;
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, generated, "utf8");
  await writeFile(dataTarget, generatedData, "utf8");
  console.log(`Wrote ${GENERATED_PATH}`);
  console.log(`Wrote ${GENERATED_DATA_PATH}`);
}

function sameExecutablePath(left, right) {
  const normalize = (value) => {
    const resolved = path.resolve(value);
    let real = resolved;
    try {
      real = realpathSync.native(resolved);
    } catch {
      real = resolved;
    }
    return process.platform === "win32" ? real.toLowerCase() : real;
  };

  return normalize(left) === normalize(right);
}

if (process.argv[1] && sameExecutablePath(fileURLToPath(import.meta.url), process.argv[1])) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
