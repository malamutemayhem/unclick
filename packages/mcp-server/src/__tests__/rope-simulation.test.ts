import { describe, it, expect } from "vitest";
import { RopeSimulation } from "../rope-simulation.js";

describe("RopeSimulation", () => {
  it("constructor creates correct number of nodes", () => {
    const rope = new RopeSimulation(0, 0, 5, 1);
    expect(rope.nodes.length).toBe(6);
  });

  it("initial nodes are spaced vertically", () => {
    const rope = new RopeSimulation(0, 0, 3, 2);
    expect(rope.nodes[0].y).toBe(0);
    expect(rope.nodes[1].y).toBe(2);
    expect(rope.nodes[2].y).toBe(4);
    expect(rope.nodes[3].y).toBe(6);
  });

  it("pin prevents node from moving", () => {
    const rope = new RopeSimulation(0, 0, 5);
    rope.pin(0);
    const origX = rope.nodes[0].x;
    const origY = rope.nodes[0].y;
    rope.step(0.01);
    expect(rope.nodes[0].x).toBe(origX);
    expect(rope.nodes[0].y).toBe(origY);
  });

  it("unpinned nodes move under gravity", () => {
    const rope = new RopeSimulation(0, 0, 3);
    const origY = rope.nodes[2].y;
    rope.step(0.01);
    rope.step(0.01);
    expect(rope.nodes[2].y).not.toBe(origY);
  });

  it("getPositions returns rounded coordinates", () => {
    const rope = new RopeSimulation(0, 0, 3);
    rope.step(0.01);
    const pos = rope.getPositions();
    expect(pos.length).toBe(4);
    for (const p of pos) {
      expect(typeof p.x).toBe("number");
      expect(typeof p.y).toBe("number");
    }
  });

  it("totalLength returns positive value", () => {
    const rope = new RopeSimulation(0, 0, 5, 1);
    expect(rope.totalLength()).toBeGreaterThan(0);
  });

  it("tension returns zero for out-of-range index", () => {
    const rope = new RopeSimulation(0, 0, 3);
    expect(rope.tension(-1)).toBe(0);
    expect(rope.tension(10)).toBe(0);
  });

  it("tension at valid index returns non-negative", () => {
    const rope = new RopeSimulation(0, 0, 3);
    rope.pin(0);
    rope.step(0.01);
    expect(rope.tension(0)).toBeGreaterThanOrEqual(0);
  });

  it("constraint satisfaction keeps segments near rest length", () => {
    const rope = new RopeSimulation(0, 0, 3, 1);
    rope.pin(0);
    for (let i = 0; i < 10; i++) rope.step(0.01);
    for (let i = 0; i < rope.nodes.length - 1; i++) {
      const dx = rope.nodes[i + 1].x - rope.nodes[i].x;
      const dy = rope.nodes[i + 1].y - rope.nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      expect(dist).toBeCloseTo(1, 0);
    }
  });
});
