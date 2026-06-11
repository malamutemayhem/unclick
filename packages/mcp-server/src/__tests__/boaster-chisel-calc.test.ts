import { describe, it, expect } from "vitest";
import {
  flatArea, surfaceSmooth, speedDress, edgeKeep,
  chiselCost, powered, forDetail, faceWidth,
  bestUse, boasterChisels,
} from "../boaster-chisel-calc.js";

describe("flatArea", () => {
  it("wide face standard best flat area", () => {
    expect(flatArea("wide_face_standard")).toBeGreaterThan(flatArea("narrow_face_detail"));
  });
});

describe("surfaceSmooth", () => {
  it("narrow face detail best surface smooth", () => {
    expect(surfaceSmooth("narrow_face_detail")).toBeGreaterThan(surfaceSmooth("pneumatic_boaster_fast"));
  });
});

describe("speedDress", () => {
  it("pneumatic boaster fast fastest dress", () => {
    expect(speedDress("pneumatic_boaster_fast")).toBeGreaterThan(speedDress("hand_set_traditional"));
  });
});

describe("edgeKeep", () => {
  it("carbide face hard best edge keep", () => {
    expect(edgeKeep("carbide_face_hard")).toBeGreaterThan(edgeKeep("hand_set_traditional"));
  });
});

describe("chiselCost", () => {
  it("pneumatic boaster fast most expensive", () => {
    expect(chiselCost("pneumatic_boaster_fast")).toBeGreaterThan(chiselCost("hand_set_traditional"));
  });
});

describe("powered", () => {
  it("pneumatic boaster fast is powered", () => {
    expect(powered("pneumatic_boaster_fast")).toBe(true);
  });
  it("wide face standard not powered", () => {
    expect(powered("wide_face_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("narrow face detail is for detail", () => {
    expect(forDetail("narrow_face_detail")).toBe(true);
  });
  it("wide face standard not for detail", () => {
    expect(forDetail("wide_face_standard")).toBe(false);
  });
});

describe("faceWidth", () => {
  it("carbide face hard uses medium two inch", () => {
    expect(faceWidth("carbide_face_hard")).toBe("medium_two_inch");
  });
});

describe("bestUse", () => {
  it("wide face standard best for flat surface dress", () => {
    expect(bestUse("wide_face_standard")).toBe("flat_surface_dress");
  });
});

describe("boasterChisels", () => {
  it("returns 5 types", () => {
    expect(boasterChisels()).toHaveLength(5);
  });
});
