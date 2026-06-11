import { describe, it, expect } from "vitest";
import {
  throughput, precision, range, durability,
  vfCost, variableRate, forParts, drive,
  bestUse, vibrateFeederTypes,
} from "../vibrate-feeder-calc.js";

describe("throughput", () => {
  it("grizzly scalping highest throughput", () => {
    expect(throughput("grizzly_scalping_heavy")).toBeGreaterThan(throughput("bowl_feeder_parts"));
  });
});

describe("precision", () => {
  it("bowl feeder most precise", () => {
    expect(precision("bowl_feeder_parts")).toBeGreaterThan(precision("grizzly_scalping_heavy"));
  });
});

describe("range", () => {
  it("electromechanical widest range", () => {
    expect(range("electromechanical_motor")).toBeGreaterThan(range("linear_feeder_orient"));
  });
});

describe("durability", () => {
  it("grizzly scalping most durable", () => {
    expect(durability("grizzly_scalping_heavy")).toBeGreaterThan(durability("bowl_feeder_parts"));
  });
});

describe("vfCost", () => {
  it("grizzly and bowl feeder higher cost", () => {
    expect(vfCost("grizzly_scalping_heavy")).toBeGreaterThan(vfCost("electromechanical_motor"));
  });
});

describe("variableRate", () => {
  it("electromagnetic has variable rate", () => {
    expect(variableRate("electromagnetic_tray")).toBe(true);
  });
  it("electromechanical no variable rate", () => {
    expect(variableRate("electromechanical_motor")).toBe(false);
  });
});

describe("forParts", () => {
  it("bowl feeder for parts", () => {
    expect(forParts("bowl_feeder_parts")).toBe(true);
  });
  it("grizzly not for parts", () => {
    expect(forParts("grizzly_scalping_heavy")).toBe(false);
  });
});

describe("drive", () => {
  it("bowl feeder uses base vibrate spiral track", () => {
    expect(drive("bowl_feeder_parts")).toBe("base_vibrate_spiral_track_orient");
  });
});

describe("bestUse", () => {
  it("electromagnetic for pharma food dosing", () => {
    expect(bestUse("electromagnetic_tray")).toBe("pharma_food_fine_powder_dosing");
  });
});

describe("vibrateFeederTypes", () => {
  it("returns 5 types", () => {
    expect(vibrateFeederTypes()).toHaveLength(5);
  });
});
