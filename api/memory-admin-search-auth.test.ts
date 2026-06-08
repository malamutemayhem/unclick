import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const src = readFileSync(resolve(__dirname, "memory-admin.ts"), "utf-8");

describe("memory-admin search action auth", () => {
  it("requires authorization before executing the search RPC", () => {
    const searchCase = src.match(/case\s+"search"\s*:\s*\{([\s\S]*?)(?=\n {6}case\s+")/);
    expect(searchCase).not.toBeNull();
    const body = searchCase![1];
    expect(body).toContain("resolveApiKeyHash");
    expect(body).toContain('status(401)');
  });

  it("calls the tenant-scoped mc_search_memory RPC (not the unscoped search_memory)", () => {
    const searchCase = src.match(/case\s+"search"\s*:\s*\{([\s\S]*?)(?=\n {6}case\s+")/);
    expect(searchCase).not.toBeNull();
    const body = searchCase![1];
    expect(body).toContain("mc_search_memory");
    expect(body).toContain("p_api_key_hash");
    expect(body).not.toMatch(/\.rpc\(\s*["']search_memory["']/);
  });
});
