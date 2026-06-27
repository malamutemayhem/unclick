import { describe, it, expect } from "vitest";
import {
  coverage, duration, easeOfUse, multiMetal,
  vpCost, reusable, forExport, carrier,
  bestUse, vciProtectTypes,
} from "../vci-protect-calc.js";

describe("coverage", () => {
  it("liquid spray best coverage", () => {
    expect(coverage("vci_liquid_spray")).toBeGreaterThan(coverage("vci_paper_wrap"));
  });
});

describe("duration", () => {
  it("emitter cup longest duration", () => {
    expect(duration("vci_emitter_cup")).toBeGreaterThan(duration("vci_liquid_spray"));
  });
});

describe("easeOfUse", () => {
  it("emitter cup easiest to use", () => {
    expect(easeOfUse("vci_emitter_cup")).toBeGreaterThan(easeOfUse("vci_liquid_spray"));
  });
});

describe("multiMetal", () => {
  it("liquid spray best multi metal", () => {
    expect(multiMetal("vci_liquid_spray")).toBeGreaterThan(multiMetal("vci_emitter_cup"));
  });
});

describe("vpCost", () => {
  it("foam cushion most expensive", () => {
    expect(vpCost("vci_foam_cushion")).toBeGreaterThan(vpCost("vci_paper_wrap"));
  });
});

describe("reusable", () => {
  it("foam cushion is reusable", () => {
    expect(reusable("vci_foam_cushion")).toBe(true);
  });
  it("paper wrap not reusable", () => {
    expect(reusable("vci_paper_wrap")).toBe(false);
  });
});

describe("forExport", () => {
  it("poly bag for export", () => {
    expect(forExport("vci_poly_bag_film")).toBe(true);
  });
  it("emitter cup not for export", () => {
    expect(forExport("vci_emitter_cup")).toBe(false);
  });
});

describe("carrier", () => {
  it("poly bag uses polyethylene film", () => {
    expect(carrier("vci_poly_bag_film")).toBe("polyethylene_film_vci_embedded");
  });
});

describe("bestUse", () => {
  it("emitter cup for electrical cabinet", () => {
    expect(bestUse("vci_emitter_cup")).toBe("electrical_cabinet_toolbox_enclosure");
  });
});

describe("vciProtectTypes", () => {
  it("returns 5 types", () => {
    expect(vciProtectTypes()).toHaveLength(5);
  });
});
