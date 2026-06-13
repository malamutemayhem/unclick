import { posix as path } from "node:path";
import type { ActionDescriptor, Gate, GateContext, GateResult } from "../types.js";

const GATE = "ScopeGate";

type OwnedPath = {
  normalized: string;
};

function result(
  verdict: GateResult["verdict"],
  ruleId: string,
  reason: string,
  evidence: string[] = [],
): GateResult {
  return { gate: GATE, verdict, ruleId, reason, evidence };
}

function normalizeRepoPath(input: unknown): string | null {
  if (typeof input !== "string") return null;

  const trimmed = input.trim();
  if (!trimmed || trimmed.includes("\0")) return null;

  const slashPath = trimmed.replace(/\\/g, "/");
  const hadTrailingSlash = slashPath.endsWith("/");
  const normalized = path.normalize(slashPath).replace(/^\.\/+/, "").replace(/^\/+/, "");

  if (!normalized || normalized === ".") return null;

  const withoutTrailingSlash =
    normalized.length > 1 && normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;

  if (hadTrailingSlash && withoutTrailingSlash !== ".") {
    return withoutTrailingSlash;
  }

  return withoutTrailingSlash;
}

function normalizeOwnedPaths(ownedFiles: string[]): OwnedPath[] {
  const seen = new Set<string>();
  const owned: OwnedPath[] = [];

  for (const raw of ownedFiles) {
    const normalized = normalizeRepoPath(raw);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    owned.push({ normalized });
  }

  return owned;
}

function isWithinOwnedPath(target: string, owned: OwnedPath): boolean {
  return target === owned.normalized || target.startsWith(`${owned.normalized}/`);
}

function looksLikeFileWrite(action: ActionDescriptor): boolean {
  if (action.class === "scope" || action.class === "filesystem") return true;

  const raw = action.raw.toLowerCase();

  if (action.class === "shell") {
    return (
      /\b(rm|mv|cp|touch|mkdir|rmdir)\b/.test(raw) ||
      /\bsed\s+-i\b/.test(raw) ||
      /\btee\b/.test(raw) ||
      /(^|[^>])>>?\s*[^&\s]/.test(raw)
    );
  }

  if (action.class === "git") {
    return /\b(commit|merge|checkout|reset|clean)\b/.test(raw);
  }

  return false;
}

export const scopeGate: Gate = (ctx: GateContext): GateResult => {
  try {
    if (ctx.ownedFiles === undefined) {
      return result(
        "allow",
        "scope.no_active_scope",
        "No active ScopePack owned files were provided.",
      );
    }

    if (!Array.isArray(ctx.ownedFiles)) {
      return result(
        "ask",
        "scope.invalid_owned_files",
        "ScopePack owned files could not be parsed.",
      );
    }

    const targetFiles = ctx.action.targetFiles;
    if (targetFiles === undefined) {
      if (looksLikeFileWrite(ctx.action)) {
        return result(
          "ask",
          "scope.unknown_targets",
          "The action appears to write files but target files are unknown.",
          [`action_class:${ctx.action.class}`, `tool:${ctx.action.tool}`],
        );
      }

      return result("allow", "scope.no_file_targets", "The action has no file targets.");
    }

    if (!Array.isArray(targetFiles)) {
      return result(
        "ask",
        "scope.invalid_target_files",
        "Target files could not be parsed.",
      );
    }

    if (targetFiles.length === 0) {
      return result("allow", "scope.empty_targets", "The action reported no file targets.");
    }

    const owned = normalizeOwnedPaths(ctx.ownedFiles);
    const normalizedTargets: string[] = [];

    for (const target of targetFiles) {
      const normalized = normalizeRepoPath(target);
      if (!normalized) {
        return result(
          "ask",
          "scope.invalid_target_path",
          "A target path could not be normalized.",
          [`target:${String(target)}`],
        );
      }
      normalizedTargets.push(normalized);
    }

    const outOfScope = normalizedTargets.filter(
      (target) => !owned.some((ownedPath) => isWithinOwnedPath(target, ownedPath)),
    );

    if (outOfScope.length > 0) {
      return result(
        "deny",
        "scope.out_of_bounds",
        "The action writes outside the active ScopePack owned files.",
        [
          `targets:${normalizedTargets.join(",")}`,
          `out_of_scope:${outOfScope.join(",")}`,
          `owned:${owned.map((ownedPath) => ownedPath.normalized).join(",")}`,
        ],
      );
    }

    return result(
      "allow",
      "scope.in_bounds",
      "All target files are inside the active ScopePack owned files.",
      [`targets:${normalizedTargets.join(",")}`],
    );
  } catch (error) {
    return result(
      "ask",
      "scope.parse_error",
      "ScopeGate could not safely evaluate the action.",
      [error instanceof Error ? error.message : "unknown error"],
    );
  }
};
