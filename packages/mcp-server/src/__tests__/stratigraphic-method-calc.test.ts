import { describe, it, expect } from "vitest";
import {
  temporalResolution, globalCorrelation, equipmentCost, fieldAccessibility,
  labWorkRequired, requiresFossils, applicableToIgneous, primaryDataType,
  bestApplication, stratigraphicMethods,
} from "../stratigraphic-method-calc.js";

describe("temporalResolution", () => {
  it("chemostratigraphy best temporal resolution", () => {
    expect(temporalResolution("chemostratigraphy")).toBeGreaterThan(temporalResolution("lithostratigraphy"));
  });
});

describe("globalCorrelation", () => {
  it("magnetostratigraphy best global correlation", () => {
    expect(globalCorrelation("magnetostratigraphy")).toBeGreaterThan(globalCorrelation("lithostratigraphy"));
  });
});

describe("equipmentCost", () => {
  it("chemostratigraphy most expensive equipment", () => {
    expect(equipmentCost("chemostratigraphy")).toBeGreaterThan(equipmentCost("lithostratigraphy"));
  });
});

describe("fieldAccessibility", () => {
  it("lithostratigraphy most field accessible", () => {
    expect(fieldAccessibility("lithostratigraphy")).toBeGreaterThan(fieldAccessibility("chemostratigraphy"));
  });
});

describe("labWorkRequired", () => {
  it("chemostratigraphy most lab work", () => {
    expect(labWorkRequired("chemostratigraphy")).toBeGreaterThan(labWorkRequired("lithostratigraphy"));
  });
});

describe("requiresFossils", () => {
  it("biostratigraphy requires fossils", () => {
    expect(requiresFossils("biostratigraphy")).toBe(true);
  });
  it("magnetostratigraphy does not", () => {
    expect(requiresFossils("magnetostratigraphy")).toBe(false);
  });
});

describe("applicableToIgneous", () => {
  it("magnetostratigraphy applicable to igneous", () => {
    expect(applicableToIgneous("magnetostratigraphy")).toBe(true);
  });
  it("biostratigraphy is not", () => {
    expect(applicableToIgneous("biostratigraphy")).toBe(false);
  });
});

describe("primaryDataType", () => {
  it("magnetostratigraphy uses paleomagnetic polarity", () => {
    expect(primaryDataType("magnetostratigraphy")).toBe("paleomagnetic_polarity");
  });
});

describe("bestApplication", () => {
  it("sequence stratigraphy for petroleum exploration", () => {
    expect(bestApplication("sequence_stratigraphy")).toBe("petroleum_exploration");
  });
});

describe("stratigraphicMethods", () => {
  it("returns 5 methods", () => {
    expect(stratigraphicMethods()).toHaveLength(5);
  });
});
