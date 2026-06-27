import { describe, it, expect } from "vitest";
import { PipelineBuilder, pipeline } from "../pipeline-builder.js";

describe("PipelineBuilder", () => {
  it("executes stages in order", async () => {
    const result = await PipelineBuilder.create<number>()
      .pipe((n) => n * 2)
      .pipe((n) => n + 1)
      .pipe((n) => String(n))
      .execute(5);
    expect(result).toBe("11");
  });

  it("handles async stages", async () => {
    const result = await PipelineBuilder.create<string>()
      .pipe(async (s) => s.toUpperCase())
      .pipe((s) => s + "!")
      .execute("hello");
    expect(result).toBe("HELLO!");
  });

  it("empty pipeline returns input", async () => {
    const result = await PipelineBuilder.create<number>().execute(42);
    expect(result).toBe(42);
  });

  it("length tracks stages", () => {
    const p = PipelineBuilder.create<number>().pipe((n) => n).pipe((n) => n);
    expect(p.length).toBe(2);
  });
});

describe("pipeline helper", () => {
  it("creates builder", async () => {
    const result = await pipeline<number>()
      .pipe((n) => n * 3)
      .execute(10);
    expect(result).toBe(30);
  });
});
