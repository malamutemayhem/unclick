import { describe, it, expect } from "vitest";
import {
  openEase, threadGuide, durability, cordRange,
  fidCost, hollow, tapered, tipShape,
  bestUse, fidTools,
} from "../fid-tool-calc.js";

describe("openEase", () => {
  it("tapered fid splice easiest open", () => {
    expect(openEase("tapered_fid_splice")).toBeGreaterThan(openEase("hollow_fid_thread"));
  });
});

describe("threadGuide", () => {
  it("hollow fid thread best thread guide", () => {
    expect(threadGuide("hollow_fid_thread")).toBeGreaterThan(threadGuide("wooden_fid_standard"));
  });
});

describe("durability", () => {
  it("metal fid durable most durable", () => {
    expect(durability("metal_fid_durable")).toBeGreaterThan(durability("bone_fid_smooth"));
  });
});

describe("cordRange", () => {
  it("tapered fid splice widest cord range", () => {
    expect(cordRange("tapered_fid_splice")).toBeGreaterThan(cordRange("hollow_fid_thread"));
  });
});

describe("fidCost", () => {
  it("hollow fid thread most expensive", () => {
    expect(fidCost("hollow_fid_thread")).toBeGreaterThan(fidCost("wooden_fid_standard"));
  });
});

describe("hollow", () => {
  it("hollow fid thread is hollow", () => {
    expect(hollow("hollow_fid_thread")).toBe(true);
  });
  it("wooden fid standard not hollow", () => {
    expect(hollow("wooden_fid_standard")).toBe(false);
  });
});

describe("tapered", () => {
  it("tapered fid splice is tapered", () => {
    expect(tapered("tapered_fid_splice")).toBe(true);
  });
  it("hollow fid thread not tapered", () => {
    expect(tapered("hollow_fid_thread")).toBe(false);
  });
});

describe("tipShape", () => {
  it("hollow fid thread uses hollow tube channel", () => {
    expect(tipShape("hollow_fid_thread")).toBe("hollow_tube_channel");
  });
});

describe("bestUse", () => {
  it("wooden fid standard best for general rope splice", () => {
    expect(bestUse("wooden_fid_standard")).toBe("general_rope_splice");
  });
});

describe("fidTools", () => {
  it("returns 5 types", () => {
    expect(fidTools()).toHaveLength(5);
  });
});
