import { describe, it, expect } from "vitest";
import {
  capacity, range, speed, safety,
  dlCost, pitless, forColdStorage, operation,
  bestUse, dockLevelers,
} from "../dock-leveler-calc.js";

describe("capacity", () => {
  it("hydraulic highest capacity", () => {
    expect(capacity("hydraulic_push_button")).toBeGreaterThan(capacity("edge_of_dock_bumper"));
  });
});

describe("range", () => {
  it("vertical stored best range", () => {
    expect(range("vertical_stored_recessed")).toBeGreaterThan(range("edge_of_dock_bumper"));
  });
});

describe("speed", () => {
  it("edge of dock fastest", () => {
    expect(speed("edge_of_dock_bumper")).toBeGreaterThan(speed("mechanical_spring_pull"));
  });
});

describe("safety", () => {
  it("vertical stored safest", () => {
    expect(safety("vertical_stored_recessed")).toBeGreaterThan(safety("mechanical_spring_pull"));
  });
});

describe("dlCost", () => {
  it("vertical stored most expensive", () => {
    expect(dlCost("vertical_stored_recessed")).toBeGreaterThan(dlCost("mechanical_spring_pull"));
  });
});

describe("pitless", () => {
  it("edge of dock is pitless", () => {
    expect(pitless("edge_of_dock_bumper")).toBe(true);
  });
  it("hydraulic not pitless", () => {
    expect(pitless("hydraulic_push_button")).toBe(false);
  });
});

describe("forColdStorage", () => {
  it("vertical stored for cold storage", () => {
    expect(forColdStorage("vertical_stored_recessed")).toBe(true);
  });
  it("mechanical not for cold storage", () => {
    expect(forColdStorage("mechanical_spring_pull")).toBe(false);
  });
});

describe("operation", () => {
  it("air powered uses airbag inflate lift deck", () => {
    expect(operation("air_powered_bag_lift")).toBe("airbag_inflate_lift_deck");
  });
});

describe("bestUse", () => {
  it("hydraulic best for distribution center", () => {
    expect(bestUse("hydraulic_push_button")).toBe("distribution_center_high_traffic");
  });
});

describe("dockLevelers", () => {
  it("returns 5 types", () => {
    expect(dockLevelers()).toHaveLength(5);
  });
});
