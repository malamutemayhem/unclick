import { describe, it, expect } from "vitest";
import {
  loadContainment, filmUsageEfficiency, applicationSpeed, corrosionProtection,
  costPerLoad, requiresMachine, uvProtection, filmComposition,
  bestApplication, stretchWraps,
} from "../stretch-wrap-calc.js";

describe("loadContainment", () => {
  it("machine wrap best containment", () => {
    expect(loadContainment("machine_wrap")).toBeGreaterThan(loadContainment("hand_wrap"));
  });
});

describe("filmUsageEfficiency", () => {
  it("pre stretch most film efficient", () => {
    expect(filmUsageEfficiency("pre_stretch")).toBeGreaterThan(filmUsageEfficiency("hand_wrap"));
  });
});

describe("applicationSpeed", () => {
  it("machine wrap fastest application", () => {
    expect(applicationSpeed("machine_wrap")).toBeGreaterThan(applicationSpeed("hand_wrap"));
  });
});

describe("corrosionProtection", () => {
  it("vci film best corrosion protection", () => {
    expect(corrosionProtection("vci_film")).toBeGreaterThan(corrosionProtection("hand_wrap"));
  });
});

describe("costPerLoad", () => {
  it("vci film most expensive per load", () => {
    expect(costPerLoad("vci_film")).toBeGreaterThan(costPerLoad("machine_wrap"));
  });
});

describe("requiresMachine", () => {
  it("machine wrap requires machine", () => {
    expect(requiresMachine("machine_wrap")).toBe(true);
  });
  it("hand wrap does not", () => {
    expect(requiresMachine("hand_wrap")).toBe(false);
  });
});

describe("uvProtection", () => {
  it("vci film has uv protection", () => {
    expect(uvProtection("vci_film")).toBe(true);
  });
  it("hand wrap does not", () => {
    expect(uvProtection("hand_wrap")).toBe(false);
  });
});

describe("filmComposition", () => {
  it("pre stretch uses oriented lldpe", () => {
    expect(filmComposition("pre_stretch")).toBe("oriented_lldpe_reduced_gauge");
  });
});

describe("bestApplication", () => {
  it("vci film for metal parts rust prevention", () => {
    expect(bestApplication("vci_film")).toBe("metal_parts_rust_prevention");
  });
});

describe("stretchWraps", () => {
  it("returns 5 types", () => {
    expect(stretchWraps()).toHaveLength(5);
  });
});
