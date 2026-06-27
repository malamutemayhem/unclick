import { describe, it, expect } from "vitest";
import {
  sensitivity, throughput, depth, classification,
  inspCost, nonContact, forYield, method,
  bestUse, defectInspects,
} from "../defect-inspect-calc.js";

describe("sensitivity", () => {
  it("ebeam voltage contrast highest sensitivity", () => {
    expect(sensitivity("ebeam_voltage_contrast")).toBeGreaterThan(sensitivity("acoustic_micro_sam"));
  });
});

describe("throughput", () => {
  it("brightfield optical highest throughput", () => {
    expect(throughput("brightfield_optical")).toBeGreaterThan(throughput("xray_ct_3d"));
  });
});

describe("depth", () => {
  it("xray ct 3d deepest penetration", () => {
    expect(depth("xray_ct_3d")).toBeGreaterThan(depth("brightfield_optical"));
  });
});

describe("classification", () => {
  it("ebeam voltage contrast best classification", () => {
    expect(classification("ebeam_voltage_contrast")).toBeGreaterThan(classification("acoustic_micro_sam"));
  });
});

describe("inspCost", () => {
  it("xray ct 3d most expensive", () => {
    expect(inspCost("xray_ct_3d")).toBeGreaterThan(inspCost("acoustic_micro_sam"));
  });
});

describe("nonContact", () => {
  it("ebeam voltage contrast is non-contact", () => {
    expect(nonContact("ebeam_voltage_contrast")).toBe(true);
  });
  it("acoustic micro sam not non-contact", () => {
    expect(nonContact("acoustic_micro_sam")).toBe(false);
  });
});

describe("forYield", () => {
  it("darkfield laser for yield", () => {
    expect(forYield("darkfield_laser")).toBe(true);
  });
  it("xray ct 3d not for yield", () => {
    expect(forYield("xray_ct_3d")).toBe(false);
  });
});

describe("method", () => {
  it("ebeam voltage contrast uses secondary electron potential", () => {
    expect(method("ebeam_voltage_contrast")).toBe("secondary_electron_potential");
  });
});

describe("bestUse", () => {
  it("acoustic micro sam best for die attach delamination", () => {
    expect(bestUse("acoustic_micro_sam")).toBe("die_attach_delamination");
  });
});

describe("defectInspects", () => {
  it("returns 5 types", () => {
    expect(defectInspects()).toHaveLength(5);
  });
});
