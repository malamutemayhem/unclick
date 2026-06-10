import { describe, it, expect } from "vitest";
import {
  effectivenessRating, timeToRelief, sessionCost, longTermBenefit,
  patientCompliance, requiresClinician, deviceBased, mechanism,
  bestCandidate, tinnitusTherapies,
} from "../tinnitus-therapy-calc.js";

describe("effectivenessRating", () => {
  it("trt most effective", () => {
    expect(effectivenessRating("trt")).toBeGreaterThan(effectivenessRating("sound_masking"));
  });
});

describe("timeToRelief", () => {
  it("trt longest time to relief", () => {
    expect(timeToRelief("trt")).toBeGreaterThan(timeToRelief("sound_masking"));
  });
});

describe("sessionCost", () => {
  it("neuromodulation most expensive", () => {
    expect(sessionCost("neuromodulation")).toBeGreaterThan(sessionCost("sound_masking"));
  });
});

describe("longTermBenefit", () => {
  it("cbt best long term benefit", () => {
    expect(longTermBenefit("cbt")).toBeGreaterThan(longTermBenefit("sound_masking"));
  });
});

describe("patientCompliance", () => {
  it("sound masking highest compliance", () => {
    expect(patientCompliance("sound_masking")).toBeGreaterThan(patientCompliance("cbt"));
  });
});

describe("requiresClinician", () => {
  it("cbt requires clinician", () => {
    expect(requiresClinician("cbt")).toBe(true);
  });
  it("sound masking does not", () => {
    expect(requiresClinician("sound_masking")).toBe(false);
  });
});

describe("deviceBased", () => {
  it("neuromodulation is device based", () => {
    expect(deviceBased("neuromodulation")).toBe(true);
  });
  it("cbt is not", () => {
    expect(deviceBased("cbt")).toBe(false);
  });
});

describe("mechanism", () => {
  it("cbt uses cognitive restructuring exposure", () => {
    expect(mechanism("cbt")).toBe("cognitive_restructuring_exposure");
  });
});

describe("bestCandidate", () => {
  it("hearing aid amplification for tinnitus with hearing loss", () => {
    expect(bestCandidate("hearing_aid_amplification")).toBe("tinnitus_with_hearing_loss");
  });
});

describe("tinnitusTherapies", () => {
  it("returns 5 therapies", () => {
    expect(tinnitusTherapies()).toHaveLength(5);
  });
});
