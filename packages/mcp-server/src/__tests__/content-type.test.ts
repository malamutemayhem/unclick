import { describe, it, expect } from "vitest";
import { parse, format, getCharset, getBoundary, isText, isJSON, isMultipart, isFormData, matches } from "../content-type.js";

describe("content-type", () => {
  describe("parse", () => {
    it("parses simple type", () => {
      const ct = parse("text/html");
      expect(ct.type).toBe("text");
      expect(ct.subtype).toBe("html");
    });

    it("parses with charset", () => {
      const ct = parse("text/html; charset=utf-8");
      expect(ct.parameters["charset"]).toBe("utf-8");
    });

    it("parses quoted parameter", () => {
      const ct = parse('multipart/form-data; boundary="abc 123"');
      expect(ct.parameters["boundary"]).toBe("abc 123");
    });

    it("lowercases type and subtype", () => {
      const ct = parse("Application/JSON");
      expect(ct.type).toBe("application");
      expect(ct.subtype).toBe("json");
    });
  });

  describe("format", () => {
    it("formats simple type", () => {
      expect(format({ type: "text", subtype: "plain", parameters: {} })).toBe("text/plain");
    });

    it("formats with parameters", () => {
      const result = format({ type: "text", subtype: "html", parameters: { charset: "utf-8" } });
      expect(result).toBe("text/html; charset=utf-8");
    });
  });

  describe("helpers", () => {
    it("getCharset", () => {
      expect(getCharset(parse("text/html; charset=utf-8"))).toBe("utf-8");
      expect(getCharset(parse("text/html"))).toBeUndefined();
    });

    it("getBoundary", () => {
      expect(getBoundary(parse("multipart/form-data; boundary=abc"))).toBe("abc");
    });

    it("isText", () => {
      expect(isText(parse("text/plain"))).toBe(true);
      expect(isText(parse("application/json"))).toBe(true);
      expect(isText(parse("application/xml"))).toBe(true);
      expect(isText(parse("image/png"))).toBe(false);
    });

    it("isJSON", () => {
      expect(isJSON(parse("application/json"))).toBe(true);
      expect(isJSON(parse("application/vnd.api+json"))).toBe(true);
      expect(isJSON(parse("text/html"))).toBe(false);
    });

    it("isMultipart", () => {
      expect(isMultipart(parse("multipart/form-data"))).toBe(true);
      expect(isMultipart(parse("text/plain"))).toBe(false);
    });

    it("isFormData", () => {
      expect(isFormData(parse("application/x-www-form-urlencoded"))).toBe(true);
    });

    it("matches with wildcard", () => {
      expect(matches(parse("text/html"), "text/*")).toBe(true);
      expect(matches(parse("text/html"), "*/html")).toBe(true);
      expect(matches(parse("text/html"), "*/*")).toBe(true);
      expect(matches(parse("text/html"), "image/*")).toBe(false);
    });
  });
});
