import { describe, it, expect } from "vitest";
import {
  crystalPurity, throughput, crystalDamage, molassesRemoval,
  scCost, continuous, forWhite, centrifugeConfig,
  bestUse, sugarCentrifugeTypes,
} from "../sugar-centrifuge-calc.js";

describe("crystalPurity", () => {
  it("batch basket best crystal purity", () => {
    expect(crystalPurity("batch_basket")).toBeGreaterThan(crystalPurity("continuous_conical"));
  });
});

describe("throughput", () => {
  it("continuous conical highest throughput", () => {
    expect(throughput("continuous_conical")).toBeGreaterThan(throughput("batch_basket"));
  });
});

describe("crystalDamage", () => {
  it("disc separator least crystal damage", () => {
    expect(crystalDamage("disc_separator")).toBeGreaterThan(crystalDamage("screen_scroll"));
  });
});

describe("molassesRemoval", () => {
  it("batch basket best molasses removal", () => {
    expect(molassesRemoval("batch_basket")).toBeGreaterThan(molassesRemoval("continuous_conical"));
  });
});

describe("scCost", () => {
  it("disc separator most expensive", () => {
    expect(scCost("disc_separator")).toBeGreaterThan(scCost("batch_basket"));
  });
});

describe("continuous", () => {
  it("continuous conical is continuous", () => {
    expect(continuous("continuous_conical")).toBe(true);
  });
  it("batch basket not continuous", () => {
    expect(continuous("batch_basket")).toBe(false);
  });
});

describe("forWhite", () => {
  it("batch basket for white sugar", () => {
    expect(forWhite("batch_basket")).toBe(true);
  });
  it("continuous conical not for white", () => {
    expect(forWhite("continuous_conical")).toBe(false);
  });
});

describe("centrifugeConfig", () => {
  it("pusher centrifuge uses reciprocating piston push", () => {
    expect(centrifugeConfig("pusher_centrifuge")).toBe("pusher_centrifuge_sugar_reciprocating_piston_push_crystal_discharge");
  });
});

describe("bestUse", () => {
  it("batch basket for white sugar refinery", () => {
    expect(bestUse("batch_basket")).toBe("white_sugar_refinery_batch_basket_centrifuge_high_purity_crystal");
  });
});

describe("sugarCentrifugeTypes", () => {
  it("returns 5 types", () => {
    expect(sugarCentrifugeTypes()).toHaveLength(5);
  });
});
