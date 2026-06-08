import { describe, it, expect } from "vitest";
import { World, Pipeline } from "../ecs-query.js";

describe("World", () => {
  it("spawns entities", () => {
    const w = new World();
    const e1 = w.spawn();
    const e2 = w.spawn();
    expect(e1).not.toBe(e2);
    expect(w.entityCount()).toBe(2);
  });

  it("adds and gets components", () => {
    const w = new World();
    const e = w.spawn();
    w.add(e, "position", { x: 10, y: 20 });
    expect(w.get(e, "position")).toEqual({ x: 10, y: 20 });
    expect(w.has(e, "position")).toBe(true);
    expect(w.has(e, "velocity")).toBe(false);
  });

  it("removes components", () => {
    const w = new World();
    const e = w.spawn();
    w.add(e, "hp", 100);
    w.remove(e, "hp");
    expect(w.has(e, "hp")).toBe(false);
  });

  it("despawns entities", () => {
    const w = new World();
    const e = w.spawn();
    w.add(e, "tag", true);
    w.despawn(e);
    expect(w.isAlive(e)).toBe(false);
    expect(w.entityCount()).toBe(0);
  });

  it("queries entities by component", () => {
    const w = new World();
    const e1 = w.spawn();
    const e2 = w.spawn();
    const e3 = w.spawn();
    w.add(e1, "pos", {});
    w.add(e1, "vel", {});
    w.add(e2, "pos", {});
    w.add(e3, "vel", {});
    const result = w.query("pos", "vel");
    expect(result).toEqual([e1]);
  });

  it("queries with data", () => {
    const w = new World();
    const e = w.spawn();
    w.add(e, "name", "hero");
    const pairs = w.queryWith<string>("name");
    expect(pairs).toEqual([[e, "hero"]]);
  });

  it("queries without exclusion", () => {
    const w = new World();
    const e1 = w.spawn();
    const e2 = w.spawn();
    w.add(e1, "pos", {});
    w.add(e2, "pos", {});
    w.add(e2, "dead", true);
    const alive = w.queryWithout(["pos"], ["dead"]);
    expect(alive).toEqual([e1]);
  });

  it("counts components", () => {
    const w = new World();
    const e1 = w.spawn();
    const e2 = w.spawn();
    w.add(e1, "hp", 100);
    w.add(e2, "hp", 50);
    expect(w.componentCount("hp")).toBe(2);
  });

  it("clears all", () => {
    const w = new World();
    w.spawn();
    w.spawn();
    w.clear();
    expect(w.entityCount()).toBe(0);
  });
});

describe("Pipeline", () => {
  it("runs systems in order", () => {
    const w = new World();
    const e = w.spawn();
    w.add(e, "count", 0);
    const pipeline = new Pipeline();
    pipeline.addSystem("inc", (world) => {
      for (const ent of world.query("count")) {
        world.set(ent, "count", (world.get<number>(ent, "count") ?? 0) + 1);
      }
    });
    pipeline.run(w);
    pipeline.run(w);
    expect(w.get(e, "count")).toBe(2);
  });

  it("lists and removes systems", () => {
    const p = new Pipeline();
    p.addSystem("a", () => {});
    p.addSystem("b", () => {});
    expect(p.systemNames()).toEqual(["a", "b"]);
    p.removeSystem("a");
    expect(p.systemNames()).toEqual(["b"]);
  });
});
