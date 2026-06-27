import { describe, it, expect } from "vitest";
import {
  impressClean, alignEase, durability, storageCompact,
  stampCost, clear, mounted, stampBase,
  bestUse, stampBlocks,
} from "../stamp-block-calc.js";

describe("impressClean", () => {
  it("wood mount heavy cleanest impression", () => {
    expect(impressClean("wood_mount_heavy")).toBeGreaterThan(impressClean("foam_stamp_budget"));
  });
});

describe("alignEase", () => {
  it("clear stamp see easiest align", () => {
    expect(alignEase("clear_stamp_see")).toBeGreaterThan(alignEase("wood_mount_heavy"));
  });
});

describe("durability", () => {
  it("wood mount heavy most durable", () => {
    expect(durability("wood_mount_heavy")).toBeGreaterThan(durability("foam_stamp_budget"));
  });
});

describe("storageCompact", () => {
  it("clear stamp see most compact storage", () => {
    expect(storageCompact("clear_stamp_see")).toBeGreaterThan(storageCompact("wood_mount_heavy"));
  });
});

describe("stampCost", () => {
  it("wood mount heavy most expensive", () => {
    expect(stampCost("wood_mount_heavy")).toBeGreaterThan(stampCost("foam_stamp_budget"));
  });
});

describe("clear", () => {
  it("clear stamp see is clear", () => {
    expect(clear("clear_stamp_see")).toBe(true);
  });
  it("rubber stamp standard not clear", () => {
    expect(clear("rubber_stamp_standard")).toBe(false);
  });
});

describe("mounted", () => {
  it("rubber stamp standard is mounted", () => {
    expect(mounted("rubber_stamp_standard")).toBe(true);
  });
  it("clear stamp see not mounted", () => {
    expect(mounted("clear_stamp_see")).toBe(false);
  });
});

describe("stampBase", () => {
  it("clear stamp see uses photopolymer sheet", () => {
    expect(stampBase("clear_stamp_see")).toBe("photopolymer_sheet");
  });
});

describe("bestUse", () => {
  it("rubber stamp standard best for general crisp stamp", () => {
    expect(bestUse("rubber_stamp_standard")).toBe("general_crisp_stamp");
  });
});

describe("stampBlocks", () => {
  it("returns 5 types", () => {
    expect(stampBlocks()).toHaveLength(5);
  });
});
