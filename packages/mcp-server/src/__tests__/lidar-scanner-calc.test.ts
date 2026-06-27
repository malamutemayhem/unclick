import { describe, it, expect } from "vitest";
import {
  range, pointRate, fov, resolution,
  scannerCost, solidState, forAuto, detection,
  bestUse, lidarScanners,
} from "../lidar-scanner-calc.js";

describe("range", () => {
  it("spinning multi ch longest range", () => {
    expect(range("spinning_multi_ch")).toBeGreaterThan(range("flash_array_spad"));
  });
});

describe("pointRate", () => {
  it("spinning multi ch highest point rate", () => {
    expect(pointRate("spinning_multi_ch")).toBeGreaterThan(pointRate("flash_array_spad"));
  });
});

describe("fov", () => {
  it("spinning multi ch widest fov", () => {
    expect(fov("spinning_multi_ch")).toBeGreaterThan(fov("fmcw_coherent"));
  });
});

describe("resolution", () => {
  it("fmcw coherent best resolution", () => {
    expect(resolution("fmcw_coherent")).toBeGreaterThan(resolution("opa_solid_state"));
  });
});

describe("scannerCost", () => {
  it("spinning multi ch most expensive", () => {
    expect(scannerCost("spinning_multi_ch")).toBeGreaterThan(scannerCost("opa_solid_state"));
  });
});

describe("solidState", () => {
  it("flash array spad is solid state", () => {
    expect(solidState("flash_array_spad")).toBe(true);
  });
  it("spinning multi ch not solid state", () => {
    expect(solidState("spinning_multi_ch")).toBe(false);
  });
});

describe("forAuto", () => {
  it("mems mirror scan is for auto", () => {
    expect(forAuto("mems_mirror_scan")).toBe(true);
  });
  it("flash array spad not for auto", () => {
    expect(forAuto("flash_array_spad")).toBe(false);
  });
});

describe("detection", () => {
  it("fmcw coherent uses coherent chirped beat", () => {
    expect(detection("fmcw_coherent")).toBe("coherent_chirped_beat");
  });
});

describe("bestUse", () => {
  it("spinning multi ch best for l4 rooftop 360 scan", () => {
    expect(bestUse("spinning_multi_ch")).toBe("l4_rooftop_360_scan");
  });
});

describe("lidarScanners", () => {
  it("returns 5 types", () => {
    expect(lidarScanners()).toHaveLength(5);
  });
});
