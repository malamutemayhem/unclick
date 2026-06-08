import { describe, it, expect } from "vitest";
import { ECSWorld } from "../ecs-engine.js";

describe("ECSWorld", () => {
  it("creates and destroys entities", () => {
    const world = new ECSWorld();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    expect(world.entityCount).toBe(2);
    world.destroyEntity(e1);
    expect(world.entityCount).toBe(1);
  });

  it("adds and gets components", () => {
    const world = new ECSWorld();
    const e = world.createEntity();
    world.addComponent(e, "position", { x: 10, y: 20 });
    const pos = world.getComponent<{ x: number; y: number }>(e, "position");
    expect(pos).toEqual({ x: 10, y: 20 });
  });

  it("removes components", () => {
    const world = new ECSWorld();
    const e = world.createEntity();
    world.addComponent(e, "health", 100);
    world.removeComponent(e, "health");
    expect(world.hasComponent(e, "health")).toBe(false);
  });

  it("queries entities by component", () => {
    const world = new ECSWorld();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    const e3 = world.createEntity();
    world.addComponent(e1, "pos", {});
    world.addComponent(e1, "vel", {});
    world.addComponent(e2, "pos", {});
    world.addComponent(e3, "vel", {});
    const result = world.query("pos", "vel");
    expect(result).toEqual([e1]);
  });

  it("tags entities", () => {
    const world = new ECSWorld();
    const e = world.createEntity();
    world.addTag(e, "player");
    expect(world.hasTag(e, "player")).toBe(true);
    expect(world.hasTag(e, "enemy")).toBe(false);
  });

  it("queries with tags", () => {
    const world = new ECSWorld();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    world.addComponent(e1, "pos", {});
    world.addComponent(e2, "pos", {});
    world.addTag(e1, "active");
    const result = world.queryWithTags(["active"], "pos");
    expect(result).toEqual([e1]);
  });

  it("getComponentTypes lists components", () => {
    const world = new ECSWorld();
    const e = world.createEntity();
    world.addComponent(e, "a", 1);
    world.addComponent(e, "b", 2);
    expect(world.getComponentTypes(e).sort()).toEqual(["a", "b"]);
  });

  it("clear resets world", () => {
    const world = new ECSWorld();
    world.createEntity();
    world.createEntity();
    world.clear();
    expect(world.entityCount).toBe(0);
  });
});
