import { describe, it, expect } from "vitest";
import {
  protection, containment, ergonomics, energy,
  bscCost, productProtect, forBsl3, airflow,
  bestUse, biosafetyCabinetTypes,
} from "../biosafety-cabinet-calc.js";

describe("protection", () => {
  it("class iii most protection", () => {
    expect(protection("class_iii_glove_box")).toBeGreaterThan(protection("laminar_flow_clean_bench"));
  });
});

describe("containment", () => {
  it("class iii best containment", () => {
    expect(containment("class_iii_glove_box")).toBeGreaterThan(containment("laminar_flow_clean_bench"));
  });
});

describe("ergonomics", () => {
  it("laminar flow best ergonomics", () => {
    expect(ergonomics("laminar_flow_clean_bench")).toBeGreaterThan(ergonomics("class_iii_glove_box"));
  });
});

describe("energy", () => {
  it("laminar flow best energy", () => {
    expect(energy("laminar_flow_clean_bench")).toBeGreaterThan(energy("class_ii_b2_total_exhaust"));
  });
});

describe("bscCost", () => {
  it("class iii most expensive", () => {
    expect(bscCost("class_iii_glove_box")).toBeGreaterThan(bscCost("laminar_flow_clean_bench"));
  });
});

describe("productProtect", () => {
  it("class ii a2 protects product", () => {
    expect(productProtect("class_ii_a2_recirculate")).toBe(true);
  });
  it("class i no product protect", () => {
    expect(productProtect("class_i_open_front")).toBe(false);
  });
});

describe("forBsl3", () => {
  it("class ii b2 for bsl3", () => {
    expect(forBsl3("class_ii_b2_total_exhaust")).toBe(true);
  });
  it("laminar flow not bsl3", () => {
    expect(forBsl3("laminar_flow_clean_bench")).toBe(false);
  });
});

describe("airflow", () => {
  it("class iii uses sealed glove port", () => {
    expect(airflow("class_iii_glove_box")).toBe("sealed_glove_port_hepa_both");
  });
});

describe("bestUse", () => {
  it("laminar for sterile prep", () => {
    expect(bestUse("laminar_flow_clean_bench")).toBe("sterile_prep_non_hazardous");
  });
});

describe("biosafetyCabinetTypes", () => {
  it("returns 5 types", () => {
    expect(biosafetyCabinetTypes()).toHaveLength(5);
  });
});
