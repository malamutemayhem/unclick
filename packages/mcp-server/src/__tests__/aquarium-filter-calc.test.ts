import { describe, it, expect } from "vitest";
import {
  filtrationPower, tankCapacity, maintenanceEase, noiseOutput,
  filterCost, biologicalFilter, hiddenFromView, mediaType,
  bestTank, aquariumFilters,
} from "../aquarium-filter-calc.js";

describe("filtrationPower", () => {
  it("canister external strongest filtration", () => {
    expect(filtrationPower("canister_external")).toBeGreaterThan(filtrationPower("sponge_internal"));
  });
});

describe("tankCapacity", () => {
  it("canister external largest tank capacity", () => {
    expect(tankCapacity("canister_external")).toBeGreaterThan(tankCapacity("sponge_internal"));
  });
});

describe("maintenanceEase", () => {
  it("sponge internal easiest maintenance", () => {
    expect(maintenanceEase("sponge_internal")).toBeGreaterThan(maintenanceEase("undergravel_plate"));
  });
});

describe("noiseOutput", () => {
  it("hang on back noisier than sponge internal", () => {
    expect(noiseOutput("hang_on_back")).toBeGreaterThan(noiseOutput("sponge_internal"));
  });
});

describe("filterCost", () => {
  it("fluidized bed most expensive", () => {
    expect(filterCost("fluidized_bed")).toBeGreaterThan(filterCost("sponge_internal"));
  });
});

describe("biologicalFilter", () => {
  it("sponge internal has biological filter", () => {
    expect(biologicalFilter("sponge_internal")).toBe(true);
  });
  it("hang on back also has biological filter", () => {
    expect(biologicalFilter("hang_on_back")).toBe(true);
  });
});

describe("hiddenFromView", () => {
  it("canister external is hidden from view", () => {
    expect(hiddenFromView("canister_external")).toBe(true);
  });
  it("hang on back is not", () => {
    expect(hiddenFromView("hang_on_back")).toBe(false);
  });
});

describe("mediaType", () => {
  it("canister external uses multi tray bio media", () => {
    expect(mediaType("canister_external")).toBe("multi_tray_bio_media");
  });
});

describe("bestTank", () => {
  it("sponge internal for shrimp fry breeding", () => {
    expect(bestTank("sponge_internal")).toBe("shrimp_fry_breeding");
  });
});

describe("aquariumFilters", () => {
  it("returns 5 types", () => {
    expect(aquariumFilters()).toHaveLength(5);
  });
});
