import { describe, it, expect } from "vitest";
import {
  linewidth, power, modSpeed, efficiency,
  ldCost, singleMode, forDatacenter, cavity,
  bestUse, laserDiodes,
} from "../laser-diode-calc.js";

describe("linewidth", () => {
  it("tunable mems cavity narrowest linewidth", () => {
    expect(linewidth("tunable_mems_cavity")).toBeGreaterThan(linewidth("fabry_perot_fp"));
  });
});

describe("power", () => {
  it("fabry perot fp highest power", () => {
    expect(power("fabry_perot_fp")).toBeGreaterThan(power("vcsel_surface_emit"));
  });
});

describe("modSpeed", () => {
  it("eml electro absorb fastest modulation", () => {
    expect(modSpeed("eml_electro_absorb")).toBeGreaterThan(modSpeed("dfb_distributed_feedback"));
  });
});

describe("efficiency", () => {
  it("vcsel surface emit most efficient", () => {
    expect(efficiency("vcsel_surface_emit")).toBeGreaterThan(efficiency("eml_electro_absorb"));
  });
});

describe("ldCost", () => {
  it("tunable mems cavity most expensive", () => {
    expect(ldCost("tunable_mems_cavity")).toBeGreaterThan(ldCost("fabry_perot_fp"));
  });
});

describe("singleMode", () => {
  it("dfb distributed feedback is single mode", () => {
    expect(singleMode("dfb_distributed_feedback")).toBe(true);
  });
  it("fabry perot fp not single mode", () => {
    expect(singleMode("fabry_perot_fp")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("vcsel surface emit for datacenter", () => {
    expect(forDatacenter("vcsel_surface_emit")).toBe(true);
  });
  it("tunable mems cavity not for datacenter", () => {
    expect(forDatacenter("tunable_mems_cavity")).toBe(false);
  });
});

describe("cavity", () => {
  it("vcsel surface emit uses dbr mirror vertical", () => {
    expect(cavity("vcsel_surface_emit")).toBe("dbr_mirror_vertical");
  });
});

describe("bestUse", () => {
  it("dfb distributed feedback best for dwdm telecom transmitter", () => {
    expect(bestUse("dfb_distributed_feedback")).toBe("dwdm_telecom_transmitter");
  });
});

describe("laserDiodes", () => {
  it("returns 5 types", () => {
    expect(laserDiodes()).toHaveLength(5);
  });
});
