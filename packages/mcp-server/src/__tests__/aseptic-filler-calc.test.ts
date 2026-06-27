import { describe, it, expect } from "vitest";
import {
  sterility, throughput, containerRange, shelfLife,
  afCost_, singleStep, forPharma, fillerConfig,
  bestUse, asepticFillerTypes,
} from "../aseptic-filler-calc.js";

describe("sterility", () => {
  it("blow fill seal best sterility", () => {
    expect(sterility("blow_fill_seal")).toBeGreaterThan(sterility("ultra_clean_fill"));
  });
});

describe("throughput", () => {
  it("form fill seal highest throughput", () => {
    expect(throughput("form_fill_seal")).toBeGreaterThan(throughput("electron_beam_fill"));
  });
});

describe("containerRange", () => {
  it("pre sterilize fill best container range", () => {
    expect(containerRange("pre_sterilize_fill")).toBeGreaterThan(containerRange("blow_fill_seal"));
  });
});

describe("shelfLife", () => {
  it("blow fill seal best shelf life", () => {
    expect(shelfLife("blow_fill_seal")).toBeGreaterThan(shelfLife("ultra_clean_fill"));
  });
});

describe("afCost_", () => {
  it("electron beam most expensive", () => {
    expect(afCost_("electron_beam_fill")).toBeGreaterThan(afCost_("ultra_clean_fill"));
  });
});

describe("singleStep", () => {
  it("blow fill seal is single step", () => {
    expect(singleStep("blow_fill_seal")).toBe(true);
  });
  it("pre sterilize not single step", () => {
    expect(singleStep("pre_sterilize_fill")).toBe(false);
  });
});

describe("forPharma", () => {
  it("blow fill seal for pharma", () => {
    expect(forPharma("blow_fill_seal")).toBe(true);
  });
  it("form fill seal not for pharma", () => {
    expect(forPharma("form_fill_seal")).toBe(false);
  });
});

describe("fillerConfig", () => {
  it("electron beam uses ebeam sterilize no chemical residue", () => {
    expect(fillerConfig("electron_beam_fill")).toBe("electron_beam_aseptic_filler_ebeam_sterilize_no_chemical_residue");
  });
});

describe("bestUse", () => {
  it("pre sterilize for milk carton h2o2 rinse long shelf", () => {
    expect(bestUse("pre_sterilize_fill")).toBe("milk_carton_pre_sterilize_aseptic_filler_h2o2_rinse_long_shelf");
  });
});

describe("asepticFillerTypes", () => {
  it("returns 5 types", () => {
    expect(asepticFillerTypes()).toHaveLength(5);
  });
});
