import { describe, it, expect } from "vitest";
import {
  solidsHandling, flowRate, reliability, maintenance,
  seCost, grinder, forBasement, mechanism,
  bestUse, sewageEjectorTypes,
} from "../sewage-ejector-calc.js";

describe("solidsHandling", () => {
  it("submersible grinder best solids handling", () => {
    expect(solidsHandling("submersible_grinder")).toBeGreaterThan(solidsHandling("pneumatic_ejector_air"));
  });
});

describe("flowRate", () => {
  it("duplex alternating highest flow rate", () => {
    expect(flowRate("duplex_alternating")).toBeGreaterThan(flowRate("macerator_compact"));
  });
});

describe("reliability", () => {
  it("duplex alternating most reliable", () => {
    expect(reliability("duplex_alternating")).toBeGreaterThan(reliability("macerator_compact"));
  });
});

describe("maintenance", () => {
  it("pneumatic ejector lowest maintenance", () => {
    expect(maintenance("pneumatic_ejector_air")).toBeGreaterThan(maintenance("submersible_grinder"));
  });
});

describe("seCost", () => {
  it("duplex alternating most expensive", () => {
    expect(seCost("duplex_alternating")).toBeGreaterThan(seCost("macerator_compact"));
  });
});

describe("grinder", () => {
  it("submersible grinder has grinder", () => {
    expect(grinder("submersible_grinder")).toBe(true);
  });
  it("submersible solids handle no grinder", () => {
    expect(grinder("submersible_solids_handle")).toBe(false);
  });
});

describe("forBasement", () => {
  it("submersible grinder for basement", () => {
    expect(forBasement("submersible_grinder")).toBe(true);
  });
  it("pneumatic ejector not for basement", () => {
    expect(forBasement("pneumatic_ejector_air")).toBe(false);
  });
});

describe("mechanism", () => {
  it("macerator uses compact behind wall", () => {
    expect(mechanism("macerator_compact")).toBe("compact_macerator_behind_wall_small_pipe_pressure");
  });
});

describe("bestUse", () => {
  it("pneumatic for hazardous location", () => {
    expect(bestUse("pneumatic_ejector_air")).toBe("hazardous_location_no_electric_in_wet_well_sewer");
  });
});

describe("sewageEjectorTypes", () => {
  it("returns 5 types", () => {
    expect(sewageEjectorTypes()).toHaveLength(5);
  });
});
