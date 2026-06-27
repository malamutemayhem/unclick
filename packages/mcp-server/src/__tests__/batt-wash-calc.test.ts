import { describe, it, expect } from "vitest";
import {
  releaseClean, durability, applyEase, tempRange,
  washCost, premixed, forHighFire, coatBase,
  bestUse, battWashs,
} from "../batt-wash-calc.js";

describe("releaseClean", () => {
  it("zircon wash premium cleanest release", () => {
    expect(releaseClean("zircon_wash_premium")).toBeGreaterThan(releaseClean("kaolin_wash_basic"));
  });
});

describe("durability", () => {
  it("zircon wash premium most durable", () => {
    expect(durability("zircon_wash_premium")).toBeGreaterThan(durability("kaolin_wash_basic"));
  });
});

describe("applyEase", () => {
  it("commercial wash ready easiest apply", () => {
    expect(applyEase("commercial_wash_ready")).toBeGreaterThan(applyEase("zircon_wash_premium"));
  });
});

describe("tempRange", () => {
  it("zircon wash premium widest temp range", () => {
    expect(tempRange("zircon_wash_premium")).toBeGreaterThan(tempRange("kaolin_wash_basic"));
  });
});

describe("washCost", () => {
  it("zircon wash premium most expensive", () => {
    expect(washCost("zircon_wash_premium")).toBeGreaterThan(washCost("kaolin_wash_basic"));
  });
});

describe("premixed", () => {
  it("commercial wash ready is premixed", () => {
    expect(premixed("commercial_wash_ready")).toBe(true);
  });
  it("alumina wash standard not premixed", () => {
    expect(premixed("alumina_wash_standard")).toBe(false);
  });
});

describe("forHighFire", () => {
  it("zircon wash premium is for high fire", () => {
    expect(forHighFire("zircon_wash_premium")).toBe(true);
  });
  it("kaolin wash basic not for high fire", () => {
    expect(forHighFire("kaolin_wash_basic")).toBe(false);
  });
});

describe("coatBase", () => {
  it("alumina wash standard uses alumina hydrate mix", () => {
    expect(coatBase("alumina_wash_standard")).toBe("alumina_hydrate_mix");
  });
});

describe("bestUse", () => {
  it("alumina wash standard best for general shelf protect", () => {
    expect(bestUse("alumina_wash_standard")).toBe("general_shelf_protect");
  });
});

describe("battWashs", () => {
  it("returns 5 types", () => {
    expect(battWashs()).toHaveLength(5);
  });
});
