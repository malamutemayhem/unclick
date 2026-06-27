import { describe, it, expect } from "vitest";
import {
  weatherResist, packWeight, interiorSpace, setupSpeed,
  tentCost, freestanding, vestibule, poleType,
  bestTrip, tents,
} from "../tent-calc.js";

describe("weatherResist", () => {
  it("four season alpine best weather resistance", () => {
    expect(weatherResist("four_season_alpine")).toBeGreaterThan(weatherResist("pop_up_instant"));
  });
});

describe("packWeight", () => {
  it("backpacking ultra lightest pack weight", () => {
    expect(packWeight("backpacking_ultra")).toBeGreaterThan(packWeight("car_camping_family"));
  });
});

describe("interiorSpace", () => {
  it("car camping family most interior space", () => {
    expect(interiorSpace("car_camping_family")).toBeGreaterThan(interiorSpace("hammock_tarp"));
  });
});

describe("setupSpeed", () => {
  it("pop up instant fastest setup", () => {
    expect(setupSpeed("pop_up_instant")).toBeGreaterThan(setupSpeed("four_season_alpine"));
  });
});

describe("tentCost", () => {
  it("four season alpine most expensive", () => {
    expect(tentCost("four_season_alpine")).toBeGreaterThan(tentCost("pop_up_instant"));
  });
});

describe("freestanding", () => {
  it("backpacking ultra is freestanding", () => {
    expect(freestanding("backpacking_ultra")).toBe(true);
  });
  it("hammock tarp is not", () => {
    expect(freestanding("hammock_tarp")).toBe(false);
  });
});

describe("vestibule", () => {
  it("four season alpine has vestibule", () => {
    expect(vestibule("four_season_alpine")).toBe(true);
  });
  it("pop up instant does not", () => {
    expect(vestibule("pop_up_instant")).toBe(false);
  });
});

describe("poleType", () => {
  it("pop up instant uses spring loaded auto", () => {
    expect(poleType("pop_up_instant")).toBe("spring_loaded_auto");
  });
});

describe("bestTrip", () => {
  it("backpacking ultra for thru hike multi day", () => {
    expect(bestTrip("backpacking_ultra")).toBe("thru_hike_multi_day");
  });
});

describe("tents", () => {
  it("returns 5 types", () => {
    expect(tents()).toHaveLength(5);
  });
});
