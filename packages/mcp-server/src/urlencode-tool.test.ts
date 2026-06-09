import { describe, it, expect } from "vitest";
import { urlEncode, urlDecode } from "./urlencode-tool.js";

describe("urlencode-tool", () => {
  it("encodes text for URLs", async () => {
    const r = await urlEncode({ text: "hello world & more" }) as Record<string, unknown>;
    expect(r.encoded).toBe("hello%20world%20%26%20more");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes URL-encoded text", async () => {
    const r = await urlDecode({ encoded: "hello%20world%20%26%20more" }) as Record<string, unknown>;
    expect(r.decoded).toBe("hello world & more");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing text", async () => {
    const r = await urlEncode({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
