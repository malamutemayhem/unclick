import { describe, it, expect } from "vitest";
import {
  sprayRate, reboundControl, buildThickness, surfaceFinish,
  spCost, wetProcess, forTunnel, pumpConfig,
  bestUse, shotcretePumpTypes,
} from "../shotcrete-pump-calc.js";

describe("sprayRate", () => {
  it("piston pump fastest spray rate", () => {
    expect(sprayRate("piston_pump")).toBeGreaterThan(sprayRate("dry_mix_gun"));
  });
});

describe("reboundControl", () => {
  it("robot sprayer best rebound control", () => {
    expect(reboundControl("robot_sprayer")).toBeGreaterThan(reboundControl("dry_mix_gun"));
  });
});

describe("buildThickness", () => {
  it("dry mix gun best build thickness", () => {
    expect(buildThickness("dry_mix_gun")).toBeGreaterThan(buildThickness("rotor_stator"));
  });
});

describe("surfaceFinish", () => {
  it("robot sprayer best surface finish", () => {
    expect(surfaceFinish("robot_sprayer")).toBeGreaterThan(surfaceFinish("dry_mix_gun"));
  });
});

describe("spCost", () => {
  it("robot sprayer most expensive", () => {
    expect(spCost("robot_sprayer")).toBeGreaterThan(spCost("dry_mix_gun"));
  });
});

describe("wetProcess", () => {
  it("wet mix pump uses wet process", () => {
    expect(wetProcess("wet_mix_pump")).toBe(true);
  });
  it("dry mix gun not wet process", () => {
    expect(wetProcess("dry_mix_gun")).toBe(false);
  });
});

describe("forTunnel", () => {
  it("piston pump for tunnel", () => {
    expect(forTunnel("piston_pump")).toBe(true);
  });
  it("rotor stator not for tunnel", () => {
    expect(forTunnel("rotor_stator")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("rotor stator uses progressive cavity pump", () => {
    expect(pumpConfig("rotor_stator")).toBe("rotor_stator_progressive_cavity_pump_mortar_plaster_spray_coat");
  });
});

describe("bestUse", () => {
  it("robot sprayer for tbm tunnel automated", () => {
    expect(bestUse("robot_sprayer")).toBe("tbm_tunnel_automated_robot_arm_shotcrete_precise_spray_pattern");
  });
});

describe("shotcretePumpTypes", () => {
  it("returns 5 types", () => {
    expect(shotcretePumpTypes()).toHaveLength(5);
  });
});
