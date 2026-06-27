import { describe, it, expect } from "vitest";
import {
  bendSmooth, angleAccuracy, pipeRange, portability,
  benderCost, powered, forConduit, formType,
  bestUse, pipeBenders,
} from "../pipe-bender-calc.js";

describe("bendSmooth", () => {
  it("hydraulic ram power smoothest bend", () => {
    expect(bendSmooth("hydraulic_ram_power")).toBeGreaterThan(bendSmooth("spring_bend_internal"));
  });
});

describe("angleAccuracy", () => {
  it("hydraulic ram power most accurate angle", () => {
    expect(angleAccuracy("hydraulic_ram_power")).toBeGreaterThan(angleAccuracy("spring_bend_internal"));
  });
});

describe("pipeRange", () => {
  it("hydraulic ram power widest range", () => {
    expect(pipeRange("hydraulic_ram_power")).toBeGreaterThan(pipeRange("mini_tube_compact"));
  });
});

describe("portability", () => {
  it("spring bend internal most portable", () => {
    expect(portability("spring_bend_internal")).toBeGreaterThan(portability("hydraulic_ram_power"));
  });
});

describe("benderCost", () => {
  it("hydraulic ram power most expensive", () => {
    expect(benderCost("hydraulic_ram_power")).toBeGreaterThan(benderCost("spring_bend_internal"));
  });
});

describe("powered", () => {
  it("hydraulic ram power is powered", () => {
    expect(powered("hydraulic_ram_power")).toBe(true);
  });
  it("lever bend manual not powered", () => {
    expect(powered("lever_bend_manual")).toBe(false);
  });
});

describe("forConduit", () => {
  it("conduit shoe electric is for conduit", () => {
    expect(forConduit("conduit_shoe_electric")).toBe(true);
  });
  it("spring bend internal not for conduit", () => {
    expect(forConduit("spring_bend_internal")).toBe(false);
  });
});

describe("formType", () => {
  it("mini tube compact uses compact roller guide", () => {
    expect(formType("mini_tube_compact")).toBe("compact_roller_guide");
  });
});

describe("bestUse", () => {
  it("conduit shoe electric best for emt conduit bend", () => {
    expect(bestUse("conduit_shoe_electric")).toBe("emt_conduit_bend");
  });
});

describe("pipeBenders", () => {
  it("returns 5 types", () => {
    expect(pipeBenders()).toHaveLength(5);
  });
});
