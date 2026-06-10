import { describe, it, expect } from "vitest";
import {
  soothingMotion, speedSettings, portability, weightLimit,
  swingCost, musicBuiltIn, foldFlat, seatType,
  bestAge, babySwings,
} from "../baby-swing-calc.js";

describe("soothingMotion", () => {
  it("full size plug in most soothing", () => {
    expect(soothingMotion("full_size_plug_in")).toBeGreaterThan(soothingMotion("outdoor_bucket_seat"));
  });
});

describe("speedSettings", () => {
  it("full size plug in most speed settings", () => {
    expect(speedSettings("full_size_plug_in")).toBeGreaterThan(speedSettings("outdoor_bucket_seat"));
  });
});

describe("portability", () => {
  it("portable battery most portable", () => {
    expect(portability("portable_battery")).toBeGreaterThan(portability("full_size_plug_in"));
  });
});

describe("weightLimit", () => {
  it("outdoor bucket seat highest weight limit", () => {
    expect(weightLimit("outdoor_bucket_seat")).toBeGreaterThan(weightLimit("portable_battery"));
  });
});

describe("swingCost", () => {
  it("full size plug in most expensive", () => {
    expect(swingCost("full_size_plug_in")).toBeGreaterThan(swingCost("outdoor_bucket_seat"));
  });
});

describe("musicBuiltIn", () => {
  it("full size plug in has built in music", () => {
    expect(musicBuiltIn("full_size_plug_in")).toBe(true);
  });
  it("cradle rocker does not", () => {
    expect(musicBuiltIn("cradle_rocker")).toBe(false);
  });
});

describe("foldFlat", () => {
  it("portable battery folds flat", () => {
    expect(foldFlat("portable_battery")).toBe(true);
  });
  it("full size plug in does not", () => {
    expect(foldFlat("full_size_plug_in")).toBe(false);
  });
});

describe("seatType", () => {
  it("cradle rocker uses bassinet cocoon nest", () => {
    expect(seatType("cradle_rocker")).toBe("bassinet_cocoon_nest");
  });
});

describe("bestAge", () => {
  it("outdoor bucket seat for toddler playground", () => {
    expect(bestAge("outdoor_bucket_seat")).toBe("toddler_playground");
  });
});

describe("babySwings", () => {
  it("returns 5 types", () => {
    expect(babySwings()).toHaveLength(5);
  });
});
