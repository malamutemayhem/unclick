import { describe, it, expect } from "vitest";
import { slugify } from "./slug-tool.js";

describe("slug-tool", () => {
  it("converts text to slug", async () => {
    const r = await slugify({ text: "Hello World! This is a Test" }) as Record<string, unknown>;
    expect(r.slug).toBe("hello-world-this-is-a-test");
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles accented characters", async () => {
    const r = await slugify({ text: "Cafe Resume Noel" }) as Record<string, unknown>;
    expect(r.slug).toBe("cafe-resume-noel");
  });

  it("supports custom separator", async () => {
    const r = await slugify({ text: "hello world", separator: "_" }) as Record<string, unknown>;
    expect(r.slug).toBe("hello_world");
  });

  it("rejects missing text", async () => {
    const r = await slugify({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
