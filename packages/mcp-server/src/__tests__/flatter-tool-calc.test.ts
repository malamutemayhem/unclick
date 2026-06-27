import { describe, it, expect } from "vitest";
import {
  surfaceSmooth, coverageArea, controlStrike, weightBalance,
  flatterCost, springHandle, crowned, faceSize,
  bestUse, flatterTools,
} from "../flatter-tool-calc.js";

describe("surfaceSmooth", () => {
  it("narrow face detail smoothest surface", () => {
    expect(surfaceSmooth("narrow_face_detail")).toBeGreaterThan(surfaceSmooth("wide_face_large"));
  });
});

describe("coverageArea", () => {
  it("wide face large widest coverage area", () => {
    expect(coverageArea("wide_face_large")).toBeGreaterThan(coverageArea("narrow_face_detail"));
  });
});

describe("controlStrike", () => {
  it("narrow face detail best strike control", () => {
    expect(controlStrike("narrow_face_detail")).toBeGreaterThan(controlStrike("wide_face_large"));
  });
});

describe("weightBalance", () => {
  it("spring handle vibrate best weight balance", () => {
    expect(weightBalance("spring_handle_vibrate")).toBeGreaterThan(weightBalance("wide_face_large"));
  });
});

describe("flatterCost", () => {
  it("spring handle vibrate most expensive", () => {
    expect(flatterCost("spring_handle_vibrate")).toBeGreaterThan(flatterCost("narrow_face_detail"));
  });
});

describe("springHandle", () => {
  it("spring handle vibrate has spring handle", () => {
    expect(springHandle("spring_handle_vibrate")).toBe(true);
  });
  it("flat face standard no spring handle", () => {
    expect(springHandle("flat_face_standard")).toBe(false);
  });
});

describe("crowned", () => {
  it("crowned face light is crowned", () => {
    expect(crowned("crowned_face_light")).toBe(true);
  });
  it("flat face standard not crowned", () => {
    expect(crowned("flat_face_standard")).toBe(false);
  });
});

describe("faceSize", () => {
  it("wide face large uses five inch square", () => {
    expect(faceSize("wide_face_large")).toBe("five_inch_square");
  });
});

describe("bestUse", () => {
  it("flat face standard best for general surface flat", () => {
    expect(bestUse("flat_face_standard")).toBe("general_surface_flat");
  });
});

describe("flatterTools", () => {
  it("returns 5 types", () => {
    expect(flatterTools()).toHaveLength(5);
  });
});
