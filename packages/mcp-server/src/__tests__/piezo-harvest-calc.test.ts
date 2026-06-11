import { describe, it, expect } from "vitest";
import {
  powerDensity, bandwidth, efficiency, durability,
  phCost, leadFree, forWearable, material,
  bestUse, piezoHarvests,
} from "../piezo-harvest-calc.js";

describe("powerDensity", () => {
  it("stack actuator d33 highest power density", () => {
    expect(powerDensity("stack_actuator_d33")).toBeGreaterThan(powerDensity("pvdf_film_flex"));
  });
});

describe("bandwidth", () => {
  it("pvdf film flex widest bandwidth", () => {
    expect(bandwidth("pvdf_film_flex")).toBeGreaterThan(bandwidth("stack_actuator_d33"));
  });
});

describe("efficiency", () => {
  it("stack actuator d33 most efficient", () => {
    expect(efficiency("stack_actuator_d33")).toBeGreaterThan(efficiency("pvdf_film_flex"));
  });
});

describe("durability", () => {
  it("pvdf film flex most durable", () => {
    expect(durability("pvdf_film_flex")).toBeGreaterThan(durability("cymbal_amplified"));
  });
});

describe("phCost", () => {
  it("stack actuator d33 most expensive", () => {
    expect(phCost("stack_actuator_d33")).toBeGreaterThan(phCost("pvdf_film_flex"));
  });
});

describe("leadFree", () => {
  it("pvdf film flex is lead free", () => {
    expect(leadFree("pvdf_film_flex")).toBe(true);
  });
  it("pzt cantilever not lead free", () => {
    expect(leadFree("pzt_cantilever")).toBe(false);
  });
});

describe("forWearable", () => {
  it("pvdf film flex for wearable", () => {
    expect(forWearable("pvdf_film_flex")).toBe(true);
  });
  it("pzt cantilever not for wearable", () => {
    expect(forWearable("pzt_cantilever")).toBe(false);
  });
});

describe("material", () => {
  it("aln thin film uses aluminum nitride sputter", () => {
    expect(material("aln_thin_film")).toBe("aluminum_nitride_sputter");
  });
});

describe("bestUse", () => {
  it("cymbal amplified best for underwater acoustic power", () => {
    expect(bestUse("cymbal_amplified")).toBe("underwater_acoustic_power");
  });
});

describe("piezoHarvests", () => {
  it("returns 5 types", () => {
    expect(piezoHarvests()).toHaveLength(5);
  });
});
