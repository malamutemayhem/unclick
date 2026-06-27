import { describe, it, expect } from "vitest";
import { KnowledgeBase } from "../knowledge-base.js";

describe("KnowledgeBase", () => {
  it("add and get", () => {
    const kb = new KnowledgeBase();
    const id = kb.add("Paris is in France", "geography", { tags: ["cities"] });
    expect(kb.get(id)?.content).toBe("Paris is in France");
  });

  it("update modifies item", () => {
    const kb = new KnowledgeBase();
    const id = kb.add("old content", "test");
    kb.update(id, { content: "new content", confidence: 0.8 });
    expect(kb.get(id)?.content).toBe("new content");
    expect(kb.get(id)?.confidence).toBe(0.8);
  });

  it("remove deletes item", () => {
    const kb = new KnowledgeBase();
    const id = kb.add("test", "cat");
    expect(kb.remove(id)).toBe(true);
    expect(kb.get(id)).toBeUndefined();
  });

  it("search by content", () => {
    const kb = new KnowledgeBase();
    kb.add("The sky is blue", "science");
    kb.add("Grass is green", "science");
    kb.add("Python is a language", "tech");
    expect(kb.search("blue").length).toBe(1);
    expect(kb.search("blue")[0].content).toContain("blue");
  });

  it("search by category", () => {
    const kb = new KnowledgeBase();
    kb.add("A", "cat1");
    kb.add("B", "cat2");
    expect(kb.search("", { category: "cat1" }).length).toBe(1);
  });

  it("search by tags", () => {
    const kb = new KnowledgeBase();
    kb.add("A", "x", { tags: ["important"] });
    kb.add("B", "x", { tags: ["trivial"] });
    expect(kb.search("", { tags: ["important"] }).length).toBe(1);
  });

  it("search by confidence", () => {
    const kb = new KnowledgeBase();
    kb.add("High", "x", { confidence: 0.9 });
    kb.add("Low", "x", { confidence: 0.2 });
    expect(kb.search("", { minConfidence: 0.5 }).length).toBe(1);
  });

  it("getByCategory returns all in category", () => {
    const kb = new KnowledgeBase();
    kb.add("A", "tech");
    kb.add("B", "tech");
    kb.add("C", "science");
    expect(kb.getByCategory("tech").length).toBe(2);
  });

  it("categories returns unique sorted list", () => {
    const kb = new KnowledgeBase();
    kb.add("A", "beta");
    kb.add("B", "alpha");
    expect(kb.categories()).toEqual(["alpha", "beta"]);
  });

  it("clear empties kb", () => {
    const kb = new KnowledgeBase();
    kb.add("A", "x");
    kb.clear();
    expect(kb.size).toBe(0);
  });
});
