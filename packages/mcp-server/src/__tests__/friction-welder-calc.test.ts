import { describe, it, expect } from "vitest";
import {
  weldSpeed, jointStrength, materialRange, heatAffectedZone,
  fwCost, solidState, forDissimilar, welderConfig,
  bestUse, frictionWelderTypes,
} from "../friction-welder-calc.js";

describe("weldSpeed", () => {
  it("rotary inertia fastest weld speed", () => {
    expect(weldSpeed("rotary_inertia")).toBeGreaterThan(weldSpeed("friction_stir"));
  });
});

describe("jointStrength", () => {
  it("friction stir strongest joint", () => {
    expect(jointStrength("friction_stir")).toBeGreaterThan(jointStrength("linear_reciprocating"));
  });
});

describe("materialRange", () => {
  it("linear reciprocating widest material range", () => {
    expect(materialRange("linear_reciprocating")).toBeGreaterThan(materialRange("friction_stir"));
  });
});

describe("heatAffectedZone", () => {
  it("friction stir smallest heat affected zone", () => {
    expect(heatAffectedZone("friction_stir")).toBeGreaterThan(heatAffectedZone("rotary_inertia"));
  });
});

describe("fwCost", () => {
  it("friction stir most expensive", () => {
    expect(fwCost("friction_stir")).toBeGreaterThan(fwCost("rotary_inertia"));
  });
});

describe("solidState", () => {
  it("all friction welders are solid state", () => {
    expect(solidState("rotary_direct_drive")).toBe(true);
    expect(solidState("friction_stir")).toBe(true);
  });
});

describe("forDissimilar", () => {
  it("rotary direct drive for dissimilar metals", () => {
    expect(forDissimilar("rotary_direct_drive")).toBe(true);
  });
  it("orbital circular not for dissimilar", () => {
    expect(forDissimilar("orbital_circular")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("friction stir uses rotating tool plunge traverse", () => {
    expect(welderConfig("friction_stir")).toBe("friction_stir_rotating_tool_plunge_traverse_butt_lap_aluminum");
  });
});

describe("bestUse", () => {
  it("rotary inertia for high production round part", () => {
    expect(bestUse("rotary_inertia")).toBe("high_production_round_part_flywheel_inertia_rapid_friction_weld");
  });
});

describe("frictionWelderTypes", () => {
  it("returns 5 types", () => {
    expect(frictionWelderTypes()).toHaveLength(5);
  });
});
