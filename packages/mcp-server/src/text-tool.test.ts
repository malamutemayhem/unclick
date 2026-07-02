import { describe, expect, it } from "vitest";
import {
  analyseText,
  transformText,
  extractEmails,
  extractUrls,
  countOccurrences,
  truncateText,
} from "./text-tool.js";

describe("text-tool", () => {
  describe("analyseText", () => {
    it("counts characters, words, and sentences", () => {
      const r = analyseText({ text: "Hello world. This is a test!" }) as Record<string, unknown>;
      expect(r.word_count).toBe(6);
      expect(r.sentence_count).toBe(2);
      expect(r.character_count).toBe(28);
    });

    it("rejects empty text", () => {
      expect(analyseText({ text: "   " })).toEqual({ error: "text is required." });
    });

    it("surfaces top non-stopword words", () => {
      const r = analyseText({ text: "apple apple banana apple banana cherry" }) as {
        top_words: Array<{ word: string; count: number }>;
      };
      expect(r.top_words[0]).toEqual({ word: "apple", count: 3 });
    });
  });

  describe("transformText", () => {
    it("applies snake_case", () => {
      const r = transformText({ text: "Hello World Foo", transform: "snake_case" }) as Record<string, string>;
      expect(r.result).toBe("hello_world_foo");
    });

    it("applies camel_case", () => {
      const r = transformText({ text: "hello world foo", transform: "camel_case" }) as Record<string, string>;
      expect(r.result).toBe("helloWorldFoo");
    });

    it("accepts hyphenated transform names (kebab-case)", () => {
      const r = transformText({ text: "Hello World", transform: "kebab-case" }) as Record<string, string>;
      expect(r.result).toBe("hello-world");
    });

    it("reports unsupported transforms with the supported list", () => {
      const r = transformText({ text: "x", transform: "rot13" }) as { error: string; supported: string[] };
      expect(r.error).toMatch(/not supported/);
      expect(r.supported).toContain("uppercase");
    });
  });

  describe("extractEmails / extractUrls", () => {
    it("extracts unique emails", () => {
      const r = extractEmails({ text: "a@x.com, b@y.org, a@x.com" }) as { count: number; emails: string[] };
      expect(r.count).toBe(2);
      expect(r.emails).toEqual(["a@x.com", "b@y.org"]);
    });

    it("extracts http and https urls", () => {
      const r = extractUrls({ text: "see https://a.com and http://b.org/x" }) as { count: number; urls: string[] };
      expect(r.count).toBe(2);
      expect(r.urls).toContain("https://a.com");
    });
  });

  describe("countOccurrences", () => {
    it("counts case-sensitive and case-insensitive separately", () => {
      const r = countOccurrences({ text: "Aa aa AA", search_string: "aa" }) as Record<string, unknown>;
      expect(r.count_case_sensitive).toBe(1);
      expect(r.count_case_insensitive).toBe(3);
    });

    it("requires a search string", () => {
      expect(countOccurrences({ text: "hi", search_string: "" })).toEqual({
        error: "search_string is required.",
      });
    });
  });

  describe("truncateText", () => {
    it("truncates with an ellipsis by default", () => {
      const r = truncateText({ text: "abcdefghij", max_chars: 8 }) as Record<string, unknown>;
      expect(r.truncated).toBe(true);
      expect(r.result).toBe("abcde...");
      expect(r.result_length).toBe(8);
    });

    it("leaves short text untouched", () => {
      const r = truncateText({ text: "short", max_chars: 100 }) as Record<string, unknown>;
      expect(r.truncated).toBe(false);
      expect(r.result).toBe("short");
    });

    it("can truncate without an ellipsis", () => {
      const r = truncateText({ text: "abcdefghij", max_chars: 4, ellipsis: false }) as Record<string, string>;
      expect(r.result).toBe("abcd");
    });
  });
});
