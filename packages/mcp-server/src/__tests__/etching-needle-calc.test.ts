import { describe, it, expect } from "vitest";
import {
  lineQuality, lineVariation, plateWear, controlFeel,
  needleCost, forDrypoint, forTexture, tipShape,
  bestPlate, etchingNeedles,
} from "../etching-needle-calc.js";

describe("lineQuality", () => {
  it("echoppe oval swell best line quality", () => {
    expect(lineQuality("echoppe_oval_swell")).toBeGreaterThan(lineQuality("burnisher_flat_smooth"));
  });
});

describe("lineVariation", () => {
  it("echoppe oval swell best line variation", () => {
    expect(lineVariation("echoppe_oval_swell")).toBeGreaterThan(lineVariation("carbide_tip_hard"));
  });
});

describe("plateWear", () => {
  it("carbide tip hard best plate wear resistance", () => {
    expect(plateWear("carbide_tip_hard")).toBeGreaterThan(plateWear("echoppe_oval_swell"));
  });
});

describe("controlFeel", () => {
  it("burnisher flat smooth best control feel", () => {
    expect(controlFeel("burnisher_flat_smooth")).toBeGreaterThan(controlFeel("roulette_wheel_texture"));
  });
});

describe("needleCost", () => {
  it("dry point diamond more expensive than burnisher", () => {
    expect(needleCost("dry_point_diamond")).toBeGreaterThan(needleCost("burnisher_flat_smooth"));
  });
});

describe("forDrypoint", () => {
  it("dry point diamond is for drypoint", () => {
    expect(forDrypoint("dry_point_diamond")).toBe(true);
  });
  it("echoppe oval swell is not for drypoint", () => {
    expect(forDrypoint("echoppe_oval_swell")).toBe(false);
  });
});

describe("forTexture", () => {
  it("roulette wheel texture is for texture", () => {
    expect(forTexture("roulette_wheel_texture")).toBe(true);
  });
  it("dry point diamond is not for texture", () => {
    expect(forTexture("dry_point_diamond")).toBe(false);
  });
});

describe("tipShape", () => {
  it("dry point diamond uses diamond point sharp", () => {
    expect(tipShape("dry_point_diamond")).toBe("diamond_point_sharp");
  });
});

describe("bestPlate", () => {
  it("echoppe oval swell best for copper etch ground", () => {
    expect(bestPlate("echoppe_oval_swell")).toBe("copper_etch_ground");
  });
});

describe("etchingNeedles", () => {
  it("returns 5 types", () => {
    expect(etchingNeedles()).toHaveLength(5);
  });
});
