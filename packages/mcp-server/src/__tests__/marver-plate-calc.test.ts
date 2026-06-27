import { describe, it, expect } from "vitest";
import {
  surfaceSmooth, heatDraw, shapeControl, durability,
  marverCost, textured, forChill, surfaceMaterial,
  bestUse, marverPlates,
} from "../marver-plate-calc.js";

describe("surfaceSmooth", () => {
  it("graphite smooth slide smoothest surface", () => {
    expect(surfaceSmooth("graphite_smooth_slide")).toBeGreaterThan(surfaceSmooth("brass_textured_pattern"));
  });
});

describe("heatDraw", () => {
  it("marble cold chill best heat draw", () => {
    expect(heatDraw("marble_cold_chill")).toBeGreaterThan(heatDraw("wooden_paddle_char"));
  });
});

describe("shapeControl", () => {
  it("graphite smooth slide best shape control", () => {
    expect(shapeControl("graphite_smooth_slide")).toBeGreaterThan(shapeControl("brass_textured_pattern"));
  });
});

describe("durability", () => {
  it("steel flat standard most durable", () => {
    expect(durability("steel_flat_standard")).toBeGreaterThan(durability("wooden_paddle_char"));
  });
});

describe("marverCost", () => {
  it("graphite smooth slide most expensive", () => {
    expect(marverCost("graphite_smooth_slide")).toBeGreaterThan(marverCost("wooden_paddle_char"));
  });
});

describe("textured", () => {
  it("brass textured pattern is textured", () => {
    expect(textured("brass_textured_pattern")).toBe(true);
  });
  it("steel flat standard not textured", () => {
    expect(textured("steel_flat_standard")).toBe(false);
  });
});

describe("forChill", () => {
  it("marble cold chill is for chill", () => {
    expect(forChill("marble_cold_chill")).toBe(true);
  });
  it("steel flat standard not for chill", () => {
    expect(forChill("steel_flat_standard")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("wooden paddle char uses charred wood paddle", () => {
    expect(surfaceMaterial("wooden_paddle_char")).toBe("charred_wood_paddle");
  });
});

describe("bestUse", () => {
  it("marble cold chill best for rapid chill shape", () => {
    expect(bestUse("marble_cold_chill")).toBe("rapid_chill_shape");
  });
});

describe("marverPlates", () => {
  it("returns 5 types", () => {
    expect(marverPlates()).toHaveLength(5);
  });
});
