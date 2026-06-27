import { describe, it, expect } from "vitest";
import {
  deposition, penetration, spattering, speed,
  mwCost, gasShielded, forThick, wire,
  bestUse, migWelderTypes,
} from "../mig-welder-calc.js";

describe("deposition", () => {
  it("tandem mig highest deposition", () => {
    expect(deposition("tandem_mig_high_speed")).toBeGreaterThan(deposition("short_circuit_thin"));
  });
});

describe("penetration", () => {
  it("spray transfer deepest penetration", () => {
    expect(penetration("spray_transfer_thick")).toBeGreaterThan(penetration("short_circuit_thin"));
  });
});

describe("spattering", () => {
  it("pulsed mig least spatter", () => {
    expect(spattering("pulsed_mig_versatile")).toBeGreaterThan(spattering("flux_cored_outdoor"));
  });
});

describe("speed", () => {
  it("tandem mig fastest", () => {
    expect(speed("tandem_mig_high_speed")).toBeGreaterThan(speed("short_circuit_thin"));
  });
});

describe("mwCost", () => {
  it("tandem mig most expensive", () => {
    expect(mwCost("tandem_mig_high_speed")).toBeGreaterThan(mwCost("short_circuit_thin"));
  });
});

describe("gasShielded", () => {
  it("spray transfer is gas shielded", () => {
    expect(gasShielded("spray_transfer_thick")).toBe(true);
  });
  it("flux cored not gas shielded", () => {
    expect(gasShielded("flux_cored_outdoor")).toBe(false);
  });
});

describe("forThick", () => {
  it("spray transfer for thick material", () => {
    expect(forThick("spray_transfer_thick")).toBe(true);
  });
  it("short circuit not for thick", () => {
    expect(forThick("short_circuit_thin")).toBe(false);
  });
});

describe("wire", () => {
  it("flux cored uses self shielded wire", () => {
    expect(wire("flux_cored_outdoor")).toBe("flux_cored_self_shielded_e71t_gs");
  });
});

describe("bestUse", () => {
  it("pulsed mig for aluminum stainless", () => {
    expect(bestUse("pulsed_mig_versatile")).toBe("aluminum_stainless_all_position_cosmetic");
  });
});

describe("migWelderTypes", () => {
  it("returns 5 types", () => {
    expect(migWelderTypes()).toHaveLength(5);
  });
});
