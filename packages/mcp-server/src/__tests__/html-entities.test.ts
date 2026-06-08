import { describe, it, expect } from "vitest";
import { encode, decode, encodeNonASCII, decodeNumeric, isEncoded, stripEntities } from "../html-entities.js";

describe("html-entities", () => {
  describe("encode", () => {
    it("encodes special characters", () => {
      expect(encode('&<>"\''))
        .toBe("&amp;&lt;&gt;&quot;&#39;");
    });

    it("leaves normal text unchanged", () => {
      expect(encode("hello world")).toBe("hello world");
    });
  });

  describe("decode", () => {
    it("decodes named entities", () => {
      expect(decode("&amp;&lt;&gt;&quot;&#39;"))
        .toBe('&<>"\'');
    });

    it("decodes decimal numeric entities", () => {
      expect(decode("&#65;&#66;")).toBe("AB");
    });

    it("decodes hex numeric entities", () => {
      expect(decode("&#x41;&#x42;")).toBe("AB");
    });

    it("decodes special named entities", () => {
      expect(decode("&nbsp;")).toBe(" ");
      expect(decode("&copy;")).toBe("©");
      expect(decode("&euro;")).toBe("€");
    });

    it("leaves unknown entities untouched", () => {
      expect(decode("&unknown;")).toBe("&unknown;");
    });
  });

  describe("encodeNonASCII", () => {
    it("encodes non-ASCII characters", () => {
      expect(encodeNonASCII("A©B")).toBe("A&#169;B");
    });

    it("leaves ASCII unchanged", () => {
      expect(encodeNonASCII("hello")).toBe("hello");
    });
  });

  describe("decodeNumeric", () => {
    it("decodes decimal and hex entities", () => {
      expect(decodeNumeric("&#65;&#x42;")).toBe("AB");
    });

    it("leaves named entities alone", () => {
      expect(decodeNumeric("&amp;")).toBe("&amp;");
    });
  });

  describe("isEncoded", () => {
    it("returns true for encoded strings", () => {
      expect(isEncoded("&amp;")).toBe(true);
      expect(isEncoded("&#65;")).toBe(true);
      expect(isEncoded("&#x41;")).toBe(true);
    });

    it("returns false for plain strings", () => {
      expect(isEncoded("hello")).toBe(false);
    });
  });

  describe("stripEntities", () => {
    it("removes all entities", () => {
      expect(stripEntities("a&amp;b&#65;c")).toBe("abc");
    });

    it("leaves clean text alone", () => {
      expect(stripEntities("abc")).toBe("abc");
    });
  });
});
