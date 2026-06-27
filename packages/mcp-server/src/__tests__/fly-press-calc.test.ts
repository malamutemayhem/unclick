import { describe, it, expect } from "vitest";
import {
  energyDelivery, throughput, dieLife, forceControl,
  flCost, programmable, forForging, pressConfig,
  bestUse, flyPressTypes,
} from "../fly-press-calc.js";

describe("energyDelivery", () => {
  it("drop hammer best energy delivery", () => {
    expect(energyDelivery("drop_hammer")).toBeGreaterThan(energyDelivery("screw_fly"));
  });
});

describe("throughput", () => {
  it("drop hammer highest throughput", () => {
    expect(throughput("drop_hammer")).toBeGreaterThan(throughput("screw_fly"));
  });
});

describe("dieLife", () => {
  it("electric screw best die life", () => {
    expect(dieLife("electric_screw")).toBeGreaterThan(dieLife("drop_hammer"));
  });
});

describe("forceControl", () => {
  it("electric screw best force control", () => {
    expect(forceControl("electric_screw")).toBeGreaterThan(forceControl("drop_hammer"));
  });
});

describe("flCost", () => {
  it("electric screw most expensive", () => {
    expect(flCost("electric_screw")).toBeGreaterThan(flCost("drop_hammer"));
  });
});

describe("programmable", () => {
  it("electric screw is programmable", () => {
    expect(programmable("electric_screw")).toBe(true);
  });
  it("screw fly not programmable", () => {
    expect(programmable("screw_fly")).toBe(false);
  });
});

describe("forForging", () => {
  it("drop hammer for forging", () => {
    expect(forForging("drop_hammer")).toBe(true);
  });
});

describe("pressConfig", () => {
  it("counterblow fly uses dual ram oppose vibration free forge", () => {
    expect(pressConfig("counterblow_fly")).toBe("counterblow_fly_press_dual_ram_oppose_vibration_free_forge");
  });
});

describe("bestUse", () => {
  it("electric screw for titanium forge servo programmable", () => {
    expect(bestUse("electric_screw")).toBe("titanium_forge_electric_screw_fly_press_servo_programmable");
  });
});

describe("flyPressTypes", () => {
  it("returns 5 types", () => {
    expect(flyPressTypes()).toHaveLength(5);
  });
});
