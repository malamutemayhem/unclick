import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, maintenance, flow,
  gtCost, automatic, forCommercial, separation,
  bestUse, greaseTrapTypes,
} from "../grease-trap-calc.js";

describe("capacity", () => {
  it("in ground largest capacity", () => {
    expect(capacity("gravity_in_ground_large")).toBeGreaterThan(capacity("point_of_use_compact"));
  });
});

describe("efficiency", () => {
  it("automatic most efficient", () => {
    expect(efficiency("automatic_timer_skim")).toBeGreaterThan(efficiency("passive_gravity_under_sink"));
  });
});

describe("maintenance", () => {
  it("automatic easiest maintenance", () => {
    expect(maintenance("automatic_timer_skim")).toBeGreaterThan(maintenance("gravity_in_ground_large"));
  });
});

describe("flow", () => {
  it("in ground highest flow", () => {
    expect(flow("gravity_in_ground_large")).toBeGreaterThan(flow("point_of_use_compact"));
  });
});

describe("gtCost", () => {
  it("automatic most expensive", () => {
    expect(gtCost("automatic_timer_skim")).toBeGreaterThan(gtCost("point_of_use_compact"));
  });
});

describe("automatic", () => {
  it("automatic timer is automatic", () => {
    expect(automatic("automatic_timer_skim")).toBe(true);
  });
  it("passive not automatic", () => {
    expect(automatic("passive_gravity_under_sink")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("in ground for commercial", () => {
    expect(forCommercial("gravity_in_ground_large")).toBe(true);
  });
  it("point of use not commercial", () => {
    expect(forCommercial("point_of_use_compact")).toBe(false);
  });
});

describe("separation", () => {
  it("hydromechanical uses flow control", () => {
    expect(separation("hydromechanical_flow_control")).toBe("flow_control_air_entrainment");
  });
});

describe("bestUse", () => {
  it("automatic for high volume", () => {
    expect(bestUse("automatic_timer_skim")).toBe("high_volume_kitchen_auto_removal");
  });
});

describe("greaseTrapTypes", () => {
  it("returns 5 types", () => {
    expect(greaseTrapTypes()).toHaveLength(5);
  });
});
