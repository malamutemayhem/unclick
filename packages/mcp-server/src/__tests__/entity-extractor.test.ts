import { describe, it, expect } from "vitest";
import { extractEmails, extractUrls, extractDates, extractAmounts, extractHashtags, extractMentions, extractAll } from "../entity-extractor.js";

describe("extractEmails", () => {
  it("finds emails", () => {
    const result = extractEmails("Contact alice@example.com or bob@test.org");
    expect(result.length).toBe(2);
    expect(result[0].value).toBe("alice@example.com");
  });
});

describe("extractUrls", () => {
  it("finds URLs", () => {
    const result = extractUrls("Visit https://example.com and http://test.org/page");
    expect(result.length).toBe(2);
  });
});

describe("extractDates", () => {
  it("finds ISO dates", () => {
    expect(extractDates("Due on 2024-01-15")[0].value).toBe("2024-01-15");
  });

  it("finds natural dates", () => {
    expect(extractDates("Born January 5, 2000").length).toBe(1);
  });
});

describe("extractAmounts", () => {
  it("finds currency amounts", () => {
    expect(extractAmounts("Price is $19.99")[0].value).toBe("$19.99");
  });
});

describe("extractHashtags", () => {
  it("finds hashtags", () => {
    expect(extractHashtags("Love #coding and #typescript").length).toBe(2);
  });
});

describe("extractMentions", () => {
  it("finds mentions", () => {
    expect(extractMentions("Hey @alice and @bob").length).toBe(2);
  });
});

describe("extractAll", () => {
  it("finds all entities", () => {
    const text = "Email alice@test.com, visit https://example.com, due 2024-01-15, #tag @user";
    const all = extractAll(text);
    const types = new Set(all.map((e) => e.type));
    expect(types.has("email")).toBe(true);
    expect(types.has("url")).toBe(true);
    expect(types.has("date")).toBe(true);
    expect(types.has("hashtag")).toBe(true);
    expect(types.has("mention")).toBe(true);
  });
});
