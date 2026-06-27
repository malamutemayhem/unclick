import { describe, it, expect } from "vitest";
import {
  gripSecurity, installEase, weightCapacity, portability,
  barCost, noDrilling, adaCompliant, barFinish,
  bestLocation, grabBars,
} from "../grab-bar-calc.js";

describe("gripSecurity", () => {
  it("wall mount steel most secure grip", () => {
    expect(gripSecurity("wall_mount_steel")).toBeGreaterThan(gripSecurity("suction_cup_portable"));
  });
});

describe("installEase", () => {
  it("suction cup portable easiest install", () => {
    expect(installEase("suction_cup_portable")).toBeGreaterThan(installEase("wall_mount_steel"));
  });
});

describe("weightCapacity", () => {
  it("wall mount steel highest weight capacity", () => {
    expect(weightCapacity("wall_mount_steel")).toBeGreaterThan(weightCapacity("suction_cup_portable"));
  });
});

describe("portability", () => {
  it("suction cup portable most portable", () => {
    expect(portability("suction_cup_portable")).toBeGreaterThan(portability("wall_mount_steel"));
  });
});

describe("barCost", () => {
  it("floor to ceiling pole most expensive", () => {
    expect(barCost("floor_to_ceiling_pole")).toBeGreaterThan(barCost("suction_cup_portable"));
  });
});

describe("noDrilling", () => {
  it("suction cup portable needs no drilling", () => {
    expect(noDrilling("suction_cup_portable")).toBe(true);
  });
  it("wall mount steel does", () => {
    expect(noDrilling("wall_mount_steel")).toBe(false);
  });
});

describe("adaCompliant", () => {
  it("wall mount steel is ada compliant", () => {
    expect(adaCompliant("wall_mount_steel")).toBe(true);
  });
  it("suction cup portable is not", () => {
    expect(adaCompliant("suction_cup_portable")).toBe(false);
  });
});

describe("barFinish", () => {
  it("wall mount steel uses brushed stainless 304", () => {
    expect(barFinish("wall_mount_steel")).toBe("brushed_stainless_304");
  });
});

describe("bestLocation", () => {
  it("suction cup portable best for hotel travel temporary", () => {
    expect(bestLocation("suction_cup_portable")).toBe("hotel_travel_temporary");
  });
});

describe("grabBars", () => {
  it("returns 5 types", () => {
    expect(grabBars()).toHaveLength(5);
  });
});
