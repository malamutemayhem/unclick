import { describe, it, expect } from "vitest";
import {
  cardEven, fiberBlend, speedCard, battWeight,
  drumCost, powered, forFine, clothType,
  bestUse, drumCards,
} from "../drum-card-calc.js";

describe("cardEven", () => {
  it("fine cloth delicate most even card", () => {
    expect(cardEven("fine_cloth_delicate")).toBeGreaterThan(cardEven("coarse_cloth_rug"));
  });
});

describe("fiberBlend", () => {
  it("blending board flat best fiber blend", () => {
    expect(fiberBlend("blending_board_flat")).toBeGreaterThan(fiberBlend("coarse_cloth_rug"));
  });
});

describe("speedCard", () => {
  it("electric motor drive fastest card", () => {
    expect(speedCard("electric_motor_drive")).toBeGreaterThan(speedCard("blending_board_flat"));
  });
});

describe("battWeight", () => {
  it("coarse cloth rug heaviest batt", () => {
    expect(battWeight("coarse_cloth_rug")).toBeGreaterThan(battWeight("blending_board_flat"));
  });
});

describe("drumCost", () => {
  it("electric motor drive most expensive", () => {
    expect(drumCost("electric_motor_drive")).toBeGreaterThan(drumCost("blending_board_flat"));
  });
});

describe("powered", () => {
  it("electric motor drive is powered", () => {
    expect(powered("electric_motor_drive")).toBe(true);
  });
  it("standard hand crank not powered", () => {
    expect(powered("standard_hand_crank")).toBe(false);
  });
});

describe("forFine", () => {
  it("fine cloth delicate is for fine", () => {
    expect(forFine("fine_cloth_delicate")).toBe(true);
  });
  it("coarse cloth rug not for fine", () => {
    expect(forFine("coarse_cloth_rug")).toBe(false);
  });
});

describe("clothType", () => {
  it("blending board flat uses flat board cloth", () => {
    expect(clothType("blending_board_flat")).toBe("flat_board_cloth");
  });
});

describe("bestUse", () => {
  it("electric motor drive best for production card batch", () => {
    expect(bestUse("electric_motor_drive")).toBe("production_card_batch");
  });
});

describe("drumCards", () => {
  it("returns 5 types", () => {
    expect(drumCards()).toHaveLength(5);
  });
});
