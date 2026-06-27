import { describe, it, expect } from "vitest";
import {
  concealability, capacity, comfort, accessSpeed,
  beltCost, rfidProtection, waterResistant, beltMaterial,
  bestTrip, moneyBelts,
} from "../money-belt-calc.js";

describe("concealability", () => {
  it("under shirt flat most concealable", () => {
    expect(concealability("under_shirt_flat")).toBeGreaterThan(concealability("rfid_block_crossbody"));
  });
});

describe("capacity", () => {
  it("rfid block crossbody most capacity", () => {
    expect(capacity("rfid_block_crossbody")).toBeGreaterThan(capacity("leg_strap_hidden"));
  });
});

describe("comfort", () => {
  it("rfid block crossbody most comfortable", () => {
    expect(comfort("rfid_block_crossbody")).toBeGreaterThan(comfort("leg_strap_hidden"));
  });
});

describe("accessSpeed", () => {
  it("rfid block crossbody fastest access", () => {
    expect(accessSpeed("rfid_block_crossbody")).toBeGreaterThan(accessSpeed("leg_strap_hidden"));
  });
});

describe("beltCost", () => {
  it("rfid block crossbody most expensive", () => {
    expect(beltCost("rfid_block_crossbody")).toBeGreaterThan(beltCost("neck_wallet_lanyard"));
  });
});

describe("rfidProtection", () => {
  it("rfid block crossbody has rfid protection", () => {
    expect(rfidProtection("rfid_block_crossbody")).toBe(true);
  });
  it("under shirt flat does not", () => {
    expect(rfidProtection("under_shirt_flat")).toBe(false);
  });
});

describe("waterResistant", () => {
  it("under shirt flat is water resistant", () => {
    expect(waterResistant("under_shirt_flat")).toBe(true);
  });
  it("neck wallet lanyard is not", () => {
    expect(waterResistant("neck_wallet_lanyard")).toBe(false);
  });
});

describe("beltMaterial", () => {
  it("leg strap hidden uses elastic strap lycra pocket", () => {
    expect(beltMaterial("leg_strap_hidden")).toBe("elastic_strap_lycra_pocket");
  });
});

describe("bestTrip", () => {
  it("under shirt flat best for crowded city pickpocket risk", () => {
    expect(bestTrip("under_shirt_flat")).toBe("crowded_city_pickpocket_risk");
  });
});

describe("moneyBelts", () => {
  it("returns 5 types", () => {
    expect(moneyBelts()).toHaveLength(5);
  });
});
