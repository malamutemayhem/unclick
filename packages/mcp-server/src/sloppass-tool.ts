/**
 * sloppass-tool - MCP handler for deterministic SlopPass runs.
 *
 * The tool sends caller-provided file text or unified diff text to
 * /api/sloppass. For GitHub PR targets it can fetch the public .diff before
 * forwarding that diff. SlopPass does not execute code, clone repositories,
 * persist source content, or make paid model calls by default.
 */

import { unclickNotConfigured, type NotConnectedResult } from "./connection-help.js";

const GITHUB_PR_DIFF_MAX_BYTES = 2_000_000;
const GITHUB_REPO_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{0,38}\/[A-Za-z0-9._-]{1,100}$/;

interface GithubPrDiffTarget {
  repo: string;
  number: number;
  htmlUrl: string;
  diffUrl: string;
  label: string;
}

function getApiBase(): string {
  return (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
}

function getApiKey(): string | NotConnectedResult {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) return unclickNotConfigured();
  return key;
}

async function callApi(body: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey();
  if (typeof apiKey !== "string") return apiKey;
  const response = await fetch(`${getApiBase()}/api/sloppass?action=run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Keep raw text.
  }
  if (!response.ok) return { error: `sloppass API failed (HTTP ${response.status})`, body: parsed };
  return parsed;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? value as Record<string, unknown> : null;
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function parsePrNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  if (typeof value === "string" && /^[1-9]\d*$/.test(value.trim())) {
    return Number.parseInt(value.trim(), 10);
  }
  return null;
}

function parseGithubPrUrl(value: unknown): GithubPrDiffTarget | { error: string } | null {
  const raw = nonEmptyString(value);
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { error: "target.url/pr_url must be a GitHub pull request URL" };
  }
  if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "github.com") {
    return { error: "target.url/pr_url must be a GitHub pull request URL" };
  }
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length < 4 || parts[2] !== "pull") {
    return { error: "target.url/pr_url must be a GitHub pull request URL" };
  }
  const repo = `${parts[0]}/${parts[1]}`;
  if (!GITHUB_REPO_PATTERN.test(repo)) return { error: "target.url/pr_url must be a GitHub pull request URL" };
  const number = parsePrNumber(parts[3]);
  if (!number) return { error: "target.url/pr_url must include a positive PR number" };
  const htmlUrl = `https://github.com/${repo}/pull/${number}`;
  return {
    repo,
    number,
    htmlUrl,
    diffUrl: `${htmlUrl}.diff`,
    label: `GitHub PR ${repo}#${number}`,
  };
}

function resolveGithubPrDiffTarget(target: Record<string, unknown>): GithubPrDiffTarget | { error: string } {
  const fromUrl = parseGithubPrUrl(target.pr_url ?? target.url);
  if (fromUrl) return fromUrl;

  const repo = nonEmptyString(target.repo);
  const ref = nonEmptyString(target.ref);
  if (!repo && ref?.startsWith("https://github.com/")) {
    const fromRef = parseGithubPrUrl(ref);
    if (fromRef) return fromRef;
  }
  if (!repo) {
    return { error: "target.kind=pr requires target.repo plus target.number, or target.url/pr_url for a GitHub PR" };
  }
  if (!GITHUB_REPO_PATTERN.test(repo)) return { error: "target.repo must use GitHub owner/repo form" };
  const number = parsePrNumber(target.number);
  if (!number) return { error: "target.number must be a positive integer" };

  const htmlUrl = `https://github.com/${repo}/pull/${number}`;
  return {
    repo,
    number,
    htmlUrl,
    diffUrl: `${htmlUrl}.diff`,
    label: `GitHub PR ${repo}#${number}`,
  };
}

function hasProvidedSource(args: Record<string, unknown>): boolean {
  const files = Array.isArray(args.files)
    ? args.files.filter(
        (file): file is { content: string } =>
          typeof file === "object" &&
          file !== null &&
          "content" in file &&
          typeof file.content === "string" &&
          file.content.trim().length > 0,
      )
    : [];
  return (
    files.length > 0 ||
    (typeof args.diff === "string" && args.diff.trim().length > 0)
  );
}

function isPrTarget(args: Record<string, unknown>): boolean {
  return asRecord(args.target)?.kind === "pr";
}

function hasValidChecks(args: Record<string, unknown>): boolean {
  return !("checks" in args) || !Array.isArray(args.checks) || args.checks.length > 0;
}

async function fetchGithubPrDiff(target: Record<string, unknown>): Promise<
  { body: Record<string, unknown> } | { error: string }
> {
  const resolved = resolveGithubPrDiffTarget(target);
  if ("error" in resolved) return resolved;

  const response = await fetch(resolved.diffUrl, {
    headers: { Accept: "text/plain" },
  });
  const diff = await response.text();
  if (!response.ok) {
    return { error: `GitHub PR diff fetch failed (HTTP ${response.status})` };
  }
  if (!diff.trim()) return { error: "GitHub PR diff was empty" };
  if (diff.length > GITHUB_PR_DIFF_MAX_BYTES) {
    return { error: "GitHub PR diff is too large for SlopPass" };
  }

  const label = nonEmptyString(target.label) ?? resolved.label;
  return {
    body: {
      target: {
        ...target,
        kind: "pr",
        label,
        repo: resolved.repo,
        number: resolved.number,
        url: resolved.htmlUrl,
        ref: nonEmptyString(target.ref) ?? resolved.htmlUrl,
      },
      diff,
    },
  };
}

export async function sloppassRun(args: Record<string, unknown>): Promise<unknown> {
  const target = asRecord(args.target);
  if (!target) {
    return { error: "target is required" };
  }
  if (!hasValidChecks(args)) {
    return { error: "checks must contain at least one SlopPass category when provided" };
  }
  const providedSource = hasProvidedSource(args);
  if (!providedSource && !isPrTarget(args)) {
    return { error: "files or diff is required" };
  }
  try {
    if (providedSource) return await callApi(args);
    const fetched = await fetchGithubPrDiff(target);
    if ("error" in fetched) return fetched;
    return await callApi({ ...args, ...fetched.body });
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
