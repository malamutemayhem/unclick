import { describe, it, expect } from "vitest";
import {
  holdStrength, floorSafe, aestheticClean, portability,
  stopperCost, permanentMount, tripHazard, mountMethod,
  bestDoor, doorStoppers,
} from "../door-stopper-calc.js";

describe("holdStrength", () => {
  it("magnetic wall mount strongest hold", () => {
    expect(holdStrength("magnetic_wall_mount")).toBeGreaterThan(holdStrength("weighted_fabric"));
  });
});

describe("floorSafe", () => {
  it("hinge pin brass most floor safe", () => {
    expect(floorSafe("hinge_pin_brass")).toBeGreaterThan(floorSafe("kick_down_spring"));
  });
});

describe("aestheticClean", () => {
  it("magnetic wall mount most aesthetic", () => {
    expect(aestheticClean("magnetic_wall_mount")).toBeGreaterThan(aestheticClean("wedge_rubber"));
  });
});

describe("portability", () => {
  it("wedge rubber most portable", () => {
    expect(portability("wedge_rubber")).toBeGreaterThan(portability("magnetic_wall_mount"));
  });
});

describe("stopperCost", () => {
  it("magnetic wall mount most expensive", () => {
    expect(stopperCost("magnetic_wall_mount")).toBeGreaterThan(stopperCost("wedge_rubber"));
  });
});

describe("permanentMount", () => {
  it("hinge pin brass is permanent mount", () => {
    expect(permanentMount("hinge_pin_brass")).toBe(true);
  });
  it("wedge rubber is not", () => {
    expect(permanentMount("wedge_rubber")).toBe(false);
  });
});

describe("tripHazard", () => {
  it("wedge rubber is trip hazard", () => {
    expect(tripHazard("wedge_rubber")).toBe(true);
  });
  it("hinge pin brass is not", () => {
    expect(tripHazard("hinge_pin_brass")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("magnetic wall mount uses screw wall magnet catch", () => {
    expect(mountMethod("magnetic_wall_mount")).toBe("screw_wall_magnet_catch");
  });
});

describe("bestDoor", () => {
  it("wedge rubber best for hotel travel temporary", () => {
    expect(bestDoor("wedge_rubber")).toBe("hotel_travel_temporary");
  });
});

describe("doorStoppers", () => {
  it("returns 5 types", () => {
    expect(doorStoppers()).toHaveLength(5);
  });
});
