import { describe, it, expect } from "vitest";
import {
  diagnosticDetail, radiationDose, fieldOfView, acquisitionSpeed,
  equipmentCost, provides3D, intraoral, sensorType,
  bestDiagnosis, dentalImagings,
} from "../dental-imaging-calc.js";

describe("diagnosticDetail", () => {
  it("cbct highest diagnostic detail", () => {
    expect(diagnosticDetail("cbct")).toBeGreaterThan(diagnosticDetail("panoramic"));
  });
});

describe("radiationDose", () => {
  it("cbct highest radiation dose", () => {
    expect(radiationDose("cbct")).toBeGreaterThan(radiationDose("periapical"));
  });
});

describe("fieldOfView", () => {
  it("cbct widest field of view", () => {
    expect(fieldOfView("cbct")).toBeGreaterThan(fieldOfView("periapical"));
  });
});

describe("acquisitionSpeed", () => {
  it("periapical fastest acquisition", () => {
    expect(acquisitionSpeed("periapical")).toBeGreaterThan(acquisitionSpeed("cbct"));
  });
});

describe("equipmentCost", () => {
  it("cbct most expensive equipment", () => {
    expect(equipmentCost("cbct")).toBeGreaterThan(equipmentCost("periapical"));
  });
});

describe("provides3D", () => {
  it("cbct provides 3D", () => {
    expect(provides3D("cbct")).toBe(true);
  });
  it("panoramic does not", () => {
    expect(provides3D("panoramic")).toBe(false);
  });
});

describe("intraoral", () => {
  it("periapical is intraoral", () => {
    expect(intraoral("periapical")).toBe(true);
  });
  it("panoramic is not", () => {
    expect(intraoral("panoramic")).toBe(false);
  });
});

describe("sensorType", () => {
  it("cbct uses flat panel cone beam", () => {
    expect(sensorType("cbct")).toBe("flat_panel_cone_beam");
  });
});

describe("bestDiagnosis", () => {
  it("bitewing for interproximal caries", () => {
    expect(bestDiagnosis("bitewing")).toBe("interproximal_caries_detection");
  });
});

describe("dentalImagings", () => {
  it("returns 5 imaging types", () => {
    expect(dentalImagings()).toHaveLength(5);
  });
});
