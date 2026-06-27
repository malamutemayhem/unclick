import { describe, it, expect } from "vitest";
import {
  threadSeparation, smoothness, durability, visibility,
  stickCost, flatProfile, ecoFriendly, stickMaterial,
  bestUse, leaseSticks,
} from "../lease-stick-calc.js";

describe("threadSeparation", () => {
  it("flat wood smooth best thread separation", () => {
    expect(threadSeparation("flat_wood_smooth")).toBeGreaterThan(threadSeparation("round_dowel_basic"));
  });
});

describe("smoothness", () => {
  it("acrylic clear see smoothest", () => {
    expect(smoothness("acrylic_clear_see")).toBeGreaterThan(smoothness("round_dowel_basic"));
  });
});

describe("durability", () => {
  it("metal light strong most durable", () => {
    expect(durability("metal_light_strong")).toBeGreaterThan(durability("acrylic_clear_see"));
  });
});

describe("visibility", () => {
  it("acrylic clear see most visible", () => {
    expect(visibility("acrylic_clear_see")).toBeGreaterThan(visibility("round_dowel_basic"));
  });
});

describe("stickCost", () => {
  it("metal light strong most expensive", () => {
    expect(stickCost("metal_light_strong")).toBeGreaterThan(stickCost("round_dowel_basic"));
  });
});

describe("flatProfile", () => {
  it("flat wood smooth has flat profile", () => {
    expect(flatProfile("flat_wood_smooth")).toBe(true);
  });
  it("round dowel basic has no flat profile", () => {
    expect(flatProfile("round_dowel_basic")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("bamboo eco natural is eco friendly", () => {
    expect(ecoFriendly("bamboo_eco_natural")).toBe(true);
  });
  it("acrylic clear see is not eco friendly", () => {
    expect(ecoFriendly("acrylic_clear_see")).toBe(false);
  });
});

describe("stickMaterial", () => {
  it("flat wood smooth uses maple sanded flat", () => {
    expect(stickMaterial("flat_wood_smooth")).toBe("maple_sanded_flat");
  });
});

describe("bestUse", () => {
  it("acrylic clear see best for fine thread visible", () => {
    expect(bestUse("acrylic_clear_see")).toBe("fine_thread_visible");
  });
});

describe("leaseSticks", () => {
  it("returns 5 types", () => {
    expect(leaseSticks()).toHaveLength(5);
  });
});
