import { describe, it, expect } from "vitest";
import {
  capacity, speed, reliability, noise,
  dwCost, motorized, forCommercial, drive,
  bestUse, dumbwaiterTypes,
} from "../dumbwaiter-calc.js";

describe("capacity", () => {
  it("industrial highest capacity", () => {
    expect(capacity("industrial_heavy_duty")).toBeGreaterThan(capacity("manual_rope_pulley"));
  });
});

describe("speed", () => {
  it("industrial fastest", () => {
    expect(speed("industrial_heavy_duty")).toBeGreaterThan(speed("manual_rope_pulley"));
  });
});

describe("reliability", () => {
  it("commercial most reliable", () => {
    expect(reliability("commercial_food_service")).toBeGreaterThan(reliability("manual_rope_pulley"));
  });
});

describe("noise", () => {
  it("manual quietest", () => {
    expect(noise("manual_rope_pulley")).toBeGreaterThan(noise("industrial_heavy_duty"));
  });
});

describe("dwCost", () => {
  it("industrial most expensive", () => {
    expect(dwCost("industrial_heavy_duty")).toBeGreaterThan(dwCost("manual_rope_pulley"));
  });
});

describe("motorized", () => {
  it("electric is motorized", () => {
    expect(motorized("electric_residential")).toBe(true);
  });
  it("manual not motorized", () => {
    expect(motorized("manual_rope_pulley")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("food service for commercial", () => {
    expect(forCommercial("commercial_food_service")).toBe(true);
  });
  it("residential not commercial", () => {
    expect(forCommercial("electric_residential")).toBe(false);
  });
});

describe("drive", () => {
  it("industrial uses hydraulic ram", () => {
    expect(drive("industrial_heavy_duty")).toBe("hydraulic_ram_heavy_platform");
  });
});

describe("bestUse", () => {
  it("library for document move", () => {
    expect(bestUse("library_book_lift")).toBe("library_office_document_move");
  });
});

describe("dumbwaiterTypes", () => {
  it("returns 5 types", () => {
    expect(dumbwaiterTypes()).toHaveLength(5);
  });
});
