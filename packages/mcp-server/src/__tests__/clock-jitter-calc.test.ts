import { describe, it, expect } from "vitest";
import {
  phaseJitter, freqStability, startupTime, powerDraw,
  clockCost, programmable, forTelecom, oscillator,
  bestUse, clockJitters,
} from "../clock-jitter-calc.js";

describe("phaseJitter", () => {
  it("si pll synth lowest phase jitter", () => {
    expect(phaseJitter("si_pll_synth")).toBeGreaterThan(phaseJitter("mems_resonator"));
  });
});

describe("freqStability", () => {
  it("atomic rb csac best freq stability", () => {
    expect(freqStability("atomic_rb_csac")).toBeGreaterThan(freqStability("mems_resonator"));
  });
});

describe("startupTime", () => {
  it("mems resonator fastest startup", () => {
    expect(startupTime("mems_resonator")).toBeGreaterThan(startupTime("ocxo_oven_ctrl"));
  });
});

describe("powerDraw", () => {
  it("ocxo oven ctrl highest power draw", () => {
    expect(powerDraw("ocxo_oven_ctrl")).toBeGreaterThan(powerDraw("mems_resonator"));
  });
});

describe("clockCost", () => {
  it("atomic rb csac most expensive", () => {
    expect(clockCost("atomic_rb_csac")).toBeGreaterThan(clockCost("mems_resonator"));
  });
});

describe("programmable", () => {
  it("si pll synth is programmable", () => {
    expect(programmable("si_pll_synth")).toBe(true);
  });
  it("ocxo oven ctrl not programmable", () => {
    expect(programmable("ocxo_oven_ctrl")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("ocxo oven ctrl is for telecom", () => {
    expect(forTelecom("ocxo_oven_ctrl")).toBe(true);
  });
  it("mems resonator not for telecom", () => {
    expect(forTelecom("mems_resonator")).toBe(false);
  });
});

describe("oscillator", () => {
  it("atomic rb csac uses rubidium vapor cell", () => {
    expect(oscillator("atomic_rb_csac")).toBe("rubidium_vapor_cell");
  });
});

describe("bestUse", () => {
  it("si pll synth best for jitter cleaner serdes", () => {
    expect(bestUse("si_pll_synth")).toBe("jitter_cleaner_serdes");
  });
});

describe("clockJitters", () => {
  it("returns 5 types", () => {
    expect(clockJitters()).toHaveLength(5);
  });
});
