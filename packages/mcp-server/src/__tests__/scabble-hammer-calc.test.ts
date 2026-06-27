import { describe, it, expect } from "vitest";
import {
  wasteRemove, surfaceRough, speedWork, controlAim,
  hammerCost, powered, doublePoint, headProfile,
  bestUse, scabbleHammers,
} from "../scabble-hammer-calc.js";

describe("wasteRemove", () => {
  it("pneumatic scabble power best waste remove", () => {
    expect(wasteRemove("pneumatic_scabble_power")).toBeGreaterThan(wasteRemove("broad_face_flat"));
  });
});

describe("surfaceRough", () => {
  it("pneumatic scabble power roughest surface", () => {
    expect(surfaceRough("pneumatic_scabble_power")).toBeGreaterThan(surfaceRough("broad_face_flat"));
  });
});

describe("speedWork", () => {
  it("pneumatic scabble power fastest work", () => {
    expect(speedWork("pneumatic_scabble_power")).toBeGreaterThan(speedWork("single_point_standard"));
  });
});

describe("controlAim", () => {
  it("broad face flat best control aim", () => {
    expect(controlAim("broad_face_flat")).toBeGreaterThan(controlAim("pneumatic_scabble_power"));
  });
});

describe("hammerCost", () => {
  it("pneumatic scabble power most expensive", () => {
    expect(hammerCost("pneumatic_scabble_power")).toBeGreaterThan(hammerCost("single_point_standard"));
  });
});

describe("powered", () => {
  it("pneumatic scabble power is powered", () => {
    expect(powered("pneumatic_scabble_power")).toBe(true);
  });
  it("single point standard not powered", () => {
    expect(powered("single_point_standard")).toBe(false);
  });
});

describe("doublePoint", () => {
  it("double point fast has double point", () => {
    expect(doublePoint("double_point_fast")).toBe(true);
  });
  it("single point standard not double point", () => {
    expect(doublePoint("single_point_standard")).toBe(false);
  });
});

describe("headProfile", () => {
  it("carbide point hard uses carbide pyramid point", () => {
    expect(headProfile("carbide_point_hard")).toBe("carbide_pyramid_point");
  });
});

describe("bestUse", () => {
  it("single point standard best for general rough dress", () => {
    expect(bestUse("single_point_standard")).toBe("general_rough_dress");
  });
});

describe("scabbleHammers", () => {
  it("returns 5 types", () => {
    expect(scabbleHammers()).toHaveLength(5);
  });
});
