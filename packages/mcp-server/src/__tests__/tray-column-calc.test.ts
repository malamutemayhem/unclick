import { describe, it, expect } from "vitest";
import {
  efficiency, turndown, capacity, foulingTol,
  tcCost, downcomer, forVacuum, tray,
  bestUse, trayColumnTypes,
} from "../tray-column-calc.js";

describe("efficiency", () => {
  it("valve tray highest efficiency", () => {
    expect(efficiency("valve_tray_float")).toBeGreaterThan(efficiency("dual_flow_no_downcomer"));
  });
});

describe("turndown", () => {
  it("bubble cap best turndown", () => {
    expect(turndown("bubble_cap_tray")).toBeGreaterThan(turndown("sieve_tray_perforated"));
  });
});

describe("capacity", () => {
  it("dual flow highest capacity", () => {
    expect(capacity("dual_flow_no_downcomer")).toBeGreaterThan(capacity("bubble_cap_tray"));
  });
});

describe("foulingTol", () => {
  it("dual flow best fouling tolerance", () => {
    expect(foulingTol("dual_flow_no_downcomer")).toBeGreaterThan(foulingTol("sieve_tray_perforated"));
  });
});

describe("tcCost", () => {
  it("bubble cap most expensive", () => {
    expect(tcCost("bubble_cap_tray")).toBeGreaterThan(tcCost("sieve_tray_perforated"));
  });
});

describe("downcomer", () => {
  it("sieve tray has downcomer", () => {
    expect(downcomer("sieve_tray_perforated")).toBe(true);
  });
  it("dual flow no downcomer", () => {
    expect(downcomer("dual_flow_no_downcomer")).toBe(false);
  });
});

describe("forVacuum", () => {
  it("no tray types for vacuum in this set", () => {
    expect(forVacuum("sieve_tray_perforated")).toBe(false);
    expect(forVacuum("valve_tray_float")).toBe(false);
  });
});

describe("tray", () => {
  it("bubble cap uses riser cap slot seal", () => {
    expect(tray("bubble_cap_tray")).toBe("riser_cap_slot_seal_liquid_contact");
  });
});

describe("bestUse", () => {
  it("dual flow for fouling slurry coking", () => {
    expect(bestUse("dual_flow_no_downcomer")).toBe("fouling_slurry_coking_severe_service");
  });
});

describe("trayColumnTypes", () => {
  it("returns 5 types", () => {
    expect(trayColumnTypes()).toHaveLength(5);
  });
});
