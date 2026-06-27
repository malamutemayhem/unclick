import { describe, it, expect } from "vitest";
import { MisraGries } from "../misra-gries.js";

describe("MisraGries", () => {
  it("detects frequent items", () => {
    const mg = new MisraGries<string>(3);
    const data = ["a", "b", "a", "c", "a", "b", "a", "a", "b"];
    mg.addMany(data);
    expect(mg.isFrequent("a")).toBe(true);
  });

  it("estimate gives approximate count", () => {
    const mg = new MisraGries<string>(5);
    for (let i = 0; i < 100; i++) mg.add("major");
    for (let i = 0; i < 10; i++) mg.add(`minor-${i}`);
    expect(mg.estimate("major")).toBeGreaterThan(0);
  });

  it("total tracks all additions", () => {
    const mg = new MisraGries<string>(3);
    mg.add("a");
    mg.add("b");
    mg.add("c");
    expect(mg.total()).toBe(3);
  });

  it("candidates returns monitored items", () => {
    const mg = new MisraGries<number>(3);
    mg.addMany([1, 1, 1, 2, 3]);
    const cands = mg.candidates();
    expect(cands.size).toBeLessThanOrEqual(2);
  });

  it("threshold computes n/k", () => {
    const mg = new MisraGries<string>(4);
    for (let i = 0; i < 100; i++) mg.add(`item-${i % 10}`);
    expect(mg.threshold()).toBe(25);
  });

  it("topItems returns sorted candidates", () => {
    const mg = new MisraGries<string>(5);
    for (let i = 0; i < 50; i++) mg.add("top");
    for (let i = 0; i < 20; i++) mg.add("mid");
    for (let i = 0; i < 5; i++) mg.add("low");
    const top = mg.topItems();
    expect(top.length).toBeGreaterThan(0);
    expect(top[0]).toBe("top");
  });

  it("empty summary has zero total", () => {
    const mg = new MisraGries<string>(3);
    expect(mg.total()).toBe(0);
    expect(mg.topItems()).toEqual([]);
  });
});
