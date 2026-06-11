import { describe, it, expect } from "vitest";
import {
  closingForce, durability, aesthetic, adjustability,
  ctCost, concealed, forFire, mounting,
  bestUse, closerTypeTypes,
} from "../closer-type-calc.js";

describe("closingForce", () => {
  it("floor spring highest closing force", () => {
    expect(closingForce("floor_spring_pivot_closer")).toBeGreaterThan(closingForce("concealed_overhead_transom"));
  });
});

describe("durability", () => {
  it("floor spring most durable", () => {
    expect(durability("floor_spring_pivot_closer")).toBeGreaterThan(durability("concealed_overhead_transom"));
  });
});

describe("aesthetic", () => {
  it("concealed overhead best aesthetic", () => {
    expect(aesthetic("concealed_overhead_transom")).toBeGreaterThan(aesthetic("surface_mount_regular_arm"));
  });
});

describe("adjustability", () => {
  it("electromagnetic most adjustable", () => {
    expect(adjustability("electromagnetic_hold_open")).toBeGreaterThan(adjustability("floor_spring_pivot_closer"));
  });
});

describe("ctCost", () => {
  it("floor spring most expensive", () => {
    expect(ctCost("floor_spring_pivot_closer")).toBeGreaterThan(ctCost("surface_mount_regular_arm"));
  });
});

describe("concealed", () => {
  it("concealed overhead is concealed", () => {
    expect(concealed("concealed_overhead_transom")).toBe(true);
  });
  it("surface mount not concealed", () => {
    expect(concealed("surface_mount_parallel_arm")).toBe(false);
  });
});

describe("forFire", () => {
  it("electromagnetic for fire", () => {
    expect(forFire("electromagnetic_hold_open")).toBe(true);
  });
  it("floor spring not for fire", () => {
    expect(forFire("floor_spring_pivot_closer")).toBe(false);
  });
});

describe("mounting", () => {
  it("electromagnetic uses surface arm with mag", () => {
    expect(mounting("electromagnetic_hold_open")).toBe("surface_arm_with_mag_hold_open");
  });
});

describe("bestUse", () => {
  it("floor spring for glass entry", () => {
    expect(bestUse("floor_spring_pivot_closer")).toBe("glass_entry_door_lobby_storefront");
  });
});

describe("closerTypeTypes", () => {
  it("returns 5 types", () => {
    expect(closerTypeTypes()).toHaveLength(5);
  });
});
