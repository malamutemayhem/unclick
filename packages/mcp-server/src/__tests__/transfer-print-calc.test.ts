import { describe, it, expect } from "vitest";
import {
  colorVibrancy, transferSpeed, washFastness, detailAccuracy,
  tpCost, heatRequired, forSynthetic, transferConfig,
  bestUse, transferPrintTypes,
} from "../transfer-print-calc.js";

describe("colorVibrancy", () => {
  it("sublimation heat best color vibrancy", () => {
    expect(colorVibrancy("sublimation_heat")).toBeGreaterThan(colorVibrancy("wet_transfer"));
  });
});

describe("transferSpeed", () => {
  it("laser transfer fastest transfer speed", () => {
    expect(transferSpeed("laser_transfer")).toBeGreaterThan(transferSpeed("wet_transfer"));
  });
});

describe("washFastness", () => {
  it("sublimation heat best wash fastness", () => {
    expect(washFastness("sublimation_heat")).toBeGreaterThan(washFastness("laser_transfer"));
  });
});

describe("detailAccuracy", () => {
  it("film release best detail accuracy", () => {
    expect(detailAccuracy("film_release")).toBeGreaterThan(detailAccuracy("wet_transfer"));
  });
});

describe("tpCost", () => {
  it("laser transfer most expensive", () => {
    expect(tpCost("laser_transfer")).toBeGreaterThan(tpCost("wet_transfer"));
  });
});

describe("heatRequired", () => {
  it("sublimation heat requires heat", () => {
    expect(heatRequired("sublimation_heat")).toBe(true);
  });
  it("wet transfer no heat required", () => {
    expect(heatRequired("wet_transfer")).toBe(false);
  });
});

describe("forSynthetic", () => {
  it("sublimation heat for synthetic", () => {
    expect(forSynthetic("sublimation_heat")).toBe(true);
  });
  it("melt transfer not for synthetic", () => {
    expect(forSynthetic("melt_transfer")).toBe(false);
  });
});

describe("transferConfig", () => {
  it("film release uses pet film carrier dtf", () => {
    expect(transferConfig("film_release")).toBe("pet_film_carrier_dtf_powder_adhesive_heat_press_release_peel");
  });
});

describe("bestUse", () => {
  it("melt transfer for dark fabric opaque transfer", () => {
    expect(bestUse("melt_transfer")).toBe("dark_fabric_opaque_transfer_promotional_tshirt_custom_graphic");
  });
});

describe("transferPrintTypes", () => {
  it("returns 5 types", () => {
    expect(transferPrintTypes()).toHaveLength(5);
  });
});
