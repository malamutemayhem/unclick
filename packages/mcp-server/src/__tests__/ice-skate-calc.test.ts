import { describe, it, expect } from "vitest";
import {
  bladeSharpness, ankleSupport, speedPotential, maneuverability,
  skateCost, toePick, replaceBlade, bladeProfile,
  bestSkater, iceSkates,
} from "../ice-skate-calc.js";

describe("bladeSharpness", () => {
  it("speed long blade sharpest", () => {
    expect(bladeSharpness("speed_long_blade")).toBeGreaterThan(bladeSharpness("recreational_comfort"));
  });
});

describe("ankleSupport", () => {
  it("goalie wide blade best ankle support", () => {
    expect(ankleSupport("goalie_wide_blade")).toBeGreaterThan(ankleSupport("speed_long_blade"));
  });
});

describe("speedPotential", () => {
  it("speed long blade highest speed potential", () => {
    expect(speedPotential("speed_long_blade")).toBeGreaterThan(speedPotential("recreational_comfort"));
  });
});

describe("maneuverability", () => {
  it("hockey aggressive most maneuverable", () => {
    expect(maneuverability("hockey_aggressive")).toBeGreaterThan(maneuverability("speed_long_blade"));
  });
});

describe("skateCost", () => {
  it("speed long blade most expensive", () => {
    expect(skateCost("speed_long_blade")).toBeGreaterThan(skateCost("recreational_comfort"));
  });
});

describe("toePick", () => {
  it("figure classic has toe pick", () => {
    expect(toePick("figure_classic")).toBe(true);
  });
  it("hockey aggressive does not", () => {
    expect(toePick("hockey_aggressive")).toBe(false);
  });
});

describe("replaceBlade", () => {
  it("hockey aggressive has replaceable blade", () => {
    expect(replaceBlade("hockey_aggressive")).toBe(true);
  });
  it("recreational comfort does not", () => {
    expect(replaceBlade("recreational_comfort")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("speed long blade uses long flat minimal curve", () => {
    expect(bladeProfile("speed_long_blade")).toBe("long_flat_minimal_curve");
  });
});

describe("bestSkater", () => {
  it("goalie wide blade for crease lateral butterfly", () => {
    expect(bestSkater("goalie_wide_blade")).toBe("crease_lateral_butterfly");
  });
});

describe("iceSkates", () => {
  it("returns 5 types", () => {
    expect(iceSkates()).toHaveLength(5);
  });
});
