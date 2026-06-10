import { describe, it, expect } from "vitest";
import {
  accuracy, easeOfUse, oilFlexibility, batchScaling,
  calcCost, worksOffline, customRecipe, calcMethod,
  bestUser, lyeCalculators,
} from "../lye-calculator-calc.js";

describe("accuracy", () => {
  it("spreadsheet custom most accurate", () => {
    expect(accuracy("spreadsheet_custom")).toBeGreaterThan(accuracy("recipe_book_fixed"));
  });
});

describe("easeOfUse", () => {
  it("app mobile scan easiest to use", () => {
    expect(easeOfUse("app_mobile_scan")).toBeGreaterThan(easeOfUse("sap_table_manual"));
  });
});

describe("oilFlexibility", () => {
  it("online calc auto most oil flexibility", () => {
    expect(oilFlexibility("online_calc_auto")).toBeGreaterThan(oilFlexibility("recipe_book_fixed"));
  });
});

describe("batchScaling", () => {
  it("spreadsheet custom best batch scaling", () => {
    expect(batchScaling("spreadsheet_custom")).toBeGreaterThan(batchScaling("recipe_book_fixed"));
  });
});

describe("calcCost", () => {
  it("recipe book fixed more expensive than online calc", () => {
    expect(calcCost("recipe_book_fixed")).toBeGreaterThan(calcCost("online_calc_auto"));
  });
});

describe("worksOffline", () => {
  it("sap table manual works offline", () => {
    expect(worksOffline("sap_table_manual")).toBe(true);
  });
  it("online calc auto does not work offline", () => {
    expect(worksOffline("online_calc_auto")).toBe(false);
  });
});

describe("customRecipe", () => {
  it("spreadsheet custom supports custom recipe", () => {
    expect(customRecipe("spreadsheet_custom")).toBe(true);
  });
  it("recipe book fixed does not support custom recipe", () => {
    expect(customRecipe("recipe_book_fixed")).toBe(false);
  });
});

describe("calcMethod", () => {
  it("app mobile scan uses barcode scan lookup", () => {
    expect(calcMethod("app_mobile_scan")).toBe("barcode_scan_lookup");
  });
});

describe("bestUser", () => {
  it("online calc auto best for beginner first batch", () => {
    expect(bestUser("online_calc_auto")).toBe("beginner_first_batch");
  });
});

describe("lyeCalculators", () => {
  it("returns 5 types", () => {
    expect(lyeCalculators()).toHaveLength(5);
  });
});
