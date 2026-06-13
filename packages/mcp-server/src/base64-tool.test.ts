import { describe, it, expect } from "vitest";
import { base64Encode, base64Decode } from "./base64-tool.js";

describe("base64-tool", () => {
  it("encodes text to base64", async () => {
    const r = await base64Encode({ text: "Hello World" }) as Record<string, unknown>;
    expect(r.encoded).toBe("SGVsbG8gV29ybGQ=");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes base64 to text", async () => {
    const r = await base64Decode({ encoded: "SGVsbG8gV29ybGQ=" }) as Record<string, unknown>;
    expect(r.decoded).toBe("Hello World");
    expect(r.unclick_meta).toBeDefined();
  });

  it("roundtrips correctly", async () => {
    const enc = await base64Encode({ text: "test 123" }) as Record<string, unknown>;
    const dec = await base64Decode({ encoded: enc.encoded }) as Record<string, unknown>;
    expect(dec.decoded).toBe("test 123");
  });

  it("rejects missing text", async () => {
    const r = await base64Encode({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
