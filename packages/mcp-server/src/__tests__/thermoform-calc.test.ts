import { describe, it, expect } from "vitest";
import {
  detail, speed, depth, wallControl,
  tfCost, hollow, forPackaging, method,
  bestUse, thermoformTypes,
} from "../thermoform-calc.js";

describe("detail", () => {
  it("pressure form best detail", () => {
    expect(detail("pressure_form_detail")).toBeGreaterThan(detail("vacuum_form_single"));
  });
});

describe("speed", () => {
  it("inline trim fastest", () => {
    expect(speed("inline_trim_form_cut")).toBeGreaterThan(speed("twin_sheet_hollow"));
  });
});

describe("depth", () => {
  it("plug assist deepest draw", () => {
    expect(depth("plug_assist_deep_draw")).toBeGreaterThan(depth("vacuum_form_single"));
  });
});

describe("wallControl", () => {
  it("plug assist best wall control", () => {
    expect(wallControl("plug_assist_deep_draw")).toBeGreaterThan(wallControl("vacuum_form_single"));
  });
});

describe("tfCost", () => {
  it("twin sheet most expensive", () => {
    expect(tfCost("twin_sheet_hollow")).toBeGreaterThan(tfCost("vacuum_form_single"));
  });
});

describe("hollow", () => {
  it("twin sheet is hollow", () => {
    expect(hollow("twin_sheet_hollow")).toBe(true);
  });
  it("vacuum form not hollow", () => {
    expect(hollow("vacuum_form_single")).toBe(false);
  });
});

describe("forPackaging", () => {
  it("vacuum form for packaging", () => {
    expect(forPackaging("vacuum_form_single")).toBe(true);
  });
  it("twin sheet not for packaging", () => {
    expect(forPackaging("twin_sheet_hollow")).toBe(false);
  });
});

describe("method", () => {
  it("plug assist uses pre-stretch", () => {
    expect(method("plug_assist_deep_draw")).toBe("plug_pre_stretch_deep_cavity");
  });
});

describe("bestUse", () => {
  it("inline trim for food tray high volume", () => {
    expect(bestUse("inline_trim_form_cut")).toBe("food_tray_lid_high_volume_line");
  });
});

describe("thermoformTypes", () => {
  it("returns 5 types", () => {
    expect(thermoformTypes()).toHaveLength(5);
  });
});
