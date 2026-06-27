import { describe, it, expect } from "vitest";
import {
  strength, rebound, speed, dustControl,
  shCost, wetProcess, forTunnel, application,
  bestUse, shotcreteTypes,
} from "../shotcrete-type-calc.js";

describe("strength", () => {
  it("silica fume highest strength", () => {
    expect(strength("silica_fume_high_strength")).toBeGreaterThan(strength("dry_mix_nozzle_water"));
  });
});

describe("rebound", () => {
  it("robotic least rebound waste", () => {
    expect(rebound("robotic_spray_automated")).toBeGreaterThan(rebound("dry_mix_nozzle_water"));
  });
});

describe("speed", () => {
  it("robotic fastest", () => {
    expect(speed("robotic_spray_automated")).toBeGreaterThan(speed("dry_mix_nozzle_water"));
  });
});

describe("dustControl", () => {
  it("robotic best dust control", () => {
    expect(dustControl("robotic_spray_automated")).toBeGreaterThan(dustControl("dry_mix_nozzle_water"));
  });
});

describe("shCost", () => {
  it("robotic most expensive", () => {
    expect(shCost("robotic_spray_automated")).toBeGreaterThan(shCost("dry_mix_nozzle_water"));
  });
});

describe("wetProcess", () => {
  it("wet mix is wet process", () => {
    expect(wetProcess("wet_mix_pump_spray")).toBe(true);
  });
  it("dry mix not wet process", () => {
    expect(wetProcess("dry_mix_nozzle_water")).toBe(false);
  });
});

describe("forTunnel", () => {
  it("all shotcrete for tunnel", () => {
    expect(forTunnel("wet_mix_pump_spray")).toBe(true);
  });
});

describe("application", () => {
  it("robotic uses laser guide", () => {
    expect(application("robotic_spray_automated")).toBe("robot_arm_laser_guide_auto_spray");
  });
});

describe("bestUse", () => {
  it("dry mix for repair overhead", () => {
    expect(bestUse("dry_mix_nozzle_water")).toBe("repair_overhead_thin_section");
  });
});

describe("shotcreteTypes", () => {
  it("returns 5 types", () => {
    expect(shotcreteTypes()).toHaveLength(5);
  });
});
