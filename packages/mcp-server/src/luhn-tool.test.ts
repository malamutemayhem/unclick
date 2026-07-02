import { describe, it, expect } from "vitest";
import { luhnValidate } from "./luhn-tool.js";

describe("luhn-tool", () => {
  it("validates a correct Luhn number", async () => {
    const r = await luhnValidate({ number: "4539578763621486" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.mode).toBe("validate");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects an invalid Luhn number", async () => {
    const r = await luhnValidate({ number: "1234567890" }) as Record<string, unknown>;
    expect(r.valid).toBe(false);
  });

  it("generates a check digit", async () => {
    const r = await luhnValidate({ number: "453957876362148", mode: "generate" }) as Record<string, unknown>;
    expect(r.check_digit).toBe(6);
    expect(r.full_number).toBe("4539578763621486");
  });

  it("handles dashes and spaces", async () => {
    const r = await luhnValidate({ number: "4539-5787-6362-1486" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
  });

  it("rejects non-digit input", async () => {
    const r = await luhnValidate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/number/i);
  });
});
