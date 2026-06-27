import { describe, it, expect } from "vitest";
import {
  heatTransfer, throughput, mixingQuality, moistureControl,
  pdCost, indirect, forSludge, dryerConfig,
  bestUse, paddleDryerTypes,
} from "../paddle-dryer-calc.js";

describe("heatTransfer", () => {
  it("agitated thin film best heat transfer", () => {
    expect(heatTransfer("agitated_thin_film")).toBeGreaterThan(heatTransfer("conical_screw"));
  });
});

describe("throughput", () => {
  it("disc paddle highest throughput", () => {
    expect(throughput("disc_paddle")).toBeGreaterThan(throughput("agitated_thin_film"));
  });
});

describe("mixingQuality", () => {
  it("agitated thin film best mixing quality", () => {
    expect(mixingQuality("agitated_thin_film")).toBeGreaterThan(mixingQuality("disc_paddle"));
  });
});

describe("moistureControl", () => {
  it("agitated thin film best moisture control", () => {
    expect(moistureControl("agitated_thin_film")).toBeGreaterThan(moistureControl("disc_paddle"));
  });
});

describe("pdCost", () => {
  it("agitated thin film most expensive", () => {
    expect(pdCost("agitated_thin_film")).toBeGreaterThan(pdCost("disc_paddle"));
  });
});

describe("indirect", () => {
  it("hollow wedge is indirect", () => {
    expect(indirect("hollow_wedge")).toBe(true);
  });
  it("all types are indirect", () => {
    expect(indirect("disc_paddle")).toBe(true);
  });
});

describe("forSludge", () => {
  it("hollow wedge for sludge", () => {
    expect(forSludge("hollow_wedge")).toBe(true);
  });
  it("conical screw not for sludge", () => {
    expect(forSludge("conical_screw")).toBe(false);
  });
});

describe("dryerConfig", () => {
  it("conical screw uses orbit screw vacuum gentle batch mix", () => {
    expect(dryerConfig("conical_screw")).toBe("conical_screw_paddle_dryer_orbit_screw_vacuum_gentle_batch_mix");
  });
});

describe("bestUse", () => {
  it("hollow wedge for sludge dry self clean indirect heat", () => {
    expect(bestUse("hollow_wedge")).toBe("sludge_dry_hollow_wedge_paddle_dryer_self_clean_indirect_heat");
  });
});

describe("paddleDryerTypes", () => {
  it("returns 5 types", () => {
    expect(paddleDryerTypes()).toHaveLength(5);
  });
});
