import { describe, it, expect } from "vitest";
import {
  strength, protection, packSpeed, printability,
  ctCost, onepiece, forHeavy, closure,
  bestUse, cartonTypes,
} from "../carton-type-calc.js";

describe("strength", () => {
  it("full overlap strongest", () => {
    expect(strength("fol_full_overlap")).toBeGreaterThan(strength("wraparound_blanket"));
  });
});

describe("protection", () => {
  it("telescope best protection", () => {
    expect(protection("telescope_two_piece")).toBeGreaterThan(protection("wraparound_blanket"));
  });
});

describe("packSpeed", () => {
  it("wraparound fastest pack speed", () => {
    expect(packSpeed("wraparound_blanket")).toBeGreaterThan(packSpeed("telescope_two_piece"));
  });
});

describe("printability", () => {
  it("die cut best printability", () => {
    expect(printability("die_cut_custom")).toBeGreaterThan(printability("fol_full_overlap"));
  });
});

describe("ctCost", () => {
  it("die cut most expensive", () => {
    expect(ctCost("die_cut_custom")).toBeGreaterThan(ctCost("rsc_regular_slotted"));
  });
});

describe("onepiece", () => {
  it("rsc is onepiece", () => {
    expect(onepiece("rsc_regular_slotted")).toBe(true);
  });
  it("telescope not onepiece", () => {
    expect(onepiece("telescope_two_piece")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("full overlap for heavy", () => {
    expect(forHeavy("fol_full_overlap")).toBe(true);
  });
  it("rsc not for heavy", () => {
    expect(forHeavy("rsc_regular_slotted")).toBe(false);
  });
});

describe("closure", () => {
  it("die cut uses tuck end auto lock", () => {
    expect(closure("die_cut_custom")).toBe("tuck_end_auto_lock_tab");
  });
});

describe("bestUse", () => {
  it("wraparound best for book media tray", () => {
    expect(bestUse("wraparound_blanket")).toBe("book_media_tray_pack_line");
  });
});

describe("cartonTypes", () => {
  it("returns 5 types", () => {
    expect(cartonTypes()).toHaveLength(5);
  });
});
