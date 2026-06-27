import { describe, it, expect } from "vitest";
import {
  throughput, security, aesthetic, accessibility,
  ttCost, bidirectional, forHighSecurity, barrier,
  bestUse, turnstileTypes,
} from "../turnstile-type-calc.js";

describe("throughput", () => {
  it("optical speed gate fastest", () => {
    expect(throughput("optical_speed_gate")).toBeGreaterThan(throughput("full_height_rotor"));
  });
});

describe("security", () => {
  it("full height most secure", () => {
    expect(security("full_height_rotor")).toBeGreaterThan(security("tripod_waist_high"));
  });
});

describe("aesthetic", () => {
  it("optical best aesthetic", () => {
    expect(aesthetic("optical_speed_gate")).toBeGreaterThan(aesthetic("full_height_rotor"));
  });
});

describe("accessibility", () => {
  it("optical most accessible", () => {
    expect(accessibility("optical_speed_gate")).toBeGreaterThan(accessibility("full_height_rotor"));
  });
});

describe("ttCost", () => {
  it("optical most expensive", () => {
    expect(ttCost("optical_speed_gate")).toBeGreaterThan(ttCost("tripod_waist_high"));
  });
});

describe("bidirectional", () => {
  it("all are bidirectional", () => {
    expect(bidirectional("tripod_waist_high")).toBe(true);
  });
});

describe("forHighSecurity", () => {
  it("full height for high security", () => {
    expect(forHighSecurity("full_height_rotor")).toBe(true);
  });
  it("tripod not high security", () => {
    expect(forHighSecurity("tripod_waist_high")).toBe(false);
  });
});

describe("barrier", () => {
  it("glass swing uses tempered glass", () => {
    expect(barrier("swing_barrier_glass")).toBe("tempered_glass_swing_panel");
  });
});

describe("bestUse", () => {
  it("optical for corporate lobby", () => {
    expect(bestUse("optical_speed_gate")).toBe("corporate_lobby_high_volume");
  });
});

describe("turnstileTypes", () => {
  it("returns 5 types", () => {
    expect(turnstileTypes()).toHaveLength(5);
  });
});
