import { describe, it, expect } from "vitest";
import {
  smoothFinish, controlFine, flexibility, sizeRange,
  trowelCost, flexible, rounded, bladeStyle,
  bestUse, plasterTrowels,
} from "../plaster-trowel-calc.js";

describe("smoothFinish", () => {
  it("venetian trowel flex smoothest finish", () => {
    expect(smoothFinish("venetian_trowel_flex")).toBeGreaterThan(smoothFinish("margin_trowel_small"));
  });
});

describe("controlFine", () => {
  it("japanese trowel thin finest control", () => {
    expect(controlFine("japanese_trowel_thin")).toBeGreaterThan(controlFine("pool_trowel_round"));
  });
});

describe("flexibility", () => {
  it("venetian trowel flex most flexible", () => {
    expect(flexibility("venetian_trowel_flex")).toBeGreaterThan(flexibility("margin_trowel_small"));
  });
});

describe("sizeRange", () => {
  it("finishing trowel flat widest size range", () => {
    expect(sizeRange("finishing_trowel_flat")).toBeGreaterThan(sizeRange("margin_trowel_small"));
  });
});

describe("trowelCost", () => {
  it("japanese trowel thin most expensive", () => {
    expect(trowelCost("japanese_trowel_thin")).toBeGreaterThan(trowelCost("margin_trowel_small"));
  });
});

describe("flexible", () => {
  it("venetian trowel flex is flexible", () => {
    expect(flexible("venetian_trowel_flex")).toBe(true);
  });
  it("finishing trowel flat not flexible", () => {
    expect(flexible("finishing_trowel_flat")).toBe(false);
  });
});

describe("rounded", () => {
  it("pool trowel round is rounded", () => {
    expect(rounded("pool_trowel_round")).toBe(true);
  });
  it("venetian trowel flex not rounded", () => {
    expect(rounded("venetian_trowel_flex")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("japanese trowel thin uses ultra thin blade", () => {
    expect(bladeStyle("japanese_trowel_thin")).toBe("ultra_thin_blade");
  });
});

describe("bestUse", () => {
  it("finishing trowel flat best for general smooth finish", () => {
    expect(bestUse("finishing_trowel_flat")).toBe("general_smooth_finish");
  });
});

describe("plasterTrowels", () => {
  it("returns 5 types", () => {
    expect(plasterTrowels()).toHaveLength(5);
  });
});
