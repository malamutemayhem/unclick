import { describe, it, expect } from "vitest";
import {
  swl, ease, durability, lineAngle,
  boCost, quickRelease, forQuay, mount,
  bestUse, bollardTypes,
} from "../bollard-type-calc.js";

describe("swl", () => {
  it("kidney highest swl", () => {
    expect(swl("kidney_double_bitt")).toBeGreaterThan(swl("horn_cleat_deck_mount"));
  });
});

describe("ease", () => {
  it("quick release easiest", () => {
    expect(ease("quick_release_hook")).toBeGreaterThan(ease("kidney_double_bitt"));
  });
});

describe("durability", () => {
  it("kidney most durable", () => {
    expect(durability("kidney_double_bitt")).toBeGreaterThan(durability("horn_cleat_deck_mount"));
  });
});

describe("lineAngle", () => {
  it("quick release best line angle", () => {
    expect(lineAngle("quick_release_hook")).toBeGreaterThan(lineAngle("horn_cleat_deck_mount"));
  });
});

describe("boCost", () => {
  it("quick release most expensive", () => {
    expect(boCost("quick_release_hook")).toBeGreaterThan(boCost("horn_cleat_deck_mount"));
  });
});

describe("quickRelease", () => {
  it("quick release hook is quick release", () => {
    expect(quickRelease("quick_release_hook")).toBe(true);
  });
  it("tee head not quick release", () => {
    expect(quickRelease("tee_head_cast_steel")).toBe(false);
  });
});

describe("forQuay", () => {
  it("tee head for quay", () => {
    expect(forQuay("tee_head_cast_steel")).toBe(true);
  });
  it("horn cleat not for quay", () => {
    expect(forQuay("horn_cleat_deck_mount")).toBe(false);
  });
});

describe("mount", () => {
  it("quick release uses hydraulic hook", () => {
    expect(mount("quick_release_hook")).toBe("hydraulic_hook_powered_release");
  });
});

describe("bestUse", () => {
  it("tee head for commercial port", () => {
    expect(bestUse("tee_head_cast_steel")).toBe("commercial_port_container_berth");
  });
});

describe("bollardTypes", () => {
  it("returns 5 types", () => {
    expect(bollardTypes()).toHaveLength(5);
  });
});
