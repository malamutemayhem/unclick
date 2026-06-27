import { describe, it, expect } from "vitest";
import {
  impactProtect, ventilation, weatherProtect, comfort,
  hatCost, electricalRated, faceShieldCompat, shellMaterial,
  bestSite, hardHats,
} from "../hard-hat-calc.js";

describe("impactProtect", () => {
  it("type 2 lateral protect best impact protection", () => {
    expect(impactProtect("type_2_lateral_protect")).toBeGreaterThan(impactProtect("vented_cool_indoor"));
  });
});

describe("ventilation", () => {
  it("vented cool indoor best ventilation", () => {
    expect(ventilation("vented_cool_indoor")).toBeGreaterThan(ventilation("type_2_lateral_protect"));
  });
});

describe("weatherProtect", () => {
  it("full brim sun rain best weather protection", () => {
    expect(weatherProtect("full_brim_sun_rain")).toBeGreaterThan(weatherProtect("vented_cool_indoor"));
  });
});

describe("comfort", () => {
  it("cap style low profile most comfortable", () => {
    expect(comfort("cap_style_low_profile")).toBeGreaterThan(comfort("type_2_lateral_protect"));
  });
});

describe("hatCost", () => {
  it("type 2 lateral protect most expensive", () => {
    expect(hatCost("type_2_lateral_protect")).toBeGreaterThan(hatCost("type_1_top_impact"));
  });
});

describe("electricalRated", () => {
  it("type 1 top impact is electrical rated", () => {
    expect(electricalRated("type_1_top_impact")).toBe(true);
  });
  it("vented cool indoor is not", () => {
    expect(electricalRated("vented_cool_indoor")).toBe(false);
  });
});

describe("faceShieldCompat", () => {
  it("full brim sun rain is face shield compatible", () => {
    expect(faceShieldCompat("full_brim_sun_rain")).toBe(true);
  });
  it("cap style low profile is not", () => {
    expect(faceShieldCompat("cap_style_low_profile")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("type 2 lateral protect uses abs eps foam liner", () => {
    expect(shellMaterial("type_2_lateral_protect")).toBe("abs_eps_foam_liner");
  });
});

describe("bestSite", () => {
  it("full brim sun rain best for outdoor road crew sun", () => {
    expect(bestSite("full_brim_sun_rain")).toBe("outdoor_road_crew_sun");
  });
});

describe("hardHats", () => {
  it("returns 5 types", () => {
    expect(hardHats()).toHaveLength(5);
  });
});
