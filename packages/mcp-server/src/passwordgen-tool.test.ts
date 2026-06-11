import { describe, it, expect } from "vitest";
import { passwordGenerate } from "./passwordgen-tool.js";

describe("passwordgen-tool", () => {
  it("generates a password of requested length", async () => {
    const r = await passwordGenerate({ length: 20 }) as Record<string, unknown>;
    expect((r.password as string).length).toBe(20);
    expect(r.strength).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("defaults to 16 characters", async () => {
    const r = await passwordGenerate({}) as Record<string, unknown>;
    expect((r.password as string).length).toBe(16);
  });

  it("caps at 128 characters", async () => {
    const r = await passwordGenerate({ length: 999 }) as Record<string, unknown>;
    expect((r.password as string).length).toBe(128);
  });

  it("generates unique passwords", async () => {
    const a = await passwordGenerate({}) as Record<string, unknown>;
    const b = await passwordGenerate({}) as Record<string, unknown>;
    expect(a.password).not.toBe(b.password);
  });
});
