import { describe, it, expect } from "vitest";
import {
  tempoRange, harmonicComplexity, rhythmicComplexity,
  improvisationLevel, productionComplexity, livePerformance,
  usesNotation, originDecade, globalPopularity, musicGenres,
} from "../music-genre-calc.js";

describe("tempoRange", () => {
  it("classical has widest tempo range", () => {
    expect(tempoRange("classical")).toBeGreaterThan(
      tempoRange("hip_hop")
    );
  });
});

describe("harmonicComplexity", () => {
  it("jazz has highest harmonic complexity", () => {
    expect(harmonicComplexity("jazz")).toBeGreaterThan(
      harmonicComplexity("hip_hop")
    );
  });
});

describe("rhythmicComplexity", () => {
  it("jazz has highest rhythmic complexity", () => {
    expect(rhythmicComplexity("jazz")).toBeGreaterThan(
      rhythmicComplexity("rock")
    );
  });
});

describe("improvisationLevel", () => {
  it("jazz has most improvisation", () => {
    expect(improvisationLevel("jazz")).toBeGreaterThan(
      improvisationLevel("classical")
    );
  });
});

describe("productionComplexity", () => {
  it("electronic has highest production complexity", () => {
    expect(productionComplexity("electronic")).toBeGreaterThan(
      productionComplexity("jazz")
    );
  });
});

describe("livePerformance", () => {
  it("all genres perform live", () => {
    expect(livePerformance("classical")).toBe(true);
    expect(livePerformance("hip_hop")).toBe(true);
  });
});

describe("usesNotation", () => {
  it("classical uses notation", () => {
    expect(usesNotation("classical")).toBe(true);
  });
  it("rock does not", () => {
    expect(usesNotation("rock")).toBe(false);
  });
});

describe("originDecade", () => {
  it("rock originated in 1950s", () => {
    expect(originDecade("rock")).toBe("1950s");
  });
});

describe("globalPopularity", () => {
  it("hip hop is most popular globally", () => {
    expect(globalPopularity("hip_hop")).toBeGreaterThan(
      globalPopularity("jazz")
    );
  });
});

describe("musicGenres", () => {
  it("returns 5 types", () => {
    expect(musicGenres()).toHaveLength(5);
  });
});
