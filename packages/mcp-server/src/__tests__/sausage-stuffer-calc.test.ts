import { describe, it, expect } from "vitest";
import {
  fillAccuracy, throughput, airRemoval, casingRange,
  ssCost, automated, forSmoked, stufferConfig,
  bestUse, sausageStufferTypes,
} from "../sausage-stuffer-calc.js";

describe("fillAccuracy", () => {
  it("vacuum filler best fill accuracy", () => {
    expect(fillAccuracy("vacuum_filler")).toBeGreaterThan(fillAccuracy("hand_crank"));
  });
});

describe("throughput", () => {
  it("gear pump highest throughput", () => {
    expect(throughput("gear_pump")).toBeGreaterThanOrEqual(throughput("continuous_link"));
  });
});

describe("airRemoval", () => {
  it("vacuum filler best air removal", () => {
    expect(airRemoval("vacuum_filler")).toBeGreaterThan(airRemoval("hand_crank"));
  });
});

describe("casingRange", () => {
  it("vacuum filler widest casing range", () => {
    expect(casingRange("vacuum_filler")).toBeGreaterThan(casingRange("continuous_link"));
  });
});

describe("ssCost", () => {
  it("vacuum filler most expensive", () => {
    expect(ssCost("vacuum_filler")).toBeGreaterThan(ssCost("hand_crank"));
  });
});

describe("automated", () => {
  it("gear pump is automated", () => {
    expect(automated("gear_pump")).toBe(true);
  });
  it("hand crank not automated", () => {
    expect(automated("hand_crank")).toBe(false);
  });
});

describe("forSmoked", () => {
  it("hydraulic piston for smoked", () => {
    expect(forSmoked("hydraulic_piston")).toBe(true);
  });
  it("continuous link not for smoked", () => {
    expect(forSmoked("continuous_link")).toBe(false);
  });
});

describe("stufferConfig", () => {
  it("hand crank uses manual piston small batch", () => {
    expect(stufferConfig("hand_crank")).toBe("hand_crank_sausage_stuffer_manual_piston_small_batch_artisan");
  });
});

describe("bestUse", () => {
  it("vacuum filler for premium sausage no air pocket", () => {
    expect(bestUse("vacuum_filler")).toBe("premium_sausage_vacuum_filler_no_air_pocket_precise_portion");
  });
});

describe("sausageStufferTypes", () => {
  it("returns 5 types", () => {
    expect(sausageStufferTypes()).toHaveLength(5);
  });
});
