import { describe, it, expect } from "vitest";
import {
  oilYield, oilQuality, throughput, laborRequired,
  opCost, continuous, forPremium, pressConfig,
  bestUse, olivePressTypes,
} from "../olive-press-calc.js";

describe("oilYield", () => {
  it("screw press best oil yield", () => {
    expect(oilYield("screw_press")).toBeGreaterThan(oilYield("sinolea_drip"));
  });
});

describe("oilQuality", () => {
  it("percolation best oil quality", () => {
    expect(oilQuality("percolation")).toBeGreaterThan(oilQuality("screw_press"));
  });
});

describe("throughput", () => {
  it("screw press highest throughput", () => {
    expect(throughput("screw_press")).toBeGreaterThan(throughput("mat_stack"));
  });
});

describe("laborRequired", () => {
  it("sinolea drip most automated", () => {
    expect(laborRequired("sinolea_drip")).toBeGreaterThan(laborRequired("mat_stack"));
  });
});

describe("opCost", () => {
  it("sinolea drip most expensive", () => {
    expect(opCost("sinolea_drip")).toBeGreaterThan(opCost("mat_stack"));
  });
});

describe("continuous", () => {
  it("screw press is continuous", () => {
    expect(continuous("screw_press")).toBe(true);
  });
  it("mat stack not continuous", () => {
    expect(continuous("mat_stack")).toBe(false);
  });
});

describe("forPremium", () => {
  it("percolation for premium", () => {
    expect(forPremium("percolation")).toBe(true);
  });
  it("screw press not for premium", () => {
    expect(forPremium("screw_press")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("sinolea drip uses stainless blade paste contact", () => {
    expect(pressConfig("sinolea_drip")).toBe("sinolea_drip_olive_stainless_blade_paste_contact_oil_adhere_drain");
  });
});

describe("bestUse", () => {
  it("percolation for premium evoo selective extraction", () => {
    expect(bestUse("percolation")).toBe("premium_evoo_percolation_selective_extraction_first_drip_highest_quality");
  });
});

describe("olivePressTypes", () => {
  it("returns 5 types", () => {
    expect(olivePressTypes()).toHaveLength(5);
  });
});
