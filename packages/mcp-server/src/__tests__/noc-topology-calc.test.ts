import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, scalability, routingComplex,
  topoCost, deadlockFree, forManycore, routing,
  bestUse, nocTopologies,
} from "../noc-topology-calc.js";

describe("bandwidth", () => {
  it("crossbar full highest bandwidth", () => {
    expect(bandwidth("crossbar_full")).toBeGreaterThan(bandwidth("ring_bidirect"));
  });
});

describe("latency", () => {
  it("crossbar full lowest latency", () => {
    expect(latency("crossbar_full")).toBeGreaterThan(latency("ring_bidirect"));
  });
});

describe("scalability", () => {
  it("mesh 2d grid most scalable", () => {
    expect(scalability("mesh_2d_grid")).toBeGreaterThan(scalability("crossbar_full"));
  });
});

describe("routingComplex", () => {
  it("torus wrapped most complex routing", () => {
    expect(routingComplex("torus_wrapped")).toBeGreaterThan(routingComplex("ring_bidirect"));
  });
});

describe("topoCost", () => {
  it("crossbar full most expensive", () => {
    expect(topoCost("crossbar_full")).toBeGreaterThan(topoCost("ring_bidirect"));
  });
});

describe("deadlockFree", () => {
  it("mesh 2d grid is deadlock free", () => {
    expect(deadlockFree("mesh_2d_grid")).toBe(true);
  });
  it("torus wrapped not deadlock free", () => {
    expect(deadlockFree("torus_wrapped")).toBe(false);
  });
});

describe("forManycore", () => {
  it("mesh 2d grid is for manycore", () => {
    expect(forManycore("mesh_2d_grid")).toBe(true);
  });
  it("ring bidirect not for manycore", () => {
    expect(forManycore("ring_bidirect")).toBe(false);
  });
});

describe("routing", () => {
  it("crossbar full uses direct port select", () => {
    expect(routing("crossbar_full")).toBe("direct_port_select");
  });
});

describe("bestUse", () => {
  it("mesh 2d grid best for gpu streaming multi", () => {
    expect(bestUse("mesh_2d_grid")).toBe("gpu_streaming_multi");
  });
});

describe("nocTopologies", () => {
  it("returns 5 types", () => {
    expect(nocTopologies()).toHaveLength(5);
  });
});
