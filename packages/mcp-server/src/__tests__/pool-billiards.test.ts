import { describe, it, expect } from "vitest";
import {
  tableArea, roomSize, ballCount, rackPattern, shotAngle,
  deflection, cueSpeed, spinRpm, throwAngle, pocketSpeed,
  handicap, raceLength, gameTypes,
} from "../pool-billiards.js";

describe("tableArea", () => {
  it("length x width", () => {
    expect(tableArea(9, 4.5)).toBe(40.5);
  });
});

describe("roomSize", () => {
  it("bigger than table", () => {
    expect(roomSize(9, 4.5)).toBeGreaterThan(tableArea(9, 4.5));
  });
});

describe("ballCount", () => {
  it("8ball has 16", () => {
    expect(ballCount("8ball")).toBe(16);
  });

  it("carom has 3", () => {
    expect(ballCount("carom")).toBe(3);
  });
});

describe("rackPattern", () => {
  it("9ball is diamond", () => {
    expect(rackPattern("9ball")).toContain("diamond");
  });
});

describe("shotAngle", () => {
  it("complement of cut angle", () => {
    expect(shotAngle(30)).toBe(60);
  });
});

describe("deflection", () => {
  it("positive with spin", () => {
    expect(deflection(30, 50)).toBeGreaterThan(0);
  });
});

describe("cueSpeed", () => {
  it("positive speed", () => {
    expect(cueSpeed(5)).toBeGreaterThan(0);
  });
});

describe("spinRpm", () => {
  it("positive rpm", () => {
    expect(spinRpm(0.5, 15)).toBeGreaterThan(0);
  });
});

describe("throwAngle", () => {
  it("positive degrees", () => {
    expect(throwAngle(30, 500)).toBeGreaterThan(0);
  });
});

describe("pocketSpeed", () => {
  it("slow for straight", () => {
    expect(pocketSpeed(10)).toBe("slow");
  });

  it("firm for steep angle", () => {
    expect(pocketSpeed(45)).toBe("firm");
  });
});

describe("handicap", () => {
  it("positive for below 50%", () => {
    expect(handicap(40)).toBeGreaterThan(0);
  });
});

describe("raceLength", () => {
  it("longer for close skill", () => {
    expect(raceLength(1)).toBeGreaterThan(raceLength(5));
  });
});

describe("gameTypes", () => {
  it("returns 6 types", () => {
    expect(gameTypes()).toHaveLength(6);
  });
});
