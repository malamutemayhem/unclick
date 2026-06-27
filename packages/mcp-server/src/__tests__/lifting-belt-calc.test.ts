import { describe, it, expect } from "vitest";
import {
  backSupport, flexibility, quickOnOff, durability,
  beltCost, ipfApproved, hasChainAttach, closureType,
  bestLift, liftingBelts,
} from "../lifting-belt-calc.js";

describe("backSupport", () => {
  it("leather prong powerlifting most back support", () => {
    expect(backSupport("leather_prong_powerlifting")).toBeGreaterThan(backSupport("nylon_velcro_general"));
  });
});

describe("flexibility", () => {
  it("dip belt chain weighted most flexible", () => {
    expect(flexibility("dip_belt_chain_weighted")).toBeGreaterThan(flexibility("leather_prong_powerlifting"));
  });
});

describe("quickOnOff", () => {
  it("lever lock quick release fastest on off", () => {
    expect(quickOnOff("lever_lock_quick_release")).toBeGreaterThan(quickOnOff("leather_prong_powerlifting"));
  });
});

describe("durability", () => {
  it("leather prong powerlifting most durable", () => {
    expect(durability("leather_prong_powerlifting")).toBeGreaterThan(durability("nylon_velcro_general"));
  });
});

describe("beltCost", () => {
  it("leather prong powerlifting most expensive", () => {
    expect(beltCost("leather_prong_powerlifting")).toBeGreaterThan(beltCost("nylon_velcro_general"));
  });
});

describe("ipfApproved", () => {
  it("leather prong powerlifting is ipf approved", () => {
    expect(ipfApproved("leather_prong_powerlifting")).toBe(true);
  });
  it("nylon velcro general is not ipf approved", () => {
    expect(ipfApproved("nylon_velcro_general")).toBe(false);
  });
});

describe("hasChainAttach", () => {
  it("dip belt chain weighted has chain attach", () => {
    expect(hasChainAttach("dip_belt_chain_weighted")).toBe(true);
  });
  it("leather prong powerlifting has no chain attach", () => {
    expect(hasChainAttach("leather_prong_powerlifting")).toBe(false);
  });
});

describe("closureType", () => {
  it("lever lock quick release uses lever cam lock", () => {
    expect(closureType("lever_lock_quick_release")).toBe("lever_cam_lock");
  });
});

describe("bestLift", () => {
  it("nylon velcro general best for crossfit wod mixed", () => {
    expect(bestLift("nylon_velcro_general")).toBe("crossfit_wod_mixed");
  });
});

describe("liftingBelts", () => {
  it("returns 5 types", () => {
    expect(liftingBelts()).toHaveLength(5);
  });
});
