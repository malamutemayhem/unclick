import { describe, it, expect } from "vitest";
import {
  compaction, depth, speed, versatility,
  rcCost, vibratory, forAsphalt, drum,
  bestUse, rollerCompactorTypes,
} from "../roller-compactor-calc.js";

describe("compaction", () => {
  it("vibratory drum best compaction", () => {
    expect(compaction("vibratory_single_drum")).toBeGreaterThan(compaction("smooth_drum_static"));
  });
});

describe("depth", () => {
  it("vibratory deepest compaction", () => {
    expect(depth("vibratory_single_drum")).toBeGreaterThan(depth("smooth_drum_static"));
  });
});

describe("speed", () => {
  it("vibratory fastest", () => {
    expect(speed("vibratory_single_drum")).toBeGreaterThan(speed("sheepsfoot_padfoot_drum"));
  });
});

describe("versatility", () => {
  it("combination most versatile", () => {
    expect(versatility("combination_padfoot_smooth")).toBeGreaterThan(versatility("sheepsfoot_padfoot_drum"));
  });
});

describe("rcCost", () => {
  it("combination most expensive", () => {
    expect(rcCost("combination_padfoot_smooth")).toBeGreaterThan(rcCost("smooth_drum_static"));
  });
});

describe("vibratory", () => {
  it("vibratory drum is vibratory", () => {
    expect(vibratory("vibratory_single_drum")).toBe(true);
  });
  it("smooth drum not vibratory", () => {
    expect(vibratory("smooth_drum_static")).toBe(false);
  });
});

describe("forAsphalt", () => {
  it("smooth drum for asphalt", () => {
    expect(forAsphalt("smooth_drum_static")).toBe(true);
  });
  it("sheepsfoot not for asphalt", () => {
    expect(forAsphalt("sheepsfoot_padfoot_drum")).toBe(false);
  });
});

describe("drum", () => {
  it("sheepsfoot uses padfoot tamping", () => {
    expect(drum("sheepsfoot_padfoot_drum")).toBe("padfoot_protruding_tamping_feet");
  });
});

describe("bestUse", () => {
  it("smooth drum for asphalt finish", () => {
    expect(bestUse("smooth_drum_static")).toBe("asphalt_finish_roll_proof_roll");
  });
});

describe("rollerCompactorTypes", () => {
  it("returns 5 types", () => {
    expect(rollerCompactorTypes()).toHaveLength(5);
  });
});
