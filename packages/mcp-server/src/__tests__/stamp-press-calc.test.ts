import { describe, it, expect } from "vitest";
import {
  force, speed, precision, complexity,
  spCost, continuous, forHighVol, tooling,
  bestUse, stampPressTypes,
} from "../stamp-press-calc.js";

describe("force", () => {
  it("deep draw and coining highest force", () => {
    expect(force("deep_draw_cup_shell")).toBeGreaterThan(force("progressive_die_strip"));
  });
});

describe("speed", () => {
  it("progressive die fastest", () => {
    expect(speed("progressive_die_strip")).toBeGreaterThan(speed("deep_draw_cup_shell"));
  });
});

describe("precision", () => {
  it("fine blanking highest precision", () => {
    expect(precision("blanking_fine_blank")).toBeGreaterThan(precision("deep_draw_cup_shell"));
  });
});

describe("complexity", () => {
  it("transfer press most complex", () => {
    expect(complexity("transfer_press_multi")).toBeGreaterThan(complexity("coining_emboss_mint"));
  });
});

describe("spCost", () => {
  it("transfer press most expensive", () => {
    expect(spCost("transfer_press_multi")).toBeGreaterThan(spCost("coining_emboss_mint"));
  });
});

describe("continuous", () => {
  it("progressive die is continuous", () => {
    expect(continuous("progressive_die_strip")).toBe(true);
  });
  it("deep draw not continuous", () => {
    expect(continuous("deep_draw_cup_shell")).toBe(false);
  });
});

describe("forHighVol", () => {
  it("progressive die for high volume", () => {
    expect(forHighVol("progressive_die_strip")).toBe(true);
  });
  it("coining not for high volume", () => {
    expect(forHighVol("coining_emboss_mint")).toBe(false);
  });
});

describe("tooling", () => {
  it("fine blank uses v ring triple action", () => {
    expect(tooling("blanking_fine_blank")).toBe("v_ring_triple_action_shear_smooth");
  });
});

describe("bestUse", () => {
  it("deep draw for can body sink enclosure", () => {
    expect(bestUse("deep_draw_cup_shell")).toBe("can_body_sink_enclosure_cup_shape");
  });
});

describe("stampPressTypes", () => {
  it("returns 5 types", () => {
    expect(stampPressTypes()).toHaveLength(5);
  });
});
