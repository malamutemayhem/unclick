import { describe, it, expect } from "vitest";
import { required, minLength, maxLength, pattern, minValue, maxValue, oneOf, email, url, integer, validate, compose } from "../data-validator.js";

describe("data-validator", () => {
  describe("rules", () => {
    it("required rejects null/undefined/empty", () => {
      expect(required()(null)).toBe("Required");
      expect(required()(undefined)).toBe("Required");
      expect(required()("")).toBe("Required");
      expect(required()("hello")).toBeNull();
    });

    it("minLength", () => {
      expect(minLength(3)("ab")).not.toBeNull();
      expect(minLength(3)("abc")).toBeNull();
    });

    it("maxLength", () => {
      expect(maxLength(3)("abcd")).not.toBeNull();
      expect(maxLength(3)("abc")).toBeNull();
    });

    it("pattern", () => {
      expect(pattern(/^\d+$/)("123")).toBeNull();
      expect(pattern(/^\d+$/)("abc")).not.toBeNull();
    });

    it("minValue", () => {
      expect(minValue(5)(3)).not.toBeNull();
      expect(minValue(5)(5)).toBeNull();
    });

    it("maxValue", () => {
      expect(maxValue(10)(11)).not.toBeNull();
      expect(maxValue(10)(10)).toBeNull();
    });

    it("oneOf", () => {
      expect(oneOf(["a", "b"])("a")).toBeNull();
      expect(oneOf(["a", "b"])("c")).not.toBeNull();
    });

    it("email", () => {
      expect(email()("test@example.com")).toBeNull();
      expect(email()("not-an-email")).not.toBeNull();
    });

    it("url", () => {
      expect(url()("https://example.com")).toBeNull();
      expect(url()("not-a-url")).not.toBeNull();
    });

    it("integer", () => {
      expect(integer()(5)).toBeNull();
      expect(integer()(5.5)).not.toBeNull();
    });
  });

  describe("validate", () => {
    it("returns valid for passing rules", () => {
      const result = validate({ name: "Alice", age: 30 }, {
        name: [required(), minLength(2)],
        age: [required(), minValue(0)],
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("returns errors for failing rules", () => {
      const result = validate({ name: "" }, {
        name: [required()],
      });
      expect(result.valid).toBe(false);
      expect(result.errors[0].field).toBe("name");
    });

    it("stops at first error per field", () => {
      const result = validate({ name: "" }, {
        name: [required(), minLength(3)],
      });
      expect(result.errors).toHaveLength(1);
    });
  });

  describe("compose", () => {
    it("runs rules in order", () => {
      const rule = compose(required(), minLength(3));
      expect(rule(null)).toBe("Required");
      expect(rule("ab")).not.toBeNull();
      expect(rule("abc")).toBeNull();
    });
  });
});
