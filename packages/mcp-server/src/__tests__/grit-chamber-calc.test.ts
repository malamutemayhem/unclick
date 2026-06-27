import { describe, it, expect } from "vitest";
import {
  removalEfficiency, throughput, organicSeparation, footprint,
  gcCost, mechanical, forLargeWwtp, chamberConfig,
  bestUse, gritChamberTypes,
} from "../grit-chamber-calc.js";

describe("removalEfficiency", () => {
  it("stacked tray best removal efficiency", () => {
    expect(removalEfficiency("stacked_tray_grit")).toBeGreaterThan(removalEfficiency("horizontal_flow_grit"));
  });
});

describe("throughput", () => {
  it("aerated grit highest throughput", () => {
    expect(throughput("aerated_grit")).toBeGreaterThan(throughput("stacked_tray_grit"));
  });
});

describe("organicSeparation", () => {
  it("stacked tray best organic separation", () => {
    expect(organicSeparation("stacked_tray_grit")).toBeGreaterThan(organicSeparation("horizontal_flow_grit"));
  });
});

describe("footprint", () => {
  it("stacked tray best footprint", () => {
    expect(footprint("stacked_tray_grit")).toBeGreaterThan(footprint("horizontal_flow_grit"));
  });
});

describe("gcCost", () => {
  it("stacked tray most expensive", () => {
    expect(gcCost("stacked_tray_grit")).toBeGreaterThan(gcCost("horizontal_flow_grit"));
  });
});

describe("mechanical", () => {
  it("aerated grit is mechanical", () => {
    expect(mechanical("aerated_grit")).toBe(true);
  });
  it("horizontal flow not mechanical", () => {
    expect(mechanical("horizontal_flow_grit")).toBe(false);
  });
});

describe("forLargeWwtp", () => {
  it("vortex grit for large wwtp", () => {
    expect(forLargeWwtp("vortex_grit")).toBe(true);
  });
  it("horizontal flow not for large wwtp", () => {
    expect(forLargeWwtp("horizontal_flow_grit")).toBe(false);
  });
});

describe("chamberConfig", () => {
  it("vortex uses forced vortex paddle centrifugal concentrate", () => {
    expect(chamberConfig("vortex_grit")).toBe("vortex_grit_chamber_forced_vortex_paddle_centrifugal_concentrate");
  });
});

describe("bestUse", () => {
  it("aerated grit for municipal wwtp spiral roll organic separate", () => {
    expect(bestUse("aerated_grit")).toBe("municipal_wwtp_aerated_grit_chamber_spiral_roll_organic_separate");
  });
});

describe("gritChamberTypes", () => {
  it("returns 5 types", () => {
    expect(gritChamberTypes()).toHaveLength(5);
  });
});
