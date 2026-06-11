import { describe, it, expect } from "vitest";
import {
  qFactor, frequency, stability, size,
  mrCost, piezoelectric, forFilter, mode,
  bestUse, memsResonators,
} from "../mems-resonator-calc.js";

describe("qFactor", () => {
  it("wine glass disk highest q factor", () => {
    expect(qFactor("wine_glass_disk")).toBeGreaterThan(qFactor("comb_drive_lateral"));
  });
});

describe("frequency", () => {
  it("film bulk fbar highest frequency", () => {
    expect(frequency("film_bulk_fbar")).toBeGreaterThan(frequency("tuning_fork_quartz"));
  });
});

describe("stability", () => {
  it("tuning fork quartz most stable", () => {
    expect(stability("tuning_fork_quartz")).toBeGreaterThan(stability("comb_drive_lateral"));
  });
});

describe("size", () => {
  it("film bulk fbar smallest size", () => {
    expect(size("film_bulk_fbar")).toBeGreaterThan(size("tuning_fork_quartz"));
  });
});

describe("mrCost", () => {
  it("wine glass disk most expensive", () => {
    expect(mrCost("wine_glass_disk")).toBeGreaterThan(mrCost("tuning_fork_quartz"));
  });
});

describe("piezoelectric", () => {
  it("film bulk fbar is piezoelectric", () => {
    expect(piezoelectric("film_bulk_fbar")).toBe(true);
  });
  it("comb drive lateral not piezoelectric", () => {
    expect(piezoelectric("comb_drive_lateral")).toBe(false);
  });
});

describe("forFilter", () => {
  it("film bulk fbar for filter", () => {
    expect(forFilter("film_bulk_fbar")).toBe(true);
  });
  it("wine glass disk not for filter", () => {
    expect(forFilter("wine_glass_disk")).toBe(false);
  });
});

describe("mode", () => {
  it("wine glass disk uses radial extensional disk", () => {
    expect(mode("wine_glass_disk")).toBe("radial_extensional_disk");
  });
});

describe("bestUse", () => {
  it("tuning fork quartz best for rtc 32khz watch crystal", () => {
    expect(bestUse("tuning_fork_quartz")).toBe("rtc_32khz_watch_crystal");
  });
});

describe("memsResonators", () => {
  it("returns 5 types", () => {
    expect(memsResonators()).toHaveLength(5);
  });
});
