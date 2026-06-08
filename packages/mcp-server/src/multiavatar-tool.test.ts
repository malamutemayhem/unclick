import { describe, it, expect } from "vitest";
import { multiavatarGenerate } from "./multiavatar-tool.js";

describe("multiavatar-tool", () => {
  it("multiavatarGenerate returns avatar URLs", async () => {
    const r = await multiavatarGenerate({ name: "alice" }) as Record<string, unknown>;
    expect(r.svg_url).toBe("https://api.multiavatar.com/alice.svg");
    expect(r.png_url).toBe("https://api.multiavatar.com/alice.png");
    expect(r.name).toBe("alice");
    expect(r.unclick_meta).toBeDefined();
  });

  it("multiavatarGenerate defaults to 'default'", async () => {
    const r = await multiavatarGenerate({}) as Record<string, unknown>;
    expect(r.svg_url).toBe("https://api.multiavatar.com/default.svg");
  });
});
