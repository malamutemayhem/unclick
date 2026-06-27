import { describe, it, expect } from "vitest";
import {
  moistureProtect, tempRange, flexibility, reworkability,
  coatCost, removable, forHighTemp, applyMethod,
  bestUse, conformalCoats,
} from "../conformal-coat-calc.js";

describe("moistureProtect", () => {
  it("parylene xr vapor best moisture protect", () => {
    expect(moistureProtect("parylene_xr_vapor")).toBeGreaterThan(moistureProtect("acrylic_ar_spray"));
  });
});

describe("tempRange", () => {
  it("silicone sr flex widest temp range", () => {
    expect(tempRange("silicone_sr_flex")).toBeGreaterThan(tempRange("acrylic_ar_spray"));
  });
});

describe("flexibility", () => {
  it("silicone sr flex most flexible", () => {
    expect(flexibility("silicone_sr_flex")).toBeGreaterThan(flexibility("epoxy_er_hard"));
  });
});

describe("reworkability", () => {
  it("acrylic ar spray most reworkable", () => {
    expect(reworkability("acrylic_ar_spray")).toBeGreaterThan(reworkability("epoxy_er_hard"));
  });
});

describe("coatCost", () => {
  it("parylene xr vapor most expensive", () => {
    expect(coatCost("parylene_xr_vapor")).toBeGreaterThan(coatCost("acrylic_ar_spray"));
  });
});

describe("removable", () => {
  it("acrylic ar spray is removable", () => {
    expect(removable("acrylic_ar_spray")).toBe(true);
  });
  it("epoxy er hard not removable", () => {
    expect(removable("epoxy_er_hard")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("silicone sr flex is for high temp", () => {
    expect(forHighTemp("silicone_sr_flex")).toBe(true);
  });
  it("acrylic ar spray not for high temp", () => {
    expect(forHighTemp("acrylic_ar_spray")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("parylene xr vapor uses vacuum vapor deposit", () => {
    expect(applyMethod("parylene_xr_vapor")).toBe("vacuum_vapor_deposit");
  });
});

describe("bestUse", () => {
  it("urethane ur tough best for chemical harsh exposure", () => {
    expect(bestUse("urethane_ur_tough")).toBe("chemical_harsh_exposure");
  });
});

describe("conformalCoats", () => {
  it("returns 5 types", () => {
    expect(conformalCoats()).toHaveLength(5);
  });
});
