import { describe, it, expect } from "vitest";
import { World, System, SystemRunner } from "../ecs-world.js";

describe("World", () => {
  it("creates and destroys entities", () => {
    const w = new World();
    const e = w.createEntity();
    expect(w.isAlive(e)).toBe(true);
    w.destroyEntity(e);
    expect(w.isAlive(e)).toBe(false);
  });

  it("adds and gets components", () => {
    const w = new World();
    const e = w.createEntity();
    w.addComponent(e, "position", { x: 10, y: 20 });
    expect(w.getComponent<{ x: number }>(e, "position")?.x).toBe(10);
    expect(w.hasComponent(e, "position")).toBe(true);
    expect(w.hasComponent(e, "velocity")).toBe(false);
  });

  it("removes components", () => {
    const w = new World();
    const e = w.createEntity();
    w.addComponent(e, "health", 100);
    w.removeComponent(e, "health");
    expect(w.hasComponent(e, "health")).toBe(false);
  });

  it("queries entities by component", () => {
    const w = new World();
    const e1 = w.createEntity();
    const e2 = w.createEntity();
    const e3 = w.createEntity();
    w.addComponent(e1, "pos", {});
    w.addComponent(e1, "vel", {});
    w.addComponent(e2, "pos", {});
    w.addComponent(e3, "vel", {});
    const result = w.query("pos", "vel");
    expect(result).toEqual([e1]);
  });

  it("manages tags", () => {
    const w = new World();
    const e = w.createEntity();
    w.addTag(e, "player");
    expect(w.hasTag(e, "player")).toBe(true);
    expect(w.queryWithTag("player")).toEqual([e]);
    w.removeTag(e, "player");
    expect(w.hasTag(e, "player")).toBe(false);
  });

  it("clears all entities", () => {
    const w = new World();
    w.createEntity();
    w.createEntity();
    w.clear();
    expect(w.entityCount()).toBe(0);
  });

  it("lists component types", () => {
    const w = new World();
    const e = w.createEntity();
    w.addComponent(e, "pos", {});
    w.addComponent(e, "vel", {});
    expect(w.componentTypes()).toContain("pos");
    expect(w.componentTypes()).toContain("vel");
  });
});

describe("System and SystemRunner", () => {
  it("runs systems on matching entities", () => {
    const w = new World();
    const e = w.createEntity();
    w.addComponent(e, "counter", { value: 0 });
    const sys = new System("increment", ["counter"], (world, entities) => {
      for (const ent of entities) {
        const c = world.getComponent<{ value: number }>(ent, "counter")!;
        c.value++;
      }
    });
    sys.run(w);
    expect(w.getComponent<{ value: number }>(e, "counter")?.value).toBe(1);
    expect(sys.getName()).toBe("increment");
  });

  it("system runner ticks all systems", () => {
    const w = new World();
    const e = w.createEntity();
    w.addComponent(e, "hp", { val: 10 });
    const runner = new SystemRunner();
    runner.add(new System("damage", ["hp"], (world, entities) => {
      for (const ent of entities) {
        const hp = world.getComponent<{ val: number }>(ent, "hp")!;
        hp.val -= 1;
      }
    }));
    runner.tick(w);
    runner.tick(w);
    expect(w.getComponent<{ val: number }>(e, "hp")?.val).toBe(8);
    expect(runner.systemCount()).toBe(1);
  });
});
