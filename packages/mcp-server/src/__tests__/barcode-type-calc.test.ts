import { describe, it, expect } from "vitest";
import {
  dataCapacity, scanReliability, printSize, errorCorrection,
  scanSpeed, twoDimensional, supportsUrl, encodingType,
  bestApplication, barcodeTypes,
} from "../barcode-type-calc.js";

describe("dataCapacity", () => {
  it("qr code highest data capacity", () => {
    expect(dataCapacity("qr_code")).toBeGreaterThan(dataCapacity("upc_a"));
  });
});

describe("scanReliability", () => {
  it("upc a most reliable scan", () => {
    expect(scanReliability("upc_a")).toBeGreaterThan(scanReliability("data_matrix"));
  });
});

describe("printSize", () => {
  it("code 128 largest print size", () => {
    expect(printSize("code_128")).toBeGreaterThan(printSize("data_matrix"));
  });
});

describe("errorCorrection", () => {
  it("qr code best error correction", () => {
    expect(errorCorrection("qr_code")).toBeGreaterThan(errorCorrection("upc_a"));
  });
});

describe("scanSpeed", () => {
  it("upc a fastest scan", () => {
    expect(scanSpeed("upc_a")).toBeGreaterThan(scanSpeed("qr_code"));
  });
});

describe("twoDimensional", () => {
  it("qr code is 2d", () => {
    expect(twoDimensional("qr_code")).toBe(true);
  });
  it("upc a is not", () => {
    expect(twoDimensional("upc_a")).toBe(false);
  });
});

describe("supportsUrl", () => {
  it("qr code supports url", () => {
    expect(supportsUrl("qr_code")).toBe(true);
  });
  it("ean 13 does not", () => {
    expect(supportsUrl("ean_13")).toBe(false);
  });
});

describe("encodingType", () => {
  it("qr code is alphanumeric binary kanji", () => {
    expect(encodingType("qr_code")).toBe("alphanumeric_binary_kanji");
  });
});

describe("bestApplication", () => {
  it("data matrix for electronics pharma", () => {
    expect(bestApplication("data_matrix")).toBe("electronics_pharma_marking");
  });
});

describe("barcodeTypes", () => {
  it("returns 5 types", () => {
    expect(barcodeTypes()).toHaveLength(5);
  });
});
