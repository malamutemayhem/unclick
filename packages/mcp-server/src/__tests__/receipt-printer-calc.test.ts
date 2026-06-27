import { describe, it, expect } from "vitest";
import {
  printSpeed, printQuality, operatingCost, noiseLevel,
  durability, requiresInk, wireless, paperType,
  bestApplication, receiptPrinters,
} from "../receipt-printer-calc.js";

describe("printSpeed", () => {
  it("thermal fastest print", () => {
    expect(printSpeed("thermal")).toBeGreaterThan(printSpeed("dot_matrix"));
  });
});

describe("printQuality", () => {
  it("laser best print quality", () => {
    expect(printQuality("laser")).toBeGreaterThan(printQuality("dot_matrix"));
  });
});

describe("operatingCost", () => {
  it("inkjet highest operating cost", () => {
    expect(operatingCost("inkjet")).toBeGreaterThan(operatingCost("thermal"));
  });
});

describe("noiseLevel", () => {
  it("dot matrix noisiest", () => {
    expect(noiseLevel("dot_matrix")).toBeGreaterThan(noiseLevel("thermal"));
  });
});

describe("durability", () => {
  it("dot matrix most durable", () => {
    expect(durability("dot_matrix")).toBeGreaterThan(durability("inkjet"));
  });
});

describe("requiresInk", () => {
  it("inkjet requires ink", () => {
    expect(requiresInk("inkjet")).toBe(true);
  });
  it("thermal does not", () => {
    expect(requiresInk("thermal")).toBe(false);
  });
});

describe("wireless", () => {
  it("mobile bluetooth is wireless", () => {
    expect(wireless("mobile_bluetooth")).toBe(true);
  });
  it("thermal is not", () => {
    expect(wireless("thermal")).toBe(false);
  });
});

describe("paperType", () => {
  it("thermal uses thermal coated roll", () => {
    expect(paperType("thermal")).toBe("thermal_coated_roll");
  });
});

describe("bestApplication", () => {
  it("dot matrix for kitchen order", () => {
    expect(bestApplication("dot_matrix")).toBe("kitchen_order_multipart");
  });
});

describe("receiptPrinters", () => {
  it("returns 5 printers", () => {
    expect(receiptPrinters()).toHaveLength(5);
  });
});
