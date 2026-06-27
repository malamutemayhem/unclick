import { describe, it, expect } from "vitest";
import {
  precision, throughput, materialRange, multilayer,
  filmCost, nonContact, forMetal, technique,
  bestUse, filmMeasures,
} from "../film-measure-calc.js";

describe("precision", () => {
  it("ellipsometry multi angle highest precision", () => {
    expect(precision("ellipsometry_multi_angle")).toBeGreaterThan(precision("eddy_current"));
  });
});

describe("throughput", () => {
  it("eddy current highest throughput", () => {
    expect(throughput("eddy_current")).toBeGreaterThan(throughput("ellipsometry_multi_angle"));
  });
});

describe("materialRange", () => {
  it("ellipsometry multi angle widest material range", () => {
    expect(materialRange("ellipsometry_multi_angle")).toBeGreaterThan(materialRange("four_point_probe"));
  });
});

describe("multilayer", () => {
  it("ellipsometry multi angle best multilayer", () => {
    expect(multilayer("ellipsometry_multi_angle")).toBeGreaterThan(multilayer("four_point_probe"));
  });
});

describe("filmCost", () => {
  it("ellipsometry multi angle most expensive", () => {
    expect(filmCost("ellipsometry_multi_angle")).toBeGreaterThan(filmCost("four_point_probe"));
  });
});

describe("nonContact", () => {
  it("eddy current is non-contact", () => {
    expect(nonContact("eddy_current")).toBe(true);
  });
  it("four point probe not non-contact", () => {
    expect(nonContact("four_point_probe")).toBe(false);
  });
});

describe("forMetal", () => {
  it("xrf fluorescence for metal", () => {
    expect(forMetal("xrf_fluorescence")).toBe(true);
  });
  it("spectral reflectance not for metal", () => {
    expect(forMetal("spectral_reflectance")).toBe(false);
  });
});

describe("technique", () => {
  it("four point probe uses sheet resistance contact", () => {
    expect(technique("four_point_probe")).toBe("sheet_resistance_contact");
  });
});

describe("bestUse", () => {
  it("eddy current best for cmp copper endpoint", () => {
    expect(bestUse("eddy_current")).toBe("cmp_copper_endpoint");
  });
});

describe("filmMeasures", () => {
  it("returns 5 types", () => {
    expect(filmMeasures()).toHaveLength(5);
  });
});
