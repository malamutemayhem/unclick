import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { get, getNumber, getBool, getList, has } from "../env.js";
import { require as requireEnv } from "../env.js";

describe("env", () => {
  const original = process.env;

  beforeEach(() => {
    process.env = { ...original };
  });

  afterEach(() => {
    process.env = original;
  });

  describe("get", () => {
    it("reads env var", () => {
      process.env.TEST_VAR = "hello";
      expect(get("TEST_VAR")).toBe("hello");
    });

    it("uses fallback", () => {
      expect(get("MISSING_VAR", "default")).toBe("default");
    });

    it("throws without fallback", () => {
      expect(() => get("MISSING_VAR")).toThrow("Missing");
    });
  });

  describe("getNumber", () => {
    it("parses number", () => {
      process.env.NUM_VAR = "42";
      expect(getNumber("NUM_VAR")).toBe(42);
    });

    it("uses fallback", () => {
      expect(getNumber("MISSING", 10)).toBe(10);
    });

    it("throws on non-number", () => {
      process.env.BAD_NUM = "abc";
      expect(() => getNumber("BAD_NUM")).toThrow("not a number");
    });
  });

  describe("getBool", () => {
    it("parses true values", () => {
      process.env.BOOL_VAR = "true";
      expect(getBool("BOOL_VAR")).toBe(true);
      process.env.BOOL_VAR = "1";
      expect(getBool("BOOL_VAR")).toBe(true);
    });

    it("parses false values", () => {
      process.env.BOOL_VAR = "false";
      expect(getBool("BOOL_VAR")).toBe(false);
    });

    it("uses fallback", () => {
      expect(getBool("MISSING", false)).toBe(false);
    });
  });

  describe("getList", () => {
    it("splits comma-separated", () => {
      process.env.LIST_VAR = "a,b,c";
      expect(getList("LIST_VAR")).toEqual(["a", "b", "c"]);
    });

    it("returns empty for missing", () => {
      expect(getList("MISSING")).toEqual([]);
    });
  });

  describe("has", () => {
    it("returns true for set var", () => {
      process.env.EXISTS = "yes";
      expect(has("EXISTS")).toBe(true);
    });

    it("returns false for missing var", () => {
      expect(has("NOPE_DOESNT_EXIST")).toBe(false);
    });
  });

  describe("require", () => {
    it("passes when all present", () => {
      process.env.A = "1";
      process.env.B = "2";
      expect(() => requireEnv(["A", "B"])).not.toThrow();
    });

    it("throws listing missing vars", () => {
      expect(() => requireEnv(["MISSING_X", "MISSING_Y"])).toThrow("MISSING_X");
    });
  });
});
