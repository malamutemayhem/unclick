import { describe, it, expect } from "vitest";
import {
  holdWeight, removeClean, reapplyEase, surfaceRange,
  stripCost, waterResistant, renterFriendly, adhesiveType,
  bestUse, commandStrips,
} from "../command-strip-calc.js";

describe("holdWeight", () => {
  it("velcro industrial hold holds most weight", () => {
    expect(holdWeight("velcro_industrial_hold")).toBeGreaterThan(holdWeight("small_picture_hang"));
  });
});

describe("removeClean", () => {
  it("small picture hang cleanest removal", () => {
    expect(removeClean("small_picture_hang")).toBeGreaterThan(removeClean("velcro_industrial_hold"));
  });
});

describe("reapplyEase", () => {
  it("small picture hang easiest to reapply", () => {
    expect(reapplyEase("small_picture_hang")).toBeGreaterThan(reapplyEase("velcro_industrial_hold"));
  });
});

describe("surfaceRange", () => {
  it("outdoor weatherproof widest surface range", () => {
    expect(surfaceRange("outdoor_weatherproof")).toBeGreaterThan(surfaceRange("velcro_industrial_hold"));
  });
});

describe("stripCost", () => {
  it("velcro industrial hold most expensive", () => {
    expect(stripCost("velcro_industrial_hold")).toBeGreaterThan(stripCost("small_picture_hang"));
  });
});

describe("waterResistant", () => {
  it("outdoor weatherproof is water resistant", () => {
    expect(waterResistant("outdoor_weatherproof")).toBe(true);
  });
  it("small picture hang is not", () => {
    expect(waterResistant("small_picture_hang")).toBe(false);
  });
});

describe("renterFriendly", () => {
  it("large damage free is renter friendly", () => {
    expect(renterFriendly("large_damage_free")).toBe(true);
  });
  it("velcro industrial hold is not", () => {
    expect(renterFriendly("velcro_industrial_hold")).toBe(false);
  });
});

describe("adhesiveType", () => {
  it("outdoor weatherproof uses all weather acrylic bond", () => {
    expect(adhesiveType("outdoor_weatherproof")).toBe("all_weather_acrylic_bond");
  });
});

describe("bestUse", () => {
  it("large damage free best for mirror canvas heavy frame", () => {
    expect(bestUse("large_damage_free")).toBe("mirror_canvas_heavy_frame");
  });
});

describe("commandStrips", () => {
  it("returns 5 types", () => {
    expect(commandStrips()).toHaveLength(5);
  });
});
