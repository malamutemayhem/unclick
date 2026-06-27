import { describe, it, expect } from "vitest";
import {
  windSpeed, yarnCare, portability, cakeSize,
  winderCost, needsPower, centerPull, driveType,
  bestYarn, yarnWinders,
} from "../yarn-winder-calc.js";

describe("windSpeed", () => {
  it("electric motor speed fastest wind speed", () => {
    expect(windSpeed("electric_motor_speed")).toBeGreaterThan(windSpeed("nostepinne_stick"));
  });
});

describe("yarnCare", () => {
  it("nostepinne stick best yarn care", () => {
    expect(yarnCare("nostepinne_stick")).toBeGreaterThan(yarnCare("electric_motor_speed"));
  });
});

describe("portability", () => {
  it("nostepinne stick most portable", () => {
    expect(portability("nostepinne_stick")).toBeGreaterThan(portability("electric_motor_speed"));
  });
});

describe("cakeSize", () => {
  it("cone holder guide largest cake size", () => {
    expect(cakeSize("cone_holder_guide")).toBeGreaterThan(cakeSize("nostepinne_stick"));
  });
});

describe("winderCost", () => {
  it("electric motor speed most expensive", () => {
    expect(winderCost("electric_motor_speed")).toBeGreaterThan(winderCost("hand_crank_ball"));
  });
});

describe("needsPower", () => {
  it("electric motor speed needs power", () => {
    expect(needsPower("electric_motor_speed")).toBe(true);
  });
  it("hand crank ball needs no power", () => {
    expect(needsPower("hand_crank_ball")).toBe(false);
  });
});

describe("centerPull", () => {
  it("hand crank ball makes center pull", () => {
    expect(centerPull("hand_crank_ball")).toBe(true);
  });
  it("cone holder guide does not make center pull", () => {
    expect(centerPull("cone_holder_guide")).toBe(false);
  });
});

describe("driveType", () => {
  it("nostepinne stick uses hand wrap manual", () => {
    expect(driveType("nostepinne_stick")).toBe("hand_wrap_manual");
  });
});

describe("bestYarn", () => {
  it("nostepinne stick best for delicate silk lace", () => {
    expect(bestYarn("nostepinne_stick")).toBe("delicate_silk_lace");
  });
});

describe("yarnWinders", () => {
  it("returns 5 types", () => {
    expect(yarnWinders()).toHaveLength(5);
  });
});
