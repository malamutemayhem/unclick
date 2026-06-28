import { describe, it, expect, vi, afterEach } from "vitest";
import { ibanValidate } from "./iban-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("iban-tool", () => {
  it("validates an IBAN", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ valid: true, bankData: { bic: "COBADEFFXXX", name: "Commerzbank" } }),
    }));
    const r = await ibanValidate({ iban: "DE89370400440532013000" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing iban", async () => {
    const r = await ibanValidate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/iban/i);
  });
});
