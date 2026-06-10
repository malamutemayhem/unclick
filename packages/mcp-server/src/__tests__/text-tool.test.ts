import { describe, expect, it } from "vitest";

import {
  analyseText,
  transformText,
  extractEmails,
  extractUrls,
  extractPhoneNumbers,
  countOccurrences,
  truncateText,
} from "../text-tool.js";

describe("analyseText", () => {
  it("returns error for empty text", () => {
    expect(analyseText({ text: "" })).toEqual({ error: "text is required." });
    expect(analyseText({ text: "   " })).toEqual({ error: "text is required." });
  });

  it("counts characters with and without spaces", () => {
    const result = analyseText({ text: "hello world" }) as any;
    expect(result.character_count).toBe(11);
    expect(result.character_count_no_spaces).toBe(10);
  });

  it("counts words correctly", () => {
    const result = analyseText({ text: "one two three" }) as any;
    expect(result.word_count).toBe(3);
  });

  it("counts sentences by terminal punctuation", () => {
    const result = analyseText({ text: "Hello. How are you? Fine!" }) as any;
    expect(result.sentence_count).toBe(3);
  });

  it("counts paragraphs separated by blank lines", () => {
    const result = analyseText({ text: "Para one.\n\nPara two.\n\nPara three." }) as any;
    expect(result.paragraph_count).toBe(3);
  });

  it("counts lines", () => {
    const result = analyseText({ text: "line1\nline2\nline3" }) as any;
    expect(result.line_count).toBe(3);
  });

  it("computes reading time", () => {
    const words200 = Array(200).fill("word").join(" ");
    const result = analyseText({ text: words200 }) as any;
    expect(result.reading_time_minutes).toBe(1.0);
    expect(result.reading_time_seconds).toBe(60);
  });

  it("returns top words excluding stop words", () => {
    const result = analyseText({ text: "testing testing code code code" }) as any;
    expect(result.top_words[0].word).toBe("code");
    expect(result.top_words[0].count).toBe(3);
  });

  it("returns null average_words_per_sentence when no sentences", () => {
    const result = analyseText({ text: "no punctuation here" }) as any;
    expect(result.average_words_per_sentence).toBeNull();
  });
});

describe("transformText", () => {
  it("transforms to uppercase", () => {
    const result = transformText({ text: "hello", transform: "uppercase" }) as any;
    expect(result.result).toBe("HELLO");
  });

  it("transforms to lowercase", () => {
    const result = transformText({ text: "HELLO", transform: "lowercase" }) as any;
    expect(result.result).toBe("hello");
  });

  it("transforms to title_case", () => {
    const result = transformText({ text: "hello world", transform: "title_case" }) as any;
    expect(result.result).toBe("Hello World");
  });

  it("transforms to snake_case", () => {
    const result = transformText({ text: "helloWorld", transform: "snake_case" }) as any;
    expect(result.result).toBe("hello_world");
  });

  it("transforms to camel_case", () => {
    const result = transformText({ text: "hello world", transform: "camel_case" }) as any;
    expect(result.result).toBe("helloWorld");
  });

  it("transforms to kebab_case", () => {
    const result = transformText({ text: "helloWorld", transform: "kebab_case" }) as any;
    expect(result.result).toBe("hello-world");
  });

  it("reverses text", () => {
    const result = transformText({ text: "abc", transform: "reverse" }) as any;
    expect(result.result).toBe("cba");
  });

  it("removes spaces", () => {
    const result = transformText({ text: "a b c", transform: "remove_spaces" }) as any;
    expect(result.result).toBe("abc");
  });

  it("accepts hyphenated transform names", () => {
    const result = transformText({ text: "hello world", transform: "title-case" }) as any;
    expect(result.result).toBe("Hello World");
  });

  it("returns error for unsupported transform", () => {
    const result = transformText({ text: "hello", transform: "unknown" }) as any;
    expect(result.error).toContain("not supported");
    expect(result.supported).toContain("uppercase");
  });

  it("preserves original in the output", () => {
    const result = transformText({ text: "input", transform: "uppercase" }) as any;
    expect(result.original).toBe("input");
    expect(result.transform).toBe("uppercase");
  });
});

