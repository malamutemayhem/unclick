import { describe, it, expect } from "vitest";
import {
  grindSpeed, finishQuality, shapeControl, batchSize,
  machineCost, wetProcess, multiWheel, abrasiveType,
  bestUse, cabMachines,
} from "../cab-machine-calc.js";

describe("grindSpeed", () => {
  it("wet belt sand fastest grind", () => {
    expect(grindSpeed("wet_belt_sand")).toBeGreaterThan(grindSpeed("vibratory_tumble_batch"));
  });
});

describe("finishQuality", () => {
  it("sphere cup grind best finish", () => {
    expect(finishQuality("sphere_cup_grind")).toBeGreaterThan(finishQuality("vibratory_tumble_batch"));
  });
});

describe("shapeControl", () => {
  it("combo unit multi best shape control", () => {
    expect(shapeControl("combo_unit_multi")).toBeGreaterThan(shapeControl("vibratory_tumble_batch"));
  });
});

describe("batchSize", () => {
  it("vibratory tumble batch largest batch", () => {
    expect(batchSize("vibratory_tumble_batch")).toBeGreaterThan(batchSize("sphere_cup_grind"));
  });
});

describe("machineCost", () => {
  it("combo unit multi most expensive", () => {
    expect(machineCost("combo_unit_multi")).toBeGreaterThan(machineCost("vibratory_tumble_batch"));
  });
});

describe("wetProcess", () => {
  it("flat lap disc is wet process", () => {
    expect(wetProcess("flat_lap_disc")).toBe(true);
  });
});

describe("multiWheel", () => {
  it("combo unit multi has multi wheel", () => {
    expect(multiWheel("combo_unit_multi")).toBe(true);
  });
  it("flat lap disc no multi wheel", () => {
    expect(multiWheel("flat_lap_disc")).toBe(false);
  });
});

describe("abrasiveType", () => {
  it("flat lap disc uses diamond disc plate", () => {
    expect(abrasiveType("flat_lap_disc")).toBe("diamond_disc_plate");
  });
});

describe("bestUse", () => {
  it("combo unit multi best for full cab workflow", () => {
    expect(bestUse("combo_unit_multi")).toBe("full_cab_workflow");
  });
});

describe("cabMachines", () => {
  it("returns 5 types", () => {
    expect(cabMachines()).toHaveLength(5);
  });
});
