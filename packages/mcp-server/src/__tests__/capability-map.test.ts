import { describe, it, expect } from "vitest";
import { CapabilityMap, mergeCapabilities } from "../capability-map.js";

describe("CapabilityMap", () => {
  it("register and get", () => {
    const map = new CapabilityMap();
    map.register({ name: "search", description: "Search the web", tags: ["web", "search"] });
    expect(map.get("search")?.description).toBe("Search the web");
    expect(map.has("search")).toBe(true);
    expect(map.size).toBe(1);
  });

  it("unregister removes capability", () => {
    const map = new CapabilityMap();
    map.register({ name: "search", description: "Search", tags: ["web"] });
    expect(map.unregister("search")).toBe(true);
    expect(map.has("search")).toBe(false);
  });

  it("query by tags", () => {
    const map = new CapabilityMap();
    map.register({ name: "web-search", description: "Web", tags: ["web", "search"] });
    map.register({ name: "file-search", description: "Files", tags: ["local", "search"] });
    map.register({ name: "calculator", description: "Math", tags: ["math"] });
    expect(map.query({ tags: ["search"] }).length).toBe(2);
    expect(map.query({ tags: ["web"] }).length).toBe(1);
  });

  it("query by confidence", () => {
    const map = new CapabilityMap();
    map.register({ name: "a", description: "A", tags: ["x"], confidence: 0.9 });
    map.register({ name: "b", description: "B", tags: ["x"], confidence: 0.3 });
    expect(map.query({ minConfidence: 0.5 }).length).toBe(1);
  });

  it("query by name", () => {
    const map = new CapabilityMap();
    map.register({ name: "web-search", description: "Search web", tags: [] });
    map.register({ name: "calculator", description: "Do math", tags: [] });
    expect(map.query({ nameContains: "search" }).length).toBe(1);
  });

  it("match finds capabilities with all required tags", () => {
    const map = new CapabilityMap();
    map.register({ name: "a", description: "A", tags: ["x", "y", "z"] });
    map.register({ name: "b", description: "B", tags: ["x", "y"] });
    map.register({ name: "c", description: "C", tags: ["x"] });
    expect(map.match(["x", "y"]).length).toBe(2);
  });

  it("bestMatch returns highest scored", () => {
    const map = new CapabilityMap();
    map.register({ name: "a", description: "A", tags: ["x"], confidence: 0.5 });
    map.register({ name: "b", description: "B", tags: ["x", "y"], confidence: 0.9 });
    const best = map.bestMatch(["x"]);
    expect(best?.name).toBe("b");
  });

  it("tags returns all unique tags", () => {
    const map = new CapabilityMap();
    map.register({ name: "a", description: "A", tags: ["x", "y"] });
    map.register({ name: "b", description: "B", tags: ["y", "z"] });
    expect(map.tags()).toEqual(["x", "y", "z"]);
  });

  it("clear empties map", () => {
    const map = new CapabilityMap();
    map.register({ name: "a", description: "A", tags: [] });
    map.clear();
    expect(map.size).toBe(0);
  });
});

describe("mergeCapabilities", () => {
  it("merges two maps without duplicates", () => {
    const a = new CapabilityMap();
    a.register({ name: "x", description: "X", tags: [] });
    const b = new CapabilityMap();
    b.register({ name: "x", description: "X2", tags: [] });
    b.register({ name: "y", description: "Y", tags: [] });
    const merged = mergeCapabilities(a, b);
    expect(merged.size).toBe(2);
    expect(merged.get("x")?.description).toBe("X");
  });
});
