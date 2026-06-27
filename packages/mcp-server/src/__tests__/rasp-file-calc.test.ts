import { describe, it, expect } from "vitest";
import {
  materialRemoval, surfaceFinish, shapeAccess, durability,
  raspCost, handStitched, forMetal, toothPattern,
  bestProject, raspFiles,
} from "../rasp-file-calc.js";

describe("materialRemoval", () => {
  it("pattern maker rasp most material removal", () => {
    expect(materialRemoval("pattern_maker_rasp")).toBeGreaterThan(materialRemoval("needle_file_small"));
  });
});

describe("surfaceFinish", () => {
  it("needle file small best surface finish", () => {
    expect(surfaceFinish("needle_file_small")).toBeGreaterThan(surfaceFinish("microplane_surform"));
  });
});

describe("shapeAccess", () => {
  it("riffler curved detail best shape access", () => {
    expect(shapeAccess("riffler_curved_detail")).toBeGreaterThan(shapeAccess("microplane_surform"));
  });
});

describe("durability", () => {
  it("pattern maker rasp most durable", () => {
    expect(durability("pattern_maker_rasp")).toBeGreaterThan(durability("microplane_surform"));
  });
});

describe("raspCost", () => {
  it("pattern maker rasp most expensive", () => {
    expect(raspCost("pattern_maker_rasp")).toBeGreaterThan(raspCost("needle_file_small"));
  });
});

describe("handStitched", () => {
  it("cabinet rasp hand is hand stitched", () => {
    expect(handStitched("cabinet_rasp_hand")).toBe(true);
  });
  it("microplane surform is not hand stitched", () => {
    expect(handStitched("microplane_surform")).toBe(false);
  });
});

describe("forMetal", () => {
  it("needle file small is for metal", () => {
    expect(forMetal("needle_file_small")).toBe(true);
  });
  it("cabinet rasp hand is not for metal", () => {
    expect(forMetal("cabinet_rasp_hand")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("microplane surform uses photo etched sharp", () => {
    expect(toothPattern("microplane_surform")).toBe("photo_etched_sharp");
  });
});

describe("bestProject", () => {
  it("riffler curved detail best for instrument scroll shape", () => {
    expect(bestProject("riffler_curved_detail")).toBe("instrument_scroll_shape");
  });
});

describe("raspFiles", () => {
  it("returns 5 types", () => {
    expect(raspFiles()).toHaveLength(5);
  });
});
