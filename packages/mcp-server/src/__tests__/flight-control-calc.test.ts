import { describe, it, expect } from "vitest";
import {
  rollAuthority, pitchAuthority, yawAuthority,
  dragIncrease, deflectionRangeDegrees, primarySurface,
  usedInLanding, mountLocation, responseTime, flightControls,
} from "../flight-control-calc.js";

describe("rollAuthority", () => {
  it("aileron has most roll authority", () => {
    expect(rollAuthority("aileron")).toBeGreaterThan(
      rollAuthority("rudder")
    );
  });
});

describe("pitchAuthority", () => {
  it("elevator has most pitch authority", () => {
    expect(pitchAuthority("elevator")).toBeGreaterThan(
      pitchAuthority("flap")
    );
  });
});

describe("yawAuthority", () => {
  it("rudder has most yaw authority", () => {
    expect(yawAuthority("rudder")).toBeGreaterThan(
      yawAuthority("aileron")
    );
  });
});

describe("dragIncrease", () => {
  it("spoiler increases drag most", () => {
    expect(dragIncrease("spoiler")).toBeGreaterThan(
      dragIncrease("aileron")
    );
  });
});

describe("deflectionRangeDegrees", () => {
  it("spoiler has widest range", () => {
    expect(deflectionRangeDegrees("spoiler")).toBeGreaterThan(
      deflectionRangeDegrees("aileron")
    );
  });
});

describe("primarySurface", () => {
  it("aileron is primary", () => {
    expect(primarySurface("aileron")).toBe(true);
  });
  it("flap is not primary", () => {
    expect(primarySurface("flap")).toBe(false);
  });
});

describe("usedInLanding", () => {
  it("all controls used in landing", () => {
    expect(usedInLanding("flap")).toBe(true);
    expect(usedInLanding("spoiler")).toBe(true);
  });
});

describe("mountLocation", () => {
  it("rudder on vertical stabilizer", () => {
    expect(mountLocation("rudder")).toBe("vertical_stabilizer");
  });
});

describe("responseTime", () => {
  it("aileron responds fastest", () => {
    expect(responseTime("aileron")).toBeGreaterThan(
      responseTime("flap")
    );
  });
});

describe("flightControls", () => {
  it("returns 5 types", () => {
    expect(flightControls()).toHaveLength(5);
  });
});
