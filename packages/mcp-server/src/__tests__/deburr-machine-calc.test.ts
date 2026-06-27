import { describe, it, expect } from "vitest";
import {
  edgeQuality, throughput, accessibility, repeatability,
  dmCost, contactFree, forInternalEdge, machineConfig,
  bestUse, deburrMachineTypes,
} from "../deburr-machine-calc.js";

describe("edgeQuality", () => {
  it("electrochemical best edge quality", () => {
    expect(edgeQuality("electrochemical_deburr")).toBeGreaterThan(edgeQuality("brush_deburr"));
  });
});

describe("throughput", () => {
  it("brush deburr highest throughput", () => {
    expect(throughput("brush_deburr")).toBeGreaterThan(throughput("electrochemical_deburr"));
  });
});

describe("accessibility", () => {
  it("thermal energy best accessibility", () => {
    expect(accessibility("thermal_energy_deburr")).toBeGreaterThan(accessibility("brush_deburr"));
  });
});

describe("repeatability", () => {
  it("thermal energy best repeatability", () => {
    expect(repeatability("thermal_energy_deburr")).toBeGreaterThan(repeatability("brush_deburr"));
  });
});

describe("dmCost", () => {
  it("thermal energy most expensive", () => {
    expect(dmCost("thermal_energy_deburr")).toBeGreaterThan(dmCost("brush_deburr"));
  });
});

describe("contactFree", () => {
  it("thermal energy is contact free", () => {
    expect(contactFree("thermal_energy_deburr")).toBe(true);
  });
  it("brush deburr not contact free", () => {
    expect(contactFree("brush_deburr")).toBe(false);
  });
});

describe("forInternalEdge", () => {
  it("thermal energy for internal edge", () => {
    expect(forInternalEdge("thermal_energy_deburr")).toBe(true);
  });
  it("brush deburr not for internal edge", () => {
    expect(forInternalEdge("brush_deburr")).toBe(false);
  });
});

describe("machineConfig", () => {
  it("cryogenic uses freeze embrittle blast media break flash", () => {
    expect(machineConfig("cryogenic_deburr")).toBe("cryogenic_deburr_machine_freeze_embrittle_blast_media_break_flash");
  });
});

describe("bestUse", () => {
  it("electrochemical for gear tooth precise edge radius no stress", () => {
    expect(bestUse("electrochemical_deburr")).toBe("gear_tooth_electrochemical_deburr_precise_edge_radius_no_stress");
  });
});

describe("deburrMachineTypes", () => {
  it("returns 5 types", () => {
    expect(deburrMachineTypes()).toHaveLength(5);
  });
});
