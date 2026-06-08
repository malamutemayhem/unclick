import { describe, it, expect } from "vitest";
import { ClothSimulation } from "../cloth-simulation.js";

describe("ClothSimulation", () => {
  it("constructor creates grid of correct size", () => {
    const cloth = new ClothSimulation(4, 3, 1);
    expect(cloth.nodes.length).toBe(3);
    expect(cloth.nodes[0].length).toBe(4);
  });

  it("initial positions match grid spacing", () => {
    const cloth = new ClothSimulation(3, 3, 2);
    expect(cloth.nodes[0][0].x).toBe(0);
    expect(cloth.nodes[0][0].y).toBe(0);
    expect(cloth.nodes[1][1].x).toBe(2);
    expect(cloth.nodes[1][1].y).toBe(2);
    expect(cloth.nodes[2][2].x).toBe(4);
    expect(cloth.nodes[2][2].y).toBe(4);
  });

  it("pin prevents node from moving", () => {
    const cloth = new ClothSimulation(3, 3);
    cloth.pin(0, 0);
    const origX = cloth.nodes[0][0].x;
    const origY = cloth.nodes[0][0].y;
    cloth.step(0.01);
    expect(cloth.nodes[0][0].x).toBe(origX);
    expect(cloth.nodes[0][0].y).toBe(origY);
  });

  it("unpinned nodes move under gravity", () => {
    const cloth = new ClothSimulation(3, 3);
    const origY = cloth.nodes[1][1].y;
    cloth.step(0.01);
    cloth.step(0.01);
    expect(cloth.nodes[1][1].y).not.toBe(origY);
  });

  it("getPositions returns grid of rounded values", () => {
    const cloth = new ClothSimulation(2, 2);
    cloth.step(0.01);
    const pos = cloth.getPositions();
    expect(pos.length).toBe(2);
    expect(pos[0].length).toBe(2);
    for (const row of pos) {
      for (const p of row) {
        expect(typeof p.x).toBe("number");
        expect(typeof p.y).toBe("number");
      }
    }
  });

  it("totalEnergy returns a number", () => {
    const cloth = new ClothSimulation(3, 3);
    const e = cloth.totalEnergy();
    expect(typeof e).toBe("number");
  });

  it("totalEnergy changes after stepping", () => {
    const cloth = new ClothSimulation(3, 3);
    const e1 = cloth.totalEnergy();
    cloth.step(0.01);
    cloth.step(0.01);
    const e2 = cloth.totalEnergy();
    expect(e2).not.toBe(e1);
  });

  it("pin on invalid index does not throw", () => {
    const cloth = new ClothSimulation(2, 2);
    expect(() => cloth.pin(10, 10)).not.toThrow();
  });
});
