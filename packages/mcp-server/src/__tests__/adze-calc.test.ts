import { describe, it, expect } from "vitest";
import {
  choppingPower, hollowAbility, surfaceFinish, handleLength,
  adzeCost, oneHand, curvedBlade, headWeight,
  bestUse, adzes,
} from "../adze-calc.js";

describe("choppingPower", () => {
  it("ship adze flat strongest chopping", () => {
    expect(choppingPower("ship_adze_flat")).toBeGreaterThan(choppingPower("hand_adze_short"));
  });
});

describe("hollowAbility", () => {
  it("gutter adze curved best hollow ability", () => {
    expect(hollowAbility("gutter_adze_curved")).toBeGreaterThan(hollowAbility("ship_adze_flat"));
  });
});

describe("surfaceFinish", () => {
  it("ship adze flat best surface finish", () => {
    expect(surfaceFinish("ship_adze_flat")).toBeGreaterThan(surfaceFinish("foot_adze_long"));
  });
});

describe("handleLength", () => {
  it("ship adze flat longest handle", () => {
    expect(handleLength("ship_adze_flat")).toBeGreaterThan(handleLength("hand_adze_short"));
  });
});

describe("adzeCost", () => {
  it("foot adze long more expensive than hand", () => {
    expect(adzeCost("foot_adze_long")).toBeGreaterThan(adzeCost("hand_adze_short"));
  });
});

describe("oneHand", () => {
  it("hand adze short is one hand", () => {
    expect(oneHand("hand_adze_short")).toBe(true);
  });
  it("foot adze long not one hand", () => {
    expect(oneHand("foot_adze_long")).toBe(false);
  });
});

describe("curvedBlade", () => {
  it("gutter adze curved has curved blade", () => {
    expect(curvedBlade("gutter_adze_curved")).toBe(true);
  });
  it("hand adze short no curved blade", () => {
    expect(curvedBlade("hand_adze_short")).toBe(false);
  });
});

describe("headWeight", () => {
  it("hand adze short uses light forged head", () => {
    expect(headWeight("hand_adze_short")).toBe("light_forged_head");
  });
});

describe("bestUse", () => {
  it("gutter adze curved best for trough gutter carve", () => {
    expect(bestUse("gutter_adze_curved")).toBe("trough_gutter_carve");
  });
});

describe("adzes", () => {
  it("returns 5 types", () => {
    expect(adzes()).toHaveLength(5);
  });
});
