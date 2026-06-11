import { describe, it, expect } from "vitest";
import {
  speed, printQuality, registration, changeover,
  fpCost, uvCapable, forPackaging, impression,
  bestUse, flexographicPressTypes,
} from "../flexographic-press-calc.js";

describe("speed", () => {
  it("sleeve technology fastest", () => {
    expect(speed("sleeve_technology")).toBeGreaterThan(speed("unit_type"));
  });
});

describe("printQuality", () => {
  it("central impression best print quality", () => {
    expect(printQuality("central_impression")).toBeGreaterThan(printQuality("stack_type"));
  });
});

describe("registration", () => {
  it("central impression best registration", () => {
    expect(registration("central_impression")).toBeGreaterThan(registration("unit_type"));
  });
});

describe("changeover", () => {
  it("sleeve technology fastest changeover", () => {
    expect(changeover("sleeve_technology")).toBeGreaterThan(changeover("central_impression"));
  });
});

describe("fpCost", () => {
  it("sleeve technology most expensive", () => {
    expect(fpCost("sleeve_technology")).toBeGreaterThan(fpCost("unit_type"));
  });
});

describe("uvCapable", () => {
  it("central impression is uv capable", () => {
    expect(uvCapable("central_impression")).toBe(true);
  });
  it("unit type not uv capable", () => {
    expect(uvCapable("unit_type")).toBe(false);
  });
});

describe("forPackaging", () => {
  it("central impression for packaging", () => {
    expect(forPackaging("central_impression")).toBe(true);
  });
  it("unit type not for packaging", () => {
    expect(forPackaging("unit_type")).toBe(false);
  });
});

describe("impression", () => {
  it("stack type uses stacked print stations", () => {
    expect(impression("stack_type")).toBe("stacked_print_stations_individual_impression_drum");
  });
});

describe("bestUse", () => {
  it("central impression for flexible packaging", () => {
    expect(bestUse("central_impression")).toBe("flexible_packaging_film_pouch_snack_bag_shrink_label");
  });
});

describe("flexographicPressTypes", () => {
  it("returns 5 types", () => {
    expect(flexographicPressTypes()).toHaveLength(5);
  });
});
