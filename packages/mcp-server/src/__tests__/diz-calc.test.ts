import { describe, it, expect } from "vitest";
import {
  drafRate, topEven, holeSize, gripFeel,
  dizCost, multiHole, handmade, dizMaterial,
  bestUse, dizTypes,
} from "../diz-calc.js";

describe("drafRate", () => {
  it("metal washer flat fastest draft rate", () => {
    expect(drafRate("metal_washer_flat")).toBeGreaterThan(drafRate("bone_carved_deco"));
  });
});

describe("topEven", () => {
  it("ceramic bead round most even top", () => {
    expect(topEven("ceramic_bead_round")).toBeGreaterThan(topEven("shell_button_natural"));
  });
});

describe("holeSize", () => {
  it("metal washer flat largest hole", () => {
    expect(holeSize("metal_washer_flat")).toBeGreaterThan(holeSize("bone_carved_deco"));
  });
});

describe("gripFeel", () => {
  it("bone carved deco best grip feel", () => {
    expect(gripFeel("bone_carved_deco")).toBeGreaterThan(gripFeel("metal_washer_flat"));
  });
});

describe("dizCost", () => {
  it("bone carved deco most expensive", () => {
    expect(dizCost("bone_carved_deco")).toBeGreaterThan(dizCost("shell_button_natural"));
  });
});

describe("multiHole", () => {
  it("shell button natural has multi hole", () => {
    expect(multiHole("shell_button_natural")).toBe(true);
  });
  it("metal washer flat no multi hole", () => {
    expect(multiHole("metal_washer_flat")).toBe(false);
  });
});

describe("handmade", () => {
  it("bone carved deco is handmade", () => {
    expect(handmade("bone_carved_deco")).toBe(true);
  });
  it("shell button natural not handmade", () => {
    expect(handmade("shell_button_natural")).toBe(false);
  });
});

describe("dizMaterial", () => {
  it("shell button natural uses mother of pearl", () => {
    expect(dizMaterial("shell_button_natural")).toBe("mother_of_pearl");
  });
});

describe("bestUse", () => {
  it("ceramic bead round best for even roving pull", () => {
    expect(bestUse("ceramic_bead_round")).toBe("even_roving_pull");
  });
});

describe("dizTypes", () => {
  it("returns 5 types", () => {
    expect(dizTypes()).toHaveLength(5);
  });
});
