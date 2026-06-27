import { describe, it, expect } from "vitest";
import {
  anestheticDepth, onsetSpeed, durationMinutes, patientAnxietyRelief,
  riskLevel, requiresMonitoring, selfAdministered, deliveryMethod,
  bestProcedure, dentalAnesthesias,
} from "../dental-anesthesia-calc.js";

describe("anestheticDepth", () => {
  it("iv sedation deepest anesthesia", () => {
    expect(anestheticDepth("iv_sedation")).toBeGreaterThan(anestheticDepth("topical"));
  });
});

describe("onsetSpeed", () => {
  it("nitrous oxide fastest onset", () => {
    expect(onsetSpeed("nitrous_oxide")).toBeGreaterThan(onsetSpeed("nerve_block"));
  });
});

describe("durationMinutes", () => {
  it("nerve block longest duration", () => {
    expect(durationMinutes("nerve_block")).toBeGreaterThan(durationMinutes("nitrous_oxide"));
  });
});

describe("patientAnxietyRelief", () => {
  it("iv sedation best anxiety relief", () => {
    expect(patientAnxietyRelief("iv_sedation")).toBeGreaterThan(patientAnxietyRelief("topical"));
  });
});

describe("riskLevel", () => {
  it("iv sedation highest risk", () => {
    expect(riskLevel("iv_sedation")).toBeGreaterThan(riskLevel("topical"));
  });
});

describe("requiresMonitoring", () => {
  it("iv sedation requires monitoring", () => {
    expect(requiresMonitoring("iv_sedation")).toBe(true);
  });
  it("local infiltration does not", () => {
    expect(requiresMonitoring("local_infiltration")).toBe(false);
  });
});

describe("selfAdministered", () => {
  it("topical is self administered", () => {
    expect(selfAdministered("topical")).toBe(true);
  });
  it("nerve block is not", () => {
    expect(selfAdministered("nerve_block")).toBe(false);
  });
});

describe("deliveryMethod", () => {
  it("nitrous oxide uses nasal mask inhalation", () => {
    expect(deliveryMethod("nitrous_oxide")).toBe("nasal_mask_inhalation");
  });
});

describe("bestProcedure", () => {
  it("nerve block for molar extraction root canal", () => {
    expect(bestProcedure("nerve_block")).toBe("molar_extraction_root_canal");
  });
});

describe("dentalAnesthesias", () => {
  it("returns 5 types", () => {
    expect(dentalAnesthesias()).toHaveLength(5);
  });
});
