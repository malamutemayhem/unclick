import { describe, it, expect } from "vitest";
import {
  closureStrength, openEase, durability, aesthetics,
  snapCost, hidden, needsTool, closureMech,
  bestProject, leatherSnaps,
} from "../leather-snap-calc.js";

describe("closureStrength", () => {
  it("line 24 heavy strongest closure", () => {
    expect(closureStrength("line_24_heavy")).toBeGreaterThan(closureStrength("spring_snap_light"));
  });
});

describe("openEase", () => {
  it("spring snap light easiest to open", () => {
    expect(openEase("spring_snap_light")).toBeGreaterThan(openEase("line_24_heavy"));
  });
});

describe("durability", () => {
  it("line 24 heavy most durable", () => {
    expect(durability("line_24_heavy")).toBeGreaterThan(durability("magnetic_snap_hidden"));
  });
});

describe("aesthetics", () => {
  it("magnetic snap hidden best aesthetics", () => {
    expect(aesthetics("magnetic_snap_hidden")).toBeGreaterThan(aesthetics("spring_snap_light"));
  });
});

describe("snapCost", () => {
  it("turnlock clasp twist most expensive", () => {
    expect(snapCost("turnlock_clasp_twist")).toBeGreaterThan(snapCost("line_20_standard"));
  });
});

describe("hidden", () => {
  it("magnetic snap hidden is hidden", () => {
    expect(hidden("magnetic_snap_hidden")).toBe(true);
  });
  it("line 20 standard is not hidden", () => {
    expect(hidden("line_20_standard")).toBe(false);
  });
});

describe("needsTool", () => {
  it("line 20 standard needs tool", () => {
    expect(needsTool("line_20_standard")).toBe(true);
  });
  it("magnetic snap hidden does not need tool", () => {
    expect(needsTool("magnetic_snap_hidden")).toBe(false);
  });
});

describe("closureMech", () => {
  it("turnlock clasp twist uses quarter turn lock", () => {
    expect(closureMech("turnlock_clasp_twist")).toBe("quarter_turn_lock");
  });
});

describe("bestProject", () => {
  it("magnetic snap hidden best for handbag flap clean", () => {
    expect(bestProject("magnetic_snap_hidden")).toBe("handbag_flap_clean");
  });
});

describe("leatherSnaps", () => {
  it("returns 5 types", () => {
    expect(leatherSnaps()).toHaveLength(5);
  });
});
