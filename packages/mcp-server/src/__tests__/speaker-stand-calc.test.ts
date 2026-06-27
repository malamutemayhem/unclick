import { describe, it, expect } from "vitest";
import {
  vibrationIsolation, heightAdjust, weightCapacity, floorSaving,
  standCost, fillable, tiltSwivel, mountStyle,
  bestSetup, speakerStands,
} from "../speaker-stand-calc.js";

describe("vibrationIsolation", () => {
  it("studio monitor arm best vibration isolation", () => {
    expect(vibrationIsolation("studio_monitor_arm")).toBeGreaterThan(vibrationIsolation("wall_mount_bracket"));
  });
});

describe("heightAdjust", () => {
  it("studio monitor arm best height adjust", () => {
    expect(heightAdjust("studio_monitor_arm")).toBeGreaterThan(heightAdjust("desk_isolation_pad"));
  });
});

describe("weightCapacity", () => {
  it("floor pillar most weight capacity", () => {
    expect(weightCapacity("floor_pillar")).toBeGreaterThan(weightCapacity("ceiling_pendant"));
  });
});

describe("floorSaving", () => {
  it("wall mount bracket most floor saving", () => {
    expect(floorSaving("wall_mount_bracket")).toBeGreaterThan(floorSaving("floor_pillar"));
  });
});

describe("standCost", () => {
  it("studio monitor arm most expensive", () => {
    expect(standCost("studio_monitor_arm")).toBeGreaterThan(standCost("desk_isolation_pad"));
  });
});

describe("fillable", () => {
  it("floor pillar is fillable", () => {
    expect(fillable("floor_pillar")).toBe(true);
  });
  it("desk isolation pad is not", () => {
    expect(fillable("desk_isolation_pad")).toBe(false);
  });
});

describe("tiltSwivel", () => {
  it("wall mount bracket has tilt swivel", () => {
    expect(tiltSwivel("wall_mount_bracket")).toBe(true);
  });
  it("floor pillar does not", () => {
    expect(tiltSwivel("floor_pillar")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("studio monitor arm uses clamp arm gas spring", () => {
    expect(mountStyle("studio_monitor_arm")).toBe("clamp_arm_gas_spring");
  });
});

describe("bestSetup", () => {
  it("floor pillar for hifi stereo listening", () => {
    expect(bestSetup("floor_pillar")).toBe("hifi_stereo_listening");
  });
});

describe("speakerStands", () => {
  it("returns 5 types", () => {
    expect(speakerStands()).toHaveLength(5);
  });
});
