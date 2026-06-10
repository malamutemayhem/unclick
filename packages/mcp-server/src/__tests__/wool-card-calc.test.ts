import { describe, it, expect } from "vitest";
import {
  fiberAlign, batchSpeed, blendQuality, portability,
  cardCost, motorized, paired, teethType,
  bestUse, woolCards,
} from "../wool-card-calc.js";

describe("fiberAlign", () => {
  it("mini combs fine best fiber align", () => {
    expect(fiberAlign("mini_combs_fine")).toBeGreaterThan(fiberAlign("flick_carder_small"));
  });
});

describe("batchSpeed", () => {
  it("drum carder large fastest batch", () => {
    expect(batchSpeed("drum_carder_large")).toBeGreaterThan(batchSpeed("flat_hand_pair"));
  });
});

describe("blendQuality", () => {
  it("blending board flat best blend quality", () => {
    expect(blendQuality("blending_board_flat")).toBeGreaterThan(blendQuality("flick_carder_small"));
  });
});

describe("portability", () => {
  it("flick carder small most portable", () => {
    expect(portability("flick_carder_small")).toBeGreaterThan(portability("drum_carder_large"));
  });
});

describe("cardCost", () => {
  it("drum carder large most expensive", () => {
    expect(cardCost("drum_carder_large")).toBeGreaterThan(cardCost("flick_carder_small"));
  });
});

describe("motorized", () => {
  it("drum carder large is motorized", () => {
    expect(motorized("drum_carder_large")).toBe(true);
  });
  it("flat hand pair not motorized", () => {
    expect(motorized("flat_hand_pair")).toBe(false);
  });
});

describe("paired", () => {
  it("flat hand pair is paired", () => {
    expect(paired("flat_hand_pair")).toBe(true);
  });
  it("drum carder large not paired", () => {
    expect(paired("drum_carder_large")).toBe(false);
  });
});

describe("teethType", () => {
  it("flat hand pair uses bent wire cloth", () => {
    expect(teethType("flat_hand_pair")).toBe("bent_wire_cloth");
  });
});

describe("bestUse", () => {
  it("drum carder large best for bulk batt make", () => {
    expect(bestUse("drum_carder_large")).toBe("bulk_batt_make");
  });
});

describe("woolCards", () => {
  it("returns 5 types", () => {
    expect(woolCards()).toHaveLength(5);
  });
});
