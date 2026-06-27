import { describe, it, expect } from "vitest";
import {
  capacity, latency, programmability, bufferDepth,
  asicCost, p4Capable, forHyperscale, architecture,
  bestUse, switchAsics,
} from "../switch-asic-calc.js";

describe("capacity", () => {
  it("memory clos highest capacity", () => {
    expect(capacity("memory_clos")).toBeGreaterThan(capacity("memory_crossbar"));
  });
});

describe("latency", () => {
  it("memory crossbar lowest latency", () => {
    expect(latency("memory_crossbar")).toBeGreaterThan(latency("memory_clos"));
  });
});

describe("programmability", () => {
  it("barefoot rmt most programmable", () => {
    expect(programmability("barefoot_rmt")).toBeGreaterThan(programmability("memory_crossbar"));
  });
});

describe("bufferDepth", () => {
  it("memory clos deepest buffers", () => {
    expect(bufferDepth("memory_clos")).toBeGreaterThan(bufferDepth("memory_crossbar"));
  });
});

describe("asicCost", () => {
  it("memory clos most expensive", () => {
    expect(asicCost("memory_clos")).toBeGreaterThan(asicCost("memory_crossbar"));
  });
});

describe("p4Capable", () => {
  it("barefoot rmt is p4 capable", () => {
    expect(p4Capable("barefoot_rmt")).toBe(true);
  });
  it("memory crossbar not p4 capable", () => {
    expect(p4Capable("memory_crossbar")).toBe(false);
  });
});

describe("forHyperscale", () => {
  it("broadcom memory is for hyperscale", () => {
    expect(forHyperscale("broadcom_memory")).toBe(true);
  });
  it("memory crossbar not for hyperscale", () => {
    expect(forHyperscale("memory_crossbar")).toBe(false);
  });
});

describe("architecture", () => {
  it("barefoot rmt uses reconfigurable match table", () => {
    expect(architecture("barefoot_rmt")).toBe("reconfigurable_match_table");
  });
});

describe("bestUse", () => {
  it("memory clos best for chassis core router", () => {
    expect(bestUse("memory_clos")).toBe("chassis_core_router");
  });
});

describe("switchAsics", () => {
  it("returns 5 types", () => {
    expect(switchAsics()).toHaveLength(5);
  });
});
