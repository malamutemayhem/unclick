import { describe, it, expect } from "vitest";
import {
  spreadEven, threadSecure, setupSpeed, widthRange,
  raddleCost, closedTop, adjustable, pegStyle,
  bestUse, raddleSpreads,
} from "../raddle-spread-calc.js";

describe("spreadEven", () => {
  it("adjustable peg set most even spread", () => {
    expect(spreadEven("adjustable_peg_set")).toBeGreaterThan(spreadEven("clamp_mount_portable"));
  });
});

describe("threadSecure", () => {
  it("closed top secure most secure thread", () => {
    expect(threadSecure("closed_top_secure")).toBeGreaterThan(threadSecure("open_top_standard"));
  });
});

describe("setupSpeed", () => {
  it("clamp mount portable fastest setup", () => {
    expect(setupSpeed("clamp_mount_portable")).toBeGreaterThan(setupSpeed("closed_top_secure"));
  });
});

describe("widthRange", () => {
  it("adjustable peg set widest width range", () => {
    expect(widthRange("adjustable_peg_set")).toBeGreaterThan(widthRange("clamp_mount_portable"));
  });
});

describe("raddleCost", () => {
  it("metal raddle durable most expensive", () => {
    expect(raddleCost("metal_raddle_durable")).toBeGreaterThan(raddleCost("open_top_standard"));
  });
});

describe("closedTop", () => {
  it("closed top secure has closed top", () => {
    expect(closedTop("closed_top_secure")).toBe(true);
  });
  it("open top standard no closed top", () => {
    expect(closedTop("open_top_standard")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable peg set is adjustable", () => {
    expect(adjustable("adjustable_peg_set")).toBe(true);
  });
  it("open top standard not adjustable", () => {
    expect(adjustable("open_top_standard")).toBe(false);
  });
});

describe("pegStyle", () => {
  it("metal raddle durable uses welded steel peg", () => {
    expect(pegStyle("metal_raddle_durable")).toBe("welded_steel_peg");
  });
});

describe("bestUse", () => {
  it("open top standard best for general warp spread", () => {
    expect(bestUse("open_top_standard")).toBe("general_warp_spread");
  });
});

describe("raddleSpreads", () => {
  it("returns 5 types", () => {
    expect(raddleSpreads()).toHaveLength(5);
  });
});
