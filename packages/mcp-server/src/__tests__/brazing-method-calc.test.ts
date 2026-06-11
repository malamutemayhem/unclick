import { describe, it, expect } from "vitest";
import {
  jointStrength, precision, throughput, cleanliness,
  bzCost, fluxFree, forMass, filler,
  bestUse, brazingMethodTypes,
} from "../brazing-method-calc.js";

describe("jointStrength", () => {
  it("vacuum brazing strongest joints", () => {
    expect(jointStrength("vacuum_brazing_aero")).toBeGreaterThan(jointStrength("torch_brazing_manual"));
  });
});

describe("precision", () => {
  it("vacuum brazing most precise", () => {
    expect(precision("vacuum_brazing_aero")).toBeGreaterThan(precision("torch_brazing_manual"));
  });
});

describe("throughput", () => {
  it("furnace brazing highest throughput", () => {
    expect(throughput("furnace_brazing_batch")).toBeGreaterThan(throughput("torch_brazing_manual"));
  });
});

describe("cleanliness", () => {
  it("vacuum brazing cleanest", () => {
    expect(cleanliness("vacuum_brazing_aero")).toBeGreaterThan(cleanliness("dip_brazing_salt_bath"));
  });
});

describe("bzCost", () => {
  it("vacuum brazing most expensive", () => {
    expect(bzCost("vacuum_brazing_aero")).toBeGreaterThan(bzCost("torch_brazing_manual"));
  });
});

describe("fluxFree", () => {
  it("vacuum brazing is flux free", () => {
    expect(fluxFree("vacuum_brazing_aero")).toBe(true);
  });
  it("torch brazing uses flux", () => {
    expect(fluxFree("torch_brazing_manual")).toBe(false);
  });
});

describe("forMass", () => {
  it("furnace brazing for mass production", () => {
    expect(forMass("furnace_brazing_batch")).toBe(true);
  });
  it("torch brazing not for mass", () => {
    expect(forMass("torch_brazing_manual")).toBe(false);
  });
});

describe("filler", () => {
  it("vacuum brazing uses nickel gold palladium", () => {
    expect(filler("vacuum_brazing_aero")).toBe("nickel_gold_palladium_foil_vacuum");
  });
});

describe("bestUse", () => {
  it("torch brazing for hvac pipe repair", () => {
    expect(bestUse("torch_brazing_manual")).toBe("hvac_pipe_repair_small_batch_job");
  });
});

describe("brazingMethodTypes", () => {
  it("returns 5 types", () => {
    expect(brazingMethodTypes()).toHaveLength(5);
  });
});
