import { describe, it, expect } from "vitest";
import {
  heatOutput, towelCapacity, installEase, energyUse,
  warmerCost, plugAndPlay, roomHeater, heatingMethod,
  bestBath, towelWarmers,
} from "../towel-warmer-calc.js";

describe("heatOutput", () => {
  it("hydronic radiator highest heat output", () => {
    expect(heatOutput("hydronic_radiator")).toBeGreaterThan(heatOutput("drawer_cabinet"));
  });
});

describe("towelCapacity", () => {
  it("drawer cabinet largest towel capacity", () => {
    expect(towelCapacity("drawer_cabinet")).toBeGreaterThan(towelCapacity("bucket_style"));
  });
});

describe("installEase", () => {
  it("freestanding plug easiest install", () => {
    expect(installEase("freestanding_plug")).toBeGreaterThan(installEase("hydronic_radiator"));
  });
});

describe("energyUse", () => {
  it("hydronic radiator highest energy use", () => {
    expect(energyUse("hydronic_radiator")).toBeGreaterThan(energyUse("freestanding_plug"));
  });
});

describe("warmerCost", () => {
  it("drawer cabinet most expensive", () => {
    expect(warmerCost("drawer_cabinet")).toBeGreaterThan(warmerCost("freestanding_plug"));
  });
});

describe("plugAndPlay", () => {
  it("freestanding plug is plug and play", () => {
    expect(plugAndPlay("freestanding_plug")).toBe(true);
  });
  it("wall mount electric is not", () => {
    expect(plugAndPlay("wall_mount_electric")).toBe(false);
  });
});

describe("roomHeater", () => {
  it("wall mount electric works as room heater", () => {
    expect(roomHeater("wall_mount_electric")).toBe(true);
  });
  it("bucket style does not", () => {
    expect(roomHeater("bucket_style")).toBe(false);
  });
});

describe("heatingMethod", () => {
  it("hydronic radiator uses hot water loop pipe", () => {
    expect(heatingMethod("hydronic_radiator")).toBe("hot_water_loop_pipe");
  });
});

describe("bestBath", () => {
  it("bucket style for spa salon facial towel", () => {
    expect(bestBath("bucket_style")).toBe("spa_salon_facial_towel");
  });
});

describe("towelWarmers", () => {
  it("returns 5 types", () => {
    expect(towelWarmers()).toHaveLength(5);
  });
});
