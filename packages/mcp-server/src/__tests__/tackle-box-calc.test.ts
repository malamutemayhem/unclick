import { describe, it, expect } from "vitest";
import {
  compartmentCount, waterResistance, carryComfort, organizationScore,
  boxCost, stackable, handsFree, closureType,
  bestTrip, tackleBoxes,
} from "../tackle-box-calc.js";

describe("compartmentCount", () => {
  it("boat mounted most compartments", () => {
    expect(compartmentCount("boat_mounted")).toBeGreaterThan(compartmentCount("hip_wader_pack"));
  });
});

describe("waterResistance", () => {
  it("boat mounted best water resistance", () => {
    expect(waterResistance("boat_mounted")).toBeGreaterThan(waterResistance("soft_bag_tackle"));
  });
});

describe("carryComfort", () => {
  it("backpack system most comfortable carry", () => {
    expect(carryComfort("backpack_system")).toBeGreaterThan(carryComfort("boat_mounted"));
  });
});

describe("organizationScore", () => {
  it("boat mounted best organization", () => {
    expect(organizationScore("boat_mounted")).toBeGreaterThan(organizationScore("hip_wader_pack"));
  });
});

describe("boxCost", () => {
  it("boat mounted most expensive", () => {
    expect(boxCost("boat_mounted")).toBeGreaterThan(boxCost("hard_tray_classic"));
  });
});

describe("stackable", () => {
  it("hard tray classic is stackable", () => {
    expect(stackable("hard_tray_classic")).toBe(true);
  });
  it("backpack system is not", () => {
    expect(stackable("backpack_system")).toBe(false);
  });
});

describe("handsFree", () => {
  it("backpack system is hands free", () => {
    expect(handsFree("backpack_system")).toBe(true);
  });
  it("hard tray classic is not", () => {
    expect(handsFree("hard_tray_classic")).toBe(false);
  });
});

describe("closureType", () => {
  it("hip wader pack uses magnetic flap quick access", () => {
    expect(closureType("hip_wader_pack")).toBe("magnetic_flap_quick_access");
  });
});

describe("bestTrip", () => {
  it("backpack system for hike in remote stream", () => {
    expect(bestTrip("backpack_system")).toBe("hike_in_remote_stream");
  });
});

describe("tackleBoxes", () => {
  it("returns 5 types", () => {
    expect(tackleBoxes()).toHaveLength(5);
  });
});
