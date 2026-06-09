import { describe, it, expect } from "vitest";
import { SteeringAgent, v2, v2Len, v2Dist } from "../steering-behavior.js";

describe("SteeringAgent", () => {
  it("seek produces force toward target", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const force = agent.seek(v2(10, 0));
    expect(force.x).toBeGreaterThan(0);
  });

  it("flee produces force away from target", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const force = agent.flee(v2(10, 0));
    expect(force.x).toBeLessThan(0);
  });

  it("arrive slows near target", () => {
    const agent = new SteeringAgent(0, 0, 10, 5);
    const farForce = agent.arrive(v2(100, 0), 50);
    const nearForce = agent.arrive(v2(5, 0), 50);
    expect(Math.abs(farForce.x)).toBeGreaterThan(Math.abs(nearForce.x));
  });

  it("arrive returns zero at target", () => {
    const agent = new SteeringAgent(5, 5, 10, 5);
    const force = agent.arrive(v2(5, 5));
    expect(force.x).toBe(0);
    expect(force.y).toBe(0);
  });

  it("pursue targets future position", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const target = new SteeringAgent(10, 0, 5, 1);
    target.velocity = v2(1, 0);
    const force = agent.pursue(target, 5);
    expect(force.x).toBeGreaterThan(0);
  });

  it("evade flees from future position", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const threat = new SteeringAgent(10, 0, 5, 1);
    threat.velocity = v2(-1, 0);
    const force = agent.evade(threat, 3);
    expect(force.x).toBeLessThan(0);
  });

  it("update changes position", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const force = agent.seek(v2(10, 0));
    agent.update(force);
    expect(agent.position.x).toBeGreaterThan(0);
  });

  it("speed is bounded by maxSpeed", () => {
    const agent = new SteeringAgent(0, 0, 3, 10);
    for (let i = 0; i < 100; i++) {
      agent.update(agent.seek(v2(1000, 0)));
    }
    expect(agent.speed).toBeLessThanOrEqual(3.001);
  });

  it("separate pushes agents apart", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    const neighbor = new SteeringAgent(2, 0, 5, 1);
    const force = agent.separate([neighbor], 10);
    expect(force.x).toBeLessThan(0);
  });

  it("wander produces finite force", () => {
    const agent = new SteeringAgent(0, 0, 5, 1);
    agent.velocity = v2(1, 0);
    const force = agent.wander();
    expect(Number.isFinite(force.x)).toBe(true);
    expect(Number.isFinite(force.y)).toBe(true);
  });
});
