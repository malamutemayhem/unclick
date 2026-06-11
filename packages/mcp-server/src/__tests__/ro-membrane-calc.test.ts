import { describe, it, expect } from "vitest";
import {
  rejection, flux, foulingResist, energyUse,
  roCost, chlorineTol, forSeawater, membrane,
  bestUse, roMembraneTypes,
} from "../ro-membrane-calc.js";

describe("rejection", () => {
  it("seawater high reject best rejection", () => {
    expect(rejection("seawater_high_reject")).toBeGreaterThan(rejection("hollow_fiber_cellulose"));
  });
});

describe("flux", () => {
  it("low energy brackish highest flux", () => {
    expect(flux("low_energy_brackish")).toBeGreaterThan(flux("seawater_high_reject"));
  });
});

describe("foulingResist", () => {
  it("disc tube vibrate best fouling resistance", () => {
    expect(foulingResist("disc_tube_vibrate")).toBeGreaterThan(foulingResist("spiral_wound_polyamide"));
  });
});

describe("energyUse", () => {
  it("low energy brackish best energy use (highest score)", () => {
    expect(energyUse("low_energy_brackish")).toBeGreaterThan(energyUse("seawater_high_reject"));
  });
});

describe("roCost", () => {
  it("disc tube vibrate most expensive", () => {
    expect(roCost("disc_tube_vibrate")).toBeGreaterThan(roCost("hollow_fiber_cellulose"));
  });
});

describe("chlorineTol", () => {
  it("hollow fiber cellulose chlorine tolerant", () => {
    expect(chlorineTol("hollow_fiber_cellulose")).toBe(true);
  });
  it("spiral wound not chlorine tolerant", () => {
    expect(chlorineTol("spiral_wound_polyamide")).toBe(false);
  });
});

describe("forSeawater", () => {
  it("seawater high reject for seawater", () => {
    expect(forSeawater("seawater_high_reject")).toBe(true);
  });
  it("low energy brackish not for seawater", () => {
    expect(forSeawater("low_energy_brackish")).toBe(false);
  });
});

describe("membrane", () => {
  it("disc tube uses vibrate shear", () => {
    expect(membrane("disc_tube_vibrate")).toBe("disc_stack_vibrate_shear_anti_foul");
  });
});

describe("bestUse", () => {
  it("seawater high reject for seawater desalination", () => {
    expect(bestUse("seawater_high_reject")).toBe("seawater_desalination_coastal_plant");
  });
});

describe("roMembraneTypes", () => {
  it("returns 5 types", () => {
    expect(roMembraneTypes()).toHaveLength(5);
  });
});
