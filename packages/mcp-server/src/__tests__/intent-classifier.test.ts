import { describe, it, expect } from "vitest";
import { classifyIntent, classifyTopN, extractEntities, Intent } from "../intent-classifier.js";

const intents: Intent[] = [
  { name: "greeting", patterns: ["hello", "hi there", "good morning", "hey"] },
  { name: "farewell", patterns: ["goodbye", "bye", "see you later", "take care"] },
  { name: "weather", patterns: ["what is the weather", "weather forecast", "is it raining"], examples: ["tell me the weather today"] },
  { name: "help", patterns: ["i need help", "can you help me", "assist me"] },
];

describe("classifyIntent", () => {
  it("matches exact pattern", () => {
    const r = classifyIntent("hello", intents);
    expect(r.intent).toBe("greeting");
    expect(r.confidence).toBe(1);
  });

  it("matches partial overlap", () => {
    const r = classifyIntent("what is the weather today", intents);
    expect(r.intent).toBe("weather");
    expect(r.confidence).toBeGreaterThan(0.5);
  });

  it("returns unknown for no match", () => {
    const r = classifyIntent("xyzzy foobar baz", intents);
    expect(r.intent).toBe("unknown");
    expect(r.confidence).toBe(0);
  });

  it("uses examples for classification", () => {
    const r = classifyIntent("tell me the weather today", intents);
    expect(r.intent).toBe("weather");
    expect(r.confidence).toBe(1);
  });

  it("picks highest confidence", () => {
    const r = classifyIntent("help me with the weather forecast", intents);
    expect(r.confidence).toBeGreaterThan(0);
    expect(["weather", "help"]).toContain(r.intent);
  });
});

describe("classifyTopN", () => {
  it("returns top N results sorted by confidence", () => {
    const results = classifyTopN("hello help", intents, 3);
    expect(results.length).toBe(3);
    expect(results[0].confidence).toBeGreaterThanOrEqual(results[1].confidence);
    expect(results[1].confidence).toBeGreaterThanOrEqual(results[2].confidence);
  });

  it("limits to N results", () => {
    const results = classifyTopN("hello", intents, 2);
    expect(results.length).toBe(2);
  });

  it("includes all intents up to N", () => {
    const results = classifyTopN("goodbye", intents, 4);
    expect(results.length).toBe(4);
    expect(results[0].intent).toBe("farewell");
  });
});

describe("extractEntities", () => {
  it("extracts emails", () => {
    const patterns = { email: /[\w.+-]+@[\w-]+\.[\w.]+/ };
    const r = extractEntities("Contact me at bob@example.com or alice@test.org", patterns);
    expect(r.email).toEqual(["bob@example.com", "alice@test.org"]);
  });

  it("extracts numbers", () => {
    const patterns = { number: /\d+/ };
    const r = extractEntities("I have 3 cats and 5 dogs", patterns);
    expect(r.number).toEqual(["3", "5"]);
  });

  it("returns empty for no matches", () => {
    const patterns = { email: /[\w.+-]+@[\w-]+\.[\w.]+/ };
    const r = extractEntities("no email here", patterns);
    expect(r.email).toBeUndefined();
  });

  it("handles multiple entity types", () => {
    const patterns = {
      date: /\d{4}-\d{2}-\d{2}/,
      currency: /\$\d+/,
    };
    const r = extractEntities("On 2024-01-15 paid $50, on 2024-02-20 paid $100", patterns);
    expect(r.date).toEqual(["2024-01-15", "2024-02-20"]);
    expect(r.currency).toEqual(["$50", "$100"]);
  });
});
