import { describe, it, expect } from "vitest";
import {
  resolution, throughput, materialRange, surfaceFinish,
  mjCost, multiMaterial, forPrototype, jetterConfig,
  bestUse, materialJetterTypes,
} from "../material-jetter-calc.js";

describe("resolution", () => {
  it("polyjet multi best resolution", () => {
    expect(resolution("polyjet_multi")).toBeGreaterThan(resolution("continuous_inkjet"));
  });
});

describe("throughput", () => {
  it("continuous inkjet highest throughput", () => {
    expect(throughput("continuous_inkjet")).toBeGreaterThan(throughput("nanoparticle_jet"));
  });
});

describe("materialRange", () => {
  it("polyjet multi best material range", () => {
    expect(materialRange("polyjet_multi")).toBeGreaterThan(materialRange("wax_jet"));
  });
});

describe("surfaceFinish", () => {
  it("polyjet multi best surface finish", () => {
    expect(surfaceFinish("polyjet_multi")).toBeGreaterThan(surfaceFinish("continuous_inkjet"));
  });
});

describe("mjCost", () => {
  it("nanoparticle jet most expensive", () => {
    expect(mjCost("nanoparticle_jet")).toBeGreaterThan(mjCost("continuous_inkjet"));
  });
});

describe("multiMaterial", () => {
  it("polyjet multi is multi material", () => {
    expect(multiMaterial("polyjet_multi")).toBe(true);
  });
  it("wax jet not multi material", () => {
    expect(multiMaterial("wax_jet")).toBe(false);
  });
});

describe("forPrototype", () => {
  it("polyjet multi for prototype", () => {
    expect(forPrototype("polyjet_multi")).toBe(true);
  });
  it("wax jet not for prototype", () => {
    expect(forPrototype("wax_jet")).toBe(false);
  });
});

describe("jetterConfig", () => {
  it("wax jet uses build support wax melt out cast pattern", () => {
    expect(jetterConfig("wax_jet")).toBe("wax_jet_material_jetter_build_support_wax_melt_out_cast_pattern");
  });
});

describe("bestUse", () => {
  it("polyjet multi for overmold proto rigid rubber color", () => {
    expect(bestUse("polyjet_multi")).toBe("overmold_proto_polyjet_multi_material_jetter_rigid_rubber_color");
  });
});

describe("materialJetterTypes", () => {
  it("returns 5 types", () => {
    expect(materialJetterTypes()).toHaveLength(5);
  });
});
