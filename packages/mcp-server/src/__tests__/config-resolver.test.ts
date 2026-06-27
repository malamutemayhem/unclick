import { describe, it, expect } from "vitest";
import { ConfigResolver, createConfig } from "../config-resolver.js";

describe("ConfigResolver", () => {
  it("gets value from source", () => {
    const config = new ConfigResolver();
    config.addSource("defaults", { port: 3000, host: "localhost" });
    expect(config.get("port")).toBe(3000);
  });

  it("higher priority overrides lower", () => {
    const config = new ConfigResolver();
    config.addSource("defaults", { port: 3000 }, 0);
    config.addSource("env", { port: 8080 }, 10);
    expect(config.get("port")).toBe(8080);
  });

  it("getOrDefault returns default for missing", () => {
    const config = new ConfigResolver();
    expect(config.getOrDefault("missing", 42)).toBe(42);
  });

  it("getRequired throws for missing", () => {
    const config = new ConfigResolver();
    expect(() => config.getRequired("missing")).toThrow("Required config key missing");
  });

  it("has checks existence", () => {
    const config = new ConfigResolver();
    config.addSource("a", { x: 1 });
    expect(config.has("x")).toBe(true);
    expect(config.has("y")).toBe(false);
  });

  it("sourceOf tells which source provides key", () => {
    const config = new ConfigResolver();
    config.addSource("defaults", { port: 3000 }, 0);
    config.addSource("env", { port: 8080 }, 10);
    expect(config.sourceOf("port")).toBe("env");
  });

  it("allKeys returns unique sorted keys", () => {
    const config = new ConfigResolver();
    config.addSource("a", { x: 1, y: 2 });
    config.addSource("b", { y: 3, z: 4 });
    expect(config.allKeys()).toEqual(["x", "y", "z"]);
  });

  it("resolved merges all layers", () => {
    const config = new ConfigResolver();
    config.addSource("defaults", { a: 1, b: 2 }, 0);
    config.addSource("override", { b: 20 }, 10);
    const r = config.resolved();
    expect(r.a).toBe(1);
    expect(r.b).toBe(20);
  });

  it("removeSource works", () => {
    const config = new ConfigResolver();
    config.addSource("a", { x: 1 });
    expect(config.removeSource("a")).toBe(true);
    expect(config.has("x")).toBe(false);
  });

  it("clear empties everything", () => {
    const config = new ConfigResolver();
    config.addSource("a", { x: 1 });
    config.clear();
    expect(config.sourceNames()).toEqual([]);
  });
});

describe("createConfig", () => {
  it("builds resolver from layers", () => {
    const config = createConfig([
      { name: "defaults", values: { port: 3000 } },
      { name: "env", values: { port: 8080 }, priority: 10 },
    ]);
    expect(config.get("port")).toBe(8080);
  });
});
