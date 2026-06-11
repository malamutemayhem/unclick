import { describe, it, expect } from "vitest";
import {
  bandwidth, loss, shielding, dispersion,
  tlCost, planar, forMmwave, geometry,
  bestUse, transmissionLines,
} from "../transmission-line-calc.js";

describe("bandwidth", () => {
  it("coplanar waveguide widest bandwidth", () => {
    expect(bandwidth("coplanar_waveguide")).toBeGreaterThan(bandwidth("microstrip_surface"));
  });
});

describe("loss", () => {
  it("coaxial cable lowest loss", () => {
    expect(loss("coaxial_cable")).toBeGreaterThan(loss("microstrip_surface"));
  });
});

describe("shielding", () => {
  it("coaxial cable best shielding", () => {
    expect(shielding("coaxial_cable")).toBeGreaterThan(shielding("microstrip_surface"));
  });
});

describe("dispersion", () => {
  it("coplanar waveguide lowest dispersion", () => {
    expect(dispersion("coplanar_waveguide")).toBeGreaterThan(dispersion("microstrip_surface"));
  });
});

describe("tlCost", () => {
  it("coaxial cable most expensive", () => {
    expect(tlCost("coaxial_cable")).toBeGreaterThan(tlCost("microstrip_surface"));
  });
});

describe("planar", () => {
  it("microstrip surface is planar", () => {
    expect(planar("microstrip_surface")).toBe(true);
  });
  it("coaxial cable not planar", () => {
    expect(planar("coaxial_cable")).toBe(false);
  });
});

describe("forMmwave", () => {
  it("coplanar waveguide for mmwave", () => {
    expect(forMmwave("coplanar_waveguide")).toBe(true);
  });
  it("microstrip surface not for mmwave", () => {
    expect(forMmwave("microstrip_surface")).toBe(false);
  });
});

describe("geometry", () => {
  it("stripline buried uses trace between ground pair", () => {
    expect(geometry("stripline_buried")).toBe("trace_between_ground_pair");
  });
});

describe("bestUse", () => {
  it("coplanar waveguide best for mmic on chip interconnect", () => {
    expect(bestUse("coplanar_waveguide")).toBe("mmic_on_chip_interconnect");
  });
});

describe("transmissionLines", () => {
  it("returns 5 types", () => {
    expect(transmissionLines()).toHaveLength(5);
  });
});
