import { describe, it, expect } from "vitest";
import {
  cleaningPower, waterControl, installEase, spaceNeeded,
  bidetCost, heatedWater, airDry, nozzleType,
  bestSetup, bidets,
} from "../bidet-calc.js";

describe("cleaningPower", () => {
  it("smart integrated strongest cleaning", () => {
    expect(cleaningPower("smart_integrated")).toBeGreaterThan(cleaningPower("travel_portable"));
  });
});

describe("waterControl", () => {
  it("smart integrated best water control", () => {
    expect(waterControl("smart_integrated")).toBeGreaterThan(waterControl("handheld_sprayer"));
  });
});

describe("installEase", () => {
  it("travel portable easiest install", () => {
    expect(installEase("travel_portable")).toBeGreaterThan(installEase("standalone_ceramic"));
  });
});

describe("spaceNeeded", () => {
  it("standalone ceramic needs most space", () => {
    expect(spaceNeeded("standalone_ceramic")).toBeGreaterThan(spaceNeeded("toilet_seat_attach"));
  });
});

describe("bidetCost", () => {
  it("smart integrated most expensive", () => {
    expect(bidetCost("smart_integrated")).toBeGreaterThan(bidetCost("travel_portable"));
  });
});

describe("heatedWater", () => {
  it("toilet seat attach has heated water", () => {
    expect(heatedWater("toilet_seat_attach")).toBe(true);
  });
  it("handheld sprayer does not", () => {
    expect(heatedWater("handheld_sprayer")).toBe(false);
  });
});

describe("airDry", () => {
  it("smart integrated has air dry", () => {
    expect(airDry("smart_integrated")).toBe(true);
  });
  it("toilet seat attach does not", () => {
    expect(airDry("toilet_seat_attach")).toBe(false);
  });
});

describe("nozzleType", () => {
  it("smart integrated uses oscillating dual wand", () => {
    expect(nozzleType("smart_integrated")).toBe("oscillating_dual_wand");
  });
});

describe("bestSetup", () => {
  it("travel portable for camping hotel travel", () => {
    expect(bestSetup("travel_portable")).toBe("camping_hotel_travel");
  });
});

describe("bidets", () => {
  it("returns 5 types", () => {
    expect(bidets()).toHaveLength(5);
  });
});
