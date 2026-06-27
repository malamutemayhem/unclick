import { describe, it, expect } from "vitest";
import {
  durability, readability, installSpeed, reusability,
  markerCost, printable, forOutdoor, attachMethod,
  bestUse, cableMarkers,
} from "../cable-marker-calc.js";

describe("durability", () => {
  it("engraved metal tag most durable", () => {
    expect(durability("engraved_metal_tag")).toBeGreaterThan(durability("color_band_ring"));
  });
});

describe("readability", () => {
  it("tie on tag plate best readability", () => {
    expect(readability("tie_on_tag_plate")).toBeGreaterThan(readability("color_band_ring"));
  });
});

describe("installSpeed", () => {
  it("color band ring fastest install", () => {
    expect(installSpeed("color_band_ring")).toBeGreaterThan(installSpeed("engraved_metal_tag"));
  });
});

describe("reusability", () => {
  it("color band ring most reusable", () => {
    expect(reusability("color_band_ring")).toBeGreaterThan(reusability("wrap_around_print"));
  });
});

describe("markerCost", () => {
  it("engraved metal tag most expensive", () => {
    expect(markerCost("engraved_metal_tag")).toBeGreaterThan(markerCost("color_band_ring"));
  });
});

describe("printable", () => {
  it("wrap around print is printable", () => {
    expect(printable("wrap_around_print")).toBe(true);
  });
  it("clip on letter snap not printable", () => {
    expect(printable("clip_on_letter_snap")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("engraved metal tag is for outdoor", () => {
    expect(forOutdoor("engraved_metal_tag")).toBe(true);
  });
  it("clip on letter snap not for outdoor", () => {
    expect(forOutdoor("clip_on_letter_snap")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("engraved metal tag uses wire loop tie", () => {
    expect(attachMethod("engraved_metal_tag")).toBe("wire_loop_tie");
  });
});

describe("bestUse", () => {
  it("clip on letter snap best for patch panel port id", () => {
    expect(bestUse("clip_on_letter_snap")).toBe("patch_panel_port_id");
  });
});

describe("cableMarkers", () => {
  it("returns 5 types", () => {
    expect(cableMarkers()).toHaveLength(5);
  });
});
