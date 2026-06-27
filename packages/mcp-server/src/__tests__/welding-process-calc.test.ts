import { describe, it, expect } from "vitest";
import {
  speed, quality, penetration, skill,
  wpCost, automated, forAluminum, shielding,
  bestUse, weldingProcesses,
} from "../welding-process-calc.js";

describe("speed", () => {
  it("laser beam fastest", () => {
    expect(speed("laser_beam_keyhole")).toBeGreaterThan(speed("tig_gtaw_tungsten"));
  });
});

describe("quality", () => {
  it("tig highest quality", () => {
    expect(quality("tig_gtaw_tungsten")).toBeGreaterThan(quality("stick_smaw_electrode"));
  });
});

describe("penetration", () => {
  it("laser beam deepest penetration", () => {
    expect(penetration("laser_beam_keyhole")).toBeGreaterThan(penetration("tig_gtaw_tungsten"));
  });
});

describe("skill", () => {
  it("tig most skill required", () => {
    expect(skill("tig_gtaw_tungsten")).toBeGreaterThan(skill("friction_stir_solid"));
  });
});

describe("wpCost", () => {
  it("laser beam most expensive", () => {
    expect(wpCost("laser_beam_keyhole")).toBeGreaterThan(wpCost("stick_smaw_electrode"));
  });
});

describe("automated", () => {
  it("mig is automated", () => {
    expect(automated("mig_gmaw_wire_feed")).toBe(true);
  });
  it("tig not automated", () => {
    expect(automated("tig_gtaw_tungsten")).toBe(false);
  });
});

describe("forAluminum", () => {
  it("tig for aluminum", () => {
    expect(forAluminum("tig_gtaw_tungsten")).toBe(true);
  });
  it("stick not for aluminum", () => {
    expect(forAluminum("stick_smaw_electrode")).toBe(false);
  });
});

describe("shielding", () => {
  it("friction stir uses none solid state", () => {
    expect(shielding("friction_stir_solid")).toBe("none_solid_state_process");
  });
});

describe("bestUse", () => {
  it("laser beam best for battery cell seal", () => {
    expect(bestUse("laser_beam_keyhole")).toBe("battery_cell_hermetic_seal");
  });
});

describe("weldingProcesses", () => {
  it("returns 5 types", () => {
    expect(weldingProcesses()).toHaveLength(5);
  });
});
