import { describe, it, expect, vi, afterEach } from "vitest";
import { fakerPersons, fakerCompanies, fakerTexts } from "./fakerapi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("fakerapi-tool", () => {
  it("generates fake persons", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ status: "OK", total: 2, data: [{ firstname: "John", lastname: "Doe" }] }),
    }));
    const r = await fakerPersons({ quantity: 2 }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates fake companies", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ status: "OK", total: 1, data: [{ name: "Acme Corp", email: "info@acme.com" }] }),
    }));
    const r = await fakerCompanies({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates fake texts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ status: "OK", total: 1, data: [{ title: "Lorem", author: "Ipsum", genre: "test", content: "text" }] }),
    }));
    const r = await fakerTexts({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
