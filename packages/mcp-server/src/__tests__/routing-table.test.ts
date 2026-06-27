import { describe, it, expect } from "vitest";
import { RoutingTable, createRouter } from "../routing-table.js";

interface Ctx { topic: string; urgent: boolean; lang: string }

describe("RoutingTable", () => {
  it("resolves first matching route", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "billing", condition: (c) => c.topic === "billing" });
    table.add({ name: "support", condition: (c) => c.topic === "support" });
    expect(table.resolve({ topic: "billing", urgent: false, lang: "en" })).toBe("billing");
  });

  it("returns null when no match and no default", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "billing", condition: (c) => c.topic === "billing" });
    expect(table.resolve({ topic: "other", urgent: false, lang: "en" })).toBeNull();
  });

  it("falls back to default", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "billing", condition: (c) => c.topic === "billing" });
    table.setDefault("general");
    expect(table.resolve({ topic: "other", urgent: false, lang: "en" })).toBe("general");
  });

  it("respects priority", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "low", condition: () => true, priority: 1 });
    table.add({ name: "high", condition: () => true, priority: 10 });
    expect(table.resolve({ topic: "", urgent: false, lang: "" })).toBe("high");
  });

  it("resolveAll returns all matches", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "a", condition: () => true });
    table.add({ name: "b", condition: () => true });
    table.add({ name: "c", condition: () => false });
    const matches = table.resolveAll({ topic: "", urgent: false, lang: "" });
    expect(matches).toEqual(["a", "b"]);
  });

  it("resolveAll uses default when nothing matches", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "a", condition: () => false });
    table.setDefault("fallback");
    expect(table.resolveAll({ topic: "", urgent: false, lang: "" })).toEqual(["fallback"]);
  });

  it("remove works", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "a", condition: () => true });
    expect(table.remove("a")).toBe(true);
    expect(table.remove("a")).toBe(false);
    expect(table.size).toBe(0);
  });

  it("has and names", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "x", condition: () => true });
    table.add({ name: "y", condition: () => false });
    expect(table.has("x")).toBe(true);
    expect(table.has("z")).toBe(false);
    expect(table.names()).toEqual(["x", "y"]);
  });

  it("evaluate returns match status for all routes", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "a", condition: (c) => c.urgent });
    table.add({ name: "b", condition: (c) => !c.urgent });
    const evals = table.evaluate({ topic: "", urgent: true, lang: "" });
    expect(evals[0].matched).toBe(true);
    expect(evals[1].matched).toBe(false);
  });

  it("clear resets everything", () => {
    const table = new RoutingTable<Ctx>();
    table.add({ name: "x", condition: () => true });
    table.setDefault("d");
    table.clear();
    expect(table.size).toBe(0);
    expect(table.resolve({ topic: "", urgent: false, lang: "" })).toBeNull();
  });
});

describe("createRouter", () => {
  it("creates table from config", () => {
    const router = createRouter<Ctx>([
      { name: "urgent", condition: (c) => c.urgent, priority: 10 },
      { name: "normal", condition: () => true },
    ], "fallback");
    expect(router.resolve({ topic: "", urgent: true, lang: "" })).toBe("urgent");
    expect(router.resolve({ topic: "", urgent: false, lang: "" })).toBe("normal");
  });
});
