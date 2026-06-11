import { describe, it, expect } from "vitest";
import {
  throughput, efficiency, durability, blinding,
  tsCost, selfCleaning, forWaste, media,
  bestUse, trommelScreenTypes,
} from "../trommel-screen-calc.js";

describe("throughput", () => {
  it("banana screen highest throughput", () => {
    expect(throughput("banana_screen_multi_slope")).toBeGreaterThan(throughput("scrubber_trommel_wash"));
  });
});

describe("efficiency", () => {
  it("star screen most efficient", () => {
    expect(efficiency("star_screen_disc")).toBeGreaterThan(efficiency("grizzly_vibrating_bar"));
  });
});

describe("durability", () => {
  it("grizzly most durable", () => {
    expect(durability("grizzly_vibrating_bar")).toBeGreaterThan(durability("star_screen_disc"));
  });
});

describe("blinding", () => {
  it("star screen best anti-blinding", () => {
    expect(blinding("star_screen_disc")).toBeGreaterThan(blinding("banana_screen_multi_slope"));
  });
});

describe("tsCost", () => {
  it("banana screen most expensive", () => {
    expect(tsCost("banana_screen_multi_slope")).toBeGreaterThan(tsCost("grizzly_vibrating_bar"));
  });
});

describe("selfCleaning", () => {
  it("rotary drum is self cleaning", () => {
    expect(selfCleaning("rotary_drum_municipal")).toBe(true);
  });
  it("grizzly not self cleaning", () => {
    expect(selfCleaning("grizzly_vibrating_bar")).toBe(false);
  });
});

describe("forWaste", () => {
  it("rotary drum for waste", () => {
    expect(forWaste("rotary_drum_municipal")).toBe(true);
  });
  it("grizzly not for waste", () => {
    expect(forWaste("grizzly_vibrating_bar")).toBe(false);
  });
});

describe("media", () => {
  it("star screen uses rubber disc rotating shaft", () => {
    expect(media("star_screen_disc")).toBe("rubber_star_disc_rotating_shaft");
  });
});

describe("bestUse", () => {
  it("scrubber trommel for alluvial gold gravel", () => {
    expect(bestUse("scrubber_trommel_wash")).toBe("alluvial_gold_gravel_clay_scrub");
  });
});

describe("trommelScreenTypes", () => {
  it("returns 5 types", () => {
    expect(trommelScreenTypes()).toHaveLength(5);
  });
});
