import { describe, it, expect } from "vitest";
import {
  mechanicalAdv, frictionLoss, loadCapacity, compactness,
  blockCost, openSide, selfLocking, sheaveCount,
  bestUse, blockTackles,
} from "../block-tackle-calc.js";

describe("mechanicalAdv", () => {
  it("double sheave power best mechanical advantage", () => {
    expect(mechanicalAdv("double_sheave_power")).toBeGreaterThan(mechanicalAdv("single_sheave_basic"));
  });
});

describe("frictionLoss", () => {
  it("single sheave basic lowest friction loss", () => {
    expect(frictionLoss("single_sheave_basic")).toBeGreaterThan(frictionLoss("ratchet_block_hold"));
  });
});

describe("loadCapacity", () => {
  it("double sheave power highest load capacity", () => {
    expect(loadCapacity("double_sheave_power")).toBeGreaterThan(loadCapacity("single_sheave_basic"));
  });
});

describe("compactness", () => {
  it("single sheave basic most compact", () => {
    expect(compactness("single_sheave_basic")).toBeGreaterThan(compactness("double_sheave_power"));
  });
});

describe("blockCost", () => {
  it("ratchet block hold most expensive", () => {
    expect(blockCost("ratchet_block_hold")).toBeGreaterThan(blockCost("single_sheave_basic"));
  });
});

describe("openSide", () => {
  it("snatch block open has open side", () => {
    expect(openSide("snatch_block_open")).toBe(true);
  });
  it("single sheave basic no open side", () => {
    expect(openSide("single_sheave_basic")).toBe(false);
  });
});

describe("selfLocking", () => {
  it("ratchet block hold is self locking", () => {
    expect(selfLocking("ratchet_block_hold")).toBe(true);
  });
  it("double sheave power not self locking", () => {
    expect(selfLocking("double_sheave_power")).toBe(false);
  });
});

describe("sheaveCount", () => {
  it("fiddle block compact has fiddle stacked sheaves", () => {
    expect(sheaveCount("fiddle_block_compact")).toBe("fiddle_stacked");
  });
});

describe("bestUse", () => {
  it("snatch block open best for quick rig redirect", () => {
    expect(bestUse("snatch_block_open")).toBe("quick_rig_redirect");
  });
});

describe("blockTackles", () => {
  it("returns 5 types", () => {
    expect(blockTackles()).toHaveLength(5);
  });
});
