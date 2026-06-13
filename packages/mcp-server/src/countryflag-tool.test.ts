import { describe, expect, it } from "vitest";
import { countryFlagUrl } from "./countryflag-tool.js";

describe("countryflag connector (L2)", () => {
  it("validates country_code is required", async () => {
    const r = await countryFlagUrl({}) as Record<string, unknown>;
    expect(r.error).toMatch(/country_code is required/i);
  });

  it("returns a flag URL for a valid code", async () => {
    const r = await countryFlagUrl({ country_code: "US" }) as Record<string, unknown>;
    expect(r.url).toContain("flagcdn.com");
    expect(r.url).toContain("us");
    expect(r.unclick_meta).toBeDefined();
  });

  it("supports SVG format", async () => {
    const r = await countryFlagUrl({ country_code: "GB", style: "svg" }) as Record<string, unknown>;
    expect(r.url).toContain(".svg");
  });
});
