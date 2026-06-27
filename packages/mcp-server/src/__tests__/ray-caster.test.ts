import { describe, it, expect } from "vitest";
import {
  createMap, setWall, isWall, castRay, castMultipleRays,
  renderTopDown, renderColumnView,
} from "../ray-caster.js";

describe("createMap", () => {
  it("creates empty map", () => {
    const m = createMap(10, 8);
    expect(m.width).toBe(10);
    expect(m.height).toBe(8);
    expect(m.cells.length).toBe(8);
  });
});

describe("setWall/isWall", () => {
  it("sets and checks walls", () => {
    const m = createMap(5, 5);
    expect(isWall(m, 2, 2)).toBe(false);
    setWall(m, 2, 2);
    expect(isWall(m, 2, 2)).toBe(true);
  });

  it("treats out-of-bounds as wall", () => {
    const m = createMap(5, 5);
    expect(isWall(m, -1, 0)).toBe(true);
    expect(isWall(m, 5, 0)).toBe(true);
  });
});

describe("castRay", () => {
  it("hits a wall", () => {
    const m = createMap(10, 10);
    setWall(m, 5, 0);
    const hit = castRay(m, { origin: { x: 0.5, y: 0.5 }, direction: { x: 1, y: 0 } });
    expect(hit).not.toBeNull();
    expect(hit!.distance).toBeGreaterThan(0);
    expect(hit!.distance).toBeLessThan(10);
  });

  it("returns null for no hit", () => {
    const m = createMap(10, 10);
    const hit = castRay(m, { origin: { x: 0.5, y: 0.5 }, direction: { x: 1, y: 0 } }, 5);
    expect(hit).toBeNull();
  });

  it("provides hit point and normal", () => {
    const m = createMap(10, 10);
    setWall(m, 5, 0);
    const hit = castRay(m, { origin: { x: 0.5, y: 0.5 }, direction: { x: 1, y: 0 } });
    expect(hit).not.toBeNull();
    expect(hit!.point.x).toBeCloseTo(5, 0);
    expect(hit!.normal.x).toBe(-1);
  });

  it("detects horizontal walls", () => {
    const m = createMap(10, 10);
    setWall(m, 0, 5);
    const hit = castRay(m, { origin: { x: 0.5, y: 0.5 }, direction: { x: 0, y: 1 } });
    expect(hit).not.toBeNull();
    expect(hit!.side).toBe("horizontal");
  });
});

describe("castMultipleRays", () => {
  it("casts correct number of rays", () => {
    const m = createMap(10, 10);
    for (let x = 0; x < 10; x++) {
      setWall(m, x, 0);
      setWall(m, x, 9);
      setWall(m, 0, x);
      setWall(m, 9, x);
    }
    const hits = castMultipleRays(m, { x: 5, y: 5 }, 0, 60, 10);
    expect(hits.length).toBe(10);
  });

  it("some rays hit walls", () => {
    const m = createMap(10, 10);
    for (let x = 0; x < 10; x++) setWall(m, x, 0);
    const hits = castMultipleRays(m, { x: 5, y: 5 }, -90, 60, 5);
    const hitCount = hits.filter(h => h !== null).length;
    expect(hitCount).toBeGreaterThan(0);
  });
});

describe("renderTopDown", () => {
  it("renders map as string", () => {
    const m = createMap(5, 5);
    setWall(m, 0, 0);
    const str = renderTopDown(m);
    expect(str).toContain("#");
    expect(str).toContain(".");
  });

  it("shows player position", () => {
    const m = createMap(5, 5);
    const str = renderTopDown(m, { x: 2, y: 2 });
    expect(str).toContain("@");
  });
});

describe("renderColumnView", () => {
  it("generates columns from hits", () => {
    const hits = [
      { distance: 2, point: { x: 5, y: 0 }, normal: { x: -1, y: 0 }, side: "vertical" as const },
      null,
      { distance: 5, point: { x: 5, y: 0 }, normal: { x: 0, y: -1 }, side: "horizontal" as const },
    ];
    const cols = renderColumnView(hits, 10, 20);
    expect(cols.length).toBe(3);
    expect(cols[0]).toContain("#");
    expect(cols[1].trim()).toBe("");
    expect(cols[2]).toContain("%");
  });
});
