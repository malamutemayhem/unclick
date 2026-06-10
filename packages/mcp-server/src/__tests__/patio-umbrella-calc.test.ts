import { describe, it, expect } from "vitest";
import {
  shadeArea, windResist, adjustability, portability,
  umbrellaCost, uvProtection, hasCrank, canopyFabric,
  bestSpot, patioUmbrellas,
} from "../patio-umbrella-calc.js";

describe("shadeArea", () => {
  it("commercial square large largest shade area", () => {
    expect(shadeArea("commercial_square_large")).toBeGreaterThan(shadeArea("beach_portable_spike"));
  });
});

describe("windResist", () => {
  it("commercial square large best wind resist", () => {
    expect(windResist("commercial_square_large")).toBeGreaterThan(windResist("beach_portable_spike"));
  });
});

describe("adjustability", () => {
  it("cantilever offset arm most adjustable", () => {
    expect(adjustability("cantilever_offset_arm")).toBeGreaterThan(adjustability("market_center_pole"));
  });
});

describe("portability", () => {
  it("beach portable spike most portable", () => {
    expect(portability("beach_portable_spike")).toBeGreaterThan(portability("cantilever_offset_arm"));
  });
});

describe("umbrellaCost", () => {
  it("commercial square large most expensive", () => {
    expect(umbrellaCost("commercial_square_large")).toBeGreaterThan(umbrellaCost("beach_portable_spike"));
  });
});

describe("uvProtection", () => {
  it("all umbrellas have uv protection", () => {
    expect(uvProtection("market_center_pole")).toBe(true);
    expect(uvProtection("beach_portable_spike")).toBe(true);
  });
});

describe("hasCrank", () => {
  it("cantilever offset arm has crank", () => {
    expect(hasCrank("cantilever_offset_arm")).toBe(true);
  });
  it("beach portable spike has no crank", () => {
    expect(hasCrank("beach_portable_spike")).toBe(false);
  });
});

describe("canopyFabric", () => {
  it("cantilever offset arm uses sunbrella acrylic premium", () => {
    expect(canopyFabric("cantilever_offset_arm")).toBe("sunbrella_acrylic_premium");
  });
});

describe("bestSpot", () => {
  it("beach portable spike best for sand beach park field", () => {
    expect(bestSpot("beach_portable_spike")).toBe("sand_beach_park_field");
  });
});

describe("patioUmbrellas", () => {
  it("returns 5 types", () => {
    expect(patioUmbrellas()).toHaveLength(5);
  });
});
