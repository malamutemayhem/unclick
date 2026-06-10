import { describe, it, expect } from "vitest";
import {
  streakFree, waterRemoval, easeOfUse, bladeLife,
  squeegeeCost, replaceBlade, hangsUp, bladeType,
  bestSurface, squeegees,
} from "../squeegee-calc.js";

describe("streakFree", () => {
  it("window pro channel most streak free", () => {
    expect(streakFree("window_pro_channel")).toBeGreaterThan(streakFree("floor_foam_wide"));
  });
});

describe("waterRemoval", () => {
  it("floor foam wide best water removal", () => {
    expect(waterRemoval("floor_foam_wide")).toBeGreaterThan(waterRemoval("magnetic_double_sided"));
  });
});

describe("easeOfUse", () => {
  it("shower daily compact easiest to use", () => {
    expect(easeOfUse("shower_daily_compact")).toBeGreaterThan(easeOfUse("magnetic_double_sided"));
  });
});

describe("bladeLife", () => {
  it("auto silicone flex longest blade life", () => {
    expect(bladeLife("auto_silicone_flex")).toBeGreaterThan(bladeLife("floor_foam_wide"));
  });
});

describe("squeegeeCost", () => {
  it("magnetic double sided most expensive", () => {
    expect(squeegeeCost("magnetic_double_sided")).toBeGreaterThan(squeegeeCost("shower_daily_compact"));
  });
});

describe("replaceBlade", () => {
  it("window pro channel has replace blade", () => {
    expect(replaceBlade("window_pro_channel")).toBe(true);
  });
  it("shower daily compact does not", () => {
    expect(replaceBlade("shower_daily_compact")).toBe(false);
  });
});

describe("hangsUp", () => {
  it("shower daily compact hangs up", () => {
    expect(hangsUp("shower_daily_compact")).toBe(true);
  });
  it("window pro channel does not", () => {
    expect(hangsUp("window_pro_channel")).toBe(false);
  });
});

describe("bladeType", () => {
  it("magnetic double sided uses neodymium magnet pair", () => {
    expect(bladeType("magnetic_double_sided")).toBe("neodymium_magnet_pair");
  });
});

describe("bestSurface", () => {
  it("shower daily compact best for glass shower door daily", () => {
    expect(bestSurface("shower_daily_compact")).toBe("glass_shower_door_daily");
  });
});

describe("squeegees", () => {
  it("returns 5 types", () => {
    expect(squeegees()).toHaveLength(5);
  });
});
