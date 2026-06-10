import { describe, it, expect } from "vitest";
import {
  lineFineness, flowControl, handComfort, capacity,
  trailCost, refillable, forFine, tipSize,
  bestUse, slipTrails,
} from "../slip-trail-calc.js";

describe("lineFineness", () => {
  it("syringe fine needle finest line", () => {
    expect(lineFineness("syringe_fine_needle")).toBeGreaterThan(lineFineness("bag_cone_pastry"));
  });
});

describe("flowControl", () => {
  it("syringe fine needle best flow control", () => {
    expect(flowControl("syringe_fine_needle")).toBeGreaterThan(flowControl("bag_cone_pastry"));
  });
});

describe("handComfort", () => {
  it("pump action press most comfortable", () => {
    expect(handComfort("pump_action_press")).toBeGreaterThan(handComfort("syringe_fine_needle"));
  });
});

describe("capacity", () => {
  it("bag cone pastry largest capacity", () => {
    expect(capacity("bag_cone_pastry")).toBeGreaterThan(capacity("syringe_fine_needle"));
  });
});

describe("trailCost", () => {
  it("pump action press most expensive", () => {
    expect(trailCost("pump_action_press")).toBeGreaterThan(trailCost("bag_cone_pastry"));
  });
});

describe("refillable", () => {
  it("bulb squeeze rubber is refillable", () => {
    expect(refillable("bulb_squeeze_rubber")).toBe(true);
  });
  it("bag cone pastry not refillable", () => {
    expect(refillable("bag_cone_pastry")).toBe(false);
  });
});

describe("forFine", () => {
  it("syringe fine needle is for fine", () => {
    expect(forFine("syringe_fine_needle")).toBe(true);
  });
  it("bulb squeeze rubber not for fine", () => {
    expect(forFine("bulb_squeeze_rubber")).toBe(false);
  });
});

describe("tipSize", () => {
  it("syringe fine needle uses needle gauge fine", () => {
    expect(tipSize("syringe_fine_needle")).toBe("needle_gauge_fine");
  });
});

describe("bestUse", () => {
  it("syringe fine needle best for hairline detail work", () => {
    expect(bestUse("syringe_fine_needle")).toBe("hairline_detail_work");
  });
});

describe("slipTrails", () => {
  it("returns 5 types", () => {
    expect(slipTrails()).toHaveLength(5);
  });
});
