import { describe, it, expect } from "vitest";
import { vec3, add, sub, mul, dot, length, normalize, hitSphere, Scene } from "../ray-tracer.js";

describe("vec3 math", () => {
  it("add", () => {
    const r = add(vec3(1, 2, 3), vec3(4, 5, 6));
    expect(r).toEqual({ x: 5, y: 7, z: 9 });
  });

  it("sub", () => {
    const r = sub(vec3(5, 7, 9), vec3(1, 2, 3));
    expect(r).toEqual({ x: 4, y: 5, z: 6 });
  });

  it("mul", () => {
    const r = mul(vec3(1, 2, 3), 2);
    expect(r).toEqual({ x: 2, y: 4, z: 6 });
  });

  it("dot product", () => {
    expect(dot(vec3(1, 0, 0), vec3(0, 1, 0))).toBe(0);
    expect(dot(vec3(1, 2, 3), vec3(4, 5, 6))).toBe(32);
  });

  it("length", () => {
    expect(length(vec3(3, 4, 0))).toBe(5);
  });

  it("normalize", () => {
    const n = normalize(vec3(3, 0, 0));
    expect(n.x).toBeCloseTo(1);
    expect(n.y).toBeCloseTo(0);
    expect(n.z).toBeCloseTo(0);
  });

  it("normalize zero vector", () => {
    const n = normalize(vec3(0, 0, 0));
    expect(n).toEqual({ x: 0, y: 0, z: 0 });
  });
});

describe("hitSphere", () => {
  it("detects hit", () => {
    const sphere = { center: vec3(0, 0, -5), radius: 1, material: "red" };
    const ray = { origin: vec3(0, 0, 0), direction: vec3(0, 0, -1) };
    const hit = hitSphere(sphere, ray);
    expect(hit).not.toBeNull();
    expect(hit!.t).toBeCloseTo(4);
    expect(hit!.material).toBe("red");
  });

  it("misses when ray goes the other way", () => {
    const sphere = { center: vec3(0, 0, -5), radius: 1, material: "red" };
    const ray = { origin: vec3(0, 0, 0), direction: vec3(0, 0, 1) };
    expect(hitSphere(sphere, ray)).toBeNull();
  });

  it("misses when ray passes beside sphere", () => {
    const sphere = { center: vec3(0, 0, -5), radius: 1, material: "red" };
    const ray = { origin: vec3(10, 0, 0), direction: vec3(0, 0, -1) };
    expect(hitSphere(sphere, ray)).toBeNull();
  });

  it("normal points outward", () => {
    const sphere = { center: vec3(0, 0, -5), radius: 1, material: "m" };
    const ray = { origin: vec3(0, 0, 0), direction: vec3(0, 0, -1) };
    const hit = hitSphere(sphere, ray)!;
    expect(hit.normal.z).toBeCloseTo(1);
  });
});

describe("Scene", () => {
  it("addSphere and sphereCount", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -5), 1);
    scene.addSphere(vec3(3, 0, -5), 1);
    expect(scene.sphereCount).toBe(2);
  });

  it("trace finds closest", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -3), 1, "near");
    scene.addSphere(vec3(0, 0, -10), 1, "far");
    const hit = scene.trace({ origin: vec3(0, 0, 0), direction: vec3(0, 0, -1) });
    expect(hit).not.toBeNull();
    expect(hit!.material).toBe("near");
  });

  it("trace returns null on miss", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -5), 1);
    const hit = scene.trace({ origin: vec3(100, 100, 0), direction: vec3(0, 0, -1) });
    expect(hit).toBeNull();
  });

  it("render produces image", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -5), 1);
    const img = scene.render(4, 4);
    expect(img).toHaveLength(4);
    expect(img[0]).toHaveLength(4);
  });

  it("render has nonzero pixels for visible sphere", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -3), 1);
    const img = scene.render(8, 8);
    const maxVal = Math.max(...img.flat());
    expect(maxVal).toBeGreaterThan(0);
  });

  it("clear removes all spheres", () => {
    const scene = new Scene();
    scene.addSphere(vec3(0, 0, -5), 1);
    scene.clear();
    expect(scene.sphereCount).toBe(0);
  });
});
