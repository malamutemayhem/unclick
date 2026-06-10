import { describe, it, expect } from "vitest";
import {
  capacity, organization, compactness, spillProtect,
  bagCost, tsaReady, hangsUp, mainFabric,
  bestTrip, toiletryBags,
} from "../toiletry-bag-calc.js";

describe("capacity", () => {
  it("hanging hook fold largest capacity", () => {
    expect(capacity("hanging_hook_fold")).toBeGreaterThan(capacity("clear_tsa_pouch"));
  });
});

describe("organization", () => {
  it("hanging hook fold best organized", () => {
    expect(organization("hanging_hook_fold")).toBeGreaterThan(organization("waterproof_dry_bag"));
  });
});

describe("compactness", () => {
  it("roll up compact most compact", () => {
    expect(compactness("roll_up_compact")).toBeGreaterThan(compactness("hanging_hook_fold"));
  });
});

describe("spillProtect", () => {
  it("waterproof dry bag best spill protection", () => {
    expect(spillProtect("waterproof_dry_bag")).toBeGreaterThan(spillProtect("clear_tsa_pouch"));
  });
});

describe("bagCost", () => {
  it("hanging hook fold most expensive", () => {
    expect(bagCost("hanging_hook_fold")).toBeGreaterThan(bagCost("clear_tsa_pouch"));
  });
});

describe("tsaReady", () => {
  it("clear tsa pouch is tsa ready", () => {
    expect(tsaReady("clear_tsa_pouch")).toBe(true);
  });
  it("dopp kit classic is not", () => {
    expect(tsaReady("dopp_kit_classic")).toBe(false);
  });
});

describe("hangsUp", () => {
  it("hanging hook fold hangs up", () => {
    expect(hangsUp("hanging_hook_fold")).toBe(true);
  });
  it("dopp kit classic does not", () => {
    expect(hangsUp("dopp_kit_classic")).toBe(false);
  });
});

describe("mainFabric", () => {
  it("waterproof dry bag uses tpu welded seal", () => {
    expect(mainFabric("waterproof_dry_bag")).toBe("tpu_welded_seal");
  });
});

describe("bestTrip", () => {
  it("clear tsa pouch best for airport security check", () => {
    expect(bestTrip("clear_tsa_pouch")).toBe("airport_security_check");
  });
});

describe("toiletryBags", () => {
  it("returns 5 types", () => {
    expect(toiletryBags()).toHaveLength(5);
  });
});
