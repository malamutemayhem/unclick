import { describe, it, expect } from "vitest";
import { csvParse } from "./csvparse-tool.js";

describe("csvparse-tool", () => {
  it("parses CSV text", async () => {
    const r = await csvParse({ csv: "name,age\nAlice,30\nBob,25" }) as Record<string, unknown>;
    expect(r.headers).toEqual(["name", "age"]);
    expect(r.row_count).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("supports custom delimiter", async () => {
    const r = await csvParse({ csv: "a;b\n1;2", delimiter: ";" }) as Record<string, unknown>;
    expect(r.headers).toEqual(["a", "b"]);
    expect(r.row_count).toBe(1);
  });

  it("rejects empty csv", async () => {
    const r = await csvParse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/csv/i);
  });
});
