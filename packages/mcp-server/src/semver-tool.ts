import { stampMeta } from "./connector-meta.js";

const SEMVER_RE = /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/;

function parse(v: string) {
  const m = v.trim().match(SEMVER_RE);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], prerelease: m[4] || null, build: m[5] || null };
}

export async function semverParse(args: Record<string, unknown>) {
  const version = String(args.version ?? "").trim();
  if (!version) return { error: "version is required" };
  const parsed = parse(version);
  if (!parsed) return { error: `Invalid semver: ${version}` };
  return stampMeta({ ...parsed, original: version, valid: true }, {
    source: "local semver parser",
    fetched_at: new Date().toISOString(),
    next_steps: ["use major/minor/patch for comparison", "check prerelease for pre-release tags"],
  });
}

export async function semverCompare(args: Record<string, unknown>) {
  const a = String(args.version_a ?? "").trim();
  const b = String(args.version_b ?? "").trim();
  if (!a || !b) return { error: "version_a and version_b are required" };
  const pa = parse(a);
  const pb = parse(b);
  if (!pa) return { error: `Invalid semver: ${a}` };
  if (!pb) return { error: `Invalid semver: ${b}` };
  let result: "equal" | "greater" | "less";
  if (pa.major !== pb.major) result = pa.major > pb.major ? "greater" : "less";
  else if (pa.minor !== pb.minor) result = pa.minor > pb.minor ? "greater" : "less";
  else if (pa.patch !== pb.patch) result = pa.patch > pb.patch ? "greater" : "less";
  else result = "equal";
  return stampMeta({ version_a: a, version_b: b, result, a_is: `${result} than b` }, {
    source: "local semver comparator",
    fetched_at: new Date().toISOString(),
    next_steps: ["result is 'greater', 'less', or 'equal'", "prerelease tags are not compared"],
  });
}
