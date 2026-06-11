import { describe, it, expect } from "vitest";
import {
  flowReliability, capacity, segregation, cleanout,
  hbCost, massFlow, forCohesive, outlet,
  bestUse, hopperBinTypes,
} from "../hopper-bin-calc.js";

describe("flowReliability", () => {
  it("mass flow cone most reliable flow", () => {
    expect(flowReliability("mass_flow_cone")).toBeGreaterThan(flowReliability("funnel_flow_flat"));
  });
});

describe("capacity", () => {
  it("funnel flow flat largest capacity", () => {
    expect(capacity("funnel_flow_flat")).toBeGreaterThan(capacity("mass_flow_cone"));
  });
});

describe("segregation", () => {
  it("mass flow cone best segregation control", () => {
    expect(segregation("mass_flow_cone")).toBeGreaterThan(segregation("funnel_flow_flat"));
  });
});

describe("cleanout", () => {
  it("mass flow cone best cleanout", () => {
    expect(cleanout("mass_flow_cone")).toBeGreaterThan(cleanout("funnel_flow_flat"));
  });
});

describe("hbCost", () => {
  it("live bottom most expensive", () => {
    expect(hbCost("live_bottom_discharge")).toBeGreaterThan(hbCost("funnel_flow_flat"));
  });
});

describe("massFlow", () => {
  it("mass flow cone is mass flow", () => {
    expect(massFlow("mass_flow_cone")).toBe(true);
  });
  it("funnel flow flat not mass flow", () => {
    expect(massFlow("funnel_flow_flat")).toBe(false);
  });
});

describe("forCohesive", () => {
  it("mass flow cone for cohesive", () => {
    expect(forCohesive("mass_flow_cone")).toBe(true);
  });
  it("funnel flow not for cohesive", () => {
    expect(forCohesive("funnel_flow_flat")).toBe(false);
  });
});

describe("outlet", () => {
  it("wedge hopper uses elongated slot", () => {
    expect(outlet("wedge_hopper_slot")).toBe("elongated_slot_wedge_plane_flow");
  });
});

describe("bestUse", () => {
  it("live bottom for wet sticky biomass", () => {
    expect(bestUse("live_bottom_discharge")).toBe("wet_sticky_biomass_difficult_flow");
  });
});

describe("hopperBinTypes", () => {
  it("returns 5 types", () => {
    expect(hopperBinTypes()).toHaveLength(5);
  });
});
