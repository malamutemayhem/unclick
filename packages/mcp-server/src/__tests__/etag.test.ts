import { describe, it, expect } from "vitest";
import {
  generateETag, generateWeakETag, isWeakETag,
  stripWeakPrefix, strongMatch, weakMatch, ifNoneMatch,
} from "../etag.js";

describe("etag", () => {
  it("generateETag produces quoted string", () => {
    const tag = generateETag("hello world");
    expect(tag.startsWith('"')).toBe(true);
    expect(tag.endsWith('"')).toBe(true);
  });

  it("same content produces same etag", () => {
    expect(generateETag("test")).toBe(generateETag("test"));
  });

  it("different content produces different etag", () => {
    expect(generateETag("abc")).not.toBe(generateETag("xyz"));
  });

  it("generateWeakETag has W/ prefix", () => {
    const tag = generateWeakETag("data");
    expect(tag.startsWith("W/")).toBe(true);
  });

  it("isWeakETag detects weak tags", () => {
    expect(isWeakETag('W/"abc"')).toBe(true);
    expect(isWeakETag('"abc"')).toBe(false);
  });

  it("stripWeakPrefix removes W/", () => {
    expect(stripWeakPrefix('W/"abc"')).toBe('"abc"');
    expect(stripWeakPrefix('"abc"')).toBe('"abc"');
  });

  it("strongMatch requires both non-weak and equal", () => {
    expect(strongMatch('"abc"', '"abc"')).toBe(true);
    expect(strongMatch('"abc"', '"xyz"')).toBe(false);
    expect(strongMatch('W/"abc"', '"abc"')).toBe(false);
  });

  it("weakMatch ignores W/ prefix", () => {
    expect(weakMatch('W/"abc"', '"abc"')).toBe(true);
    expect(weakMatch('W/"abc"', 'W/"abc"')).toBe(true);
    expect(weakMatch('"abc"', '"xyz"')).toBe(false);
  });

  it("ifNoneMatch uses weak comparison", () => {
    const tag = generateETag("content");
    const weak = generateWeakETag("content");
    expect(ifNoneMatch(tag, weak)).toBe(true);
  });
});
