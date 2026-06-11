import { describe, it, expect } from "vitest";
import {
  torque, response, wearFree, heatCapacity,
  ebCost, contactless, forVehicle, magnet,
  bestUse, eddyBrakeTypes,
} from "../eddy-brake-calc.js";

describe("torque", () => {
  it("dynamometer highest torque", () => {
    expect(torque("dynamometer_absorption")).toBeGreaterThan(torque("rotary_disc_permanent"));
  });
});

describe("response", () => {
  it("linear rail fastest response", () => {
    expect(response("linear_rail_magnetic")).toBeGreaterThan(response("dynamometer_absorption"));
  });
});

describe("wearFree", () => {
  it("all eddy brakes are wear free at high level", () => {
    expect(wearFree("linear_rail_magnetic")).toBeGreaterThan(8);
  });
});

describe("heatCapacity", () => {
  it("dynamometer highest heat capacity", () => {
    expect(heatCapacity("dynamometer_absorption")).toBeGreaterThan(heatCapacity("rotary_disc_permanent"));
  });
});

describe("ebCost", () => {
  it("dynamometer most expensive", () => {
    expect(ebCost("dynamometer_absorption")).toBeGreaterThan(ebCost("rotary_disc_permanent"));
  });
});

describe("contactless", () => {
  it("all eddy brakes are contactless", () => {
    expect(contactless("linear_rail_magnetic")).toBe(true);
  });
  it("roller coaster fin is contactless", () => {
    expect(contactless("roller_coaster_fin")).toBe(true);
  });
});

describe("forVehicle", () => {
  it("retarder for vehicle", () => {
    expect(forVehicle("retarder_truck_driveline")).toBe(true);
  });
  it("dynamometer not for vehicle", () => {
    expect(forVehicle("dynamometer_absorption")).toBe(false);
  });
});

describe("magnet", () => {
  it("rotary disc uses neodymium", () => {
    expect(magnet("rotary_disc_permanent")).toBe("neodymium_disc_array_air_gap");
  });
});

describe("bestUse", () => {
  it("roller coaster for amusement ride", () => {
    expect(bestUse("roller_coaster_fin")).toBe("amusement_ride_launch_stop_zone");
  });
});

describe("eddyBrakeTypes", () => {
  it("returns 5 types", () => {
    expect(eddyBrakeTypes()).toHaveLength(5);
  });
});
