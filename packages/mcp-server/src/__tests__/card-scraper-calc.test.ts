import { describe, it, expect } from "vitest";
import {
  surfaceFinish, curveCapability, heatComfort, shavingControl,
  scraperCost, hasHandle, forFlat, steelGauge,
  bestSurface, cardScrapers,
} from "../card-scraper-calc.js";

describe("surfaceFinish", () => {
  it("cabinet body handle best surface finish", () => {
    expect(surfaceFinish("cabinet_body_handle")).toBeGreaterThan(surfaceFinish("gooseneck_curved_profile"));
  });
});

describe("curveCapability", () => {
  it("gooseneck curved profile best curve capability", () => {
    expect(curveCapability("gooseneck_curved_profile")).toBeGreaterThan(curveCapability("rectangular_flat_standard"));
  });
});

describe("heatComfort", () => {
  it("cabinet body handle best heat comfort", () => {
    expect(heatComfort("cabinet_body_handle")).toBeGreaterThan(heatComfort("rectangular_flat_standard"));
  });
});

describe("shavingControl", () => {
  it("cabinet body handle best shaving control", () => {
    expect(shavingControl("cabinet_body_handle")).toBeGreaterThan(shavingControl("gooseneck_curved_profile"));
  });
});

describe("scraperCost", () => {
  it("cabinet body handle most expensive", () => {
    expect(scraperCost("cabinet_body_handle")).toBeGreaterThan(scraperCost("rectangular_flat_standard"));
  });
});

describe("hasHandle", () => {
  it("cabinet body handle has handle", () => {
    expect(hasHandle("cabinet_body_handle")).toBe(true);
  });
  it("rectangular flat standard has no handle", () => {
    expect(hasHandle("rectangular_flat_standard")).toBe(false);
  });
});

describe("forFlat", () => {
  it("rectangular flat standard is for flat", () => {
    expect(forFlat("rectangular_flat_standard")).toBe(true);
  });
  it("gooseneck curved profile is not for flat", () => {
    expect(forFlat("gooseneck_curved_profile")).toBe(false);
  });
});

describe("steelGauge", () => {
  it("cabinet body handle uses thick carbon 1 0mm", () => {
    expect(steelGauge("cabinet_body_handle")).toBe("thick_carbon_1_0mm");
  });
});

describe("bestSurface", () => {
  it("gooseneck curved profile best for molding profile clean", () => {
    expect(bestSurface("gooseneck_curved_profile")).toBe("molding_profile_clean");
  });
});

describe("cardScrapers", () => {
  it("returns 5 types", () => {
    expect(cardScrapers()).toHaveLength(5);
  });
});
