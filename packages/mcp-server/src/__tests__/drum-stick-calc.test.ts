import { describe, it, expect } from "vitest";
import {
  volume, articulation, rebound, cymbalResponse,
  stickCost, retractable, suitableForRock, tipMaterial,
  bestGenre, drumSticks,
} from "../drum-stick-calc.js";

describe("volume", () => {
  it("wood tip 5b loudest", () => {
    expect(volume("wood_tip_5b")).toBeGreaterThan(volume("brush_wire"));
  });
});

describe("articulation", () => {
  it("nylon tip 7a best articulation", () => {
    expect(articulation("nylon_tip_7a")).toBeGreaterThan(articulation("mallet_felt"));
  });
});

describe("rebound", () => {
  it("nylon tip 7a best rebound", () => {
    expect(rebound("nylon_tip_7a")).toBeGreaterThan(rebound("brush_wire"));
  });
});

describe("cymbalResponse", () => {
  it("nylon tip 7a best cymbal response", () => {
    expect(cymbalResponse("nylon_tip_7a")).toBeGreaterThan(cymbalResponse("mallet_felt"));
  });
});

describe("stickCost", () => {
  it("brush wire most expensive", () => {
    expect(stickCost("brush_wire")).toBeGreaterThan(stickCost("wood_tip_5a"));
  });
});

describe("retractable", () => {
  it("brush wire is retractable", () => {
    expect(retractable("brush_wire")).toBe(true);
  });
  it("wood tip 5a is not", () => {
    expect(retractable("wood_tip_5a")).toBe(false);
  });
});

describe("suitableForRock", () => {
  it("wood tip 5b for rock", () => {
    expect(suitableForRock("wood_tip_5b")).toBe(true);
  });
  it("brush wire not for rock", () => {
    expect(suitableForRock("brush_wire")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("nylon tip 7a uses maple nylon round tip", () => {
    expect(tipMaterial("nylon_tip_7a")).toBe("maple_nylon_round_tip");
  });
});

describe("bestGenre", () => {
  it("brush wire for jazz ballad quiet sweep", () => {
    expect(bestGenre("brush_wire")).toBe("jazz_ballad_quiet_sweep");
  });
});

describe("drumSticks", () => {
  it("returns 5 types", () => {
    expect(drumSticks()).toHaveLength(5);
  });
});
