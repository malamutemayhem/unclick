import { describe, it, expect } from "vitest";
import {
  resolution, sensitivity, range, portability,
  tiCost, cooled, forPredictive, detector,
  bestUse, thermalImagTypes,
} from "../thermal-imag-calc.js";

describe("resolution", () => {
  it("cooled MWIR highest resolution", () => {
    expect(resolution("cooled_mwir_research")).toBeGreaterThan(resolution("ot_fever_screening"));
  });
});

describe("sensitivity", () => {
  it("cooled MWIR most sensitive", () => {
    expect(sensitivity("cooled_mwir_research")).toBeGreaterThan(sensitivity("handheld_spot_survey"));
  });
});

describe("range", () => {
  it("drone aerial longest range", () => {
    expect(range("drone_aerial_survey")).toBeGreaterThan(range("ot_fever_screening"));
  });
});

describe("portability", () => {
  it("handheld most portable", () => {
    expect(portability("handheld_spot_survey")).toBeGreaterThan(portability("fixed_mount_continuous"));
  });
});

describe("tiCost", () => {
  it("cooled MWIR most expensive", () => {
    expect(tiCost("cooled_mwir_research")).toBeGreaterThan(tiCost("ot_fever_screening"));
  });
});

describe("cooled", () => {
  it("cooled MWIR is cooled", () => {
    expect(cooled("cooled_mwir_research")).toBe(true);
  });
  it("handheld not cooled", () => {
    expect(cooled("handheld_spot_survey")).toBe(false);
  });
});

describe("forPredictive", () => {
  it("handheld for predictive maintenance", () => {
    expect(forPredictive("handheld_spot_survey")).toBe(true);
  });
  it("drone not for predictive", () => {
    expect(forPredictive("drone_aerial_survey")).toBe(false);
  });
});

describe("detector", () => {
  it("cooled MWIR uses InSb Stirling cooled", () => {
    expect(detector("cooled_mwir_research")).toBe("insb_mwir_stirling_cooled");
  });
});

describe("bestUse", () => {
  it("fixed mount for kiln furnace hot spot", () => {
    expect(bestUse("fixed_mount_continuous")).toBe("kiln_furnace_conveyor_hot_spot");
  });
});

describe("thermalImagTypes", () => {
  it("returns 5 types", () => {
    expect(thermalImagTypes()).toHaveLength(5);
  });
});
