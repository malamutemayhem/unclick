import { describe, it, expect } from "vitest";
import {
  speed, resolution, durability, mediaRange,
  ijCost, dropOnDemand, forPhoto, ejection,
  bestUse, inkjetPrintTypes,
} from "../inkjet-print-calc.js";

describe("speed", () => {
  it("continuous cij fastest", () => {
    expect(speed("continuous_cij_industrial")).toBeGreaterThan(speed("thermal_bubble_desktop"));
  });
});

describe("resolution", () => {
  it("piezo best resolution", () => {
    expect(resolution("piezo_drop_on_demand")).toBeGreaterThan(resolution("continuous_cij_industrial"));
  });
});

describe("durability", () => {
  it("uv cure most durable", () => {
    expect(durability("uv_cure_flatbed")).toBeGreaterThan(durability("thermal_bubble_desktop"));
  });
});

describe("mediaRange", () => {
  it("uv flatbed widest media range", () => {
    expect(mediaRange("uv_cure_flatbed")).toBeGreaterThan(mediaRange("thermal_bubble_desktop"));
  });
});

describe("ijCost", () => {
  it("uv flatbed most expensive", () => {
    expect(ijCost("uv_cure_flatbed")).toBeGreaterThan(ijCost("thermal_bubble_desktop"));
  });
});

describe("dropOnDemand", () => {
  it("thermal is drop on demand", () => {
    expect(dropOnDemand("thermal_bubble_desktop")).toBe(true);
  });
  it("continuous not drop on demand", () => {
    expect(dropOnDemand("continuous_cij_industrial")).toBe(false);
  });
});

describe("forPhoto", () => {
  it("piezo for photo", () => {
    expect(forPhoto("piezo_drop_on_demand")).toBe(true);
  });
  it("continuous not for photo", () => {
    expect(forPhoto("continuous_cij_industrial")).toBe(false);
  });
});

describe("ejection", () => {
  it("continuous uses electrostatic stream", () => {
    expect(ejection("continuous_cij_industrial")).toBe("continuous_stream_electrostatic");
  });
});

describe("bestUse", () => {
  it("thermal for home office", () => {
    expect(bestUse("thermal_bubble_desktop")).toBe("home_office_document_photo");
  });
});

describe("inkjetPrintTypes", () => {
  it("returns 5 types", () => {
    expect(inkjetPrintTypes()).toHaveLength(5);
  });
});
