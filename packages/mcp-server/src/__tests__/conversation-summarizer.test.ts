import { describe, it, expect } from "vitest";
import { summarizeTurns, progressiveSummarize, countTurns, extractTopics, lastNTurns, Turn } from "../conversation-summarizer.js";

const turns: Turn[] = [
  { role: "user", content: "Hello there" },
  { role: "assistant", content: "Hi! How can I help?" },
  { role: "user", content: "Tell me about the weather today" },
  { role: "assistant", content: "The weather is sunny and warm today" },
];

describe("summarizeTurns", () => {
  it("formats turns", () => {
    const summary = summarizeTurns(turns);
    expect(summary).toContain("[user]");
    expect(summary).toContain("[assistant]");
    expect(summary).toContain("Hello there");
  });

  it("truncates long content", () => {
    const long: Turn[] = [{ role: "user", content: "x".repeat(200) }];
    const summary = summarizeTurns(long, { maxCharsPerTurn: 50 });
    expect(summary).toContain("...");
    expect(summary.length).toBeLessThan(200);
  });

  it("includes timestamps when requested", () => {
    const withTs: Turn[] = [{ role: "user", content: "Hi", timestamp: 1700000000000 }];
    const summary = summarizeTurns(withTs, { includeTimestamps: true });
    expect(summary).toContain("2023");
  });
});

describe("progressiveSummarize", () => {
  it("returns all turns when under window", () => {
    const result = progressiveSummarize(turns, 10);
    expect(result.summary).toBe("");
    expect(result.recentTurns.length).toBe(4);
  });

  it("splits into summary and recent", () => {
    const result = progressiveSummarize(turns, 2);
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result.recentTurns.length).toBe(2);
  });

  it("uses custom summarizer", () => {
    const result = progressiveSummarize(turns, 2, () => "SUMMARY");
    expect(result.summary).toBe("SUMMARY");
  });
});

describe("countTurns", () => {
  it("counts all turns", () => {
    expect(countTurns(turns)).toBe(4);
  });

  it("counts by role", () => {
    expect(countTurns(turns, "user")).toBe(2);
    expect(countTurns(turns, "assistant")).toBe(2);
  });
});

describe("extractTopics", () => {
  it("extracts frequent words", () => {
    const topics = extractTopics(turns);
    expect(topics.length).toBeGreaterThan(0);
  });

  it("respects minWordLength", () => {
    const topics = extractTopics(turns, 6);
    for (const t of topics) {
      expect(t.length).toBeGreaterThanOrEqual(6);
    }
  });
});

describe("lastNTurns", () => {
  it("returns last N turns", () => {
    const last = lastNTurns(turns, 2);
    expect(last.length).toBe(2);
    expect(last[0].content).toContain("weather");
  });

  it("returns all when N exceeds length", () => {
    expect(lastNTurns(turns, 100).length).toBe(4);
  });
});
