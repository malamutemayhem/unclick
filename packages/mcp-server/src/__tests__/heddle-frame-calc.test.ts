import { describe, it, expect } from "vitest";
import {
  threadControl, yarnGentle, durability, noiseLevel,
  heddleCost, replaceable, adjustableEye, heddleMaterial,
  bestLoom, heddleFrames,
} from "../heddle-frame-calc.js";

describe("threadControl", () => {
  it("inserted eye steel best thread control", () => {
    expect(threadControl("inserted_eye_steel")).toBeGreaterThan(threadControl("string_heddle_cotton"));
  });
});

describe("yarnGentle", () => {
  it("string heddle cotton gentlest on yarn", () => {
    expect(yarnGentle("string_heddle_cotton")).toBeGreaterThan(yarnGentle("inserted_eye_steel"));
  });
});

describe("durability", () => {
  it("inserted eye steel most durable", () => {
    expect(durability("inserted_eye_steel")).toBeGreaterThan(durability("string_heddle_cotton"));
  });
});

describe("noiseLevel", () => {
  it("inserted eye steel noisiest", () => {
    expect(noiseLevel("inserted_eye_steel")).toBeGreaterThan(noiseLevel("texsolv_cord_poly"));
  });
});

describe("heddleCost", () => {
  it("inserted eye steel most expensive", () => {
    expect(heddleCost("inserted_eye_steel")).toBeGreaterThan(heddleCost("string_heddle_cotton"));
  });
});

describe("replaceable", () => {
  it("wire heddle metal is replaceable", () => {
    expect(replaceable("wire_heddle_metal")).toBe(true);
  });
  it("flat steel strip is not replaceable", () => {
    expect(replaceable("flat_steel_strip")).toBe(false);
  });
});

describe("adjustableEye", () => {
  it("texsolv cord poly has adjustable eye", () => {
    expect(adjustableEye("texsolv_cord_poly")).toBe(true);
  });
  it("wire heddle metal does not have adjustable eye", () => {
    expect(adjustableEye("wire_heddle_metal")).toBe(false);
  });
});

describe("heddleMaterial", () => {
  it("texsolv cord poly uses polyester braided cord", () => {
    expect(heddleMaterial("texsolv_cord_poly")).toBe("polyester_braided_cord");
  });
});

describe("bestLoom", () => {
  it("inserted eye steel best for dobby loom complex", () => {
    expect(bestLoom("inserted_eye_steel")).toBe("dobby_loom_complex");
  });
});

describe("heddleFrames", () => {
  it("returns 5 types", () => {
    expect(heddleFrames()).toHaveLength(5);
  });
});
