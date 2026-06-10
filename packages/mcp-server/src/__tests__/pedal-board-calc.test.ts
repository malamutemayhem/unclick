import { describe, it, expect } from "vitest";
import {
  pedalCapacity, portability, cableManage, buildQuality,
  boardCost, hasPowerSupply, includesCase, frameMaterial,
  bestPlayer, pedalBoards,
} from "../pedal-board-calc.js";

describe("pedalCapacity", () => {
  it("tilted tiered rack highest pedal capacity", () => {
    expect(pedalCapacity("tilted_tiered_rack")).toBeGreaterThan(pedalCapacity("mini_nano_compact"));
  });
});

describe("portability", () => {
  it("mini nano compact most portable", () => {
    expect(portability("mini_nano_compact")).toBeGreaterThan(portability("tilted_tiered_rack"));
  });
});

describe("cableManage", () => {
  it("powered built in supply best cable management", () => {
    expect(cableManage("powered_built_in_supply")).toBeGreaterThan(cableManage("mini_nano_compact"));
  });
});

describe("buildQuality", () => {
  it("tilted tiered rack best build quality", () => {
    expect(buildQuality("tilted_tiered_rack")).toBeGreaterThan(buildQuality("soft_case_integrated"));
  });
});

describe("boardCost", () => {
  it("powered built in supply most expensive", () => {
    expect(boardCost("powered_built_in_supply")).toBeGreaterThan(boardCost("mini_nano_compact"));
  });
});

describe("hasPowerSupply", () => {
  it("powered built in supply has power supply", () => {
    expect(hasPowerSupply("powered_built_in_supply")).toBe(true);
  });
  it("flat aluminum basic does not", () => {
    expect(hasPowerSupply("flat_aluminum_basic")).toBe(false);
  });
});

describe("includesCase", () => {
  it("soft case integrated includes case", () => {
    expect(includesCase("soft_case_integrated")).toBe(true);
  });
  it("flat aluminum basic does not", () => {
    expect(includesCase("flat_aluminum_basic")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("tilted tiered rack uses steel tube welded tier", () => {
    expect(frameMaterial("tilted_tiered_rack")).toBe("steel_tube_welded_tier");
  });
});

describe("bestPlayer", () => {
  it("mini nano compact best for acoustic minimal effects", () => {
    expect(bestPlayer("mini_nano_compact")).toBe("acoustic_minimal_effects");
  });
});

describe("pedalBoards", () => {
  it("returns 5 types", () => {
    expect(pedalBoards()).toHaveLength(5);
  });
});
