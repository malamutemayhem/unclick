import { describe, it, expect } from "vitest";
import {
  ashRate, throughput, selectivity, residueFree,
  paCost, isotropic, forLowK, asherConfig,
  bestUse, plasmaAsherTypes,
} from "../plasma-asher-calc.js";

describe("ashRate", () => {
  it("microwave asher best ash rate", () => {
    expect(ashRate("microwave_asher")).toBeGreaterThan(ashRate("uv_ozone_asher"));
  });
});

describe("throughput", () => {
  it("barrel asher high throughput", () => {
    expect(throughput("barrel_asher")).toBeGreaterThan(throughput("uv_ozone_asher"));
  });
});

describe("selectivity", () => {
  it("microwave asher best selectivity", () => {
    expect(selectivity("microwave_asher")).toBeGreaterThan(selectivity("barrel_asher"));
  });
});

describe("residueFree", () => {
  it("microwave asher best residue free", () => {
    expect(residueFree("microwave_asher")).toBeGreaterThan(residueFree("barrel_asher"));
  });
});

describe("paCost", () => {
  it("microwave asher most expensive", () => {
    expect(paCost("microwave_asher")).toBeGreaterThan(paCost("uv_ozone_asher"));
  });
});

describe("isotropic", () => {
  it("barrel asher is isotropic", () => {
    expect(isotropic("barrel_asher")).toBe(true);
  });
  it("rie asher not isotropic", () => {
    expect(isotropic("rie_asher")).toBe(false);
  });
});

describe("forLowK", () => {
  it("downstream asher for low k", () => {
    expect(forLowK("downstream_asher")).toBe(true);
  });
  it("barrel asher not for low k", () => {
    expect(forLowK("barrel_asher")).toBe(false);
  });
});

describe("asherConfig", () => {
  it("rie asher uses reactive ion etch directional strip clean", () => {
    expect(asherConfig("rie_asher")).toBe("rie_plasma_asher_reactive_ion_etch_directional_strip_clean");
  });
});

describe("bestUse", () => {
  it("uv ozone asher for surface clean organic residue photochemical", () => {
    expect(bestUse("uv_ozone_asher")).toBe("surface_clean_uv_ozone_asher_organic_residue_photochemical");
  });
});

describe("plasmaAsherTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaAsherTypes()).toHaveLength(5);
  });
});
