import { describe, it, expect } from "vitest";
import {
  balanceChallenge, seatComfort, portability, exerciseRange,
  discCost, adjustableFirmness, dualSide, surfaceType,
  bestUse, stabilityDiscs,
} from "../stability-disc-calc.js";

describe("balanceChallenge", () => {
  it("bosu half ball most balance challenge", () => {
    expect(balanceChallenge("bosu_half_ball")).toBeGreaterThan(balanceChallenge("balance_pad_foam"));
  });
});

describe("seatComfort", () => {
  it("inflatable wobble cushion most seat comfort", () => {
    expect(seatComfort("inflatable_wobble_cushion")).toBeGreaterThan(seatComfort("rocker_board_round"));
  });
});

describe("portability", () => {
  it("inflatable wobble cushion most portable", () => {
    expect(portability("inflatable_wobble_cushion")).toBeGreaterThan(portability("bosu_half_ball"));
  });
});

describe("exerciseRange", () => {
  it("bosu half ball most exercise range", () => {
    expect(exerciseRange("bosu_half_ball")).toBeGreaterThan(exerciseRange("air_filled_disc_textured"));
  });
});

describe("discCost", () => {
  it("bosu half ball most expensive", () => {
    expect(discCost("bosu_half_ball")).toBeGreaterThan(discCost("inflatable_wobble_cushion"));
  });
});

describe("adjustableFirmness", () => {
  it("inflatable wobble cushion has adjustable firmness", () => {
    expect(adjustableFirmness("inflatable_wobble_cushion")).toBe(true);
  });
  it("balance pad foam has no adjustable firmness", () => {
    expect(adjustableFirmness("balance_pad_foam")).toBe(false);
  });
});

describe("dualSide", () => {
  it("bosu half ball is dual side", () => {
    expect(dualSide("bosu_half_ball")).toBe(true);
  });
  it("balance pad foam is not dual side", () => {
    expect(dualSide("balance_pad_foam")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("bosu half ball uses rubber dome flat base", () => {
    expect(surfaceType("bosu_half_ball")).toBe("rubber_dome_flat_base");
  });
});

describe("bestUse", () => {
  it("inflatable wobble cushion best for active sitting posture", () => {
    expect(bestUse("inflatable_wobble_cushion")).toBe("active_sitting_posture");
  });
});

describe("stabilityDiscs", () => {
  it("returns 5 types", () => {
    expect(stabilityDiscs()).toHaveLength(5);
  });
});
