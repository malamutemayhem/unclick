import { describe, it, expect } from "vitest";
import {
  heatOutput, tempControl, precision, safetyLevel,
  heatCost, handheld, adjustableTemp, heatMethod,
  bestProject, heatTools,
} from "../heat-tool-calc.js";

describe("heatOutput", () => {
  it("heat press flat highest heat output", () => {
    expect(heatOutput("heat_press_flat")).toBeGreaterThan(heatOutput("sealing_wax_spoon"));
  });
});

describe("tempControl", () => {
  it("wood burn pen best temp control", () => {
    expect(tempControl("wood_burn_pen")).toBeGreaterThan(tempControl("sealing_wax_spoon"));
  });
});

describe("precision", () => {
  it("wood burn pen most precise", () => {
    expect(precision("wood_burn_pen")).toBeGreaterThan(precision("heat_press_flat"));
  });
});

describe("safetyLevel", () => {
  it("craft iron mini safest", () => {
    expect(safetyLevel("craft_iron_mini")).toBeGreaterThan(safetyLevel("wood_burn_pen"));
  });
});

describe("heatCost", () => {
  it("heat press flat most expensive", () => {
    expect(heatCost("heat_press_flat")).toBeGreaterThan(heatCost("sealing_wax_spoon"));
  });
});

describe("handheld", () => {
  it("emboss heat gun is handheld", () => {
    expect(handheld("emboss_heat_gun")).toBe(true);
  });
  it("heat press flat is not handheld", () => {
    expect(handheld("heat_press_flat")).toBe(false);
  });
});

describe("adjustableTemp", () => {
  it("wood burn pen has adjustable temp", () => {
    expect(adjustableTemp("wood_burn_pen")).toBe(true);
  });
  it("craft iron mini does not have adjustable temp", () => {
    expect(adjustableTemp("craft_iron_mini")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("sealing wax spoon uses flame heated bowl", () => {
    expect(heatMethod("sealing_wax_spoon")).toBe("flame_heated_bowl");
  });
});

describe("bestProject", () => {
  it("wood burn pen best for pyrography design", () => {
    expect(bestProject("wood_burn_pen")).toBe("pyrography_design");
  });
});

describe("heatTools", () => {
  it("returns 5 types", () => {
    expect(heatTools()).toHaveLength(5);
  });
});
