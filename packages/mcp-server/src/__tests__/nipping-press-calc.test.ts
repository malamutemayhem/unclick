import { describe, it, expect } from "vitest";
import {
  pressForce, plateFlatness, portability, speedOfUse,
  pressCost, leverAction, screwDrive, pressMaterial,
  bestUse, nippingPresses,
} from "../nipping-press-calc.js";

describe("pressForce", () => {
  it("cast iron screw most force", () => {
    expect(pressForce("cast_iron_screw")).toBeGreaterThan(pressForce("aluminum_light_port"));
  });
});

describe("plateFlatness", () => {
  it("cast iron screw flattest plate", () => {
    expect(plateFlatness("cast_iron_screw")).toBeGreaterThan(plateFlatness("wood_veneer_press"));
  });
});

describe("portability", () => {
  it("aluminum light port most portable", () => {
    expect(portability("aluminum_light_port")).toBeGreaterThan(portability("cast_iron_screw"));
  });
});

describe("speedOfUse", () => {
  it("steel lever quick fastest", () => {
    expect(speedOfUse("steel_lever_quick")).toBeGreaterThan(speedOfUse("wood_veneer_press"));
  });
});

describe("pressCost", () => {
  it("cast iron screw most expensive", () => {
    expect(pressCost("cast_iron_screw")).toBeGreaterThan(pressCost("aluminum_light_port"));
  });
});

describe("leverAction", () => {
  it("steel lever quick has lever action", () => {
    expect(leverAction("steel_lever_quick")).toBe(true);
  });
  it("cast iron screw no lever action", () => {
    expect(leverAction("cast_iron_screw")).toBe(false);
  });
});

describe("screwDrive", () => {
  it("cast iron screw has screw drive", () => {
    expect(screwDrive("cast_iron_screw")).toBe(true);
  });
  it("steel lever quick no screw drive", () => {
    expect(screwDrive("steel_lever_quick")).toBe(false);
  });
});

describe("pressMaterial", () => {
  it("cast iron screw uses cast iron machined", () => {
    expect(pressMaterial("cast_iron_screw")).toBe("cast_iron_machined");
  });
});

describe("bestUse", () => {
  it("cast iron screw best for production case bind", () => {
    expect(bestUse("cast_iron_screw")).toBe("production_case_bind");
  });
});

describe("nippingPresses", () => {
  it("returns 5 types", () => {
    expect(nippingPresses()).toHaveLength(5);
  });
});
