import { describe, it, expect } from "vitest";
import {
  loudness, aestheticAppeal, durability, installEase,
  knockerCost, hasCamera, solidMetal, knockerFinish,
  bestDoor, doorKnockers,
} from "../door-knocker-calc.js";

describe("loudness", () => {
  it("smart video combo loudest", () => {
    expect(loudness("smart_video_combo")).toBeGreaterThan(loudness("bar_lever_modern"));
  });
});

describe("aestheticAppeal", () => {
  it("lion head cast most aesthetic", () => {
    expect(aestheticAppeal("lion_head_cast")).toBeGreaterThan(aestheticAppeal("smart_video_combo"));
  });
});

describe("durability", () => {
  it("lion head cast most durable", () => {
    expect(durability("lion_head_cast")).toBeGreaterThan(durability("smart_video_combo"));
  });
});

describe("installEase", () => {
  it("bar lever modern easiest install", () => {
    expect(installEase("bar_lever_modern")).toBeGreaterThan(installEase("smart_video_combo"));
  });
});

describe("knockerCost", () => {
  it("smart video combo most expensive", () => {
    expect(knockerCost("smart_video_combo")).toBeGreaterThan(knockerCost("ring_pull_classic"));
  });
});

describe("hasCamera", () => {
  it("smart video combo has camera", () => {
    expect(hasCamera("smart_video_combo")).toBe(true);
  });
  it("lion head cast does not", () => {
    expect(hasCamera("lion_head_cast")).toBe(false);
  });
});

describe("solidMetal", () => {
  it("lion head cast is solid metal", () => {
    expect(solidMetal("lion_head_cast")).toBe(true);
  });
  it("smart video combo is not", () => {
    expect(solidMetal("smart_video_combo")).toBe(false);
  });
});

describe("knockerFinish", () => {
  it("lion head cast uses polished bronze cast", () => {
    expect(knockerFinish("lion_head_cast")).toBe("polished_bronze_cast");
  });
});

describe("bestDoor", () => {
  it("lion head cast best for formal grand entrance", () => {
    expect(bestDoor("lion_head_cast")).toBe("formal_grand_entrance");
  });
});

describe("doorKnockers", () => {
  it("returns 5 types", () => {
    expect(doorKnockers()).toHaveLength(5);
  });
});
