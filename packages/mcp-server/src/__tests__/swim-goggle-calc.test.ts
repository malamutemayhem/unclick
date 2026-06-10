import { describe, it, expect } from "vitest";
import {
  hydrodynamic, comfort, fieldOfView, antiFog,
  goggleCost, uvProtection, mirroredLens, lensMaterial,
  bestSwim, swimGoggles,
} from "../swim-goggle-calc.js";

describe("hydrodynamic", () => {
  it("racing low profile most hydrodynamic", () => {
    expect(hydrodynamic("racing_low_profile")).toBeGreaterThan(hydrodynamic("mask_style_snorkel"));
  });
});

describe("comfort", () => {
  it("training comfort seal most comfortable", () => {
    expect(comfort("training_comfort_seal")).toBeGreaterThan(comfort("racing_low_profile"));
  });
});

describe("fieldOfView", () => {
  it("open water wide lens widest field of view", () => {
    expect(fieldOfView("open_water_wide_lens")).toBeGreaterThan(fieldOfView("racing_low_profile"));
  });
});

describe("antiFog", () => {
  it("open water wide lens best anti fog", () => {
    expect(antiFog("open_water_wide_lens")).toBeGreaterThan(antiFog("mask_style_snorkel"));
  });
});

describe("goggleCost", () => {
  it("prescription corrective most expensive", () => {
    expect(goggleCost("prescription_corrective")).toBeGreaterThan(goggleCost("training_comfort_seal"));
  });
});

describe("uvProtection", () => {
  it("open water wide lens has uv protection", () => {
    expect(uvProtection("open_water_wide_lens")).toBe(true);
  });
  it("training comfort seal does not", () => {
    expect(uvProtection("training_comfort_seal")).toBe(false);
  });
});

describe("mirroredLens", () => {
  it("racing low profile has mirrored lens", () => {
    expect(mirroredLens("racing_low_profile")).toBe(true);
  });
  it("prescription corrective does not", () => {
    expect(mirroredLens("prescription_corrective")).toBe(false);
  });
});

describe("lensMaterial", () => {
  it("prescription corrective uses optical grade diopter lens", () => {
    expect(lensMaterial("prescription_corrective")).toBe("optical_grade_diopter_lens");
  });
});

describe("bestSwim", () => {
  it("open water wide lens best for triathlon ocean lake", () => {
    expect(bestSwim("open_water_wide_lens")).toBe("triathlon_ocean_lake");
  });
});

describe("swimGoggles", () => {
  it("returns 5 types", () => {
    expect(swimGoggles()).toHaveLength(5);
  });
});
