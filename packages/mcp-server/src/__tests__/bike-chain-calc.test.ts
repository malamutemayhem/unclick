import { describe, it, expect } from "vitest";
import {
  durability, shiftSmoothness, weightSave, stretchResist,
  chainCost, quickLink, directionSpecific, pinMaterial,
  bestBike, bikeChains,
} from "../bike-chain-calc.js";

describe("durability", () => {
  it("ebike reinforced heavy most durable", () => {
    expect(durability("ebike_reinforced_heavy")).toBeGreaterThan(durability("road_11_speed_light"));
  });
});

describe("shiftSmoothness", () => {
  it("road 11 speed light smoothest shifting", () => {
    expect(shiftSmoothness("road_11_speed_light")).toBeGreaterThan(shiftSmoothness("single_speed_bmx"));
  });
});

describe("weightSave", () => {
  it("road 11 speed light lightest", () => {
    expect(weightSave("road_11_speed_light")).toBeGreaterThan(weightSave("ebike_reinforced_heavy"));
  });
});

describe("stretchResist", () => {
  it("ebike reinforced heavy most stretch resistant", () => {
    expect(stretchResist("ebike_reinforced_heavy")).toBeGreaterThan(stretchResist("half_link_custom"));
  });
});

describe("chainCost", () => {
  it("road 11 speed light most expensive", () => {
    expect(chainCost("road_11_speed_light")).toBeGreaterThan(chainCost("single_speed_bmx"));
  });
});

describe("quickLink", () => {
  it("single speed bmx has quick link", () => {
    expect(quickLink("single_speed_bmx")).toBe(true);
  });
  it("half link custom does not", () => {
    expect(quickLink("half_link_custom")).toBe(false);
  });
});

describe("directionSpecific", () => {
  it("road 11 speed light is direction specific", () => {
    expect(directionSpecific("road_11_speed_light")).toBe(true);
  });
  it("multi speed 8 chain is not", () => {
    expect(directionSpecific("multi_speed_8_chain")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("road 11 speed light uses hollow titanium pin", () => {
    expect(pinMaterial("road_11_speed_light")).toBe("hollow_titanium_pin");
  });
});

describe("bestBike", () => {
  it("ebike reinforced heavy best for electric cargo assist", () => {
    expect(bestBike("ebike_reinforced_heavy")).toBe("electric_cargo_assist");
  });
});

describe("bikeChains", () => {
  it("returns 5 types", () => {
    expect(bikeChains()).toHaveLength(5);
  });
});
