import { describe, it, expect } from "vitest";
import {
  heatTransfer, pressureRating, uniformity, cleanability,
  jvCost, highPressure, forPharma, jacket,
  bestUse, jacketedVesselTypes,
} from "../jacketed-vessel-calc.js";

describe("heatTransfer", () => {
  it("half pipe coil best heat transfer", () => {
    expect(heatTransfer("half_pipe_coil")).toBeGreaterThan(heatTransfer("conventional_jacket"));
  });
});

describe("pressureRating", () => {
  it("half pipe coil highest pressure rating", () => {
    expect(pressureRating("half_pipe_coil")).toBeGreaterThan(pressureRating("dimple_jacket"));
  });
});

describe("uniformity", () => {
  it("plate coil clamp best uniformity", () => {
    expect(uniformity("plate_coil_clamp")).toBeGreaterThan(uniformity("conventional_jacket"));
  });
});

describe("cleanability", () => {
  it("dimple jacket best cleanability", () => {
    expect(cleanability("dimple_jacket")).toBeGreaterThan(cleanability("limpet_coil"));
  });
});

describe("jvCost", () => {
  it("half pipe coil most expensive", () => {
    expect(jvCost("half_pipe_coil")).toBeGreaterThan(jvCost("dimple_jacket"));
  });
});

describe("highPressure", () => {
  it("half pipe coil is high pressure", () => {
    expect(highPressure("half_pipe_coil")).toBe(true);
  });
  it("dimple jacket not high pressure", () => {
    expect(highPressure("dimple_jacket")).toBe(false);
  });
});

describe("forPharma", () => {
  it("conventional jacket for pharma", () => {
    expect(forPharma("conventional_jacket")).toBe(true);
  });
  it("half pipe coil not for pharma", () => {
    expect(forPharma("half_pipe_coil")).toBe(false);
  });
});

describe("jacket", () => {
  it("limpet coil uses retrofit external coil", () => {
    expect(jacket("limpet_coil")).toBe("external_limpet_coil_retrofit_existing_vessel");
  });
});

describe("bestUse", () => {
  it("dimple jacket for brewery dairy", () => {
    expect(bestUse("dimple_jacket")).toBe("brewery_fermentation_dairy_process_vessel");
  });
});

describe("jacketedVesselTypes", () => {
  it("returns 5 types", () => {
    expect(jacketedVesselTypes()).toHaveLength(5);
  });
});
