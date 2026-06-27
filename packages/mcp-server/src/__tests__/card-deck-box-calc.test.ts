import { describe, it, expect } from "vitest";
import {
  capacity, protection, cardAccess, styleAppeal,
  boxCost, holdsSleeves, multiDeck, shellMaterial,
  bestGame, cardDeckBoxes,
} from "../card-deck-box-calc.js";

describe("capacity", () => {
  it("tower multi compartment largest capacity", () => {
    expect(capacity("tower_multi_compartment")).toBeGreaterThan(capacity("plastic_snap_basic"));
  });
});

describe("protection", () => {
  it("boulder hard shell best protection", () => {
    expect(protection("boulder_hard_shell")).toBeGreaterThan(protection("plastic_snap_basic"));
  });
});

describe("cardAccess", () => {
  it("leather sideload pro best card access", () => {
    expect(cardAccess("leather_sideload_pro")).toBeGreaterThan(cardAccess("tower_multi_compartment"));
  });
});

describe("styleAppeal", () => {
  it("leather sideload pro most stylish", () => {
    expect(styleAppeal("leather_sideload_pro")).toBeGreaterThan(styleAppeal("plastic_snap_basic"));
  });
});

describe("boxCost", () => {
  it("tower multi compartment most expensive", () => {
    expect(boxCost("tower_multi_compartment")).toBeGreaterThan(boxCost("plastic_snap_basic"));
  });
});

describe("holdsSleeves", () => {
  it("magnetic flip premium holds sleeves", () => {
    expect(holdsSleeves("magnetic_flip_premium")).toBe(true);
  });
  it("plastic snap basic does not hold sleeves", () => {
    expect(holdsSleeves("plastic_snap_basic")).toBe(false);
  });
});

describe("multiDeck", () => {
  it("tower multi compartment is multi deck", () => {
    expect(multiDeck("tower_multi_compartment")).toBe(true);
  });
  it("boulder hard shell is not multi deck", () => {
    expect(multiDeck("boulder_hard_shell")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("boulder hard shell uses rigid polycarbonate foam", () => {
    expect(shellMaterial("boulder_hard_shell")).toBe("rigid_polycarbonate_foam");
  });
});

describe("bestGame", () => {
  it("leather sideload pro best for tournament commander", () => {
    expect(bestGame("leather_sideload_pro")).toBe("tournament_commander");
  });
});

describe("cardDeckBoxes", () => {
  it("returns 5 types", () => {
    expect(cardDeckBoxes()).toHaveLength(5);
  });
});
