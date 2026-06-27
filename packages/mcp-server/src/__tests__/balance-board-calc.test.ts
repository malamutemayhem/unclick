import { describe, it, expect } from "vitest";
import {
  balanceChallenge, stabilityCore, beginnerFriendly, deckSize,
  boardCost, multiAxis, antiSlipDeck, fulcrumType,
  bestActivity, balanceBoards,
} from "../balance-board-calc.js";

describe("balanceChallenge", () => {
  it("roller cylinder most challenging", () => {
    expect(balanceChallenge("roller_cylinder")).toBeGreaterThan(balanceChallenge("rocker_flat"));
  });
});

describe("stabilityCore", () => {
  it("roller cylinder best core stability", () => {
    expect(stabilityCore("roller_cylinder")).toBeGreaterThan(stabilityCore("standing_desk_active"));
  });
});

describe("beginnerFriendly", () => {
  it("rocker flat most beginner friendly", () => {
    expect(beginnerFriendly("rocker_flat")).toBeGreaterThan(beginnerFriendly("roller_cylinder"));
  });
});

describe("deckSize", () => {
  it("roller cylinder largest deck", () => {
    expect(deckSize("roller_cylinder")).toBeGreaterThan(deckSize("wobble_round"));
  });
});

describe("boardCost", () => {
  it("spring trainer most expensive", () => {
    expect(boardCost("spring_trainer")).toBeGreaterThan(boardCost("rocker_flat"));
  });
});

describe("multiAxis", () => {
  it("wobble round is multi axis", () => {
    expect(multiAxis("wobble_round")).toBe(true);
  });
  it("rocker flat is not", () => {
    expect(multiAxis("rocker_flat")).toBe(false);
  });
});

describe("antiSlipDeck", () => {
  it("rocker flat has anti slip deck", () => {
    expect(antiSlipDeck("rocker_flat")).toBe(true);
  });
  it("roller cylinder has anti slip deck", () => {
    expect(antiSlipDeck("roller_cylinder")).toBe(true);
  });
});

describe("fulcrumType", () => {
  it("wobble round uses half sphere dome", () => {
    expect(fulcrumType("wobble_round")).toBe("half_sphere_dome");
  });
});

describe("bestActivity", () => {
  it("standing desk active for office micro movement", () => {
    expect(bestActivity("standing_desk_active")).toBe("office_micro_movement");
  });
});

describe("balanceBoards", () => {
  it("returns 5 types", () => {
    expect(balanceBoards()).toHaveLength(5);
  });
});
