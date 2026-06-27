import { describe, it, expect } from "vitest";
import {
  heatResist, loadCapacity, thermalShock, sizeVariety,
  postCost, reusable, stackable, postMaterial,
  bestFiring, kilnPosts,
} from "../kiln-post-calc.js";

describe("heatResist", () => {
  it("silicon carbide heavy best heat resist", () => {
    expect(heatResist("silicon_carbide_heavy")).toBeGreaterThan(heatResist("stacking_t_pin_support"));
  });
});

describe("loadCapacity", () => {
  it("silicon carbide heavy most load capacity", () => {
    expect(loadCapacity("silicon_carbide_heavy")).toBeGreaterThan(loadCapacity("alumina_tube_hollow"));
  });
});

describe("thermalShock", () => {
  it("cordierite square standard best thermal shock", () => {
    expect(thermalShock("cordierite_square_standard")).toBeGreaterThan(thermalShock("silicon_carbide_heavy"));
  });
});

describe("sizeVariety", () => {
  it("cordierite square standard most size variety", () => {
    expect(sizeVariety("cordierite_square_standard")).toBeGreaterThan(sizeVariety("silicon_carbide_heavy"));
  });
});

describe("postCost", () => {
  it("silicon carbide heavy most expensive", () => {
    expect(postCost("silicon_carbide_heavy")).toBeGreaterThan(postCost("cordierite_square_standard"));
  });
});

describe("reusable", () => {
  it("cordierite square standard is reusable", () => {
    expect(reusable("cordierite_square_standard")).toBe(true);
  });
});

describe("stackable", () => {
  it("cordierite square standard is stackable", () => {
    expect(stackable("cordierite_square_standard")).toBe(true);
  });
  it("alumina tube hollow is not stackable", () => {
    expect(stackable("alumina_tube_hollow")).toBe(false);
  });
});

describe("postMaterial", () => {
  it("silicon carbide heavy uses sic dense cylinder", () => {
    expect(postMaterial("silicon_carbide_heavy")).toBe("sic_dense_cylinder");
  });
});

describe("bestFiring", () => {
  it("silicon carbide heavy best for salt soda firing", () => {
    expect(bestFiring("silicon_carbide_heavy")).toBe("salt_soda_firing");
  });
});

describe("kilnPosts", () => {
  it("returns 5 types", () => {
    expect(kilnPosts()).toHaveLength(5);
  });
});
