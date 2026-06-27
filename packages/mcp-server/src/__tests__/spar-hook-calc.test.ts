import { describe, it, expect } from "vitest";
import {
  twistSpeed, sparConsist, gripSecure, portability,
  sparCost, mounted, forHazel, hookShape,
  bestUse, sparHooks,
} from "../spar-hook-calc.js";

describe("twistSpeed", () => {
  it("spring loaded auto fastest twist", () => {
    expect(twistSpeed("spring_loaded_auto")).toBeGreaterThan(twistSpeed("portable_field_fold"));
  });
});

describe("sparConsist", () => {
  it("bench mount clamp most consistent", () => {
    expect(sparConsist("bench_mount_clamp")).toBeGreaterThan(sparConsist("portable_field_fold"));
  });
});

describe("gripSecure", () => {
  it("bench mount clamp most secure grip", () => {
    expect(gripSecure("bench_mount_clamp")).toBeGreaterThan(gripSecure("portable_field_fold"));
  });
});

describe("portability", () => {
  it("hand twist hook most portable", () => {
    expect(portability("hand_twist_hook")).toBeGreaterThan(portability("bench_mount_clamp"));
  });
});

describe("sparCost", () => {
  it("spring loaded auto most expensive", () => {
    expect(sparCost("spring_loaded_auto")).toBeGreaterThan(sparCost("hand_twist_hook"));
  });
});

describe("mounted", () => {
  it("bench mount clamp is mounted", () => {
    expect(mounted("bench_mount_clamp")).toBe(true);
  });
  it("hand twist hook not mounted", () => {
    expect(mounted("hand_twist_hook")).toBe(false);
  });
});

describe("forHazel", () => {
  it("hand twist hook is for hazel", () => {
    expect(forHazel("hand_twist_hook")).toBe(true);
  });
  it("spring loaded auto not for hazel", () => {
    expect(forHazel("spring_loaded_auto")).toBe(false);
  });
});

describe("hookShape", () => {
  it("adjustable angle set uses angle set pivot", () => {
    expect(hookShape("adjustable_angle_set")).toBe("angle_set_pivot");
  });
});

describe("bestUse", () => {
  it("bench mount clamp best for batch spar produce", () => {
    expect(bestUse("bench_mount_clamp")).toBe("batch_spar_produce");
  });
});

describe("sparHooks", () => {
  it("returns 5 types", () => {
    expect(sparHooks()).toHaveLength(5);
  });
});
