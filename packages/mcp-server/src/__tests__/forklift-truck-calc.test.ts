import { describe, it, expect } from "vitest";
import {
  liftCapacity, liftHeight, maneuverability, throughput,
  ftCost, electric, forOutdoor, chassis,
  bestUse, forkliftTruckTypes,
} from "../forklift-truck-calc.js";

describe("liftCapacity", () => {
  it("telehandler rough highest capacity", () => {
    expect(liftCapacity("telehandler_rough")).toBeGreaterThan(liftCapacity("order_picker_high"));
  });
});

describe("liftHeight", () => {
  it("reach truck narrow highest lift", () => {
    expect(liftHeight("reach_truck_narrow")).toBeGreaterThan(liftHeight("counterbalance_electric"));
  });
});

describe("maneuverability", () => {
  it("reach truck narrow best maneuverability", () => {
    expect(maneuverability("reach_truck_narrow")).toBeGreaterThan(maneuverability("telehandler_rough"));
  });
});

describe("throughput", () => {
  it("counterbalance electric highest throughput", () => {
    expect(throughput("counterbalance_electric")).toBeGreaterThan(throughput("telehandler_rough"));
  });
});

describe("ftCost", () => {
  it("telehandler rough most expensive", () => {
    expect(ftCost("telehandler_rough")).toBeGreaterThan(ftCost("counterbalance_electric"));
  });
});

describe("electric", () => {
  it("counterbalance is electric", () => {
    expect(electric("counterbalance_electric")).toBe(true);
  });
  it("side loader not electric", () => {
    expect(electric("side_loader_long")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("telehandler rough for outdoor", () => {
    expect(forOutdoor("telehandler_rough")).toBe(true);
  });
  it("reach truck not for outdoor", () => {
    expect(forOutdoor("reach_truck_narrow")).toBe(false);
  });
});

describe("chassis", () => {
  it("reach truck uses pantograph", () => {
    expect(chassis("reach_truck_narrow")).toBe("pantograph_reach_mast_narrow_aisle_outrigger_leg");
  });
});

describe("bestUse", () => {
  it("order picker for each pick fulfillment", () => {
    expect(bestUse("order_picker_high")).toBe("each_pick_fulfillment_high_bay_case_selection");
  });
});

describe("forkliftTruckTypes", () => {
  it("returns 5 types", () => {
    expect(forkliftTruckTypes()).toHaveLength(5);
  });
});
