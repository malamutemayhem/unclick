import { describe, it, expect } from "vitest";
import {
  capacity, accessibility, security, comfort,
  slingCost, rfidBlock, hasChargePort, strapDesign,
  bestUse, slingBags,
} from "../sling-bag-calc.js";

describe("capacity", () => {
  it("tactical molle organizer largest capacity", () => {
    expect(capacity("tactical_molle_organizer")).toBeGreaterThan(capacity("mini_chest_compact"));
  });
});

describe("accessibility", () => {
  it("mini chest compact most accessible", () => {
    expect(accessibility("mini_chest_compact")).toBeGreaterThan(accessibility("anti_theft_hidden_zip"));
  });
});

describe("security", () => {
  it("anti theft hidden zip most secure", () => {
    expect(security("anti_theft_hidden_zip")).toBeGreaterThan(security("mini_chest_compact"));
  });
});

describe("comfort", () => {
  it("mini chest compact most comfortable", () => {
    expect(comfort("mini_chest_compact")).toBeGreaterThanOrEqual(comfort("crossbody_day_medium"));
  });
});

describe("slingCost", () => {
  it("anti theft hidden zip most expensive", () => {
    expect(slingCost("anti_theft_hidden_zip")).toBeGreaterThan(slingCost("mini_chest_compact"));
  });
});

describe("rfidBlock", () => {
  it("anti theft hidden zip has rfid blocking", () => {
    expect(rfidBlock("anti_theft_hidden_zip")).toBe(true);
  });
  it("mini chest compact has no rfid blocking", () => {
    expect(rfidBlock("mini_chest_compact")).toBe(false);
  });
});

describe("hasChargePort", () => {
  it("tech sling cable port has charge port", () => {
    expect(hasChargePort("tech_sling_cable_port")).toBe(true);
  });
  it("crossbody day medium has no charge port", () => {
    expect(hasChargePort("crossbody_day_medium")).toBe(false);
  });
});

describe("strapDesign", () => {
  it("anti theft hidden zip uses slash proof steel cable", () => {
    expect(strapDesign("anti_theft_hidden_zip")).toBe("slash_proof_steel_cable");
  });
});

describe("bestUse", () => {
  it("anti theft hidden zip best for crowded city transit", () => {
    expect(bestUse("anti_theft_hidden_zip")).toBe("crowded_city_transit");
  });
});

describe("slingBags", () => {
  it("returns 5 types", () => {
    expect(slingBags()).toHaveLength(5);
  });
});
