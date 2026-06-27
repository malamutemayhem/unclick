import { describe, it, expect } from "vitest";
import {
  onsetTimeMinutes, durationHours, riskLevel,
  monitoringLevel, recoveryTimeHours, patientConscious,
  requiresIntubation, administrationRoute, commonProcedure, anesthesiaTypes,
} from "../anesthesia-type-calc.js";

describe("onsetTimeMinutes", () => {
  it("regional slowest onset", () => {
    expect(onsetTimeMinutes("regional")).toBeGreaterThan(
      onsetTimeMinutes("local")
    );
  });
});

describe("durationHours", () => {
  it("general longest duration", () => {
    expect(durationHours("general")).toBeGreaterThan(
      durationHours("local")
    );
  });
});

describe("riskLevel", () => {
  it("general highest risk", () => {
    expect(riskLevel("general")).toBeGreaterThan(
      riskLevel("local")
    );
  });
});

describe("monitoringLevel", () => {
  it("general needs most monitoring", () => {
    expect(monitoringLevel("general")).toBeGreaterThan(
      monitoringLevel("local")
    );
  });
});

describe("recoveryTimeHours", () => {
  it("general longest recovery", () => {
    expect(recoveryTimeHours("general")).toBeGreaterThan(
      recoveryTimeHours("sedation")
    );
  });
});

describe("patientConscious", () => {
  it("local patient is conscious", () => {
    expect(patientConscious("local")).toBe(true);
  });
  it("general patient is not", () => {
    expect(patientConscious("general")).toBe(false);
  });
});

describe("requiresIntubation", () => {
  it("general requires intubation", () => {
    expect(requiresIntubation("general")).toBe(true);
  });
  it("spinal does not", () => {
    expect(requiresIntubation("spinal")).toBe(false);
  });
});

describe("administrationRoute", () => {
  it("spinal via lumbar injection", () => {
    expect(administrationRoute("spinal")).toBe("lumbar_injection");
  });
});

describe("commonProcedure", () => {
  it("spinal for cesarean section", () => {
    expect(commonProcedure("spinal")).toBe("cesarean_section");
  });
});

describe("anesthesiaTypes", () => {
  it("returns 5 types", () => {
    expect(anesthesiaTypes()).toHaveLength(5);
  });
});
