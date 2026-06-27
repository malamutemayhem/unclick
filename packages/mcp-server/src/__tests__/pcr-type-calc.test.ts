import { describe, it, expect } from "vitest";
import {
  sensitivity, quantification, speed, multiplexing,
  pcCost, absolute, forDiagnostic, detection,
  bestUse, pcrTypes,
} from "../pcr-type-calc.js";

describe("sensitivity", () => {
  it("digital droplet most sensitive", () => {
    expect(sensitivity("digital_droplet_ddpcr")).toBeGreaterThan(sensitivity("conventional_endpoint"));
  });
});

describe("quantification", () => {
  it("digital droplet best quantification", () => {
    expect(quantification("digital_droplet_ddpcr")).toBeGreaterThan(quantification("conventional_endpoint"));
  });
});

describe("speed", () => {
  it("isothermal lamp fastest", () => {
    expect(speed("isothermal_lamp_loop")).toBeGreaterThan(speed("conventional_endpoint"));
  });
});

describe("multiplexing", () => {
  it("realtime qpcr best multiplexing", () => {
    expect(multiplexing("realtime_qpcr_probe")).toBeGreaterThan(multiplexing("isothermal_lamp_loop"));
  });
});

describe("pcCost", () => {
  it("digital droplet most expensive", () => {
    expect(pcCost("digital_droplet_ddpcr")).toBeGreaterThan(pcCost("conventional_endpoint"));
  });
});

describe("absolute", () => {
  it("digital droplet is absolute", () => {
    expect(absolute("digital_droplet_ddpcr")).toBe(true);
  });
  it("realtime qpcr not absolute", () => {
    expect(absolute("realtime_qpcr_probe")).toBe(false);
  });
});

describe("forDiagnostic", () => {
  it("realtime qpcr for diagnostic", () => {
    expect(forDiagnostic("realtime_qpcr_probe")).toBe(true);
  });
  it("conventional not for diagnostic", () => {
    expect(forDiagnostic("conventional_endpoint")).toBe(false);
  });
});

describe("detection", () => {
  it("isothermal uses turbidity or calcein visual", () => {
    expect(detection("isothermal_lamp_loop")).toBe("turbidity_or_calcein_visual");
  });
});

describe("bestUse", () => {
  it("digital droplet best for rare mutation liquid biopsy", () => {
    expect(bestUse("digital_droplet_ddpcr")).toBe("rare_mutation_liquid_biopsy");
  });
});

describe("pcrTypes", () => {
  it("returns 5 types", () => {
    expect(pcrTypes()).toHaveLength(5);
  });
});
