import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assembleFiles,
  buildTreeEntries,
  pushFilesByReference,
  retentionExpiry,
  validatePush,
  validatePut,
  type Chunk,
} from "./workspace";

describe("retentionExpiry", () => {
  it("is the agreed default of 21 days out", () => {
    const now = new Date("2026-06-28T00:00:00.000Z");
    expect(retentionExpiry(now)).toBe("2026-07-19T00:00:00.000Z");
  });
  it("honours a custom horizon inside the 10-30 day window", () => {
    const now = new Date("2026-06-28T00:00:00.000Z");
    expect(retentionExpiry(now, 30)).toBe("2026-07-28T00:00:00.000Z");
  });
});

describe("validatePut", () => {
  it("requires a path and string content", () => {
    expect(validatePut({})).toBe("path is required.");
    expect(validatePut({ path: "a.ts" })).toBe("content (string) is required.");
    expect(validatePut({ path: "a.ts", content: "x" })).toBeNull();
  });
  it("rejects path traversal and bad seq", () => {
    expect(validatePut({ path: "../secret", content: "x" })).toBe("path must not contain '..'.");
    expect(validatePut({ path: "a.ts", content: "x", seq: -1 })).toBe("seq must be a non-negative number.");
  });
});

describe("validatePush", () => {
  it("requires workspace_id, owner, repo, branch", () => {
    expect(validatePush({})).toBe("workspace_id is required.");
    expect(validatePush({ workspace_id: "w", owner: "o", repo: "r" })).toBe("branch is required.");
    expect(validatePush({ workspace_id: "w", owner: "o", repo: "r", branch: "b" })).toBeNull();
  });
});

describe("assembleFiles", () => {
  it("orders chunks by seq, concatenates per file, sorts paths", () => {
    const rows: Chunk[] = [
      { path: "b.ts", seq: 1, content: "WORLD" },
      { path: "a.ts", seq: 0, content: "hello " },
      { path: "b.ts", seq: 0, content: "HELLO " },
      { path: "a.ts", seq: 1, content: "there" },
    ];
    expect(assembleFiles(rows)).toEqual([
      { path: "a.ts", content: "hello there" },
      { path: "b.ts", content: "HELLO WORLD" },
    ]);
  });
  it("reassembles a single large file split across many chunks in any order", () => {
    const parts = Array.from({ length: 50 }, (_, i) => i);
    const shuffled = [...parts].reverse();
    const rows: Chunk[] = shuffled.map((i) => ({ path: "big.ts", seq: i, content: `<${i}>` }));
    const [file] = assembleFiles(rows);
    expect(file.content).toBe(parts.map((i) => `<${i}>`).join(""));
  });
  it("returns nothing for no chunks", () => {
    expect(assembleFiles([])).toEqual([]);
  });
});

describe("buildTreeEntries", () => {
  it("maps blob shas to regular-file tree entries", () => {
    expect(buildTreeEntries([{ path: "a.ts", sha: "deadbeef" }])).toEqual([
      { path: "a.ts", mode: "100644", type: "blob", sha: "deadbeef" },
    ]);
  });
});

// Mocked GitHub Git Data API push

type MockRes = { ok: boolean; status: number; json: () => Promise<any> };
function jsonRes(data: any, ok = true, status = 200): MockRes {
  return { ok, status, json: async () => data };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("pushFilesByReference", () => {
  it("pushes to an existing branch via blobs -> tree -> commit -> ref", async () => {
    const calls: Array<{ url: string; method: string; body: any }> = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string, init: any) => {
      calls.push({ url, method: init.method, body: init.body ? JSON.parse(init.body) : undefined });
      if (url.endsWith("/git/ref/heads/feature")) return jsonRes({ object: { sha: "parent123" } });
      if (url.endsWith("/git/commits/parent123")) return jsonRes({ tree: { sha: "basetree" } });
      if (url.endsWith("/git/blobs")) return jsonRes({ sha: "blob-" + JSON.parse(init.body).content.length });
      if (url.endsWith("/git/trees")) return jsonRes({ sha: "newtree" });
      if (url.endsWith("/git/commits")) return jsonRes({ sha: "newcommit" });
      if (url.endsWith("/git/refs/heads/feature")) return jsonRes({ ref: "refs/heads/feature" });
      throw new Error("unexpected url " + url);
    }));

    const result = await pushFilesByReference({
      token: "t", owner: "o", repo: "r", branch: "feature",
      message: "msg",
      files: [{ path: "a.ts", content: "AAAA" }, { path: "b.ts", content: "BB" }],
    });

    expect(result).toEqual({ commit_sha: "newcommit", branch: "feature", files: ["a.ts", "b.ts"] });
    const blobBodies = calls.filter((c) => c.url.endsWith("/git/blobs")).map((c) => c.body.content);
    expect(blobBodies).toEqual(["AAAA", "BB"]);
    const treeCall = calls.find((c) => c.url.endsWith("/git/trees"))!;
    expect(treeCall.body.base_tree).toBe("basetree");
    const refCall = calls.find((c) => c.url.endsWith("/git/refs/heads/feature"))!;
    expect(refCall.method).toBe("PATCH");
  });

  it("creates the branch off the default branch when it does not exist", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string, init: any) => {
      if (url.endsWith("/git/ref/heads/brand-new")) return jsonRes(null, false, 404);
      if (url.endsWith("/repos/o/r")) return jsonRes({ default_branch: "main" });
      if (url.endsWith("/git/ref/heads/main")) return jsonRes({ object: { sha: "mainsha" } });
      if (url.endsWith("/git/commits/mainsha")) return jsonRes({ tree: { sha: "basetree" } });
      if (url.endsWith("/git/blobs")) return jsonRes({ sha: "blob1" });
      if (url.endsWith("/git/trees")) return jsonRes({ sha: "newtree" });
      if (url.endsWith("/git/commits")) return jsonRes({ sha: "newcommit" });
      if (url.endsWith("/git/refs")) {
        expect(JSON.parse(init.body).ref).toBe("refs/heads/brand-new");
        return jsonRes({ ref: "refs/heads/brand-new" });
      }
      throw new Error("unexpected url " + url);
    }));

    const result = await pushFilesByReference({
      token: "t", owner: "o", repo: "r", branch: "brand-new",
      message: "msg", files: [{ path: "a.ts", content: "x" }],
    });
    expect(result.commit_sha).toBe("newcommit");
    expect(result.branch).toBe("brand-new");
  });

  it("throws when there is nothing to push", async () => {
    await expect(
      pushFilesByReference({ token: "t", owner: "o", repo: "r", branch: "b", message: "m", files: [] }),
    ).rejects.toThrow("No staged files");
  });
});
