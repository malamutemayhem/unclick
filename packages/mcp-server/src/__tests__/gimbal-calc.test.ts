import { describe, it, expect } from "vitest";
import {
  stabilization, payload, portability, batteryLife,
  gimbalCost, hasTracking, foldable, axisType,
  bestCamera, gimbals,
} from "../gimbal-calc.js";

describe("stabilization", () => {
  it("vest arm cinema best stabilization", () => {
    expect(stabilization("vest_arm_cinema")).toBeGreaterThan(stabilization("phone_single_axis"));
  });
});

describe("payload", () => {
  it("vest arm cinema highest payload", () => {
    expect(payload("vest_arm_cinema")).toBeGreaterThan(payload("phone_three_axis"));
  });
});

describe("portability", () => {
  it("phone single axis most portable", () => {
    expect(portability("phone_single_axis")).toBeGreaterThan(portability("vest_arm_cinema"));
  });
});

describe("batteryLife", () => {
  it("phone three axis best battery life", () => {
    expect(batteryLife("phone_three_axis")).toBeGreaterThan(batteryLife("vest_arm_cinema"));
  });
});

describe("gimbalCost", () => {
  it("vest arm cinema most expensive", () => {
    expect(gimbalCost("vest_arm_cinema")).toBeGreaterThan(gimbalCost("phone_single_axis"));
  });
});

describe("hasTracking", () => {
  it("phone three axis has tracking", () => {
    expect(hasTracking("phone_three_axis")).toBe(true);
  });
  it("phone single axis has no tracking", () => {
    expect(hasTracking("phone_single_axis")).toBe(false);
  });
});

describe("foldable", () => {
  it("phone three axis is foldable", () => {
    expect(foldable("phone_three_axis")).toBe(true);
  });
  it("camera dslr heavy is not foldable", () => {
    expect(foldable("camera_dslr_heavy")).toBe(false);
  });
});

describe("axisType", () => {
  it("vest arm cinema uses spring arm vest iso", () => {
    expect(axisType("vest_arm_cinema")).toBe("spring_arm_vest_iso");
  });
});

describe("bestCamera", () => {
  it("camera dslr heavy best for dslr mirrorless cinema", () => {
    expect(bestCamera("camera_dslr_heavy")).toBe("dslr_mirrorless_cinema");
  });
});

describe("gimbals", () => {
  it("returns 5 types", () => {
    expect(gimbals()).toHaveLength(5);
  });
});
