import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, mediaRange, partSafety,
  tfCost_, gentle, forPrecision, finisherConfig,
  bestUse, tumbleFinisherTypes,
} from "../tumble-finisher-calc.js";

describe("surfaceFinish", () => {
  it("drag finish best surface finish", () => {
    expect(surfaceFinish("drag_finish")).toBeGreaterThan(surfaceFinish("rotary_barrel"));
  });
});

describe("throughput", () => {
  it("centrifugal disc highest throughput", () => {
    expect(throughput("centrifugal_disc")).toBeGreaterThan(throughput("drag_finish"));
  });
});

describe("mediaRange", () => {
  it("vibratory bowl good media range", () => {
    expect(mediaRange("vibratory_bowl")).toBeGreaterThan(mediaRange("rotary_barrel"));
  });
});

describe("partSafety", () => {
  it("drag finish best part safety", () => {
    expect(partSafety("drag_finish")).toBeGreaterThan(partSafety("rotary_barrel"));
  });
});

describe("tfCost_", () => {
  it("drag finish most expensive", () => {
    expect(tfCost_("drag_finish")).toBeGreaterThan(tfCost_("rotary_barrel"));
  });
});

describe("gentle", () => {
  it("drag finish is gentle", () => {
    expect(gentle("drag_finish")).toBe(true);
  });
  it("vibratory bowl not gentle", () => {
    expect(gentle("vibratory_bowl")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("centrifugal disc for precision", () => {
    expect(forPrecision("centrifugal_disc")).toBe(true);
  });
  it("rotary barrel not for precision", () => {
    expect(forPrecision("rotary_barrel")).toBe(false);
  });
});

describe("finisherConfig", () => {
  it("drag finish uses spindle mount pull through media isotropic", () => {
    expect(finisherConfig("drag_finish")).toBe("drag_tumble_finisher_spindle_mount_pull_through_media_isotropic");
  });
});

describe("bestUse", () => {
  it("centrifugal disc for jewelry coin fast high luster", () => {
    expect(bestUse("centrifugal_disc")).toBe("jewelry_coin_centrifugal_disc_tumble_finisher_fast_high_luster");
  });
});

describe("tumbleFinisherTypes", () => {
  it("returns 5 types", () => {
    expect(tumbleFinisherTypes()).toHaveLength(5);
  });
});
