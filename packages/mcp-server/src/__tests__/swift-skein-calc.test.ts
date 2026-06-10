import { describe, it, expect } from "vitest";
import {
  skeinSpeed, holdCapacity, portability, yarnGentle,
  swiftCost, makesBall, countsYardage, mechanism,
  bestTask, swiftSkeins,
} from "../swift-skein-calc.js";

describe("skeinSpeed", () => {
  it("tabletop ball wind fastest skein speed", () => {
    expect(skeinSpeed("tabletop_ball_wind")).toBeGreaterThan(skeinSpeed("nostepinne_stick"));
  });
});

describe("holdCapacity", () => {
  it("amish swift floor most hold capacity", () => {
    expect(holdCapacity("amish_swift_floor")).toBeGreaterThan(holdCapacity("nostepinne_stick"));
  });
});

describe("portability", () => {
  it("nostepinne stick most portable", () => {
    expect(portability("nostepinne_stick")).toBeGreaterThan(portability("amish_swift_floor"));
  });
});

describe("yarnGentle", () => {
  it("nostepinne stick gentlest on yarn", () => {
    expect(yarnGentle("nostepinne_stick")).toBeGreaterThan(yarnGentle("tabletop_ball_wind"));
  });
});

describe("swiftCost", () => {
  it("amish swift floor most expensive", () => {
    expect(swiftCost("amish_swift_floor")).toBeGreaterThan(swiftCost("nostepinne_stick"));
  });
});

describe("makesBall", () => {
  it("tabletop ball wind makes ball", () => {
    expect(makesBall("tabletop_ball_wind")).toBe(true);
  });
  it("umbrella swift fold does not make ball", () => {
    expect(makesBall("umbrella_swift_fold")).toBe(false);
  });
});

describe("countsYardage", () => {
  it("yarn meter count counts yardage", () => {
    expect(countsYardage("yarn_meter_count")).toBe(true);
  });
  it("umbrella swift fold does not count yardage", () => {
    expect(countsYardage("umbrella_swift_fold")).toBe(false);
  });
});

describe("mechanism", () => {
  it("umbrella swift fold uses collapsible umbrella rib", () => {
    expect(mechanism("umbrella_swift_fold")).toBe("collapsible_umbrella_rib");
  });
});

describe("bestTask", () => {
  it("tabletop ball wind best for center pull ball", () => {
    expect(bestTask("tabletop_ball_wind")).toBe("center_pull_ball");
  });
});

describe("swiftSkeins", () => {
  it("returns 5 types", () => {
    expect(swiftSkeins()).toHaveLength(5);
  });
});
