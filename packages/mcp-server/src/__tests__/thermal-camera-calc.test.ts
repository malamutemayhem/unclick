import { describe, it, expect } from "vitest";
import {
  resolution, tempRange, accuracy, portability,
  cameraCost, radiometric, forAutomation, detectorType,
  bestUse, thermalCameras,
} from "../thermal-camera-calc.js";

describe("resolution", () => {
  it("high res research best resolution", () => {
    expect(resolution("high_res_research")).toBeGreaterThan(resolution("smartphone_attachment"));
  });
});

describe("tempRange", () => {
  it("high res research widest temp range", () => {
    expect(tempRange("high_res_research")).toBeGreaterThan(tempRange("smartphone_attachment"));
  });
});

describe("accuracy", () => {
  it("high res research most accurate", () => {
    expect(accuracy("high_res_research")).toBeGreaterThan(accuracy("smartphone_attachment"));
  });
});

describe("portability", () => {
  it("smartphone attachment most portable", () => {
    expect(portability("smartphone_attachment")).toBeGreaterThan(portability("fixed_mount_process"));
  });
});

describe("cameraCost", () => {
  it("high res research most expensive", () => {
    expect(cameraCost("high_res_research")).toBeGreaterThan(cameraCost("smartphone_attachment"));
  });
});

describe("radiometric", () => {
  it("handheld inspecting is radiometric", () => {
    expect(radiometric("handheld_inspecting")).toBe(true);
  });
  it("smartphone attachment not radiometric", () => {
    expect(radiometric("smartphone_attachment")).toBe(false);
  });
});

describe("forAutomation", () => {
  it("fixed mount process is for automation", () => {
    expect(forAutomation("fixed_mount_process")).toBe(true);
  });
  it("handheld inspecting not for automation", () => {
    expect(forAutomation("handheld_inspecting")).toBe(false);
  });
});

describe("detectorType", () => {
  it("drone aerial survey uses uncooled 640x512", () => {
    expect(detectorType("drone_aerial_survey")).toBe("uncooled_640x512");
  });
});

describe("bestUse", () => {
  it("handheld inspecting best for electrical panel inspect", () => {
    expect(bestUse("handheld_inspecting")).toBe("electrical_panel_inspect");
  });
});

describe("thermalCameras", () => {
  it("returns 5 types", () => {
    expect(thermalCameras()).toHaveLength(5);
  });
});
