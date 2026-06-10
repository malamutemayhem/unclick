import { describe, it, expect } from "vitest";
import {
  protection, cardSlots, styleScore, concealability,
  holderCost, rfidProtection, trackable, outerMaterial,
  bestTraveler, passportHolders,
} from "../passport-holder-calc.js";

describe("protection", () => {
  it("rfid blocking best protection", () => {
    expect(protection("rfid_blocking")).toBeGreaterThan(protection("leather_classic"));
  });
});

describe("cardSlots", () => {
  it("family organizer most card slots", () => {
    expect(cardSlots("family_organizer")).toBeGreaterThan(cardSlots("neck_wallet_hidden"));
  });
});

describe("styleScore", () => {
  it("leather classic most stylish", () => {
    expect(styleScore("leather_classic")).toBeGreaterThan(styleScore("neck_wallet_hidden"));
  });
});

describe("concealability", () => {
  it("neck wallet hidden most concealable", () => {
    expect(concealability("neck_wallet_hidden")).toBeGreaterThan(concealability("leather_classic"));
  });
});

describe("holderCost", () => {
  it("tech smart tag most expensive", () => {
    expect(holderCost("tech_smart_tag")).toBeGreaterThan(holderCost("neck_wallet_hidden"));
  });
});

describe("rfidProtection", () => {
  it("rfid blocking has rfid protection", () => {
    expect(rfidProtection("rfid_blocking")).toBe(true);
  });
  it("leather classic does not", () => {
    expect(rfidProtection("leather_classic")).toBe(false);
  });
});

describe("trackable", () => {
  it("tech smart tag is trackable", () => {
    expect(trackable("tech_smart_tag")).toBe(true);
  });
  it("rfid blocking is not", () => {
    expect(trackable("rfid_blocking")).toBe(false);
  });
});

describe("outerMaterial", () => {
  it("leather classic uses full grain leather", () => {
    expect(outerMaterial("leather_classic")).toBe("full_grain_leather");
  });
});

describe("bestTraveler", () => {
  it("neck wallet hidden for backpacker crowded city", () => {
    expect(bestTraveler("neck_wallet_hidden")).toBe("backpacker_crowded_city");
  });
});

describe("passportHolders", () => {
  it("returns 5 types", () => {
    expect(passportHolders()).toHaveLength(5);
  });
});
