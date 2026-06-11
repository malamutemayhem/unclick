import { describe, it, expect } from "vitest";
import {
  loadCapacity, tramSpeed, turnaroundTime, profileHeight,
  scCost, electric, forLowSeam, driveConfig,
  bestUse, shuttleCarTypes,
} from "../shuttle-car-calc.js";

describe("loadCapacity", () => {
  it("ram car largest load capacity", () => {
    expect(loadCapacity("ram_car")).toBeGreaterThan(loadCapacity("flexible_conveyor_train"));
  });
});

describe("tramSpeed", () => {
  it("flexible conveyor train fastest tram speed", () => {
    expect(tramSpeed("flexible_conveyor_train")).toBeGreaterThan(tramSpeed("ram_car"));
  });
});

describe("turnaroundTime", () => {
  it("flexible conveyor train best turnaround time", () => {
    expect(turnaroundTime("flexible_conveyor_train")).toBeGreaterThan(turnaroundTime("ram_car"));
  });
});

describe("profileHeight", () => {
  it("ram car tallest profile", () => {
    expect(profileHeight("ram_car")).toBeGreaterThan(profileHeight("diesel_underground"));
  });
});

describe("scCost", () => {
  it("flexible conveyor train most expensive", () => {
    expect(scCost("flexible_conveyor_train")).toBeGreaterThan(scCost("diesel_underground"));
  });
});

describe("electric", () => {
  it("battery electric is electric", () => {
    expect(electric("battery_electric")).toBe(true);
  });
  it("diesel underground not electric", () => {
    expect(electric("diesel_underground")).toBe(false);
  });
});

describe("forLowSeam", () => {
  it("flexible conveyor train for low seam", () => {
    expect(forLowSeam("flexible_conveyor_train")).toBe(true);
  });
  it("trailing cable not for low seam", () => {
    expect(forLowSeam("trailing_cable")).toBe(false);
  });
});

describe("driveConfig", () => {
  it("ram car uses hydraulic ram conveyor", () => {
    expect(driveConfig("ram_car")).toBe("hydraulic_ram_conveyor_floor_push_load_forward_discharge_dump");
  });
});

describe("bestUse", () => {
  it("diesel underground for hard rock mine", () => {
    expect(bestUse("diesel_underground")).toBe("hard_rock_mine_development_ore_haulage_diesel_permitted_area");
  });
});

describe("shuttleCarTypes", () => {
  it("returns 5 types", () => {
    expect(shuttleCarTypes()).toHaveLength(5);
  });
});
