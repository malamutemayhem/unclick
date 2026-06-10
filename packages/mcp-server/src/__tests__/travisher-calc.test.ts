import { describe, it, expect } from "vitest";
import {
  scoopDepth, surfaceSmooth, controlGrip, adjustability,
  travisherCost, roundSole, palmGrip, bladeStyle,
  bestUse, travishers,
} from "../travisher-calc.js";

describe("scoopDepth", () => {
  it("open throat deep deepest scoop", () => {
    expect(scoopDepth("open_throat_deep")).toBeGreaterThan(scoopDepth("flat_sole_panel"));
  });
});

describe("surfaceSmooth", () => {
  it("flat sole panel smoothest surface", () => {
    expect(surfaceSmooth("flat_sole_panel")).toBeGreaterThan(surfaceSmooth("open_throat_deep"));
  });
});

describe("controlGrip", () => {
  it("mini palm small best control grip", () => {
    expect(controlGrip("mini_palm_small")).toBeGreaterThan(controlGrip("open_throat_deep"));
  });
});

describe("adjustability", () => {
  it("adjustable mouth set most adjustable", () => {
    expect(adjustability("adjustable_mouth_set")).toBeGreaterThan(adjustability("mini_palm_small"));
  });
});

describe("travisherCost", () => {
  it("round sole chair more expensive than mini", () => {
    expect(travisherCost("round_sole_chair")).toBeGreaterThan(travisherCost("mini_palm_small"));
  });
});

describe("roundSole", () => {
  it("round sole chair has round sole", () => {
    expect(roundSole("round_sole_chair")).toBe(true);
  });
  it("flat sole panel no round sole", () => {
    expect(roundSole("flat_sole_panel")).toBe(false);
  });
});

describe("palmGrip", () => {
  it("mini palm small has palm grip", () => {
    expect(palmGrip("mini_palm_small")).toBe(true);
  });
  it("round sole chair no palm grip", () => {
    expect(palmGrip("round_sole_chair")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("round sole chair uses curved a2 steel", () => {
    expect(bladeStyle("round_sole_chair")).toBe("curved_a2_steel");
  });
});

describe("bestUse", () => {
  it("round sole chair best for chair seat scoop", () => {
    expect(bestUse("round_sole_chair")).toBe("chair_seat_scoop");
  });
});

describe("travishers", () => {
  it("returns 5 types", () => {
    expect(travishers()).toHaveLength(5);
  });
});
