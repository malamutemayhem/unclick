import { describe, it, expect } from "vitest";
import { interpret, validate, minify } from "../brainfuck.js";

describe("brainfuck", () => {
  describe("interpret", () => {
    it("outputs Hello World", () => {
      const hw =
        "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
      const result = interpret(hw);
      expect(result.output).toBe("Hello World!\n");
    });

    it("handles simple output", () => {
      // 65 = 'A'
      const code = "+".repeat(65) + ".";
      const result = interpret(code);
      expect(result.output).toBe("A");
    });

    it("reads input", () => {
      const code = ",.";
      const result = interpret(code, "X");
      expect(result.output).toBe("X");
    });

    it("handles loops", () => {
      // Add 3, then loop subtract until zero - should not output anything
      const code = "+++[-]";
      const result = interpret(code);
      expect(result.output).toBe("");
      expect(result.steps).toBeGreaterThan(0);
    });

    it("respects maxSteps limit", () => {
      const code = "+[]"; // infinite loop
      const result = interpret(code, "", 100);
      expect(result.steps).toBe(100);
    });

    it("wraps cell values at 255", () => {
      // Set cell to 255 then increment once more -> wraps to 0
      let code = "";
      for (let i = 0; i < 256; i++) code += "+";
      code += ".";
      const result = interpret(code);
      expect(result.output).toBe("\0");
    });

    it("wraps pointer around tape", () => {
      const code = "<.";
      const result = interpret(code);
      expect(result.output).toBe("\0");
    });

    it("throws on unmatched ]", () => {
      expect(() => interpret("]")).toThrow("Unmatched ]");
    });

    it("throws on unmatched [", () => {
      expect(() => interpret("[")).toThrow("Unmatched [");
    });
  });

  describe("validate", () => {
    it("accepts valid code", () => {
      expect(validate("++[>++<-]>.")).toEqual({ valid: true });
    });

    it("rejects unmatched [", () => {
      const result = validate("[++");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Unmatched [");
    });

    it("rejects unmatched ]", () => {
      const result = validate("++]");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Unmatched ]");
    });

    it("handles nested brackets", () => {
      expect(validate("[[[]]]")).toEqual({ valid: true });
    });
  });

  describe("minify", () => {
    it("strips non-BF characters", () => {
      expect(minify("+ + hello [ - ] world .")).toBe("++[-].");
    });

    it("preserves all BF instructions", () => {
      const all = "><+-.,[]";
      expect(minify(all)).toBe(all);
    });

    it("returns empty for no BF chars", () => {
      expect(minify("hello world")).toBe("");
    });
  });
});
