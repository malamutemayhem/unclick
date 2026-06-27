import { describe, it, expect } from "vitest";
import {
  placement, spacing, speed, soilDisturb,
  sdCost, gpsRate, forNoTill, metering,
  bestUse, seedDrillTypes,
} from "../seed-drill-calc.js";

describe("placement", () => {
  it("pneumatic best placement", () => {
    expect(placement("pneumatic_precision_planter")).toBeGreaterThan(placement("broadcast_spinner_spreader"));
  });
});

describe("spacing", () => {
  it("pneumatic best spacing", () => {
    expect(spacing("pneumatic_precision_planter")).toBeGreaterThan(spacing("broadcast_spinner_spreader"));
  });
});

describe("speed", () => {
  it("broadcast fastest", () => {
    expect(speed("broadcast_spinner_spreader")).toBeGreaterThan(speed("no_till_disc_opener"));
  });
});

describe("soilDisturb", () => {
  it("no till least disturbance", () => {
    expect(soilDisturb("no_till_disc_opener")).toBeGreaterThan(soilDisturb("broadcast_spinner_spreader"));
  });
});

describe("sdCost", () => {
  it("pneumatic most expensive", () => {
    expect(sdCost("pneumatic_precision_planter")).toBeGreaterThan(sdCost("broadcast_spinner_spreader"));
  });
});

describe("gpsRate", () => {
  it("pneumatic has gps", () => {
    expect(gpsRate("pneumatic_precision_planter")).toBe(true);
  });
  it("conventional no gps", () => {
    expect(gpsRate("conventional_fluted_roller")).toBe(false);
  });
});

describe("forNoTill", () => {
  it("no till disc for no till", () => {
    expect(forNoTill("no_till_disc_opener")).toBe(true);
  });
  it("conventional not no till", () => {
    expect(forNoTill("conventional_fluted_roller")).toBe(false);
  });
});

describe("metering", () => {
  it("broadcast uses spinner disc", () => {
    expect(metering("broadcast_spinner_spreader")).toBe("spinner_disc_broadcast_scatter");
  });
});

describe("bestUse", () => {
  it("pneumatic for precision row crop", () => {
    expect(bestUse("pneumatic_precision_planter")).toBe("corn_soybean_precision_row_crop");
  });
});

describe("seedDrillTypes", () => {
  it("returns 5 types", () => {
    expect(seedDrillTypes()).toHaveLength(5);
  });
});
