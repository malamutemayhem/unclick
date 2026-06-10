import { describe, it, expect } from "vitest";
import {
  cuttingPower, cutPrecision, handFatigue, reach,
  prunerCost, oneHanded, replaceableBlade, bladeType,
  bestTask, pruners,
} from "../pruner-calc.js";

describe("cuttingPower", () => {
  it("electric cordless powered most cutting power", () => {
    expect(cuttingPower("electric_cordless_powered")).toBeGreaterThan(cuttingPower("bypass_hand_curved"));
  });
});

describe("cutPrecision", () => {
  it("bypass hand curved most precise", () => {
    expect(cutPrecision("bypass_hand_curved")).toBeGreaterThan(cutPrecision("pole_pruner_telescopic"));
  });
});

describe("handFatigue", () => {
  it("electric cordless powered least hand fatigue", () => {
    expect(handFatigue("electric_cordless_powered")).toBeGreaterThan(handFatigue("pole_pruner_telescopic"));
  });
});

describe("reach", () => {
  it("pole pruner telescopic longest reach", () => {
    expect(reach("pole_pruner_telescopic")).toBeGreaterThan(reach("bypass_hand_curved"));
  });
});

describe("prunerCost", () => {
  it("electric cordless powered most expensive", () => {
    expect(prunerCost("electric_cordless_powered")).toBeGreaterThan(prunerCost("bypass_hand_curved"));
  });
});

describe("oneHanded", () => {
  it("bypass hand curved is one handed", () => {
    expect(oneHanded("bypass_hand_curved")).toBe(true);
  });
  it("lopper long reach is not", () => {
    expect(oneHanded("lopper_long_reach")).toBe(false);
  });
});

describe("replaceableBlade", () => {
  it("bypass hand curved has replaceable blade", () => {
    expect(replaceableBlade("bypass_hand_curved")).toBe(true);
  });
  it("electric cordless powered does not", () => {
    expect(replaceableBlade("electric_cordless_powered")).toBe(false);
  });
});

describe("bladeType", () => {
  it("bypass hand curved uses curved bypass sk5 steel", () => {
    expect(bladeType("bypass_hand_curved")).toBe("curved_bypass_sk5_steel");
  });
});

describe("bestTask", () => {
  it("pole pruner telescopic best for high canopy tree trim", () => {
    expect(bestTask("pole_pruner_telescopic")).toBe("high_canopy_tree_trim");
  });
});

describe("pruners", () => {
  it("returns 5 types", () => {
    expect(pruners()).toHaveLength(5);
  });
});
