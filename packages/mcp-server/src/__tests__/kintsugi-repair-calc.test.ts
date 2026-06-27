import { describe, it, expect } from "vitest";
import {
  bondStrength, finishBeauty, durability, workTime,
  repairCost, traditional, precious, metalPowder,
  bestUse, kintsugiRepairs,
} from "../kintsugi-repair-calc.js";

describe("bondStrength", () => {
  it("epoxy gold modern strongest bond", () => {
    expect(bondStrength("epoxy_gold_modern")).toBeGreaterThan(bondStrength("urushi_gold_traditional"));
  });
});

describe("finishBeauty", () => {
  it("urushi gold traditional most beautiful finish", () => {
    expect(finishBeauty("urushi_gold_traditional")).toBeGreaterThan(finishBeauty("synthetic_lacquer_quick"));
  });
});

describe("durability", () => {
  it("urushi gold traditional most durable", () => {
    expect(durability("urushi_gold_traditional")).toBeGreaterThan(durability("synthetic_lacquer_quick"));
  });
});

describe("workTime", () => {
  it("synthetic lacquer quick fastest work time", () => {
    expect(workTime("synthetic_lacquer_quick")).toBeGreaterThan(workTime("urushi_gold_traditional"));
  });
});

describe("repairCost", () => {
  it("urushi gold traditional most expensive", () => {
    expect(repairCost("urushi_gold_traditional")).toBeGreaterThan(repairCost("synthetic_lacquer_quick"));
  });
});

describe("traditional", () => {
  it("urushi gold traditional is traditional", () => {
    expect(traditional("urushi_gold_traditional")).toBe(true);
  });
  it("epoxy gold modern not traditional", () => {
    expect(traditional("epoxy_gold_modern")).toBe(false);
  });
});

describe("precious", () => {
  it("silver powder subtle is precious", () => {
    expect(precious("silver_powder_subtle")).toBe(true);
  });
  it("copper powder warm not precious", () => {
    expect(precious("copper_powder_warm")).toBe(false);
  });
});

describe("metalPowder", () => {
  it("urushi gold traditional uses pure gold powder", () => {
    expect(metalPowder("urushi_gold_traditional")).toBe("pure_gold_powder");
  });
});

describe("bestUse", () => {
  it("urushi gold traditional best for museum quality repair", () => {
    expect(bestUse("urushi_gold_traditional")).toBe("museum_quality_repair");
  });
});

describe("kintsugiRepairs", () => {
  it("returns 5 types", () => {
    expect(kintsugiRepairs()).toHaveLength(5);
  });
});
