import { describe, it, expect } from "vitest";
import {
  roundness, speed, surfaceFinish, sizeControl,
  hpCost, automated, forEngine, abrasive,
  bestUse, honeProcessTypes,
} from "../hone-process-calc.js";

describe("roundness", () => {
  it("multi-stroke bore best roundness", () => {
    expect(roundness("multi_stroke_bore")).toBeGreaterThan(roundness("flexible_ball_hone"));
  });
});

describe("speed", () => {
  it("single pass mandrel fastest", () => {
    expect(speed("single_pass_mandrel")).toBeGreaterThan(speed("laser_hone_textured"));
  });
});

describe("surfaceFinish", () => {
  it("plateau crosshatch best surface finish", () => {
    expect(surfaceFinish("plateau_crosshatch")).toBeGreaterThan(surfaceFinish("flexible_ball_hone"));
  });
});

describe("sizeControl", () => {
  it("multi-stroke bore best size control", () => {
    expect(sizeControl("multi_stroke_bore")).toBeGreaterThan(sizeControl("flexible_ball_hone"));
  });
});

describe("hpCost", () => {
  it("laser hone most expensive", () => {
    expect(hpCost("laser_hone_textured")).toBeGreaterThan(hpCost("flexible_ball_hone"));
  });
});

describe("automated", () => {
  it("multi-stroke bore is automated", () => {
    expect(automated("multi_stroke_bore")).toBe(true);
  });
  it("flexible ball hone not automated", () => {
    expect(automated("flexible_ball_hone")).toBe(false);
  });
});

describe("forEngine", () => {
  it("multi-stroke bore for engines", () => {
    expect(forEngine("multi_stroke_bore")).toBe(true);
  });
  it("single pass mandrel not for engines", () => {
    expect(forEngine("single_pass_mandrel")).toBe(false);
  });
});

describe("abrasive", () => {
  it("flexible ball hone uses silicon carbide nylon", () => {
    expect(abrasive("flexible_ball_hone")).toBe("silicon_carbide_nylon_globe");
  });
});

describe("bestUse", () => {
  it("plateau crosshatch for oil retention", () => {
    expect(bestUse("plateau_crosshatch")).toBe("cylinder_liner_oil_retention");
  });
});

describe("honeProcessTypes", () => {
  it("returns 5 types", () => {
    expect(honeProcessTypes()).toHaveLength(5);
  });
});
