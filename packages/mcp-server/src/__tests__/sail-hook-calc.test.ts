import { describe, it, expect } from "vitest";
import {
  holdSecure, adjustAngle, setupSpeed, fabricRange,
  hookCost, portable, magnetic, mountStyle,
  bestUse, sailHooks,
} from "../sail-hook-calc.js";

describe("holdSecure", () => {
  it("floor hook heavy most secure hold", () => {
    expect(holdSecure("floor_hook_heavy")).toBeGreaterThan(holdSecure("suction_hook_smooth"));
  });
});

describe("adjustAngle", () => {
  it("magnetic hook steel best adjust angle", () => {
    expect(adjustAngle("magnetic_hook_steel")).toBeGreaterThan(adjustAngle("floor_hook_heavy"));
  });
});

describe("setupSpeed", () => {
  it("magnetic hook steel fastest setup", () => {
    expect(setupSpeed("magnetic_hook_steel")).toBeGreaterThan(setupSpeed("floor_hook_heavy"));
  });
});

describe("fabricRange", () => {
  it("floor hook heavy widest fabric range", () => {
    expect(fabricRange("floor_hook_heavy")).toBeGreaterThan(fabricRange("magnetic_hook_steel"));
  });
});

describe("hookCost", () => {
  it("floor hook heavy most expensive", () => {
    expect(hookCost("floor_hook_heavy")).toBeGreaterThan(hookCost("suction_hook_smooth"));
  });
});

describe("portable", () => {
  it("clamp hook portable is portable", () => {
    expect(portable("clamp_hook_portable")).toBe(true);
  });
  it("bench hook standard not portable", () => {
    expect(portable("bench_hook_standard")).toBe(false);
  });
});

describe("magnetic", () => {
  it("magnetic hook steel is magnetic", () => {
    expect(magnetic("magnetic_hook_steel")).toBe(true);
  });
  it("bench hook standard not magnetic", () => {
    expect(magnetic("bench_hook_standard")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("clamp hook portable uses clamp edge grip", () => {
    expect(mountStyle("clamp_hook_portable")).toBe("clamp_edge_grip");
  });
});

describe("bestUse", () => {
  it("bench hook standard best for general bench hold", () => {
    expect(bestUse("bench_hook_standard")).toBe("general_bench_hold");
  });
});

describe("sailHooks", () => {
  it("returns 5 types", () => {
    expect(sailHooks()).toHaveLength(5);
  });
});
