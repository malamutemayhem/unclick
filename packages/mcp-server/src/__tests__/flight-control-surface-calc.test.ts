import { describe, it, expect } from "vitest";
import {
  authority, speed, drag, redundancy,
  fsCost, primary, forLift, actuation,
  bestUse, flightControlSurfaceTypes,
} from "../flight-control-surface-calc.js";

describe("authority", () => {
  it("elevator highest authority", () => {
    expect(authority("elevator_pitch_tail")).toBeGreaterThan(authority("spoiler_speed_brake"));
  });
});

describe("speed", () => {
  it("aileron fastest response", () => {
    expect(speed("aileron_roll_outboard")).toBeGreaterThan(speed("flap_trailing_edge"));
  });
});

describe("drag", () => {
  it("spoiler most drag", () => {
    expect(drag("spoiler_speed_brake")).toBeGreaterThan(drag("aileron_roll_outboard"));
  });
});

describe("redundancy", () => {
  it("elevator most redundant", () => {
    expect(redundancy("elevator_pitch_tail")).toBeGreaterThan(redundancy("flap_trailing_edge"));
  });
});

describe("fsCost", () => {
  it("flap most expensive", () => {
    expect(fsCost("flap_trailing_edge")).toBeGreaterThan(fsCost("aileron_roll_outboard"));
  });
});

describe("primary", () => {
  it("aileron is primary", () => {
    expect(primary("aileron_roll_outboard")).toBe(true);
  });
  it("flap not primary", () => {
    expect(primary("flap_trailing_edge")).toBe(false);
  });
});

describe("forLift", () => {
  it("flap for lift", () => {
    expect(forLift("flap_trailing_edge")).toBe(true);
  });
  it("rudder not for lift", () => {
    expect(forLift("rudder_yaw_vertical")).toBe(false);
  });
});

describe("actuation", () => {
  it("flap uses electric screw jack", () => {
    expect(actuation("flap_trailing_edge")).toBe("electric_screw_jack_track");
  });
});

describe("bestUse", () => {
  it("rudder for yaw crosswind", () => {
    expect(bestUse("rudder_yaw_vertical")).toBe("yaw_control_crosswind_engine_out");
  });
});

describe("flightControlSurfaceTypes", () => {
  it("returns 5 types", () => {
    expect(flightControlSurfaceTypes()).toHaveLength(5);
  });
});
