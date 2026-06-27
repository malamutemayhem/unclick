import { describe, it, expect } from "vitest";
import {
  payload, speed, fuelEfficiency, gradeability,
  htCost, electricDrive, forOpenPit, drivetrain,
  bestUse, haulTruckTypes,
} from "../haul-truck-calc.js";

describe("payload", () => {
  it("rigid frame highest payload", () => {
    expect(payload("rigid_frame")).toBeGreaterThan(payload("underground_ejector"));
  });
});

describe("speed", () => {
  it("articulated fastest", () => {
    expect(speed("articulated")).toBeGreaterThan(speed("underground_ejector"));
  });
});

describe("fuelEfficiency", () => {
  it("autonomous most fuel efficient", () => {
    expect(fuelEfficiency("autonomous")).toBeGreaterThan(fuelEfficiency("rigid_frame"));
  });
});

describe("gradeability", () => {
  it("underground ejector best gradeability", () => {
    expect(gradeability("underground_ejector")).toBeGreaterThan(gradeability("rigid_frame"));
  });
});

describe("htCost", () => {
  it("electric drive most expensive", () => {
    expect(htCost("electric_drive")).toBeGreaterThan(htCost("underground_ejector"));
  });
});

describe("electricDrive", () => {
  it("electric drive is electric", () => {
    expect(electricDrive("electric_drive")).toBe(true);
  });
  it("rigid frame not electric", () => {
    expect(electricDrive("rigid_frame")).toBe(false);
  });
});

describe("forOpenPit", () => {
  it("rigid frame for open pit", () => {
    expect(forOpenPit("rigid_frame")).toBe(true);
  });
  it("underground ejector not for open pit", () => {
    expect(forOpenPit("underground_ejector")).toBe(false);
  });
});

describe("drivetrain", () => {
  it("autonomous uses autonomous navigation", () => {
    expect(drivetrain("autonomous")).toBe("autonomous_navigation_gps_radar_lidar_no_operator_24_7");
  });
});

describe("bestUse", () => {
  it("electric drive for ultra class mine", () => {
    expect(bestUse("electric_drive")).toBe("ultra_class_mine_300_plus_ton_payload_deep_pit_long_ramp");
  });
});

describe("haulTruckTypes", () => {
  it("returns 5 types", () => {
    expect(haulTruckTypes()).toHaveLength(5);
  });
});
