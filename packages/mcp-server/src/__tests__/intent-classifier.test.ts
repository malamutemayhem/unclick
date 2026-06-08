import { describe, it, expect } from "vitest";
import { IntentClassifier, quickClassify } from "../intent-classifier.js";

describe("IntentClassifier", () => {
  it("classifies by keywords", () => {
    const c = new IntentClassifier();
    c.register({ name: "greeting", keywords: ["hello", "hi", "hey"] });
    c.register({ name: "farewell", keywords: ["bye", "goodbye", "see you"] });
    const result = c.classify("hello there");
    expect(result.intent).toBe("greeting");
    expect(result.confidence).toBeGreaterThan(0);
  });

  it("classifies by patterns", () => {
    const c = new IntentClassifier();
    c.register({ name: "question", keywords: ["what", "how", "why"], patterns: [/\?$/] });
    c.register({ name: "command", keywords: ["do", "run", "execute"] });
    const result = c.classify("What is this?");
    expect(result.intent).toBe("question");
  });

  it("returns scores for all intents", () => {
    const c = new IntentClassifier();
    c.register({ name: "a", keywords: ["test"] });
    c.register({ name: "b", keywords: ["other"] });
    const result = c.classify("test something");
    expect(result.scores.length).toBe(2);
  });

  it("classifyTop returns limited results", () => {
    const c = new IntentClassifier();
    c.register({ name: "a", keywords: ["x"] });
    c.register({ name: "b", keywords: ["y"] });
    c.register({ name: "c", keywords: ["z"] });
    expect(c.classifyTop("x y z", 2).length).toBe(2);
  });

  it("lists intents", () => {
    const c = new IntentClassifier();
    c.register({ name: "a", keywords: [] });
    c.register({ name: "b", keywords: [] });
    expect(c.listIntents()).toEqual(["a", "b"]);
  });
});

describe("quickClassify", () => {
  it("classifies with inline intents", () => {
    const result = quickClassify("I want to buy something", {
      purchase: ["buy", "purchase", "order"],
      support: ["help", "issue", "problem"],
    });
    expect(result).toBe("purchase");
  });
});
