import { describe, it, expect } from "vitest";
import {
  fiberAlign, speedOutput, colorBlend, portability,
  cardCost, handheld, motorized, toothDensity,
  bestFiber, handCards,
} from "../hand-card-calc.js";

describe("fiberAlign", () => {
  it("drum carder table best fiber alignment", () => {
    expect(fiberAlign("drum_carder_table")).toBeGreaterThan(fiberAlign("flicker_card_lock"));
  });
});

describe("speedOutput", () => {
  it("drum carder table fastest output", () => {
    expect(speedOutput("drum_carder_table")).toBeGreaterThan(speedOutput("flicker_card_lock"));
  });
});

describe("colorBlend", () => {
  it("blending board flat best color blending", () => {
    expect(colorBlend("blending_board_flat")).toBeGreaterThan(colorBlend("flicker_card_lock"));
  });
});

describe("portability", () => {
  it("flicker card lock most portable", () => {
    expect(portability("flicker_card_lock")).toBeGreaterThan(portability("drum_carder_table"));
  });
});

describe("cardCost", () => {
  it("drum carder table most expensive", () => {
    expect(cardCost("drum_carder_table")).toBeGreaterThan(cardCost("flicker_card_lock"));
  });
});

describe("handheld", () => {
  it("wool card standard is handheld", () => {
    expect(handheld("wool_card_standard")).toBe(true);
  });
  it("drum carder table is not handheld", () => {
    expect(handheld("drum_carder_table")).toBe(false);
  });
});

describe("motorized", () => {
  it("drum carder table is not motorized", () => {
    expect(motorized("drum_carder_table")).toBe(false);
  });
});

describe("toothDensity", () => {
  it("cotton card fine uses fine tooth 72tpi", () => {
    expect(toothDensity("cotton_card_fine")).toBe("fine_tooth_72tpi");
  });
});

describe("bestFiber", () => {
  it("blending board flat best for art batt gradient", () => {
    expect(bestFiber("blending_board_flat")).toBe("art_batt_gradient");
  });
});

describe("handCards", () => {
  it("returns 5 types", () => {
    expect(handCards()).toHaveLength(5);
  });
});
