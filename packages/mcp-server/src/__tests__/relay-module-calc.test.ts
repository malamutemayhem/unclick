import { describe, it, expect } from "vitest";
import {
  switchSpeed, currentCapacity, lifeSpan, noiseLevel,
  relayCost, solidState, latching, contactType,
  bestUse, relayModules,
} from "../relay-module-calc.js";

describe("switchSpeed", () => {
  it("solid state ssr fastest switch", () => {
    expect(switchSpeed("solid_state_ssr")).toBeGreaterThan(switchSpeed("time_delay_relay"));
  });
});

describe("currentCapacity", () => {
  it("mechanical spdt std highest current capacity", () => {
    expect(currentCapacity("mechanical_spdt_std")).toBeGreaterThan(currentCapacity("reed_relay_sealed"));
  });
});

describe("lifeSpan", () => {
  it("solid state ssr longest life span", () => {
    expect(lifeSpan("solid_state_ssr")).toBeGreaterThan(lifeSpan("mechanical_spdt_std"));
  });
});

describe("noiseLevel", () => {
  it("solid state ssr quietest", () => {
    expect(noiseLevel("solid_state_ssr")).toBeGreaterThan(noiseLevel("mechanical_spdt_std"));
  });
});

describe("relayCost", () => {
  it("time delay relay most expensive", () => {
    expect(relayCost("time_delay_relay")).toBeGreaterThan(relayCost("mechanical_spdt_std"));
  });
});

describe("solidState", () => {
  it("solid state ssr is solid state", () => {
    expect(solidState("solid_state_ssr")).toBe(true);
  });
  it("mechanical spdt std not solid state", () => {
    expect(solidState("mechanical_spdt_std")).toBe(false);
  });
});

describe("latching", () => {
  it("latching bistable is latching", () => {
    expect(latching("latching_bistable")).toBe(true);
  });
  it("solid state ssr not latching", () => {
    expect(latching("solid_state_ssr")).toBe(false);
  });
});

describe("contactType", () => {
  it("reed relay sealed uses hermetic reed blade", () => {
    expect(contactType("reed_relay_sealed")).toBe("hermetic_reed_blade");
  });
});

describe("bestUse", () => {
  it("latching bistable best for power save hold", () => {
    expect(bestUse("latching_bistable")).toBe("power_save_hold");
  });
});

describe("relayModules", () => {
  it("returns 5 types", () => {
    expect(relayModules()).toHaveLength(5);
  });
});
