import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  parseEnv,
  stringifyEnv,
  getEnvString,
  getEnvNumber,
  getEnvBoolean,
  getEnvArray,
  requireEnv,
  interpolateEnv,
} from "../env-parser.js";

describe("parseEnv", () => {
  it("parses simple key=value", () => {
    expect(parseEnv("FOO=bar\nBAZ=qux")).toEqual({ FOO: "bar", BAZ: "qux" });
  });

  it("strips quotes", () => {
    expect(parseEnv('FOO="hello world"')).toEqual({ FOO: "hello world" });
    expect(parseEnv("FOO='hello world'")).toEqual({ FOO: "hello world" });
  });

  it("skips comments and blank lines", () => {
    expect(parseEnv("# comment\n\nFOO=bar")).toEqual({ FOO: "bar" });
  });

  it("skips lines without =", () => {
    expect(parseEnv("NOEQ")).toEqual({});
  });

  it("handles values with = sign", () => {
    expect(parseEnv("URL=http://example.com?a=1")).toEqual({ URL: "http://example.com?a=1" });
  });

  it("trims whitespace around key and value", () => {
    expect(parseEnv("  FOO  =  bar  ")).toEqual({ FOO: "bar" });
  });
});

describe("stringifyEnv", () => {
  it("formats simple values", () => {
    expect(stringifyEnv({ A: "1", B: "2" })).toBe("A=1\nB=2");
  });

  it("quotes values with spaces", () => {
    expect(stringifyEnv({ A: "hello world" })).toBe('A="hello world"');
  });

  it("escapes newlines in values", () => {
    expect(stringifyEnv({ A: "line1\nline2" })).toBe('A="line1\\nline2"');
  });

  it("escapes double quotes", () => {
    expect(stringifyEnv({ A: 'say "hi"' })).toBe('A="say \\"hi\\""');
  });
});

describe("getEnvString", () => {
  it("returns env value", () => {
    process.env.TEST_STR = "hello";
    expect(getEnvString("TEST_STR")).toBe("hello");
    delete process.env.TEST_STR;
  });

  it("returns default for missing key", () => {
    expect(getEnvString("MISSING_KEY_XYZ", "default")).toBe("default");
  });
});

describe("getEnvNumber", () => {
  it("parses numeric env value", () => {
    process.env.TEST_NUM = "42";
    expect(getEnvNumber("TEST_NUM")).toBe(42);
    delete process.env.TEST_NUM;
  });

  it("returns default for missing key", () => {
    expect(getEnvNumber("MISSING_NUM_XYZ", 10)).toBe(10);
  });

  it("returns default for NaN", () => {
    process.env.TEST_NAN = "notanumber";
    expect(getEnvNumber("TEST_NAN", 5)).toBe(5);
    delete process.env.TEST_NAN;
  });
});

describe("getEnvBoolean", () => {
  it("parses true values", () => {
    for (const val of ["true", "1", "yes"]) {
      process.env.TEST_BOOL = val;
      expect(getEnvBoolean("TEST_BOOL")).toBe(true);
    }
    delete process.env.TEST_BOOL;
  });

  it("returns false for other values", () => {
    process.env.TEST_BOOL = "no";
    expect(getEnvBoolean("TEST_BOOL")).toBe(false);
    delete process.env.TEST_BOOL;
  });

  it("returns default for missing key", () => {
    expect(getEnvBoolean("MISSING_BOOL_XYZ", true)).toBe(true);
  });
});

describe("getEnvArray", () => {
  it("splits comma-separated values", () => {
    process.env.TEST_ARR = "a,b,c";
    expect(getEnvArray("TEST_ARR")).toEqual(["a", "b", "c"]);
    delete process.env.TEST_ARR;
  });

  it("trims whitespace", () => {
    process.env.TEST_ARR = " a , b , c ";
    expect(getEnvArray("TEST_ARR")).toEqual(["a", "b", "c"]);
    delete process.env.TEST_ARR;
  });

  it("supports custom separator", () => {
    process.env.TEST_ARR = "a|b|c";
    expect(getEnvArray("TEST_ARR", "|")).toEqual(["a", "b", "c"]);
    delete process.env.TEST_ARR;
  });

  it("returns empty array for missing key", () => {
    expect(getEnvArray("MISSING_ARR_XYZ")).toEqual([]);
  });
});

describe("requireEnv", () => {
  it("returns value when set", () => {
    process.env.TEST_REQ = "value";
    expect(requireEnv("TEST_REQ")).toBe("value");
    delete process.env.TEST_REQ;
  });

  it("throws when not set", () => {
    expect(() => requireEnv("MISSING_REQ_XYZ")).toThrow("Required environment variable");
  });
});

describe("interpolateEnv", () => {
  it("replaces ${VAR} placeholders", () => {
    expect(interpolateEnv("Hello ${NAME}!", { NAME: "World" })).toBe("Hello World!");
  });

  it("replaces missing vars with empty string", () => {
    expect(interpolateEnv("${MISSING}", {})).toBe("");
  });

  it("handles multiple placeholders", () => {
    expect(interpolateEnv("${A}-${B}", { A: "x", B: "y" })).toBe("x-y");
  });
});
