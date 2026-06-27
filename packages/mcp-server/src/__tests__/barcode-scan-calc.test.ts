import { describe, it, expect } from "vitest";
import {
  readRate, range, dpmCapable, durability,
  bsCost, wireless, forDpm, illumination,
  bestUse, barcodeScanTypes,
} from "../barcode-scan-calc.js";

describe("readRate", () => {
  it("fixed mount tunnel highest read rate", () => {
    expect(readRate("fixed_mount_tunnel")).toBeGreaterThan(readRate("laser_line_1d"));
  });
});

describe("range", () => {
  it("laser line longest range", () => {
    expect(range("laser_line_1d")).toBeGreaterThan(range("dpm_reader_direct_part"));
  });
});

describe("dpmCapable", () => {
  it("DPM reader best at direct part marks", () => {
    expect(dpmCapable("dpm_reader_direct_part")).toBeGreaterThan(dpmCapable("area_imager_2d"));
  });
});

describe("durability", () => {
  it("DPM reader most durable", () => {
    expect(durability("dpm_reader_direct_part")).toBeGreaterThan(durability("laser_line_1d"));
  });
});

describe("bsCost", () => {
  it("DPM reader most expensive", () => {
    expect(bsCost("dpm_reader_direct_part")).toBeGreaterThan(bsCost("laser_line_1d"));
  });
});

describe("wireless", () => {
  it("laser line is wireless", () => {
    expect(wireless("laser_line_1d")).toBe(true);
  });
  it("fixed mount not wireless", () => {
    expect(wireless("fixed_mount_tunnel")).toBe(false);
  });
});

describe("forDpm", () => {
  it("DPM reader for direct part marks", () => {
    expect(forDpm("dpm_reader_direct_part")).toBe(true);
  });
  it("area imager not for DPM", () => {
    expect(forDpm("area_imager_2d")).toBe(false);
  });
});

describe("illumination", () => {
  it("fixed mount uses omnidirectional", () => {
    expect(illumination("fixed_mount_tunnel")).toBe("omnidirectional_multi_laser_led");
  });
});

describe("bestUse", () => {
  it("DPM reader for auto aero part marks", () => {
    expect(bestUse("dpm_reader_direct_part")).toBe("auto_aero_direct_part_mark_read");
  });
});

describe("barcodeScanTypes", () => {
  it("returns 5 types", () => {
    expect(barcodeScanTypes()).toHaveLength(5);
  });
});
