import { describe, it, expect } from "vitest";
import {
  solderQuality, throughput, thermalPrecision, bridgeRisk,
  ssCost, contactFree, forMixed, solderConfig,
  bestUse, selectiveSolderTypes,
} from "../selective-solder-calc.js";

describe("solderQuality", () => {
  it("laser solder best solder quality", () => {
    expect(solderQuality("laser_solder")).toBeGreaterThan(solderQuality("dip_solder"));
  });
});

describe("throughput", () => {
  it("dip solder highest throughput", () => {
    expect(throughput("dip_solder")).toBeGreaterThan(throughput("point_solder"));
  });
});

describe("thermalPrecision", () => {
  it("laser solder best thermal precision", () => {
    expect(thermalPrecision("laser_solder")).toBeGreaterThan(thermalPrecision("dip_solder"));
  });
});

describe("bridgeRisk", () => {
  it("laser solder lowest bridge risk (highest score)", () => {
    expect(bridgeRisk("laser_solder")).toBeGreaterThan(bridgeRisk("dip_solder"));
  });
});

describe("ssCost", () => {
  it("laser solder most expensive", () => {
    expect(ssCost("laser_solder")).toBeGreaterThan(ssCost("dip_solder"));
  });
});

describe("contactFree", () => {
  it("laser solder is contact free", () => {
    expect(contactFree("laser_solder")).toBe(true);
  });
  it("mini wave not contact free", () => {
    expect(contactFree("mini_wave")).toBe(false);
  });
});

describe("forMixed", () => {
  it("mini wave for mixed tech", () => {
    expect(forMixed("mini_wave")).toBe(true);
  });
  it("dip solder not for mixed", () => {
    expect(forMixed("dip_solder")).toBe(false);
  });
});

describe("solderConfig", () => {
  it("laser solder uses focused beam precise heat reflow joint", () => {
    expect(solderConfig("laser_solder")).toBe("laser_selective_solder_focused_beam_precise_heat_reflow_joint");
  });
});

describe("bestUse", () => {
  it("point solder for rework repair single joint iron tip", () => {
    expect(bestUse("point_solder")).toBe("rework_repair_point_selective_solder_single_joint_iron_tip");
  });
});

describe("selectiveSolderTypes", () => {
  it("returns 5 types", () => {
    expect(selectiveSolderTypes()).toHaveLength(5);
  });
});
