import { describe, it, expect } from "vitest";
import {
  pressForce, cycleSpeed, partComplexity, surfaceQuality,
  cmCost, heated, forComposite, molderConfig,
  bestUse, compressionMolderTypes,
} from "../compression-molder-calc.js";

describe("pressForce", () => {
  it("hydraulic downstroke highest press force", () => {
    expect(pressForce("hydraulic_downstroke")).toBeGreaterThan(pressForce("cold_press"));
  });
});

describe("cycleSpeed", () => {
  it("transfer mold fastest cycle speed", () => {
    expect(cycleSpeed("transfer_mold")).toBeGreaterThan(cycleSpeed("cold_press"));
  });
});

describe("partComplexity", () => {
  it("transfer mold best part complexity", () => {
    expect(partComplexity("transfer_mold")).toBeGreaterThan(partComplexity("cold_press"));
  });
});

describe("surfaceQuality", () => {
  it("vacuum assisted best surface quality", () => {
    expect(surfaceQuality("vacuum_assisted")).toBeGreaterThan(surfaceQuality("cold_press"));
  });
});

describe("cmCost", () => {
  it("vacuum assisted most expensive", () => {
    expect(cmCost("vacuum_assisted")).toBeGreaterThan(cmCost("cold_press"));
  });
});

describe("heated", () => {
  it("hydraulic upstroke is heated", () => {
    expect(heated("hydraulic_upstroke")).toBe(true);
  });
  it("cold press not heated", () => {
    expect(heated("cold_press")).toBe(false);
  });
});

describe("forComposite", () => {
  it("vacuum assisted for composite", () => {
    expect(forComposite("vacuum_assisted")).toBe(true);
  });
  it("transfer mold not for composite", () => {
    expect(forComposite("transfer_mold")).toBe(false);
  });
});

describe("molderConfig", () => {
  it("cold press uses room temp resin cure", () => {
    expect(molderConfig("cold_press")).toBe("cold_press_room_temp_resin_cure_low_pressure_fiberglass_layup");
  });
});

describe("bestUse", () => {
  it("transfer mold for rubber seal gasket", () => {
    expect(bestUse("transfer_mold")).toBe("rubber_seal_gasket_insert_mold_transfer_pot_plunger_thermoset");
  });
});

describe("compressionMolderTypes", () => {
  it("returns 5 types", () => {
    expect(compressionMolderTypes()).toHaveLength(5);
  });
});
