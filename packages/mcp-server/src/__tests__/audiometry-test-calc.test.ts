import { describe, it, expect } from "vitest";
import {
  diagnosticAccuracy, testDuration, patientCooperation, equipmentCost,
  frequencyRange, requiresSoundBooth, suitableForInfants, stimulusType,
  bestDiagnosis, audiometryTests,
} from "../audiometry-test-calc.js";

describe("diagnosticAccuracy", () => {
  it("auditory brainstem most accurate", () => {
    expect(diagnosticAccuracy("auditory_brainstem")).toBeGreaterThan(diagnosticAccuracy("speech"));
  });
});

describe("testDuration", () => {
  it("auditory brainstem longest duration", () => {
    expect(testDuration("auditory_brainstem")).toBeGreaterThan(testDuration("tympanometry"));
  });
});

describe("patientCooperation", () => {
  it("speech test needs most cooperation", () => {
    expect(patientCooperation("speech")).toBeGreaterThan(patientCooperation("auditory_brainstem"));
  });
});

describe("equipmentCost", () => {
  it("auditory brainstem most expensive equipment", () => {
    expect(equipmentCost("auditory_brainstem")).toBeGreaterThan(equipmentCost("speech"));
  });
});

describe("frequencyRange", () => {
  it("pure tone widest frequency range", () => {
    expect(frequencyRange("pure_tone")).toBeGreaterThan(frequencyRange("tympanometry"));
  });
});

describe("requiresSoundBooth", () => {
  it("pure tone requires sound booth", () => {
    expect(requiresSoundBooth("pure_tone")).toBe(true);
  });
  it("tympanometry does not", () => {
    expect(requiresSoundBooth("tympanometry")).toBe(false);
  });
});

describe("suitableForInfants", () => {
  it("otoacoustic emission suitable for infants", () => {
    expect(suitableForInfants("otoacoustic_emission")).toBe(true);
  });
  it("pure tone is not", () => {
    expect(suitableForInfants("pure_tone")).toBe(false);
  });
});

describe("stimulusType", () => {
  it("tympanometry uses air pressure probe tone", () => {
    expect(stimulusType("tympanometry")).toBe("air_pressure_probe_tone");
  });
});

describe("bestDiagnosis", () => {
  it("otoacoustic emission for outer hair cell health", () => {
    expect(bestDiagnosis("otoacoustic_emission")).toBe("outer_hair_cell_health");
  });
});

describe("audiometryTests", () => {
  it("returns 5 tests", () => {
    expect(audiometryTests()).toHaveLength(5);
  });
});
