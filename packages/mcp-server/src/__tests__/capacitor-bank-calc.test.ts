import { describe, it, expect } from "vitest";
import {
  energyStore, voltageHandle, dischargeSafe, sizeCompact,
  bankCost, switched, forPowerFactor, topology,
  bestUse, capacitorBanks,
} from "../capacitor-bank-calc.js";

describe("energyStore", () => {
  it("parallel bank high c most energy store", () => {
    expect(energyStore("parallel_bank_high_c")).toBeGreaterThan(energyStore("series_string_high_v"));
  });
});

describe("voltageHandle", () => {
  it("series string high v best voltage handle", () => {
    expect(voltageHandle("series_string_high_v")).toBeGreaterThan(voltageHandle("parallel_bank_high_c"));
  });
});

describe("dischargeSafe", () => {
  it("switched cap array safest discharge", () => {
    expect(dischargeSafe("switched_cap_array")).toBeGreaterThan(dischargeSafe("series_string_high_v"));
  });
});

describe("sizeCompact", () => {
  it("switched cap array most compact", () => {
    expect(sizeCompact("switched_cap_array")).toBeGreaterThan(sizeCompact("parallel_bank_high_c"));
  });
});

describe("bankCost", () => {
  it("pfc correction bank most expensive", () => {
    expect(bankCost("pfc_correction_bank")).toBeGreaterThan(bankCost("series_string_high_v"));
  });
});

describe("switched", () => {
  it("switched cap array is switched", () => {
    expect(switched("switched_cap_array")).toBe(true);
  });
  it("parallel bank high c not switched", () => {
    expect(switched("parallel_bank_high_c")).toBe(false);
  });
});

describe("forPowerFactor", () => {
  it("pfc correction bank is for power factor", () => {
    expect(forPowerFactor("pfc_correction_bank")).toBe(true);
  });
  it("switched cap array not for power factor", () => {
    expect(forPowerFactor("switched_cap_array")).toBe(false);
  });
});

describe("topology", () => {
  it("series parallel combo uses matrix series parallel", () => {
    expect(topology("series_parallel_combo")).toBe("matrix_series_parallel");
  });
});

describe("bestUse", () => {
  it("parallel bank high c best for bulk energy reserve", () => {
    expect(bestUse("parallel_bank_high_c")).toBe("bulk_energy_reserve");
  });
});

describe("capacitorBanks", () => {
  it("returns 5 types", () => {
    expect(capacitorBanks()).toHaveLength(5);
  });
});
