import { describe, it, expect } from "vitest";
import {
  burrRemoval, edgeFinish, speedOutput, materialRange,
  toolCost, handPowered, replaceBlade, cuttingEdge,
  bestMetal, deburTools,
} from "../deburr-tool-calc.js";

describe("burrRemoval", () => {
  it("rotary burr carbide best burr removal", () => {
    expect(burrRemoval("rotary_burr_carbide")).toBeGreaterThan(burrRemoval("hand_scraper_flat"));
  });
});

describe("edgeFinish", () => {
  it("abrasive wheel flex best edge finish", () => {
    expect(edgeFinish("abrasive_wheel_flex")).toBeGreaterThan(edgeFinish("rotary_burr_carbide"));
  });
});

describe("speedOutput", () => {
  it("rotary burr carbide fastest speed", () => {
    expect(speedOutput("rotary_burr_carbide")).toBeGreaterThan(speedOutput("hand_scraper_flat"));
  });
});

describe("materialRange", () => {
  it("rotary burr carbide widest material range", () => {
    expect(materialRange("rotary_burr_carbide")).toBeGreaterThan(materialRange("hand_scraper_flat"));
  });
});

describe("toolCost", () => {
  it("rotary burr carbide more expensive than swivel blade", () => {
    expect(toolCost("rotary_burr_carbide")).toBeGreaterThan(toolCost("swivel_blade_universal"));
  });
});

describe("handPowered", () => {
  it("swivel blade universal is hand powered", () => {
    expect(handPowered("swivel_blade_universal")).toBe(true);
  });
  it("rotary burr carbide is not hand powered", () => {
    expect(handPowered("rotary_burr_carbide")).toBe(false);
  });
});

describe("replaceBlade", () => {
  it("swivel blade universal has replace blade", () => {
    expect(replaceBlade("swivel_blade_universal")).toBe(true);
  });
  it("countersink bit chamfer does not have replace blade", () => {
    expect(replaceBlade("countersink_bit_chamfer")).toBe(false);
  });
});

describe("cuttingEdge", () => {
  it("rotary burr carbide uses tungsten carbide burr", () => {
    expect(cuttingEdge("rotary_burr_carbide")).toBe("tungsten_carbide_burr");
  });
});

describe("bestMetal", () => {
  it("countersink bit chamfer best for drilled hole chamfer", () => {
    expect(bestMetal("countersink_bit_chamfer")).toBe("drilled_hole_chamfer");
  });
});

describe("deburTools", () => {
  it("returns 5 types", () => {
    expect(deburTools()).toHaveLength(5);
  });
});
