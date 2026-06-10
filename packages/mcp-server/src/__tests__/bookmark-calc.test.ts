import { describe, it, expect } from "vitest";
import {
  pageHold, durability, pageGentle, aestheticAppeal,
  bookmarkCost, staysFlat, marksExactLine, materialType,
  bestReader, bookmarks,
} from "../bookmark-calc.js";

describe("pageHold", () => {
  it("magnetic fold over best page hold", () => {
    expect(pageHold("magnetic_fold_over")).toBeGreaterThan(pageHold("paper_card_flat"));
  });
});

describe("durability", () => {
  it("leather ribbon most durable", () => {
    expect(durability("leather_ribbon")).toBeGreaterThan(durability("paper_card_flat"));
  });
});

describe("pageGentle", () => {
  it("paper card flat most page gentle", () => {
    expect(pageGentle("paper_card_flat")).toBeGreaterThan(pageGentle("metal_clip_page"));
  });
});

describe("aestheticAppeal", () => {
  it("leather ribbon most aesthetic", () => {
    expect(aestheticAppeal("leather_ribbon")).toBeGreaterThan(aestheticAppeal("elastic_band_wrap"));
  });
});

describe("bookmarkCost", () => {
  it("leather ribbon most expensive", () => {
    expect(bookmarkCost("leather_ribbon")).toBeGreaterThan(bookmarkCost("paper_card_flat"));
  });
});

describe("staysFlat", () => {
  it("paper card flat stays flat", () => {
    expect(staysFlat("paper_card_flat")).toBe(true);
  });
  it("metal clip page does not", () => {
    expect(staysFlat("metal_clip_page")).toBe(false);
  });
});

describe("marksExactLine", () => {
  it("metal clip page marks exact line", () => {
    expect(marksExactLine("metal_clip_page")).toBe(true);
  });
  it("paper card flat does not", () => {
    expect(marksExactLine("paper_card_flat")).toBe(false);
  });
});

describe("materialType", () => {
  it("leather ribbon uses full grain leather tassel", () => {
    expect(materialType("leather_ribbon")).toBe("full_grain_leather_tassel");
  });
});

describe("bestReader", () => {
  it("magnetic fold over best for commuter bag toss safe", () => {
    expect(bestReader("magnetic_fold_over")).toBe("commuter_bag_toss_safe");
  });
});

describe("bookmarks", () => {
  it("returns 5 types", () => {
    expect(bookmarks()).toHaveLength(5);
  });
});
