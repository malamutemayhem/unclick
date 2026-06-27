import { describe, it, expect } from "vitest";
import { EntityIndex, linkEntities } from "../entity-linker.js";

describe("EntityIndex", () => {
  it("add and getById", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    expect(idx.getById("1")?.name).toBe("Alice");
    expect(idx.size).toBe(1);
  });

  it("getByName is case-insensitive", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    expect(idx.getByName("alice")?.id).toBe("1");
    expect(idx.getByName("ALICE")?.id).toBe("1");
  });

  it("finds by alias", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Robert", aliases: ["Bob", "Bobby"] });
    expect(idx.getByName("Bob")?.id).toBe("1");
    expect(idx.getByName("Bobby")?.id).toBe("1");
  });

  it("search finds partial matches", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice Smith" });
    idx.add({ id: "2", type: "person", name: "Bob Jones" });
    const results = idx.search("alice");
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("Alice Smith");
  });

  it("search finds by alias", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "company", name: "Acme Inc", aliases: ["Acme"] });
    expect(idx.search("acme").length).toBe(1);
  });

  it("remove cleans up indices", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice", aliases: ["Ali"] });
    expect(idx.remove("1")).toBe(true);
    expect(idx.getByName("Alice")).toBeUndefined();
    expect(idx.getByName("Ali")).toBeUndefined();
    expect(idx.remove("1")).toBe(false);
  });

  it("getByType filters", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    idx.add({ id: "2", type: "company", name: "Acme" });
    idx.add({ id: "3", type: "person", name: "Bob" });
    expect(idx.getByType("person").length).toBe(2);
    expect(idx.getByType("company").length).toBe(1);
  });

  it("findMentions finds entities in text", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    idx.add({ id: "2", type: "person", name: "Bob" });
    const mentions = idx.findMentions("Alice met Bob at the park");
    expect(mentions.length).toBe(2);
    expect(mentions[0].entity.name).toBe("Alice");
    expect(mentions[0].position).toBe(0);
    expect(mentions[1].entity.name).toBe("Bob");
  });

  it("findMentions finds multiple occurrences", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    const mentions = idx.findMentions("Alice saw Alice");
    expect(mentions.length).toBe(2);
  });

  it("clear empties index", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    idx.clear();
    expect(idx.size).toBe(0);
    expect(idx.getByName("Alice")).toBeUndefined();
  });
});

describe("linkEntities", () => {
  it("returns linked entities and mentions", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    idx.add({ id: "2", type: "place", name: "Paris" });
    const result = linkEntities("Alice went to Paris", idx);
    expect(result.entities.length).toBe(2);
    expect(result.mentions.length).toBe(2);
  });

  it("deduplicates entities", () => {
    const idx = new EntityIndex();
    idx.add({ id: "1", type: "person", name: "Alice" });
    const result = linkEntities("Alice met Alice", idx);
    expect(result.entities.length).toBe(1);
    expect(result.mentions.length).toBe(2);
  });
});
