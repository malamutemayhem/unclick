import { describe, it, expect } from "vitest";
import {
  comfort, portability, weightCapacity, weatherResist,
  hammockCost, needsTrees, twoPerson, fabricType,
  bestSetup, hammocks,
} from "../hammock-calc.js";

describe("comfort", () => {
  it("fabric quilted pad most comfortable", () => {
    expect(comfort("fabric_quilted_pad")).toBeGreaterThan(comfort("camping_nylon_ultra"));
  });
});

describe("portability", () => {
  it("camping nylon ultra most portable", () => {
    expect(portability("camping_nylon_ultra")).toBeGreaterThan(portability("stand_frame_combo"));
  });
});

describe("weightCapacity", () => {
  it("stand frame combo highest weight capacity", () => {
    expect(weightCapacity("stand_frame_combo")).toBeGreaterThan(weightCapacity("camping_nylon_ultra"));
  });
});

describe("weatherResist", () => {
  it("camping nylon ultra best weather resistance", () => {
    expect(weatherResist("camping_nylon_ultra")).toBeGreaterThan(weatherResist("rope_cotton_spread"));
  });
});

describe("hammockCost", () => {
  it("stand frame combo most expensive", () => {
    expect(hammockCost("stand_frame_combo")).toBeGreaterThan(hammockCost("rope_cotton_spread"));
  });
});

describe("needsTrees", () => {
  it("rope cotton spread needs trees", () => {
    expect(needsTrees("rope_cotton_spread")).toBe(true);
  });
  it("stand frame combo does not", () => {
    expect(needsTrees("stand_frame_combo")).toBe(false);
  });
});

describe("twoPerson", () => {
  it("fabric quilted pad is two person", () => {
    expect(twoPerson("fabric_quilted_pad")).toBe(true);
  });
  it("camping nylon ultra is not", () => {
    expect(twoPerson("camping_nylon_ultra")).toBe(false);
  });
});

describe("fabricType", () => {
  it("camping nylon ultra uses ripstop nylon parachute", () => {
    expect(fabricType("camping_nylon_ultra")).toBe("ripstop_nylon_parachute");
  });
});

describe("bestSetup", () => {
  it("stand frame combo best for apartment balcony deck", () => {
    expect(bestSetup("stand_frame_combo")).toBe("apartment_balcony_deck");
  });
});

describe("hammocks", () => {
  it("returns 5 types", () => {
    expect(hammocks()).toHaveLength(5);
  });
});
