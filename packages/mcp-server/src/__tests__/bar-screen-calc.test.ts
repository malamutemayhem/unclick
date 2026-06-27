import { describe, it, expect } from "vitest";
import {
  captureRate, throughput, screeningSize, selfCleaning,
  bsCost_, automated, forCombinedSewer, screenConfig,
  bestUse, barScreenTypes,
} from "../bar-screen-calc.js";

describe("captureRate", () => {
  it("perforated plate best capture rate", () => {
    expect(captureRate("perforated_plate")).toBeGreaterThan(captureRate("coarse_bar"));
  });
});

describe("throughput", () => {
  it("coarse bar highest throughput", () => {
    expect(throughput("coarse_bar")).toBeGreaterThan(throughput("perforated_plate"));
  });
});

describe("screeningSize", () => {
  it("perforated plate best screening size", () => {
    expect(screeningSize("perforated_plate")).toBeGreaterThan(screeningSize("coarse_bar"));
  });
});

describe("selfCleaning", () => {
  it("step screen best self cleaning", () => {
    expect(selfCleaning("step_screen")).toBeGreaterThan(selfCleaning("coarse_bar"));
  });
});

describe("bsCost_", () => {
  it("step screen most expensive", () => {
    expect(bsCost_("step_screen")).toBeGreaterThan(bsCost_("coarse_bar"));
  });
});

describe("automated", () => {
  it("coarse bar is automated", () => {
    expect(automated("coarse_bar")).toBe(true);
  });
});

describe("forCombinedSewer", () => {
  it("coarse bar for combined sewer", () => {
    expect(forCombinedSewer("coarse_bar")).toBe(true);
  });
  it("fine bar not for combined sewer", () => {
    expect(forCombinedSewer("fine_bar")).toBe(false);
  });
});

describe("screenConfig", () => {
  it("step screen uses moving fixed lamella self clean compact high capture", () => {
    expect(screenConfig("step_screen")).toBe("step_screen_moving_fixed_lamella_self_clean_compact_high_capture");
  });
});

describe("bestUse", () => {
  it("perforated plate for membrane protect finest solids remove", () => {
    expect(bestUse("perforated_plate")).toBe("membrane_protect_perforated_plate_screen_finest_solids_remove");
  });
});

describe("barScreenTypes", () => {
  it("returns 5 types", () => {
    expect(barScreenTypes()).toHaveLength(5);
  });
});
