import { describe, it, expect } from "vitest";
import {
  wrapTight, tensionControl, speedServe, ropeRange,
  boardCost, powered, ratchet, boardMaterial,
  bestUse, servingBoards,
} from "../serving-board-calc.js";

describe("wrapTight", () => {
  it("ratchet board tension tightest wrap", () => {
    expect(wrapTight("ratchet_board_tension")).toBeGreaterThan(wrapTight("wooden_board_standard"));
  });
});

describe("tensionControl", () => {
  it("ratchet board tension best tension control", () => {
    expect(tensionControl("ratchet_board_tension")).toBeGreaterThan(tensionControl("wooden_board_standard"));
  });
});

describe("speedServe", () => {
  it("powered board electric fastest serve", () => {
    expect(speedServe("powered_board_electric")).toBeGreaterThan(speedServe("wooden_board_standard"));
  });
});

describe("ropeRange", () => {
  it("powered board electric best rope range", () => {
    expect(ropeRange("powered_board_electric")).toBeGreaterThan(ropeRange("wooden_board_standard"));
  });
});

describe("boardCost", () => {
  it("powered board electric most expensive", () => {
    expect(boardCost("powered_board_electric")).toBeGreaterThan(boardCost("wooden_board_standard"));
  });
});

describe("powered", () => {
  it("powered board electric is powered", () => {
    expect(powered("powered_board_electric")).toBe(true);
  });
  it("wooden board standard not powered", () => {
    expect(powered("wooden_board_standard")).toBe(false);
  });
});

describe("ratchet", () => {
  it("ratchet board tension has ratchet", () => {
    expect(ratchet("ratchet_board_tension")).toBe(true);
  });
  it("wooden board standard no ratchet", () => {
    expect(ratchet("wooden_board_standard")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("clamp board grip uses steel clamp jaw", () => {
    expect(boardMaterial("clamp_board_grip")).toBe("steel_clamp_jaw");
  });
});

describe("bestUse", () => {
  it("wooden board standard best for general rope serve", () => {
    expect(bestUse("wooden_board_standard")).toBe("general_rope_serve");
  });
});

describe("servingBoards", () => {
  it("returns 5 types", () => {
    expect(servingBoards()).toHaveLength(5);
  });
});
