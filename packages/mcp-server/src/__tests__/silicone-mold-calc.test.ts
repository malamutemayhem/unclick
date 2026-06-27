import { describe, it, expect } from "vitest";
import {
  detailCapture, tearStrength, shelfLife, flexibility,
  moldCost, foodSafe, brushable, cureSystem,
  bestCast, siliconeMolds,
} from "../silicone-mold-calc.js";

describe("detailCapture", () => {
  it("tin cure detail best detail capture", () => {
    expect(detailCapture("tin_cure_detail")).toBeGreaterThan(detailCapture("skin_safe_body"));
  });
});

describe("tearStrength", () => {
  it("platinum cure food best tear strength", () => {
    expect(tearStrength("platinum_cure_food")).toBeGreaterThan(tearStrength("skin_safe_body"));
  });
});

describe("shelfLife", () => {
  it("platinum cure food longest shelf life", () => {
    expect(shelfLife("platinum_cure_food")).toBeGreaterThan(shelfLife("skin_safe_body"));
  });
});

describe("flexibility", () => {
  it("skin safe body most flexible", () => {
    expect(flexibility("skin_safe_body")).toBeGreaterThan(flexibility("block_mold_pour"));
  });
});

describe("moldCost", () => {
  it("platinum cure food more expensive than tin cure", () => {
    expect(moldCost("platinum_cure_food")).toBeGreaterThan(moldCost("tin_cure_detail"));
  });
});

describe("foodSafe", () => {
  it("platinum cure food is food safe", () => {
    expect(foodSafe("platinum_cure_food")).toBe(true);
  });
  it("tin cure detail is not food safe", () => {
    expect(foodSafe("tin_cure_detail")).toBe(false);
  });
});

describe("brushable", () => {
  it("brush on thick is brushable", () => {
    expect(brushable("brush_on_thick")).toBe(true);
  });
  it("block mold pour is not brushable", () => {
    expect(brushable("block_mold_pour")).toBe(false);
  });
});

describe("cureSystem", () => {
  it("platinum cure food uses addition cure platinum", () => {
    expect(cureSystem("platinum_cure_food")).toBe("addition_cure_platinum");
  });
});

describe("bestCast", () => {
  it("skin safe body best for prosthetic life cast", () => {
    expect(bestCast("skin_safe_body")).toBe("prosthetic_life_cast");
  });
});

describe("siliconeMolds", () => {
  it("returns 5 types", () => {
    expect(siliconeMolds()).toHaveLength(5);
  });
});
