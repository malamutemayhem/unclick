import { describe, it, expect } from "vitest";
import {
  heatSpeed, tempControl, heatRetention, pourPrecision,
  kettleCost, autoShutoff, keepWarm, bodyMaterial,
  bestBrew, teaKettles,
} from "../tea-kettle-calc.js";

describe("heatSpeed", () => {
  it("electric variable fastest heat", () => {
    expect(heatSpeed("electric_variable")).toBeGreaterThan(heatSpeed("cast_iron_tetsubin"));
  });
});

describe("tempControl", () => {
  it("electric variable best temp control", () => {
    expect(tempControl("electric_variable")).toBeGreaterThan(tempControl("stovetop_whistle"));
  });
});

describe("heatRetention", () => {
  it("cast iron tetsubin best heat retention", () => {
    expect(heatRetention("cast_iron_tetsubin")).toBeGreaterThan(heatRetention("glass_infuser"));
  });
});

describe("pourPrecision", () => {
  it("gooseneck pour most precise pour", () => {
    expect(pourPrecision("gooseneck_pour")).toBeGreaterThan(pourPrecision("stovetop_whistle"));
  });
});

describe("kettleCost", () => {
  it("cast iron tetsubin most expensive", () => {
    expect(kettleCost("cast_iron_tetsubin")).toBeGreaterThan(kettleCost("stovetop_whistle"));
  });
});

describe("autoShutoff", () => {
  it("electric variable has auto shutoff", () => {
    expect(autoShutoff("electric_variable")).toBe(true);
  });
  it("stovetop whistle does not", () => {
    expect(autoShutoff("stovetop_whistle")).toBe(false);
  });
});

describe("keepWarm", () => {
  it("electric variable has keep warm", () => {
    expect(keepWarm("electric_variable")).toBe(true);
  });
  it("glass infuser does not", () => {
    expect(keepWarm("glass_infuser")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("cast iron tetsubin uses enameled cast iron heavy", () => {
    expect(bodyMaterial("cast_iron_tetsubin")).toBe("enameled_cast_iron_heavy");
  });
});

describe("bestBrew", () => {
  it("gooseneck pour for pour over coffee tea", () => {
    expect(bestBrew("gooseneck_pour")).toBe("pour_over_coffee_tea");
  });
});

describe("teaKettles", () => {
  it("returns 5 types", () => {
    expect(teaKettles()).toHaveLength(5);
  });
});
