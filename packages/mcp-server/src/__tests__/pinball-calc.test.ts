import { describe, it, expect } from "vitest";
import {
  playfieldAngle, ballWeight, ballDiameter, flipperLength,
  shotValue, multiballMultiplier, comboBonus, tiltSensitivity,
  coilVoltage, rubberAge, ledReplacement, playfieldWear,
  competitionBalls, machineEras,
} from "../pinball-calc.js";

describe("playfieldAngle", () => {
  it("steeper for modern", () => {
    expect(playfieldAngle("modern")).toBeGreaterThanOrEqual(playfieldAngle("em"));
  });
});

describe("ballWeight", () => {
  it("80 grams", () => {
    expect(ballWeight()).toBe(80);
  });
});

describe("ballDiameter", () => {
  it("27mm", () => {
    expect(ballDiameter()).toBe(27);
  });
});

describe("flipperLength", () => {
  it("79mm for modern", () => {
    expect(flipperLength("modern")).toBe(79);
  });
});

describe("shotValue", () => {
  it("kickback highest", () => {
    expect(shotValue("kickback")).toBeGreaterThan(shotValue("target"));
  });

  it("scales with multiplier", () => {
    expect(shotValue("ramp", 2)).toBe(shotValue("ramp") * 2);
  });
});

describe("multiballMultiplier", () => {
  it("1.5 for 2 balls", () => {
    expect(multiballMultiplier(2)).toBe(1.5);
  });
});

describe("comboBonus", () => {
  it("scales linearly", () => {
    expect(comboBonus(5)).toBe(500000);
  });
});

describe("tiltSensitivity", () => {
  it("adjustable for modern", () => {
    expect(tiltSensitivity("modern")).toBe("adjustable");
  });
});

describe("coilVoltage", () => {
  it("higher for DMD era", () => {
    expect(coilVoltage("dmd")).toBeGreaterThan(coilVoltage("em"));
  });
});

describe("rubberAge", () => {
  it("good when new", () => {
    expect(rubberAge(1)).toBe("good");
  });

  it("replace when old", () => {
    expect(rubberAge(6)).toBe("replace");
  });
});

describe("ledReplacement", () => {
  it("1:1 with GI count", () => {
    expect(ledReplacement(50)).toBe(50);
  });
});

describe("playfieldWear", () => {
  it("minimal for few games", () => {
    expect(playfieldWear(500)).toBe("minimal");
  });
});

describe("competitionBalls", () => {
  it("3 balls", () => {
    expect(competitionBalls()).toBe(3);
  });
});

describe("machineEras", () => {
  it("returns 5 eras", () => {
    expect(machineEras()).toHaveLength(5);
  });
});
