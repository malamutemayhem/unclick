import { describe, it, expect } from "vitest";
import {
  throughput, security, aesthetic, accessibility,
  otCost, biDirectional, forCorporate, barrier,
  bestUse, opticalTurnstileTypes,
} from "../optical-turnstile-calc.js";

describe("throughput", () => {
  it("speed lane highest throughput", () => {
    expect(throughput("speed_lane_retractable")).toBeGreaterThan(throughput("full_height_glass_portal"));
  });
});

describe("security", () => {
  it("full height most secure", () => {
    expect(security("full_height_glass_portal")).toBeGreaterThan(security("tripod_drop_arm_optical"));
  });
});

describe("aesthetic", () => {
  it("swing glass best aesthetic", () => {
    expect(aesthetic("swing_glass_barrier")).toBeGreaterThan(aesthetic("tripod_drop_arm_optical"));
  });
});

describe("accessibility", () => {
  it("swing glass most accessible", () => {
    expect(accessibility("swing_glass_barrier")).toBeGreaterThan(accessibility("full_height_glass_portal"));
  });
});

describe("otCost", () => {
  it("full height most expensive", () => {
    expect(otCost("full_height_glass_portal")).toBeGreaterThan(otCost("tripod_drop_arm_optical"));
  });
});

describe("biDirectional", () => {
  it("swing is bidirectional", () => {
    expect(biDirectional("swing_glass_barrier")).toBe(true);
  });
  it("full height not bidirectional", () => {
    expect(biDirectional("full_height_glass_portal")).toBe(false);
  });
});

describe("forCorporate", () => {
  it("swing for corporate", () => {
    expect(forCorporate("swing_glass_barrier")).toBe(true);
  });
  it("tripod not corporate", () => {
    expect(forCorporate("tripod_drop_arm_optical")).toBe(false);
  });
});

describe("barrier", () => {
  it("speed lane uses flap barrier", () => {
    expect(barrier("speed_lane_retractable")).toBe("flap_barrier_ir_sensor_fast");
  });
});

describe("bestUse", () => {
  it("full height for data center", () => {
    expect(bestUse("full_height_glass_portal")).toBe("data_center_secure_area_entry");
  });
});

describe("opticalTurnstileTypes", () => {
  it("returns 5 types", () => {
    expect(opticalTurnstileTypes()).toHaveLength(5);
  });
});
