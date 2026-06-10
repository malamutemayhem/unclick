import { describe, it, expect } from "vitest";
import {
  readAccuracy, lengthReach, portability, versatility,
  levelCost, magnetic, handsFree, vialCount,
  bestUse, spiritLevels,
} from "../spirit-level-calc.js";

describe("readAccuracy", () => {
  it("box beam standard most accurate", () => {
    expect(readAccuracy("box_beam_standard")).toBeGreaterThan(readAccuracy("line_level_string"));
  });
});

describe("lengthReach", () => {
  it("box beam standard longest reach", () => {
    expect(lengthReach("box_beam_standard")).toBeGreaterThan(lengthReach("bullseye_round_flat"));
  });
});

describe("portability", () => {
  it("torpedo short tight most portable", () => {
    expect(portability("torpedo_short_tight")).toBeGreaterThan(portability("box_beam_standard"));
  });
});

describe("versatility", () => {
  it("torpedo short tight most versatile", () => {
    expect(versatility("torpedo_short_tight")).toBeGreaterThan(versatility("bullseye_round_flat"));
  });
});

describe("levelCost", () => {
  it("box beam standard more expensive than torpedo", () => {
    expect(levelCost("box_beam_standard")).toBeGreaterThan(levelCost("torpedo_short_tight"));
  });
});

describe("magnetic", () => {
  it("torpedo short tight is magnetic", () => {
    expect(magnetic("torpedo_short_tight")).toBe(true);
  });
  it("box beam standard not magnetic", () => {
    expect(magnetic("box_beam_standard")).toBe(false);
  });
});

describe("handsFree", () => {
  it("post level column is hands free", () => {
    expect(handsFree("post_level_column")).toBe(true);
  });
  it("box beam standard not hands free", () => {
    expect(handsFree("box_beam_standard")).toBe(false);
  });
});

describe("vialCount", () => {
  it("box beam standard has three vial set", () => {
    expect(vialCount("box_beam_standard")).toBe("three_vial_set");
  });
});

describe("bestUse", () => {
  it("torpedo short tight best for plumbing tight space", () => {
    expect(bestUse("torpedo_short_tight")).toBe("plumbing_tight_space");
  });
});

describe("spiritLevels", () => {
  it("returns 5 types", () => {
    expect(spiritLevels()).toHaveLength(5);
  });
});
