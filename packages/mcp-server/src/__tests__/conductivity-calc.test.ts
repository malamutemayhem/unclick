import { describe, it, expect } from "vitest";
import {
  accuracy, range, foulingResist, maintenance,
  ccCost, nonContact, forPharma, cell,
  bestUse, conductivityTypes,
} from "../conductivity-calc.js";

describe("accuracy", () => {
  it("four-electrode most accurate", () => {
    expect(accuracy("contacting_four_electrode")).toBeGreaterThan(accuracy("electrodeless_capacitive"));
  });
});

describe("range", () => {
  it("inductive toroidal widest range", () => {
    expect(range("inductive_toroidal")).toBeGreaterThan(range("usp_pharmaceutical"));
  });
});

describe("foulingResist", () => {
  it("inductive toroidal best fouling resistance", () => {
    expect(foulingResist("inductive_toroidal")).toBeGreaterThan(foulingResist("contacting_two_electrode"));
  });
});

describe("maintenance", () => {
  it("inductive toroidal lowest maintenance", () => {
    expect(maintenance("inductive_toroidal")).toBeGreaterThan(maintenance("contacting_two_electrode"));
  });
});

describe("ccCost", () => {
  it("USP pharmaceutical most expensive", () => {
    expect(ccCost("usp_pharmaceutical")).toBeGreaterThan(ccCost("contacting_two_electrode"));
  });
});

describe("nonContact", () => {
  it("inductive toroidal is non-contact", () => {
    expect(nonContact("inductive_toroidal")).toBe(true);
  });
  it("two-electrode not non-contact", () => {
    expect(nonContact("contacting_two_electrode")).toBe(false);
  });
});

describe("forPharma", () => {
  it("USP pharmaceutical for pharma", () => {
    expect(forPharma("usp_pharmaceutical")).toBe(true);
  });
  it("inductive toroidal not for pharma", () => {
    expect(forPharma("inductive_toroidal")).toBe(false);
  });
});

describe("cell", () => {
  it("inductive toroidal uses dual toroid coil", () => {
    expect(cell("inductive_toroidal")).toBe("dual_toroid_coil_non_contacting");
  });
});

describe("bestUse", () => {
  it("USP for WFI purified water", () => {
    expect(bestUse("usp_pharmaceutical")).toBe("wfi_purified_water_usp_comply");
  });
});

describe("conductivityTypes", () => {
  it("returns 5 types", () => {
    expect(conductivityTypes()).toHaveLength(5);
  });
});
