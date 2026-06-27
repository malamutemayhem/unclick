import { describe, it, expect } from "vitest";
import {
  pulpRemoval, beanDamage, waterUsage, throughput,
  cdCost, waterless, forWashed, depulperConfig,
  bestUse, coffeeDepulperTypes,
} from "../coffee-depulper-calc.js";

describe("pulpRemoval", () => {
  it("mechanical demucilager best pulp removal", () => {
    expect(pulpRemoval("mechanical_demucilager")).toBeGreaterThan(pulpRemoval("hand_crank"));
  });
});

describe("beanDamage", () => {
  it("hand crank least bean damage", () => {
    expect(beanDamage("hand_crank")).toBeGreaterThan(beanDamage("mechanical_demucilager"));
  });
});

describe("waterUsage", () => {
  it("hand crank best water usage", () => {
    expect(waterUsage("hand_crank")).toBeGreaterThan(waterUsage("disc_depulper"));
  });
});

describe("throughput", () => {
  it("drum depulper highest throughput", () => {
    expect(throughput("drum_depulper")).toBeGreaterThan(throughput("hand_crank"));
  });
});

describe("cdCost", () => {
  it("eco pulper most expensive", () => {
    expect(cdCost("eco_pulper")).toBeGreaterThan(cdCost("hand_crank"));
  });
});

describe("waterless", () => {
  it("hand crank is waterless", () => {
    expect(waterless("hand_crank")).toBe(true);
  });
  it("disc depulper not waterless", () => {
    expect(waterless("disc_depulper")).toBe(false);
  });
});

describe("forWashed", () => {
  it("all depulpers for washed process", () => {
    expect(forWashed("disc_depulper")).toBe(true);
    expect(forWashed("hand_crank")).toBe(true);
  });
});

describe("depulperConfig", () => {
  it("eco pulper uses low water mechanical mucilage", () => {
    expect(depulperConfig("eco_pulper")).toBe("eco_pulper_low_water_mechanical_mucilage_remove_combine_depulp");
  });
});

describe("bestUse", () => {
  it("hand crank for smallholder farm", () => {
    expect(bestUse("hand_crank")).toBe("smallholder_farm_hand_crank_depulper_micro_lot_cherry_pulp_manual");
  });
});

describe("coffeeDepulperTypes", () => {
  it("returns 5 types", () => {
    expect(coffeeDepulperTypes()).toHaveLength(5);
  });
});
