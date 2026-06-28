import { describe, it, expect, vi, afterEach } from "vitest";
import { newtonMath } from "./newton-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("newton-tool", () => {
  it("newtonMath simplifies expression", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ operation: "simplify", expression: "2^2+2(2)", result: "8" }),
    }));
    const r = await newtonMath({ operation: "simplify", expression: "2^2+2(2)" }) as Record<string, unknown>;
    expect(r.operation).toBe("simplify");
    expect(r.result).toBe("8");
    expect(r.unclick_meta).toBeDefined();
  });

  it("newtonMath requires expression", async () => {
    const r = await newtonMath({ operation: "derive" }) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("newtonMath rejects invalid operation", async () => {
    const r = await newtonMath({ operation: "invalid", expression: "x^2" }) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
