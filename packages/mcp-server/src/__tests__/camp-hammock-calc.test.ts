import { describe, it, expect } from "vitest";
import {
  sleepComfort, packWeight, setupEase, weatherProtect,
  hammockCost, hasBugNet, flatLay, suspensionType,
  bestUse, campHammocks,
} from "../camp-hammock-calc.js";

describe("sleepComfort", () => {
  it("bridge flat lay most sleep comfort", () => {
    expect(sleepComfort("bridge_flat_lay")).toBeGreaterThan(sleepComfort("ultralight_single_layer"));
  });
});

describe("packWeight", () => {
  it("ultralight single layer lightest", () => {
    expect(packWeight("ultralight_single_layer")).toBeGreaterThan(packWeight("bridge_flat_lay"));
  });
});

describe("setupEase", () => {
  it("ultralight single layer easiest setup", () => {
    expect(setupEase("ultralight_single_layer")).toBeGreaterThan(setupEase("bridge_flat_lay"));
  });
});

describe("weatherProtect", () => {
  it("hammock tent bug net most weather protect", () => {
    expect(weatherProtect("hammock_tent_bug_net")).toBeGreaterThan(weatherProtect("ultralight_single_layer"));
  });
});

describe("hammockCost", () => {
  it("bridge flat lay more expensive than gathered end", () => {
    expect(hammockCost("bridge_flat_lay")).toBeGreaterThan(hammockCost("gathered_end_classic"));
  });
});

describe("hasBugNet", () => {
  it("hammock tent bug net has bug net", () => {
    expect(hasBugNet("hammock_tent_bug_net")).toBe(true);
  });
  it("parachute nylon double has no bug net", () => {
    expect(hasBugNet("parachute_nylon_double")).toBe(false);
  });
});

describe("flatLay", () => {
  it("bridge flat lay is flat lay", () => {
    expect(flatLay("bridge_flat_lay")).toBe(true);
  });
  it("gathered end classic is not flat lay", () => {
    expect(flatLay("gathered_end_classic")).toBe(false);
  });
});

describe("suspensionType", () => {
  it("ultralight single layer uses dyneema whoopie sling", () => {
    expect(suspensionType("ultralight_single_layer")).toBe("dyneema_whoopie_sling");
  });
});

describe("bestUse", () => {
  it("hammock tent bug net best for tropical forest camp", () => {
    expect(bestUse("hammock_tent_bug_net")).toBe("tropical_forest_camp");
  });
});

describe("campHammocks", () => {
  it("returns 5 types", () => {
    expect(campHammocks()).toHaveLength(5);
  });
});
