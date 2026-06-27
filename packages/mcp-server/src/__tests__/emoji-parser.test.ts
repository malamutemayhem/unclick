import { describe, it, expect } from "vitest";
import { EmojiParser } from "../emoji-parser.js";

describe("EmojiParser", () => {
  it("parses shortcodes", () => {
    const result = EmojiParser.parseShortcodes("Hello :smile: World");
    expect(result).toContain("\u{1F604}");
    expect(result).not.toContain(":smile:");
  });

  it("leaves unknown shortcodes unchanged", () => {
    expect(EmojiParser.parseShortcodes(":unknown:")).toBe(":unknown:");
  });

  it("converts emoji to shortcode", () => {
    expect(EmojiParser.toShortcode("\u{1F525}")).toBe(":fire:");
  });

  it("returns null for unknown emoji", () => {
    expect(EmojiParser.toShortcode("A")).toBeNull();
  });

  it("strips emojis from text", () => {
    const result = EmojiParser.stripEmojis("Hello \u{1F604} World");
    expect(result).toBe("Hello World");
  });

  it("detects emoji presence", () => {
    expect(EmojiParser.containsEmoji("Hello \u{1F604}")).toBe(true);
    expect(EmojiParser.containsEmoji("Hello World")).toBe(false);
  });

  it("lists all shortcodes", () => {
    const codes = EmojiParser.listShortcodes();
    expect(codes.length).toBeGreaterThan(10);
    expect(codes).toContain(":fire:");
  });

  it("searches by keyword", () => {
    const results = EmojiParser.search("fire");
    expect(results.length).toBe(1);
    expect(results[0].shortcode).toBe(":fire:");
  });

  it("counts emojis in text", () => {
    expect(EmojiParser.count("Hello \u{1F604}\u{1F525}")).toBe(2);
    expect(EmojiParser.count("No emojis")).toBe(0);
  });

  it("detects positive sentiment", () => {
    expect(EmojiParser.sentiment("\u{1F604}\u{1F44D}\u{2705}")).toBe("positive");
  });

  it("detects negative sentiment", () => {
    expect(EmojiParser.sentiment("\u{1F622}\u{1F620}\u{274C}")).toBe("negative");
  });

  it("detects neutral sentiment", () => {
    expect(EmojiParser.sentiment("no emojis here")).toBe("neutral");
  });
});
