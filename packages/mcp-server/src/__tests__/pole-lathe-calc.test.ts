import { describe, it, expect } from "vitest";
import {
  turnSpeed, controlFeel, setupEase, portability,
  latheCost, continuous, portable, driveMethod,
  bestUse, poleLathes,
} from "../pole-lathe-calc.js";

describe("turnSpeed", () => {
  it("great wheel heavy fastest turn", () => {
    expect(turnSpeed("great_wheel_heavy")).toBeGreaterThan(turnSpeed("bow_lathe_portable"));
  });
});

describe("controlFeel", () => {
  it("spring pole standard best control feel", () => {
    expect(controlFeel("spring_pole_standard")).toBeGreaterThan(controlFeel("bow_lathe_portable"));
  });
});

describe("setupEase", () => {
  it("bow lathe portable easiest setup", () => {
    expect(setupEase("bow_lathe_portable")).toBeGreaterThan(setupEase("great_wheel_heavy"));
  });
});

describe("portability", () => {
  it("bow lathe portable most portable", () => {
    expect(portability("bow_lathe_portable")).toBeGreaterThan(portability("great_wheel_heavy"));
  });
});

describe("latheCost", () => {
  it("great wheel heavy most expensive", () => {
    expect(latheCost("great_wheel_heavy")).toBeGreaterThan(latheCost("bow_lathe_portable"));
  });
});

describe("continuous", () => {
  it("treadle flywheel cont is continuous", () => {
    expect(continuous("treadle_flywheel_cont")).toBe(true);
  });
  it("spring pole standard not continuous", () => {
    expect(continuous("spring_pole_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("bow lathe portable is portable", () => {
    expect(portable("bow_lathe_portable")).toBe(true);
  });
  it("spring pole standard not portable", () => {
    expect(portable("spring_pole_standard")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("great wheel heavy uses large wheel drive", () => {
    expect(driveMethod("great_wheel_heavy")).toBe("large_wheel_drive");
  });
});

describe("bestUse", () => {
  it("treadle flywheel cont best for continuous spin turn", () => {
    expect(bestUse("treadle_flywheel_cont")).toBe("continuous_spin_turn");
  });
});

describe("poleLathes", () => {
  it("returns 5 types", () => {
    expect(poleLathes()).toHaveLength(5);
  });
});
