#!/usr/bin/env node
// UnClick native git remote helper.
//
// Configures a git remote that routes `git push` / `git fetch` through the
// UnClick GitHub connector. UnClick injects YOUR connected GitHub login
// server-side, so genuine git operations work at any size with no file
// pasting, and the GitHub token never leaves UnClick.
//
// Usage:
//   UNCLICK_API_KEY=uc_xxx node scripts/unclick-git-remote.mjs            # set remote "unclick"
//   UNCLICK_API_KEY=uc_xxx node scripts/unclick-git-remote.mjs --print    # print URL + push cmd, write nothing
//   node scripts/unclick-git-remote.mjs --repo owner/name --remote up     # explicit repo + remote name
//   node scripts/unclick-git-remote.mjs --base https://my.host            # self-hosted UnClick
//   node scripts/unclick-git-remote.mjs --selftest                        # run assertions
//
// The UnClick API key is only ever sent to UnClick (never to GitHub). Embedding
// it in the remote URL stores it in local .git/config; use --print if you would
// rather wire it through a credential helper yourself.

import { execFileSync } from "node:child_process";

const DEFAULT_BASE = "https://unclick.world";

export function normalizeBase(base) {
  return String(base || DEFAULT_BASE).trim().replace(/\/+$/, "");
}

// Accepts the common GitHub remote URL shapes and returns "owner/repo".
export function ownerRepoFromGitUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";
  // git@github.com:owner/repo.git  OR  ssh://git@github.com/owner/repo.git
  // https://github.com/owner/repo(.git)  OR  http(s)://host/.../owner/repo(.git)
  const ssh = raw.match(/^git@[^:]+:(.+?)(?:\.git)?$/i);
  if (ssh) return cleanOwnerRepo(ssh[1]);
  try {
    const u = new URL(raw);
    return cleanOwnerRepo(u.pathname);
  } catch {
    return cleanOwnerRepo(raw);
  }
}

function cleanOwnerRepo(pathish) {
  const parts = String(pathish || "")
    .replace(/\.git$/i, "")
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return "";
  const owner = parts[parts.length - 2];
  const repo = parts[parts.length - 1];
  if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return "";
  return `${owner}/${repo}`;
}

// Builds the proxy remote URL. The repo segment ends with .git because the
// proxy requires it (matches api/lib/git-proxy.ts validateGitProxyPath).
export function gitProxyRemoteUrl({ base, ownerRepo, apiKey } = {}) {
  const [owner, repo] = String(ownerRepo || "").split("/");
  if (!owner || !repo) throw new Error('ownerRepo must be "owner/repo".');
  const host = normalizeBase(base).replace(/^https?:\/\//, "");
  const proto = normalizeBase(base).startsWith("http://") ? "http" : "https";
  const cred = apiKey ? `unclick:${encodeURIComponent(apiKey)}@` : "";
  return `${proto}://${cred}${host}/api/git-proxy/${owner}/${repo}.git`;
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function parseArgs(argv) {
  const opts = { remote: "unclick", base: DEFAULT_BASE, print: false, selftest: false, repo: "", key: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--print") opts.print = true;
    else if (a === "--selftest") opts.selftest = true;
    else if (a === "--remote") opts.remote = argv[++i];
    else if (a === "--base") opts.base = argv[++i];
    else if (a === "--repo") opts.repo = argv[++i];
    else if (a === "--key") opts.key = argv[++i];
    else if (a.startsWith("--remote=")) opts.remote = a.slice(9);
    else if (a.startsWith("--base=")) opts.base = a.slice(7);
    else if (a.startsWith("--repo=")) opts.repo = a.slice(7);
    else if (a.startsWith("--key=")) opts.key = a.slice(6);
  }
  return opts;
}

function selftest() {
  const checks = [];
  const eq = (name, got, want) => checks.push([name, got === want, got, want]);
  eq("ssh url", ownerRepoFromGitUrl("git@github.com:malamutemayhem/unclick.git"), "malamutemayhem/unclick");
  eq("https url", ownerRepoFromGitUrl("https://github.com/malamutemayhem/unclick.git"), "malamutemayhem/unclick");
  eq("https no .git", ownerRepoFromGitUrl("https://github.com/malamutemayhem/unclick"), "malamutemayhem/unclick");
  eq("ssh scheme", ownerRepoFromGitUrl("ssh://git@github.com/a/b.git"), "a/b");
  eq(
    "remote url with key",
    gitProxyRemoteUrl({ base: "https://unclick.world", ownerRepo: "malamutemayhem/unclick", apiKey: "uc_x" }),
    "https://unclick:uc_x@unclick.world/api/git-proxy/malamutemayhem/unclick.git",
  );
  eq(
    "remote url no key",
    gitProxyRemoteUrl({ base: "https://unclick.world", ownerRepo: "a/b" }),
    "https://unclick.world/api/git-proxy/a/b.git",
  );
  eq(
    "self-hosted base trims slash",
    gitProxyRemoteUrl({ base: "https://my.host/", ownerRepo: "a/b" }),
    "https://my.host/api/git-proxy/a/b.git",
  );
  let ok = true;
  for (const [name, pass, got, want] of checks) {
    if (!pass) {
      ok = false;
      console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);
    }
  }
  console.log(ok ? `selftest OK (${checks.length} checks)` : "selftest FAILED");
  return ok;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.selftest) process.exit(selftest() ? 0 : 1);

  const apiKey = (opts.key || process.env.UNCLICK_API_KEY || "").trim();
  let ownerRepo = opts.repo.trim();
  if (!ownerRepo) {
    let originUrl = "";
    try {
      originUrl = git(["remote", "get-url", "origin"]);
    } catch {
      console.error("No origin remote found. Pass --repo owner/name.");
      process.exit(1);
    }
    ownerRepo = ownerRepoFromGitUrl(originUrl);
    if (!ownerRepo) {
      console.error(`Could not parse owner/repo from origin "${originUrl}". Pass --repo owner/name.`);
      process.exit(1);
    }
  }

  if (opts.print) {
    const url = gitProxyRemoteUrl({ base: opts.base, ownerRepo, apiKey });
    console.log(url);
    console.log(`# then: git push ${opts.remote} HEAD`);
    if (!apiKey) console.log("# (set UNCLICK_API_KEY to embed your key, or wire your own credential helper)");
    return;
  }

  if (!apiKey) {
    console.error("UNCLICK_API_KEY is not set. Export it (or pass --key uc_...) , or use --print.");
    process.exit(1);
  }

  const url = gitProxyRemoteUrl({ base: opts.base, ownerRepo, apiKey });
  const existing = (() => {
    try {
      return git(["remote", "get-url", opts.remote]);
    } catch {
      return "";
    }
  })();
  git(existing ? ["remote", "set-url", opts.remote, url] : ["remote", "add", opts.remote, url]);

  console.log(`Remote "${opts.remote}" -> UnClick git proxy for ${ownerRepo}`);
  console.log("Your UnClick key is stored in local .git/config and is only ever sent to UnClick.");
  console.log(`Push natively with: git push ${opts.remote} HEAD`);
}

// Only run main() when invoked directly (keeps the module importable for tests).
const invokedDirectly = process.argv[1] && process.argv[1].endsWith("unclick-git-remote.mjs");
if (invokedDirectly) main();
