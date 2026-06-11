import { describe, it, expect } from "vitest";
import {
  removalSpeed, throughput, surfaceDamage, geometryAccess,
  srCost_, automated, forMetal, removerConfig,
  bestUse, supportRemoverTypes,
} from "../support-remover-calc.js";

describe("removalSpeed", () => {
  it("waterjet blast best removal speed", () => {
    expect(removalSpeed("waterjet_blast")).toBeGreaterThan(removalSpeed("electrochemical_etch"));
  });
});

describe("throughput", () => {
  it("alkaline dissolve highest throughput", () => {
    expect(throughput("alkaline_dissolve")).toBeGreaterThan(throughput("manual_break"));
  });
});

describe("surfaceDamage", () => {
  it("alkaline dissolve best surface damage score", () => {
    expect(surfaceDamage("alkaline_dissolve")).toBeGreaterThan(surfaceDamage("manual_break"));
  });
});

describe("geometryAccess", () => {
  it("alkaline dissolve best geometry access", () => {
    expect(geometryAccess("alkaline_dissolve")).toBeGreaterThan(geometryAccess("wire_edm_cut"));
  });
});

describe("srCost_", () => {
  it("electrochemical etch most expensive", () => {
    expect(srCost_("electrochemical_etch")).toBeGreaterThan(srCost_("manual_break"));
  });
});

describe("automated", () => {
  it("alkaline dissolve is automated", () => {
    expect(automated("alkaline_dissolve")).toBe(true);
  });
  it("manual break not automated", () => {
    expect(automated("manual_break")).toBe(false);
  });
});

describe("forMetal", () => {
  it("electrochemical etch for metal", () => {
    expect(forMetal("electrochemical_etch")).toBe(true);
  });
  it("alkaline dissolve not for metal", () => {
    expect(forMetal("alkaline_dissolve")).toBe(false);
  });
});

describe("removerConfig", () => {
  it("alkaline dissolve uses heated tank naoh soluble melt", () => {
    expect(removerConfig("alkaline_dissolve")).toBe("alkaline_dissolve_support_remover_heated_tank_naoh_soluble_melt");
  });
});

describe("bestUse", () => {
  it("wire edm cut for build plate separate part from plate", () => {
    expect(bestUse("wire_edm_cut")).toBe("build_plate_wire_edm_cut_support_remover_separate_part_from_plate");
  });
});

describe("supportRemoverTypes", () => {
  it("returns 5 types", () => {
    expect(supportRemoverTypes()).toHaveLength(5);
  });
});
