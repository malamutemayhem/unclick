import { describe, it, expect } from "vitest";
import { ConfigBuilder } from "../config-builder.js";

describe("ConfigBuilder", () => {
  it("builds with defaults", () => {
    const config = new ConfigBuilder<{ port: number; host: string }>()
      .default("port", 3000)
      .default("host", "localhost")
      .build();
    expect(config).toEqual({ port: 3000, host: "localhost" });
  });

  it("set overrides defaults", () => {
    const config = new ConfigBuilder<{ port: number }>()
      .default("port", 3000)
      .set("port", 8080)
      .build();
    expect(config.port).toBe(8080);
  });

  it("setIf conditionally sets", () => {
    const config = new ConfigBuilder<{ debug: boolean; verbose: boolean }>()
      .setIf(true, "debug", true)
      .setIf(false, "verbose", true)
      .build();
    expect(config.debug).toBe(true);
    expect(config.verbose).toBeUndefined();
  });

  it("merge applies overrides", () => {
    const config = new ConfigBuilder<{ a: number; b: number }>()
      .default("a", 1)
      .default("b", 2)
      .merge({ b: 20 })
      .build();
    expect(config).toEqual({ a: 1, b: 20 });
  });

  it("validate throws on invalid", () => {
    const builder = new ConfigBuilder<{ port: number }>()
      .set("port", -1)
      .validate("port", (v) => typeof v === "number" && (v as number) > 0);
    expect(() => builder.build()).toThrow("Invalid config value");
  });

  it("get returns current value", () => {
    const builder = new ConfigBuilder<{ x: number }>()
      .default("x", 10);
    expect(builder.get("x")).toBe(10);
  });

  it("has checks key existence", () => {
    const builder = new ConfigBuilder<{ a: number }>()
      .default("a", 1);
    expect(builder.has("a")).toBe(true);
  });

  it("toJSON returns combined config", () => {
    const builder = new ConfigBuilder<{ a: number; b: number }>()
      .default("a", 1)
      .set("b", 2);
    expect(builder.toJSON()).toEqual({ a: 1, b: 2 });
  });
});
