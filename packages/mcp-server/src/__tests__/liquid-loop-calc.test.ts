import { describe, it, expect } from "vitest";
import {
  thermalRes, flowRate, maintenance, noise,
  loopCost, leakProof, forDatacenter, medium,
  bestUse, liquidLoops,
} from "../liquid-loop-calc.js";

describe("thermalRes", () => {
  it("micro channel direct best thermal resistance", () => {
    expect(thermalRes("micro_channel_direct")).toBeGreaterThan(thermalRes("cpu_aio_closed"));
  });
});

describe("flowRate", () => {
  it("jet impingement highest flow rate", () => {
    expect(flowRate("jet_impingement")).toBeGreaterThan(flowRate("cpu_aio_closed"));
  });
});

describe("maintenance", () => {
  it("cpu aio closed lowest maintenance", () => {
    expect(maintenance("cpu_aio_closed")).toBeGreaterThan(maintenance("custom_open_loop"));
  });
});

describe("noise", () => {
  it("dielectric spray quietest", () => {
    expect(noise("dielectric_spray")).toBeGreaterThan(noise("jet_impingement"));
  });
});

describe("loopCost", () => {
  it("dielectric spray most expensive", () => {
    expect(loopCost("dielectric_spray")).toBeGreaterThan(loopCost("cpu_aio_closed"));
  });
});

describe("leakProof", () => {
  it("cpu aio closed is leak proof", () => {
    expect(leakProof("cpu_aio_closed")).toBe(true);
  });
  it("custom open loop not leak proof", () => {
    expect(leakProof("custom_open_loop")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("micro channel direct for datacenter", () => {
    expect(forDatacenter("micro_channel_direct")).toBe(true);
  });
  it("cpu aio closed not for datacenter", () => {
    expect(forDatacenter("cpu_aio_closed")).toBe(false);
  });
});

describe("medium", () => {
  it("dielectric spray uses fluorocarbon two phase", () => {
    expect(medium("dielectric_spray")).toBe("fluorocarbon_two_phase");
  });
});

describe("bestUse", () => {
  it("jet impingement best for extreme tdp ai accelerator", () => {
    expect(bestUse("jet_impingement")).toBe("extreme_tdp_ai_accelerator");
  });
});

describe("liquidLoops", () => {
  it("returns 5 types", () => {
    expect(liquidLoops()).toHaveLength(5);
  });
});
