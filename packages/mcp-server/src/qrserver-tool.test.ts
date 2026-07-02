import { describe, expect, it } from "vitest";
import { qrserverGenerate } from "./qrserver-tool.js";

describe("qrserver connector (L2)", () => {
  it("returns a QR code URL with unclick_meta", async () => {
    const r = await qrserverGenerate({ data: "https://example.com" }) as Record<string, unknown>;
    expect(r.url).toMatch(/api\.qrserver\.com/);
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires data parameter", async () => {
    const r = await qrserverGenerate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/data/i);
  });

  it("accepts custom size and format", async () => {
    const r = await qrserverGenerate({ data: "hello", size: "300x300", format: "svg" }) as Record<string, unknown>;
    expect(r.url).toMatch(/size=300x300/);
    expect(r.url).toMatch(/format=svg/);
  });
});
