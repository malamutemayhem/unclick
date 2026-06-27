import { describe, it, expect } from "vitest";
import {
  contactForce, pitch, lifetime, frequency,
  probeCost, finePitch, forRf, mechanism,
  bestUse, waferProbes,
} from "../wafer-probe-calc.js";

describe("contactForce", () => {
  it("vertical mems highest contact force", () => {
    expect(contactForce("vertical_mems")).toBeGreaterThan(contactForce("membrane_film"));
  });
});

describe("pitch", () => {
  it("vertical mems finest pitch", () => {
    expect(pitch("vertical_mems")).toBeGreaterThan(pitch("cantilever_epoxy"));
  });
});

describe("lifetime", () => {
  it("rf coaxial probe longest lifetime", () => {
    expect(lifetime("rf_coaxial_probe")).toBeGreaterThan(lifetime("membrane_film"));
  });
});

describe("frequency", () => {
  it("rf coaxial probe highest frequency", () => {
    expect(frequency("rf_coaxial_probe")).toBeGreaterThan(frequency("cantilever_epoxy"));
  });
});

describe("probeCost", () => {
  it("rf coaxial probe most expensive", () => {
    expect(probeCost("rf_coaxial_probe")).toBeGreaterThan(probeCost("cantilever_epoxy"));
  });
});

describe("finePitch", () => {
  it("vertical mems is fine pitch", () => {
    expect(finePitch("vertical_mems")).toBe(true);
  });
  it("cantilever epoxy not fine pitch", () => {
    expect(finePitch("cantilever_epoxy")).toBe(false);
  });
});

describe("forRf", () => {
  it("rf coaxial probe is for rf", () => {
    expect(forRf("rf_coaxial_probe")).toBe(true);
  });
  it("vertical mems not for rf", () => {
    expect(forRf("vertical_mems")).toBe(false);
  });
});

describe("mechanism", () => {
  it("cobra buckling uses buckling beam array", () => {
    expect(mechanism("cobra_buckling")).toBe("buckling_beam_array");
  });
});

describe("bestUse", () => {
  it("vertical mems best for advanced node hvm", () => {
    expect(bestUse("vertical_mems")).toBe("advanced_node_hvm");
  });
});

describe("waferProbes", () => {
  it("returns 5 types", () => {
    expect(waferProbes()).toHaveLength(5);
  });
});
