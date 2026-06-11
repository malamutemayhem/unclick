import { describe, it, expect } from "vitest";
import {
  liftCapacity, reach, speed, stability,
  scCost, heaveCompensated, forContainer, boom,
  bestUse, shipCraneTypes,
} from "../ship-crane-calc.js";

describe("liftCapacity", () => {
  it("offshore pedestal highest lift capacity", () => {
    expect(liftCapacity("offshore_pedestal")).toBeGreaterThan(liftCapacity("knuckle_boom"));
  });
});

describe("reach", () => {
  it("gantry container longest reach", () => {
    expect(reach("gantry_container")).toBeGreaterThan(reach("offshore_pedestal"));
  });
});

describe("speed", () => {
  it("gantry container fastest", () => {
    expect(speed("gantry_container")).toBeGreaterThan(speed("offshore_pedestal"));
  });
});

describe("stability", () => {
  it("offshore pedestal most stable", () => {
    expect(stability("offshore_pedestal")).toBeGreaterThan(stability("knuckle_boom"));
  });
});

describe("scCost", () => {
  it("gantry container most expensive", () => {
    expect(scCost("gantry_container")).toBeGreaterThan(scCost("knuckle_boom"));
  });
});

describe("heaveCompensated", () => {
  it("offshore pedestal is heave compensated", () => {
    expect(heaveCompensated("offshore_pedestal")).toBe(true);
  });
  it("knuckle boom not heave compensated", () => {
    expect(heaveCompensated("knuckle_boom")).toBe(false);
  });
});

describe("forContainer", () => {
  it("gantry container for container", () => {
    expect(forContainer("gantry_container")).toBe(true);
  });
  it("knuckle boom not for container", () => {
    expect(forContainer("knuckle_boom")).toBe(false);
  });
});

describe("boom", () => {
  it("offshore pedestal uses pedestal mounted boom", () => {
    expect(boom("offshore_pedestal")).toBe("pedestal_mounted_heave_compensated_active_motion_control");
  });
});

describe("bestUse", () => {
  it("bulk grab for bulk carrier self unloading", () => {
    expect(bestUse("bulk_grab")).toBe("bulk_carrier_self_unloading_coal_grain_aggregate_grab");
  });
});

describe("shipCraneTypes", () => {
  it("returns 5 types", () => {
    expect(shipCraneTypes()).toHaveLength(5);
  });
});
