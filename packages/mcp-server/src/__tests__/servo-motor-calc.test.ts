import { describe, it, expect } from "vitest";
import {
  torqueOutput, speedResponse, positionAccuracy, durability,
  servoCost, digital, continuous, gearType,
  bestUse, servoMotors,
} from "../servo-motor-calc.js";

describe("torqueOutput", () => {
  it("digital high torque most torque", () => {
    expect(torqueOutput("digital_high_torque")).toBeGreaterThan(torqueOutput("micro_servo_compact"));
  });
});

describe("speedResponse", () => {
  it("coreless precision fastest response", () => {
    expect(speedResponse("coreless_precision")).toBeGreaterThan(speedResponse("standard_hobby_analog"));
  });
});

describe("positionAccuracy", () => {
  it("coreless precision most accurate position", () => {
    expect(positionAccuracy("coreless_precision")).toBeGreaterThan(positionAccuracy("continuous_rotation"));
  });
});

describe("durability", () => {
  it("digital high torque most durable", () => {
    expect(durability("digital_high_torque")).toBeGreaterThan(durability("micro_servo_compact"));
  });
});

describe("servoCost", () => {
  it("coreless precision most expensive", () => {
    expect(servoCost("coreless_precision")).toBeGreaterThan(servoCost("standard_hobby_analog"));
  });
});

describe("digital", () => {
  it("digital high torque is digital", () => {
    expect(digital("digital_high_torque")).toBe(true);
  });
  it("standard hobby analog not digital", () => {
    expect(digital("standard_hobby_analog")).toBe(false);
  });
});

describe("continuous", () => {
  it("continuous rotation is continuous", () => {
    expect(continuous("continuous_rotation")).toBe(true);
  });
  it("digital high torque not continuous", () => {
    expect(continuous("digital_high_torque")).toBe(false);
  });
});

describe("gearType", () => {
  it("coreless precision uses titanium gear set", () => {
    expect(gearType("coreless_precision")).toBe("titanium_gear_set");
  });
});

describe("bestUse", () => {
  it("continuous rotation best for wheel drive spin", () => {
    expect(bestUse("continuous_rotation")).toBe("wheel_drive_spin");
  });
});

describe("servoMotors", () => {
  it("returns 5 types", () => {
    expect(servoMotors()).toHaveLength(5);
  });
});
