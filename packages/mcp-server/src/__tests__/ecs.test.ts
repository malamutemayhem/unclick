import { describe, it, expect } from "vitest";
import { World, SystemRunner } from "../ecs.js";

describe("World", () => {
  it("creates and tracks entities", () => {
    const world = new World();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    expect(world.hasEntity(e1)).toBe(true);
    expect(world.hasEntity(e2)).toBe(true);
    expect(world.entityCount()).toBe(2);
  });

  it("destroys entities", () => {
    const world = new World();
    const e = world.createEntity();
    world.addComponent(e, "pos", { x: 0, y: 0 });
    world.destroyEntity(e);
    expect(world.hasEntity(e)).toBe(false);
    expect(world.hasComponent(e, "pos")).toBe(false);
  });

  it("manages components", () => {
    const world = new World();
    const e = world.createEntity();
    world.addComponent(e, "position", { x: 10, y: 20 });
    expect(world.hasComponent(e, "position")).toBe(true);
    const pos = world.getComponent(e, "position");
    expect(pos).toEqual({ x: 10, y: 20 });
  });

  it("removes components", () => {
    const world = new World();
    const e = world.createEntity();
    world.addComponent(e, "vel", { dx: 1 });
    world.removeComponent(e, "vel");
    expect(world.hasComponent(e, "vel")).toBe(false);
  });

  it("manages tags", () => {
    const world = new World();
    const e = world.createEntity();
    world.addTag(e, "player");
    expect(world.hasTag(e, "player")).toBe(true);
    world.removeTag(e, "player");
    expect(world.hasTag(e, "player")).toBe(false);
  });

  it("queries entities by components", () => {
    const world = new World();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    const e3 = world.createEntity();
    world.addComponent(e1, "pos", {});
    world.addComponent(e1, "vel", {});
    world.addComponent(e2, "pos", {});
    world.addComponent(e3, "vel", {});

    const withPos = world.query("pos");
    expect(withPos).toContain(e1);
    expect(withPos).toContain(e2);
    expect(withPos).not.toContain(e3);

    const withBoth = world.query("pos", "vel");
    expect(withBoth).toEqual([e1]);
  });

  it("queries with tags", () => {
    const world = new World();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    world.addComponent(e1, "pos", {});
    world.addComponent(e2, "pos", {});
    world.addTag(e1, "enemy");

    const enemies = world.queryWithTag("enemy", "pos");
    expect(enemies).toEqual([e1]);
  });

  it("allEntities returns all", () => {
    const world = new World();
    world.createEntity();
    world.createEntity();
    expect(world.allEntities()).toHaveLength(2);
  });
});

describe("SystemRunner", () => {
  it("runs systems in priority order", () => {
    const world = new World();
    const runner = new SystemRunner();
    const order: string[] = [];

    runner.add("second", () => order.push("b"), 2);
    runner.add("first", () => order.push("a"), 1);

    runner.run(world, 0.016);
    expect(order).toEqual(["a", "b"]);
  });

  it("removes systems", () => {
    const runner = new SystemRunner();
    runner.add("movement", () => {});
    runner.remove("movement");
    expect(runner.list()).toEqual([]);
  });

  it("passes dt to systems", () => {
    const world = new World();
    const runner = new SystemRunner();
    let receivedDt = 0;
    runner.add("test", (_w, dt) => { receivedDt = dt; });
    runner.run(world, 0.033);
    expect(receivedDt).toBeCloseTo(0.033);
  });

  it("systems can modify world", () => {
    const world = new World();
    const e = world.createEntity();
    world.addComponent(e, "pos", { x: 0 });
    world.addComponent(e, "vel", { dx: 5 });

    const runner = new SystemRunner();
    runner.add("movement", (w, dt) => {
      for (const entity of w.query("pos", "vel")) {
        const pos = w.getComponent(entity, "pos")!;
        const vel = w.getComponent(entity, "vel")!;
        (pos as Record<string, number>).x += (vel as Record<string, number>).dx * dt;
      }
    });

    runner.run(world, 1);
    const pos = world.getComponent(e, "pos") as Record<string, number>;
    expect(pos.x).toBe(5);
  });
});
