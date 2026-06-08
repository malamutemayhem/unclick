import { describe, it, expect } from "vitest";
import { reverseText } from "./reversetext-tool.js";

describe("reversetext-tool", () => {
  it("reverses characters", async () => {
    const r = await reverseText({ text: "hello" }) as Record<string, unknown>;
    expect(r.output).toBe("olleh");
    expect(r.unclick_meta).toBeDefined();
  });

  it("reverses words", async () => {
    const r = await reverseText({ text: "hello world", mode: "words" }) as Record<string, unknown>;
    expect(r.output).toBe("world hello");
  });

  it("detects palindrome", async () => {
    const r = await reverseText({ text: "racecar" }) as Record<string, unknown>;
    expect(r.is_palindrome).toBe(true);
  });

  it("detects non-palindrome", async () => {
    const r = await reverseText({ text: "hello" }) as Record<string, unknown>;
    expect(r.is_palindrome).toBe(false);
  });

  it("rejects empty input", async () => {
    const r = await reverseText({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
