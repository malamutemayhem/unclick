import { describe, it, expect } from "vitest";
import { uuidGenerate } from "./uuidgen-tool.js";

describe("uuidgen-tool", () => {
  it("generates a valid UUID v4", async () => {
    const r = await uuidGenerate({}) as Record<string, unknown>;
    const uuids = r.uuids as string[];
    expect(uuids).toHaveLength(1);
    expect(uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(r.version).toBe(4);
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates multiple UUIDs", async () => {
    const r = await uuidGenerate({ count: 5 }) as Record<string, unknown>;
    const uuids = r.uuids as string[];
    expect(uuids).toHaveLength(5);
    const unique = new Set(uuids);
    expect(unique.size).toBe(5);
  });

  it("supports uppercase", async () => {
    const r = await uuidGenerate({ uppercase: true }) as Record<string, unknown>;
    const uuids = r.uuids as string[];
    expect(uuids[0]).toMatch(/^[0-9A-F]{8}-/);
  });

  it("caps at 100", async () => {
    const r = await uuidGenerate({ count: 200 }) as Record<string, unknown>;
    expect(r.count).toBe(100);
  });
});
