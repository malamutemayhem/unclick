import { describe, it, expect } from "vitest";
import {
  insertion, bandwidth, powerHandle, size,
  filtCost, active, forPower, topology,
  bestUse, emiFilters,
} from "../emi-filter-calc.js";

describe("insertion", () => {
  it("waveguide honeycomb best insertion loss", () => {
    expect(insertion("waveguide_honeycomb")).toBeGreaterThan(insertion("pi_lc_single_stage"));
  });
});

describe("bandwidth", () => {
  it("waveguide honeycomb widest bandwidth", () => {
    expect(bandwidth("waveguide_honeycomb")).toBeGreaterThan(bandwidth("pi_lc_single_stage"));
  });
});

describe("powerHandle", () => {
  it("pi lc single stage handles most power", () => {
    expect(powerHandle("pi_lc_single_stage")).toBeGreaterThan(powerHandle("waveguide_honeycomb"));
  });
});

describe("size", () => {
  it("feedthrough capacitor smallest", () => {
    expect(size("feedthrough_capacitor")).toBeGreaterThan(size("active_emc_cancel"));
  });
});

describe("filtCost", () => {
  it("active emc cancel most expensive", () => {
    expect(filtCost("active_emc_cancel")).toBeGreaterThan(filtCost("pi_lc_single_stage"));
  });
});

describe("active", () => {
  it("active emc cancel is active", () => {
    expect(active("active_emc_cancel")).toBe(true);
  });
  it("pi lc single stage not active", () => {
    expect(active("pi_lc_single_stage")).toBe(false);
  });
});

describe("forPower", () => {
  it("common mode choke for power", () => {
    expect(forPower("common_mode_choke")).toBe(true);
  });
  it("waveguide honeycomb not for power", () => {
    expect(forPower("waveguide_honeycomb")).toBe(false);
  });
});

describe("topology", () => {
  it("waveguide honeycomb uses cutoff freq below vent array", () => {
    expect(topology("waveguide_honeycomb")).toBe("cutoff_freq_below_vent_array");
  });
});

describe("bestUse", () => {
  it("feedthrough capacitor best for enclosure io penetration", () => {
    expect(bestUse("feedthrough_capacitor")).toBe("enclosure_io_penetration");
  });
});

describe("emiFilters", () => {
  it("returns 5 types", () => {
    expect(emiFilters()).toHaveLength(5);
  });
});