describe("extractEmails", () => {
  it("returns error for empty text", () => {
    expect(extractEmails({ text: "" })).toEqual({ error: "text is required." });
  });

  it("extracts emails from text", () => {
    const result = extractEmails({ text: "Contact user@example.com or admin@test.org" }) as any;
    expect(result.count).toBe(2);
    expect(result.emails).toContain("user@example.com");
    expect(result.emails).toContain("admin@test.org");
  });

  it("deduplicates emails", () => {
    const result = extractEmails({ text: "a@b.com and a@b.com again" }) as any;
    expect(result.count).toBe(1);
    expect(result.emails).toEqual(["a@b.com"]);
    expect(result.all_matches).toHaveLength(2);
  });

  it("returns empty for text with no emails", () => {
    const result = extractEmails({ text: "no emails here" }) as any;
    expect(result.count).toBe(0);
  });
});

describe("extractUrls", () => {
  it("returns error for empty text", () => {
    expect(extractUrls({ text: "" })).toEqual({ error: "text is required." });
  });

  it("extracts http and https URLs", () => {
    const result = extractUrls({ text: "Visit http://example.com or https://secure.io/path" }) as any;
    expect(result.count).toBe(2);
    expect(result.urls).toContain("http://example.com");
    expect(result.urls).toContain("https://secure.io/path");
  });

  it("deduplicates URLs", () => {
    const result = extractUrls({ text: "https://x.com https://x.com" }) as any;
    expect(result.count).toBe(1);
    expect(result.all_matches).toHaveLength(2);
  });
});

describe("extractPhoneNumbers", () => {
  it("returns error for empty text", () => {
    expect(extractPhoneNumbers({ text: "" })).toEqual({ error: "text is required." });
  });

  it("extracts AU mobile numbers", () => {
    const result = extractPhoneNumbers({ text: "Call 0412345678" }) as any;
    expect(result.count).toBeGreaterThan(0);
    expect(result.phone_numbers.length).toBeGreaterThan(0);
  });

  it("extracts international format numbers", () => {
    const result = extractPhoneNumbers({ text: "Call +61 412 345 678" }) as any;
    expect(result.count).toBeGreaterThan(0);
  });
});

describe("countOccurrences", () => {
  it("returns error when text is missing", () => {
    expect(countOccurrences({ search: "x" })).toEqual({ error: "text is required." });
  });

  it("returns error when search is missing", () => {
    expect(countOccurrences({ text: "hello" })).toEqual({ error: "search_string is required." });
  });

  it("counts case-sensitive occurrences", () => {
    const result = countOccurrences({ text: "aba ABA aba", search: "aba" }) as any;
    expect(result.count_case_sensitive).toBe(2);
  });

  it("counts case-insensitive occurrences", () => {
    const result = countOccurrences({ text: "aba ABA aba", search: "aba" }) as any;
    expect(result.count_case_insensitive).toBe(3);
  });

  it("returns positions of matches", () => {
    const result = countOccurrences({ text: "xyzxyz", search: "xyz" }) as any;
    expect(result.positions_case_sensitive).toEqual([0, 3]);
  });

  it("handles overlapping matches", () => {
    const result = countOccurrences({ text: "aaa", search: "aa" }) as any;
    expect(result.count_case_sensitive).toBe(2);
    expect(result.positions_case_sensitive).toEqual([0, 1]);
  });

  it("accepts search_string alias", () => {
    const result = countOccurrences({ text: "abc", search_string: "b" }) as any;
    expect(result.count_case_sensitive).toBe(1);
  });
});

describe("truncateText", () => {
  it("returns error for empty text", () => {
    expect(truncateText({ text: "" })).toEqual({ error: "text is required." });
  });

  it("does not truncate short text", () => {
    const result = truncateText({ text: "hi", max_length: 10 }) as any;
    expect(result.truncated).toBe(false);
    expect(result.result).toBe("hi");
  });

  it("truncates with ellipsis by default", () => {
    const result = truncateText({ text: "hello world test", max_length: 10 }) as any;
    expect(result.truncated).toBe(true);
    expect(result.result).toContain("...");
    expect(result.result.length).toBeLessThanOrEqual(10);
  });

  it("truncates without ellipsis when disabled", () => {
    const result = truncateText({ text: "hello world test", max_length: 5, ellipsis: false }) as any;
    expect(result.truncated).toBe(true);
    expect(result.result).toBe("hello");
    expect(result.result).not.toContain("...");
  });

  it("reports original and result lengths", () => {
    const result = truncateText({ text: "abcdefghij", max_length: 5 }) as any;
    expect(result.original_length).toBe(10);
    expect(result.max_chars).toBe(5);
  });

  it("accepts max_chars alias", () => {
    const result = truncateText({ text: "abcdefghij", max_chars: 5 }) as any;
    expect(result.max_chars).toBe(5);
  });

  it("clamps max_length to at least 1", () => {
    const result = truncateText({ text: "abc", max_length: 0 }) as any;
    expect(result.max_chars).toBe(1);
  });
});
