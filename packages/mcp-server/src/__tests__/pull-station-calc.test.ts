import { describe, it, expect } from "vitest";
import {
  activation, falseAlarm, ada, durability,
  psCost, addressable, forOutdoor, mechanism,
  bestUse, pullStationTypes,
} from "../pull-station-calc.js";

describe("activation", () => {
  it("single action easiest activation", () => {
    expect(activation("single_action_push")).toBeGreaterThan(activation("break_glass_uk_style"));
  });
});

describe("falseAlarm", () => {
  it("double action lowest false alarm", () => {
    expect(falseAlarm("double_action_lift_pull")).toBeGreaterThan(falseAlarm("single_action_push"));
  });
});

describe("ada", () => {
  it("single action best ada", () => {
    expect(ada("single_action_push")).toBeGreaterThan(ada("break_glass_uk_style"));
  });
});

describe("durability", () => {
  it("outdoor most durable", () => {
    expect(durability("outdoor_weatherproof")).toBeGreaterThan(durability("break_glass_uk_style"));
  });
});

describe("psCost", () => {
  it("addressable most expensive", () => {
    expect(psCost("addressable_coded")).toBeGreaterThan(psCost("single_action_push"));
  });
});

describe("addressable", () => {
  it("coded is addressable", () => {
    expect(addressable("addressable_coded")).toBe(true);
  });
  it("single action not addressable", () => {
    expect(addressable("single_action_push")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("weatherproof for outdoor", () => {
    expect(forOutdoor("outdoor_weatherproof")).toBe(true);
  });
  it("single action not outdoor", () => {
    expect(forOutdoor("single_action_push")).toBe(false);
  });
});

describe("mechanism", () => {
  it("double action uses lift cover", () => {
    expect(mechanism("double_action_lift_pull")).toBe("lift_cover_pull_handle_dual");
  });
});

describe("bestUse", () => {
  it("double action for school", () => {
    expect(bestUse("double_action_lift_pull")).toBe("school_public_false_alarm_risk");
  });
});

describe("pullStationTypes", () => {
  it("returns 5 types", () => {
    expect(pullStationTypes()).toHaveLength(5);
  });
});
