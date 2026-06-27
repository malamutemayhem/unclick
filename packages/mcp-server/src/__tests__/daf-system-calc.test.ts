import { describe, it, expect } from "vitest";
import {
  removal, throughput, energy, footprint,
  dsCost, chemical, forOilRemoval, bubble,
  bestUse, dafSystemTypes,
} from "../daf-system-calc.js";

describe("removal", () => {
  it("full flow best removal", () => {
    expect(removal("full_flow_pressurized")).toBeGreaterThan(removal("induced_air_mechanical"));
  });
});

describe("throughput", () => {
  it("induced air highest throughput", () => {
    expect(throughput("induced_air_mechanical")).toBeGreaterThan(throughput("full_flow_pressurized"));
  });
});

describe("energy", () => {
  it("cavitation most energy efficient", () => {
    expect(energy("cavitation_air_nozzle")).toBeGreaterThan(energy("full_flow_pressurized"));
  });
});

describe("footprint", () => {
  it("cavitation smallest footprint", () => {
    expect(footprint("cavitation_air_nozzle")).toBeGreaterThan(footprint("full_flow_pressurized"));
  });
});

describe("dsCost", () => {
  it("cavitation most expensive", () => {
    expect(dsCost("cavitation_air_nozzle")).toBeGreaterThan(dsCost("induced_air_mechanical"));
  });
});

describe("chemical", () => {
  it("recycle flow uses chemical", () => {
    expect(chemical("recycle_flow_standard")).toBe(true);
  });
  it("induced air no chemical", () => {
    expect(chemical("induced_air_mechanical")).toBe(false);
  });
});

describe("forOilRemoval", () => {
  it("full flow for oil removal", () => {
    expect(forOilRemoval("full_flow_pressurized")).toBe(true);
  });
  it("recycle flow not for oil", () => {
    expect(forOilRemoval("recycle_flow_standard")).toBe(false);
  });
});

describe("bubble", () => {
  it("induced air uses rotor stator", () => {
    expect(bubble("induced_air_mechanical")).toBe("rotor_stator_dispersed_air");
  });
});

describe("bestUse", () => {
  it("recycle for municipal clarification", () => {
    expect(bestUse("recycle_flow_standard")).toBe("municipal_primary_clarification");
  });
});

describe("dafSystemTypes", () => {
  it("returns 5 types", () => {
    expect(dafSystemTypes()).toHaveLength(5);
  });
});
