import { describe, it, expect } from "vitest";
import {
  dataRate, range, security, latency,
  modeCost, passive, forPayment, standard,
  bestUse, nfcModes,
} from "../nfc-mode-calc.js";

describe("dataRate", () => {
  it("felica transit highest data rate", () => {
    expect(dataRate("felica_transit")).toBeGreaterThan(dataRate("tag_type_4"));
  });
});

describe("range", () => {
  it("tag type 4 longest range", () => {
    expect(range("tag_type_4")).toBeGreaterThan(range("peer_to_peer"));
  });
});

describe("security", () => {
  it("card emulation best security", () => {
    expect(security("card_emulation")).toBeGreaterThan(security("tag_type_4"));
  });
});

describe("latency", () => {
  it("felica transit best latency", () => {
    expect(latency("felica_transit")).toBeGreaterThan(latency("peer_to_peer"));
  });
});

describe("modeCost", () => {
  it("felica transit most expensive", () => {
    expect(modeCost("felica_transit")).toBeGreaterThan(modeCost("tag_type_4"));
  });
});

describe("passive", () => {
  it("card emulation is passive", () => {
    expect(passive("card_emulation")).toBe(true);
  });
  it("reader writer not passive", () => {
    expect(passive("reader_writer")).toBe(false);
  });
});

describe("forPayment", () => {
  it("card emulation is for payment", () => {
    expect(forPayment("card_emulation")).toBe(true);
  });
  it("reader writer not for payment", () => {
    expect(forPayment("reader_writer")).toBe(false);
  });
});

describe("standard", () => {
  it("reader writer uses iso 14443 reader", () => {
    expect(standard("reader_writer")).toBe("iso_14443_reader");
  });
});

describe("bestUse", () => {
  it("felica transit best for transit fare collection", () => {
    expect(bestUse("felica_transit")).toBe("transit_fare_collection");
  });
});

describe("nfcModes", () => {
  it("returns 5 types", () => {
    expect(nfcModes()).toHaveLength(5);
  });
});
