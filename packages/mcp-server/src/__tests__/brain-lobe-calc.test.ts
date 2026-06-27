import { describe, it, expect } from "vitest";
import {
  volumePercent, corticalThicknessMm, bloodFlowPercent,
  injuryVulnerability, maturationAge, involvedInLanguage,
  motorControl, primaryFunction, associatedDisorder, brainLobes,
} from "../brain-lobe-calc.js";

describe("volumePercent", () => {
  it("frontal is largest", () => {
    expect(volumePercent("frontal")).toBeGreaterThan(
      volumePercent("occipital")
    );
  });
});

describe("corticalThicknessMm", () => {
  it("frontal is thickest", () => {
    expect(corticalThicknessMm("frontal")).toBeGreaterThan(
      corticalThicknessMm("cerebellar")
    );
  });
});

describe("bloodFlowPercent", () => {
  it("frontal gets most blood flow", () => {
    expect(bloodFlowPercent("frontal")).toBeGreaterThan(
      bloodFlowPercent("occipital")
    );
  });
});

describe("injuryVulnerability", () => {
  it("frontal most vulnerable", () => {
    expect(injuryVulnerability("frontal")).toBeGreaterThan(
      injuryVulnerability("cerebellar")
    );
  });
});

describe("maturationAge", () => {
  it("frontal matures last", () => {
    expect(maturationAge("frontal")).toBeGreaterThan(
      maturationAge("occipital")
    );
  });
});

describe("involvedInLanguage", () => {
  it("temporal involved in language", () => {
    expect(involvedInLanguage("temporal")).toBe(true);
  });
  it("occipital is not", () => {
    expect(involvedInLanguage("occipital")).toBe(false);
  });
});

describe("motorControl", () => {
  it("frontal has motor control", () => {
    expect(motorControl("frontal")).toBe(true);
  });
  it("temporal does not", () => {
    expect(motorControl("temporal")).toBe(false);
  });
});

describe("primaryFunction", () => {
  it("occipital for vision", () => {
    expect(primaryFunction("occipital")).toBe("vision");
  });
});

describe("associatedDisorder", () => {
  it("cerebellar linked to ataxia", () => {
    expect(associatedDisorder("cerebellar")).toBe("ataxia");
  });
});

describe("brainLobes", () => {
  it("returns 5 lobes", () => {
    expect(brainLobes()).toHaveLength(5);
  });
});
