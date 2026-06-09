import { describe, it, expect } from "vitest";
import { Entity, World } from "../entity-component.js";

describe("Entity", () => {
  it("stores and retrieves components", () => {
    const e = new Entity(1);
    e.addComponent("position", { x: 10, y: 20 });
    const pos = e.getComponent("position");
    expect(pos).not.toBeNull();
    expect(pos!.x).toBe(10);
  });

  it("checks component existence", () => {
    const e = new Entity(1);
    e.addComponent("health", { hp: 100 });
    expect(e.hasComponent("health")).toBe(true);
    expect(e.hasComponent("mana")).toBe(false);
  });

  it("removes components", () => {
    const e = new Entity(1);
    e.addComponent("tag");
    expect(e.removeComponent("tag")).toBe(true);
    expect(e.hasComponent("tag")).toBe(false);
  });

  it("hasAll checks multiple", () => {
    const e = new Entity(1);
    e.addComponent("a").addComponent("b").addComponent("c");
    expect(e.hasAll("a", "b")).toBe(true);
    expect(e.hasAll("a", "d")).toBe(false);
  });

  it("lists component names", () => {
    const e = new Entity(1);
    e.addComponent("pos").addComponent("vel");
    expect(e.componentNames).toContain("pos");
    expect(e.componentNames).toContain("vel");
  });
});

describe("World", () => {
  it("creates entities with unique ids", () => {
    const world = new World();
    const e1 = world.createEntity();
    const e2 = world.createEntity();
    expect(e1.id).not.toBe(e2.id);
    expect(world.entityCount).toBe(2);
  });

  it("removes entities", () => {
    const world = new World();
    const e = world.createEntity();
    world.removeEntity(e.id);
    expect(world.entityCount).toBe(0);
  });

  it("queries by components", () => {
    const world = new World();
    const e1 = world.createEntity();
    e1.addComponent("position").addComponent("velocity");
    const e2 = world.createEntity();
    e2.addComponent("position");
    const e3 = world.createEntity();
    e3.addComponent("health");

    const movers = world.query("position", "velocity");
    expect(movers).toHaveLength(1);
    expect(movers[0].id).toBe(e1.id);
  });

  it("runs systems on matching entities", () => {
    const world = new World();
    const e = world.createEntity();
    e.addComponent("position", { x: 0, y: 0 });
    e.addComponent("velocity", { vx: 5, vy: 3 });

    world.addSystem("movement", ["position", "velocity"], (entities, dt) => {
      for (const ent of entities) {
        const pos = ent.getComponent("position")!;
        const vel = ent.getComponent("velocity")!;
        pos.x = (pos.x as number) + (vel.vx as number) * dt;
        pos.y = (pos.y as number) + (vel.vy as number) * dt;
      }
    });

    world.update(1);
    const pos = e.getComponent("position")!;
    expect(pos.x).toBe(5);
    expect(pos.y).toBe(3);
  });

  it("removes systems", () => {
    const world = new World();
    world.addSystem("test", [], () => {});
    expect(world.systemCount).toBe(1);
    world.removeSystem("test");
    expect(world.systemCount).toBe(0);
  });

  it("clears all entities", () => {
    const world = new World();
    world.createEntity();
    world.createEntity();
    world.clear();
    expect(world.entityCount).toBe(0);
  });

  it("getEntity returns entity by id", () => {
    const world = new World();
    const e = world.createEntity();
    expect(world.getEntity(e.id)).toBe(e);
    expect(world.getEntity(999)).toBeNull();
  });
});
