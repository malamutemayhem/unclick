import { describe, it, expect } from "vitest";
import { deepMerge, withEnvOverrides, validate } from "../config-merger.js";

describe("deepMerge", () => {
  it("merges flat objects", () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("later values override", () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it("deep merges nested objects", () => {
    const result = deepMerge(
      { db: { host: "localhost", port: 5432 } },
      { db: { port: 3306 } },
    );
    expect(result).toEqual({ db: { host: "localhost", port: 3306 } });
  });

  it("handles multiple sources", () => {
    const result = deepMerge({ a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("withEnvOverrides", () => {
  it("overrides from env vars", () => {
    const config = { port: 3000, host: "localhost" };
    const env = { APP_PORT: "8080", APP_HOST: "0.0.0.0" };
    const result = withEnvOverrides(config, "APP", env);
    expect(result.port).toBe(8080);
    expect(result.host).toBe("0.0.0.0");
  });

  it("parses booleans", () => {
    const config = { debug: false };
    const result = withEnvOverrides(config, "APP", { APP_DEBUG: "true" });
    expect(result.debug).toBe(true);
  });

  it("handles nested with double underscore", () => {
    const config = { db: { host: "localhost" } };
    const result = withEnvOverrides(config, "APP", { APP_DB__HOST: "remote.db" });
    expect((result.db as Record<string, unknown>).host).toBe("remote.db");
  });
});

describe("validate", () => {
  it("returns empty for valid config", () => {
    expect(validate({ a: 1, b: { c: 2 } }, ["a", "b.c"])).toEqual([]);
  });

  it("returns missing keys", () => {
    expect(validate({ a: 1 }, ["a", "b", "c.d"])).toEqual(["b", "c.d"]);
  });
});
