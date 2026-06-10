import { describe, it, expect } from "vitest";
import {
  polishSpeed, surfaceFinish, deburring, mediaLife,
  mediaCost, wetProcess, reusable, mediaShape,
  bestUse, tumbleMedias,
} from "../tumble-media-calc.js";

describe("polishSpeed", () => {
  it("stainless shot burnish fastest polish", () => {
    expect(polishSpeed("stainless_shot_burnish")).toBeGreaterThan(polishSpeed("corn_cob_absorb"));
  });
});

describe("surfaceFinish", () => {
  it("stainless shot burnish best surface finish", () => {
    expect(surfaceFinish("stainless_shot_burnish")).toBeGreaterThan(surfaceFinish("corn_cob_absorb"));
  });
});

describe("deburring", () => {
  it("ceramic triangle deburr best deburring", () => {
    expect(deburring("ceramic_triangle_deburr")).toBeGreaterThan(deburring("stainless_shot_burnish"));
  });
});

describe("mediaLife", () => {
  it("stainless shot burnish longest life", () => {
    expect(mediaLife("stainless_shot_burnish")).toBeGreaterThan(mediaLife("corn_cob_absorb"));
  });
});

describe("mediaCost", () => {
  it("stainless shot burnish most expensive", () => {
    expect(mediaCost("stainless_shot_burnish")).toBeGreaterThan(mediaCost("walnut_shell_dry"));
  });
});

describe("wetProcess", () => {
  it("stainless shot burnish uses wet process", () => {
    expect(wetProcess("stainless_shot_burnish")).toBe(true);
  });
  it("walnut shell dry does not use wet process", () => {
    expect(wetProcess("walnut_shell_dry")).toBe(false);
  });
});

describe("reusable", () => {
  it("ceramic triangle deburr is reusable", () => {
    expect(reusable("ceramic_triangle_deburr")).toBe(true);
  });
  it("corn cob absorb is not reusable", () => {
    expect(reusable("corn_cob_absorb")).toBe(false);
  });
});

describe("mediaShape", () => {
  it("ceramic triangle deburr uses triangle angle cut", () => {
    expect(mediaShape("ceramic_triangle_deburr")).toBe("triangle_angle_cut");
  });
});

describe("bestUse", () => {
  it("stainless shot burnish best for high shine burnish", () => {
    expect(bestUse("stainless_shot_burnish")).toBe("high_shine_burnish");
  });
});

describe("tumbleMedias", () => {
  it("returns 5 types", () => {
    expect(tumbleMedias()).toHaveLength(5);
  });
});
