import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  runSkeletonScan,
  ScopeUnverifiedError,
  verifyScopeOrThrow,
} from "../runner/index.js";
import {
  __resetForTests,
  appendFinding,
  createRun,
  getRun,
  listFindings,
} from "../runner/run-store.js";
import * as packageExports from "../index.js";
import * as runnerBarrelExports from "../runner/index.js";

describe("scope gate (deny-all until Chunk 2)", () => {
  beforeEach(() => __resetForTests());

  it("verifyScopeOrThrow refuses every target type", () => {
    expect(() => verifyScopeOrThrow({ type: "url", url: "https://example.com" }))
      .toThrow(ScopeUnverifiedError);
    expect(() => verifyScopeOrThrow({ type: "git", url: "https://github.com/me/repo" }))
      .toThrow(ScopeUnverifiedError);
    expect(() => verifyScopeOrThrow({ type: "mcp", url: "https://mcp.example.com" }))
      .toThrow(ScopeUnverifiedError);
    expect(() => verifyScopeOrThrow({ type: "api", url: "https://api.example.com" }))
      .toThrow(ScopeUnverifiedError);
  });

  it("ScopeUnverifiedError carries a stable code and the offending target", () => {
    try {
      verifyScopeOrThrow({ type: "url", url: "https://victim.example" });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ScopeUnverifiedError);
      const e = err as ScopeUnverifiedError;
      expect(e.code).toBe("scope_unverified");
      expect(e.target.url).toBe("https://victim.example");
    }
  });

  it("runSkeletonScan throws ScopeUnverifiedError for any caller-supplied URL", async () => {
    await expect(
      runSkeletonScan({ target: { type: "url", url: "https://example.com" } }),
    ).rejects.toBeInstanceOf(ScopeUnverifiedError);

    await expect(
      runSkeletonScan({ target: { type: "url", url: "http://localhost:8080" } }),
    ).rejects.toBeInstanceOf(ScopeUnverifiedError);
  });

  it("runSkeletonScan never opens a network connection when scope is unverified", async () => {
    const fetchSpy = vi.fn<typeof fetch>();
    await expect(
      runSkeletonScan(
        { target: { type: "url", url: "https://example.com" } },
        { fetchImpl: fetchSpy },
      ),
    ).rejects.toBeInstanceOf(ScopeUnverifiedError);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("public surface boundary (defense in depth)", () => {
  // The scope gate inside runSkeletonScan is necessary but not sufficient.
  // If the package re-exports the underlying probe (checkSecurityHeaders) or
  // the run-store write APIs through its public barrel, a consumer can
  // route around the gate by importing them directly. These tests fail the
  // build the moment that boundary cracks.

  const FORBIDDEN_PUBLIC_NAMES = [
    "checkSecurityHeaders",
    "BASELINE_HEADERS",
    "SKELETON_TARGET_URL",
    "createRun",
    "appendFinding",
    "setRunStatus",
    "getRun",
    "getFinding",
    "listFindings",
    "__resetForTests",
  ] as const;

  it("the package barrel does not re-export the active probe", () => {
    for (const name of FORBIDDEN_PUBLIC_NAMES) {
      expect(
        Object.prototype.hasOwnProperty.call(packageExports, name),
        `expected '${name}' to be internal-only, but it leaks through @unclick/securitypass`,
      ).toBe(false);
    }
  });

  it("the runner subpath barrel does not re-export the active probe", () => {
    for (const name of FORBIDDEN_PUBLIC_NAMES) {
      expect(
        Object.prototype.hasOwnProperty.call(runnerBarrelExports, name),
        `expected '${name}' to be internal-only, but it leaks through @unclick/securitypass/runner`,
      ).toBe(false);
    }
  });

  it("runSkeletonScan IS publicly exported (the only gated entry point)", () => {
    expect(typeof (packageExports as Record<string, unknown>).runSkeletonScan).toBe("function");
    expect(typeof (runnerBarrelExports as Record<string, unknown>).runSkeletonScan).toBe("function");
  });

  it("verifyScopeOrThrow + ScopeUnverifiedError ARE publicly exported", () => {
    expect(typeof (packageExports as Record<string, unknown>).verifyScopeOrThrow).toBe("function");
    expect(typeof (packageExports as Record<string, unknown>).ScopeUnverifiedError).toBe("function");
  });
});

describe("no-auto-fire PoC invariant", () => {
  beforeEach(() => __resetForTests());

  it("public package surface exposes no PoC executor", () => {
    // Legal posture (DTCA / CFAA / CMA / cyber-liability) requires PoC
    // payloads to be GENERATED, NEVER auto-fired. Guard against future
    // drift by failing the build if an executor-shaped export ever lands.
    const forbidden = /^(fire|execute|exploit|detonate|deploy)|(_|^)poc$|poc(_|$)|run_?poc|poc_?run/i;
    const violations = Object.keys(packageExports).filter((name) => {
      if (!forbidden.test(name)) return false;
      const value = (packageExports as Record<string, unknown>)[name];
      return typeof value === "function";
    });
    expect(violations).toEqual([]);
  });

  it("storing a finding with a PoC body triggers zero network I/O", async () => {
    const fetchSpy = vi.fn<typeof fetch>();
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchSpy as unknown as typeof fetch;
    try {
      const run = createRun({
        pack_id: "test",
        target: { type: "url", url: "https://example.com" },
      });
      appendFinding(run.id, {
        check_id: "test.poc",
        title: "Sample finding with PoC",
        severity: "high",
        verdict: "fail",
        category: "test",
        // A realistic-looking PoC body. The store treats it as inert data;
        // nothing in the package should fetch, spawn, or otherwise act on it.
        poc: {
          kind: "curl",
          body: "curl -X POST https://victim.example.com/admin --data 'pwn=1'",
        },
      });
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(listFindings(run.id)).toHaveLength(1);
      expect(listFindings(run.id)[0].poc?.body).toContain("victim.example.com");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
