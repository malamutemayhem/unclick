import { describe, it, expect } from "vitest";
import {
  speed, capacity, grainGentle, energyEfficiency,
  geCost, enclosed, forVerticalLift, transport,
  bestUse, grainElevatorTypes,
} from "../grain-elevator-calc.js";

describe("speed", () => {
  it("belt conveyor fastest", () => {
    expect(speed("belt_conveyor")).toBeGreaterThan(speed("screw_auger"));
  });
});

describe("capacity", () => {
  it("belt conveyor highest capacity", () => {
    expect(capacity("belt_conveyor")).toBeGreaterThan(capacity("pneumatic_conveyor"));
  });
});

describe("grainGentle", () => {
  it("belt conveyor most gentle", () => {
    expect(grainGentle("belt_conveyor")).toBeGreaterThan(grainGentle("pneumatic_conveyor"));
  });
});

describe("energyEfficiency", () => {
  it("belt conveyor most energy efficient", () => {
    expect(energyEfficiency("belt_conveyor")).toBeGreaterThan(energyEfficiency("pneumatic_conveyor"));
  });
});

describe("geCost", () => {
  it("chain conveyor most expensive", () => {
    expect(geCost("chain_conveyor")).toBeGreaterThan(geCost("screw_auger"));
  });
});

describe("enclosed", () => {
  it("bucket elevator is enclosed", () => {
    expect(enclosed("bucket_elevator")).toBe(true);
  });
  it("belt conveyor not enclosed", () => {
    expect(enclosed("belt_conveyor")).toBe(false);
  });
});

describe("forVerticalLift", () => {
  it("bucket elevator for vertical lift", () => {
    expect(forVerticalLift("bucket_elevator")).toBe(true);
  });
  it("belt conveyor not for vertical lift", () => {
    expect(forVerticalLift("belt_conveyor")).toBe(false);
  });
});

describe("transport", () => {
  it("screw auger uses helical screw flight", () => {
    expect(transport("screw_auger")).toBe("helical_screw_flight_rotating_inside_tube_incline_move");
  });
});

describe("bestUse", () => {
  it("belt conveyor for port terminal", () => {
    expect(bestUse("belt_conveyor")).toBe("port_terminal_long_distance_high_volume_horizontal_transfer");
  });
});

describe("grainElevatorTypes", () => {
  it("returns 5 types", () => {
    expect(grainElevatorTypes()).toHaveLength(5);
  });
});
