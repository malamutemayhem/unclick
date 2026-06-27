import { describe, it, expect } from "vitest";
import {
  security, egressSpeed, durability, aesthetic,
  pbCost, fireListed, forDouble, latchType,
  bestUse, panicBarTypes,
} from "../panic-bar-calc.js";

describe("security", () => {
  it("mortise most secure", () => {
    expect(security("mortise_lock_exit_device")).toBeGreaterThan(security("rim_exit_surface_mount"));
  });
});

describe("egressSpeed", () => {
  it("crossbar fastest egress", () => {
    expect(egressSpeed("crossbar_touchpad_wide")).toBeGreaterThan(egressSpeed("mortise_lock_exit_device"));
  });
});

describe("durability", () => {
  it("mortise most durable", () => {
    expect(durability("mortise_lock_exit_device")).toBeGreaterThan(durability("vertical_rod_multi_point"));
  });
});

describe("aesthetic", () => {
  it("concealed rod best aesthetic", () => {
    expect(aesthetic("concealed_vertical_rod")).toBeGreaterThan(aesthetic("rim_exit_surface_mount"));
  });
});

describe("pbCost", () => {
  it("concealed most expensive", () => {
    expect(pbCost("concealed_vertical_rod")).toBeGreaterThan(pbCost("rim_exit_surface_mount"));
  });
});

describe("fireListed", () => {
  it("all are fire listed", () => {
    expect(fireListed("rim_exit_surface_mount")).toBe(true);
  });
});

describe("forDouble", () => {
  it("vertical rod for double", () => {
    expect(forDouble("vertical_rod_multi_point")).toBe(true);
  });
  it("rim not for double", () => {
    expect(forDouble("rim_exit_surface_mount")).toBe(false);
  });
});

describe("latchType", () => {
  it("mortise uses deadbolt combo", () => {
    expect(latchType("mortise_lock_exit_device")).toBe("mortise_deadbolt_latch_combo");
  });
});

describe("bestUse", () => {
  it("crossbar for high traffic", () => {
    expect(bestUse("crossbar_touchpad_wide")).toBe("high_traffic_push_bar_egress");
  });
});

describe("panicBarTypes", () => {
  it("returns 5 types", () => {
    expect(panicBarTypes()).toHaveLength(5);
  });
});
