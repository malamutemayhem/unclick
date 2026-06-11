import { describe, it, expect } from "vitest";
import {
  feel, precision, efficiency, assist,
  srCost, electric, forSuv, mechanism,
  bestUse, steeringRackTypes,
} from "../steering-rack-type-calc.js";

describe("feel", () => {
  it("manual best feel", () => {
    expect(feel("manual_rack_pinion")).toBeGreaterThan(feel("recirculating_ball_gear"));
  });
});

describe("precision", () => {
  it("steer by wire most precise", () => {
    expect(precision("steer_by_wire_electronic")).toBeGreaterThan(precision("recirculating_ball_gear"));
  });
});

describe("efficiency", () => {
  it("manual most efficient", () => {
    expect(efficiency("manual_rack_pinion")).toBeGreaterThan(efficiency("hydraulic_power_rack"));
  });
});

describe("assist", () => {
  it("steer by wire most assist", () => {
    expect(assist("steer_by_wire_electronic")).toBeGreaterThan(assist("manual_rack_pinion"));
  });
});

describe("srCost", () => {
  it("steer by wire most expensive", () => {
    expect(srCost("steer_by_wire_electronic")).toBeGreaterThan(srCost("manual_rack_pinion"));
  });
});

describe("electric", () => {
  it("eps is electric", () => {
    expect(electric("electric_power_eps")).toBe(true);
  });
  it("hydraulic not electric", () => {
    expect(electric("hydraulic_power_rack")).toBe(false);
  });
});

describe("forSuv", () => {
  it("hydraulic for suv", () => {
    expect(forSuv("hydraulic_power_rack")).toBe(true);
  });
  it("manual not for suv", () => {
    expect(forSuv("manual_rack_pinion")).toBe(false);
  });
});

describe("mechanism", () => {
  it("steer by wire uses motor actuator", () => {
    expect(mechanism("steer_by_wire_electronic")).toBe("motor_actuator_no_mechanical_link");
  });
});

describe("bestUse", () => {
  it("manual for lightweight sports car", () => {
    expect(bestUse("manual_rack_pinion")).toBe("lightweight_sports_car_go_kart");
  });
});

describe("steeringRackTypes", () => {
  it("returns 5 types", () => {
    expect(steeringRackTypes()).toHaveLength(5);
  });
});
