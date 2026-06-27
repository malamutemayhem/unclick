import { describe, it, expect } from "vitest";
import { ECS } from "../entity-component-system.js";

describe("ECS", () => {
  it("createEntity returns unique ids", () => {
    const ecs = new ECS();
    const a = ecs.createEntity();
    const b = ecs.createEntity();
    expect(a).not.toBe(b);
    expect(ecs.entityCount()).toBe(2);
  });

  it("addComponent and getComponent work", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "position", { x: 10, y: 20 });
    const pos = ecs.getComponent(e, "position");
    expect(pos).toEqual({ x: 10, y: 20 });
  });

  it("hasComponent returns correct result", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "health", { hp: 100 });
    expect(ecs.hasComponent(e, "health")).toBe(true);
    expect(ecs.hasComponent(e, "armor")).toBe(false);
  });

  it("removeComponent removes it", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "tag", { name: "player" });
    ecs.removeComponent(e, "tag");
    expect(ecs.hasComponent(e, "tag")).toBe(false);
  });

  it("destroyEntity removes entity and components", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "pos", { x: 0 });
    ecs.destroyEntity(e);
    expect(ecs.entityCount()).toBe(0);
    expect(ecs.getComponent(e, "pos")).toBeUndefined();
  });

  it("query returns entities with all required components", () => {
    const ecs = new ECS();
    const a = ecs.createEntity();
    const b = ecs.createEntity();
    const c = ecs.createEntity();
    ecs.addComponent(a, "pos", { x: 0 });
    ecs.addComponent(a, "vel", { vx: 1 });
    ecs.addComponent(b, "pos", { x: 5 });
    ecs.addComponent(c, "vel", { vx: 2 });
    const result = ecs.query("pos", "vel");
    expect(result).toEqual([a]);
  });

  it("allComponents lists component types on entity", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "a", {});
    ecs.addComponent(e, "b", {});
    const types = ecs.allComponents(e);
    expect(types.sort()).toEqual(["a", "b"]);
  });

  it("serialize captures state", () => {
    const ecs = new ECS();
    const e = ecs.createEntity();
    ecs.addComponent(e, "test", { val: 42 });
    const data = ecs.serialize();
    expect(data.entities).toContain(e);
    expect(data.components["test"][e]).toEqual({ val: 42 });
  });

  it("clear removes everything", () => {
    const ecs = new ECS();
    ecs.createEntity();
    ecs.createEntity();
    ecs.clear();
    expect(ecs.entityCount()).toBe(0);
  });
});
