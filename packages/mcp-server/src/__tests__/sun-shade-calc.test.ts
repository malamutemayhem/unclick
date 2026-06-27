import { describe, it, expect } from "vitest";
import {
  heatBlock, uvProtection, storageEase, setupSpeed,
  shadeCost, universalFit, seeThrough, shadeMaterial,
  bestWindow, sunShades,
} from "../sun-shade-calc.js";

describe("heatBlock", () => {
  it("accordion fold foil best heat block", () => {
    expect(heatBlock("accordion_fold_foil")).toBeGreaterThan(heatBlock("static_cling_tint"));
  });
});

describe("uvProtection", () => {
  it("accordion fold foil best uv protection", () => {
    expect(uvProtection("accordion_fold_foil")).toBeGreaterThan(uvProtection("static_cling_tint"));
  });
});

describe("storageEase", () => {
  it("static cling tint easiest to store", () => {
    expect(storageEase("static_cling_tint")).toBeGreaterThan(storageEase("custom_fit_mesh"));
  });
});

describe("setupSpeed", () => {
  it("umbrella pop open fastest setup", () => {
    expect(setupSpeed("umbrella_pop_open")).toBeGreaterThan(setupSpeed("custom_fit_mesh"));
  });
});

describe("shadeCost", () => {
  it("custom fit mesh most expensive", () => {
    expect(shadeCost("custom_fit_mesh")).toBeGreaterThan(shadeCost("accordion_fold_foil"));
  });
});

describe("universalFit", () => {
  it("accordion fold foil is universal fit", () => {
    expect(universalFit("accordion_fold_foil")).toBe(true);
  });
  it("custom fit mesh is not", () => {
    expect(universalFit("custom_fit_mesh")).toBe(false);
  });
});

describe("seeThrough", () => {
  it("custom fit mesh is see through", () => {
    expect(seeThrough("custom_fit_mesh")).toBe(true);
  });
  it("accordion fold foil is not", () => {
    expect(seeThrough("accordion_fold_foil")).toBe(false);
  });
});

describe("shadeMaterial", () => {
  it("umbrella pop open uses titanium silver fabric ribs", () => {
    expect(shadeMaterial("umbrella_pop_open")).toBe("titanium_silver_fabric_ribs");
  });
});

describe("bestWindow", () => {
  it("custom fit mesh best for rear side passenger", () => {
    expect(bestWindow("custom_fit_mesh")).toBe("rear_side_passenger");
  });
});

describe("sunShades", () => {
  it("returns 5 types", () => {
    expect(sunShades()).toHaveLength(5);
  });
});
