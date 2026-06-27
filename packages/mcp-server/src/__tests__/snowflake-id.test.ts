import { describe, it, expect } from "vitest";
import { SnowflakeGenerator } from "../snowflake-id.js";

describe("SnowflakeGenerator", () => {
  it("generates unique ids", () => {
    const gen = new SnowflakeGenerator(1);
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) ids.add(gen.generate());
    expect(ids.size).toBe(100);
  });

  it("ids are string numbers", () => {
    const gen = new SnowflakeGenerator(0);
    const id = gen.generate();
    expect(typeof id).toBe("string");
    expect(BigInt(id)).toBeGreaterThan(0n);
  });

  it("parse extracts components", () => {
    const gen = new SnowflakeGenerator(42);
    const id = gen.generate();
    const parsed = SnowflakeGenerator.parse(id);
    expect(parsed.workerId).toBe(42);
    expect(parsed.timestamp).toBeGreaterThan(1704067200000);
  });

  it("timestamp returns Date", () => {
    const gen = new SnowflakeGenerator(0);
    const id = gen.generate();
    const date = SnowflakeGenerator.timestamp(id);
    expect(date).toBeInstanceOf(Date);
    expect(date.getFullYear()).toBeGreaterThanOrEqual(2025);
  });

  it("throws on invalid worker id", () => {
    expect(() => new SnowflakeGenerator(-1)).toThrow();
    expect(() => new SnowflakeGenerator(1024)).toThrow();
  });

  it("ids are ordered within same worker", () => {
    const gen = new SnowflakeGenerator(0);
    const a = gen.generate();
    const b = gen.generate();
    expect(BigInt(b)).toBeGreaterThan(BigInt(a));
  });
});
