import { describe, it, expect } from "vitest";
import {
  volume, jinglBrightness, playability, toneRange,
  tambourineCost, hasHead, tunable, jingleMaterial,
  bestGenre, tambourines,
} from "../tambourine-calc.js";

describe("volume", () => {
  it("double row headed loudest", () => {
    expect(volume("double_row_headed")).toBeGreaterThan(volume("mini_finger_jingle"));
  });
});

describe("jinglBrightness", () => {
  it("double row headed brightest jingles", () => {
    expect(jinglBrightness("double_row_headed")).toBeGreaterThan(jinglBrightness("orchestral_tunable"));
  });
});

describe("playability", () => {
  it("mini finger jingle easiest to play", () => {
    expect(playability("mini_finger_jingle")).toBeGreaterThan(playability("double_row_headed"));
  });
});

describe("toneRange", () => {
  it("orchestral tunable widest tone range", () => {
    expect(toneRange("orchestral_tunable")).toBeGreaterThan(toneRange("mini_finger_jingle"));
  });
});

describe("tambourineCost", () => {
  it("orchestral tunable most expensive", () => {
    expect(tambourineCost("orchestral_tunable")).toBeGreaterThan(tambourineCost("mini_finger_jingle"));
  });
});

describe("hasHead", () => {
  it("single row headed has head", () => {
    expect(hasHead("single_row_headed")).toBe(true);
  });
  it("headless half moon does not", () => {
    expect(hasHead("headless_half_moon")).toBe(false);
  });
});

describe("tunable", () => {
  it("orchestral tunable is tunable", () => {
    expect(tunable("orchestral_tunable")).toBe(true);
  });
  it("single row headed is not", () => {
    expect(tunable("single_row_headed")).toBe(false);
  });
});

describe("jingleMaterial", () => {
  it("orchestral tunable uses german silver precise", () => {
    expect(jingleMaterial("orchestral_tunable")).toBe("german_silver_precise");
  });
});

describe("bestGenre", () => {
  it("double row headed best for latin world percussion", () => {
    expect(bestGenre("double_row_headed")).toBe("latin_world_percussion");
  });
});

describe("tambourines", () => {
  it("returns 5 types", () => {
    expect(tambourines()).toHaveLength(5);
  });
});
