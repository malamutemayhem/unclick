import { describe, it, expect } from "vitest";
import {
  resolveEnv, requireEnv, resolveEnvWithDefault,
  resolveEnvNumber, resolveEnvBoolean, resolveConnectorEnv,
} from "../env-resolver.js";
import type { EnvSource } from "../env-resolver.js";

const mockEnv: EnvSource = {
  get(key: string) {
    const vars: Record<string, string> = {
      NEW_KEY: "new-value",
      PORT: "3000",
      DEBUG: "true",
      EMPTY: "",
      BLANK: "  ",
    };
    return vars[key];
  },
};

describe("resolveEnv", () => {
  it("returns first available value", () => {
    expect(resolveEnv(["MISSING", "NEW_KEY"], mockEnv)).toBe("new-value");
  });

  it("skips empty and blank values", () => {
    expect(resolveEnv(["EMPTY", "BLANK", "NEW_KEY"], mockEnv)).toBe("new-value");
  });

  it("returns undefined when none found", () => {
    expect(resolveEnv(["NOPE", "ALSO_NOPE"], mockEnv)).toBeUndefined();
  });

  it("trims values", () => {
    const src: EnvSource = { get: () => "  trimmed  " };
    expect(resolveEnv(["X"], src)).toBe("trimmed");
  });
});

describe("requireEnv", () => {
  it("returns value when present", () => {
    expect(requireEnv(["NEW_KEY"], "test", mockEnv)).toBe("new-value");
  });

  it("throws when missing", () => {
    expect(() => requireEnv(["NOPE"], "test key", mockEnv)).toThrow("Missing required");
    expect(() => requireEnv(["NOPE"], "test key", mockEnv)).toThrow("test key");
  });
});

describe("resolveEnvWithDefault", () => {
  it("returns env value when present", () => {
    expect(resolveEnvWithDefault(["NEW_KEY"], "fallback", mockEnv)).toBe("new-value");
  });

  it("returns default when missing", () => {
    expect(resolveEnvWithDefault(["NOPE"], "fallback", mockEnv)).toBe("fallback");
  });
});

describe("resolveEnvNumber", () => {
  it("parses numeric env var", () => {
    expect(resolveEnvNumber(["PORT"], 8080, mockEnv)).toBe(3000);
  });

  it("returns default for missing", () => {
    expect(resolveEnvNumber(["NOPE"], 8080, mockEnv)).toBe(8080);
  });

  it("returns default for non-numeric", () => {
    expect(resolveEnvNumber(["NEW_KEY"], 8080, mockEnv)).toBe(8080);
  });
});

describe("resolveEnvBoolean", () => {
  it("parses true values", () => {
    expect(resolveEnvBoolean(["DEBUG"], false, mockEnv)).toBe(true);
  });

  it("returns default for missing", () => {
    expect(resolveEnvBoolean(["NOPE"], false, mockEnv)).toBe(false);
  });
});

describe("resolveConnectorEnv", () => {
  it("resolves all fields", () => {
    const result = resolveConnectorEnv("test", {
      apiKey: { keys: ["NEW_KEY"], required: true },
      port: { keys: ["PORT"] },
    }, mockEnv);
    expect(result.apiKey).toBe("new-value");
    expect(result.port).toBe("3000");
  });

  it("uses defaults for optional fields", () => {
    const result = resolveConnectorEnv("test", {
      region: { keys: ["NOPE"], default: "us-east-1" },
    }, mockEnv);
    expect(result.region).toBe("us-east-1");
  });

  it("throws for missing required fields", () => {
    expect(() => resolveConnectorEnv("MyApp", {
      key: { keys: ["NOPE"], required: true },
    }, mockEnv)).toThrow("MyApp");
  });
});
