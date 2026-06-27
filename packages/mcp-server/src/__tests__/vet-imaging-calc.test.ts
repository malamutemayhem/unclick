import { describe, it, expect } from "vitest";
import {
  diagnosticDetail, acquisitionSpeed, softTissueContrast, boneDetail,
  equipmentCost, requiresSedation, realTimeViewing, imagingPhysics,
  bestDiagnosis, vetImagings,
} from "../vet-imaging-calc.js";

describe("diagnosticDetail", () => {
  it("mri highest diagnostic detail", () => {
    expect(diagnosticDetail("mri")).toBeGreaterThan(diagnosticDetail("radiograph"));
  });
});

describe("acquisitionSpeed", () => {
  it("radiograph fastest acquisition", () => {
    expect(acquisitionSpeed("radiograph")).toBeGreaterThan(acquisitionSpeed("mri"));
  });
});

describe("softTissueContrast", () => {
  it("mri best soft tissue contrast", () => {
    expect(softTissueContrast("mri")).toBeGreaterThan(softTissueContrast("radiograph"));
  });
});

describe("boneDetail", () => {
  it("ct scan best bone detail", () => {
    expect(boneDetail("ct_scan")).toBeGreaterThan(boneDetail("ultrasound"));
  });
});

describe("equipmentCost", () => {
  it("mri most expensive equipment", () => {
    expect(equipmentCost("mri")).toBeGreaterThan(equipmentCost("radiograph"));
  });
});

describe("requiresSedation", () => {
  it("mri requires sedation", () => {
    expect(requiresSedation("mri")).toBe(true);
  });
  it("ultrasound does not", () => {
    expect(requiresSedation("ultrasound")).toBe(false);
  });
});

describe("realTimeViewing", () => {
  it("ultrasound has real time viewing", () => {
    expect(realTimeViewing("ultrasound")).toBe(true);
  });
  it("radiograph does not", () => {
    expect(realTimeViewing("radiograph")).toBe(false);
  });
});

describe("imagingPhysics", () => {
  it("mri uses magnetic field radio pulse", () => {
    expect(imagingPhysics("mri")).toBe("magnetic_field_radio_pulse");
  });
});

describe("bestDiagnosis", () => {
  it("ultrasound for pregnancy cardiac abdominal", () => {
    expect(bestDiagnosis("ultrasound")).toBe("pregnancy_cardiac_abdominal");
  });
});

describe("vetImagings", () => {
  it("returns 5 imaging types", () => {
    expect(vetImagings()).toHaveLength(5);
  });
});
