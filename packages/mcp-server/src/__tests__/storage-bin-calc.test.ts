import { describe, it, expect } from "vitest";
import {
  storageVolume, contentVisibility, emptyStorage, weatherResist,
  binCost, airtightSeal, foldFlat, material,
  bestUse, storageBins,
} from "../storage-bin-calc.js";

describe("storageVolume", () => {
  it("stackable industrial most storage volume", () => {
    expect(storageVolume("stackable_industrial")).toBeGreaterThan(storageVolume("fabric_collapsible"));
  });
});

describe("contentVisibility", () => {
  it("clear plastic snap best content visibility", () => {
    expect(contentVisibility("clear_plastic_snap")).toBeGreaterThan(contentVisibility("fabric_collapsible"));
  });
});

describe("emptyStorage", () => {
  it("fabric collapsible best empty storage", () => {
    expect(emptyStorage("fabric_collapsible")).toBeGreaterThan(emptyStorage("clear_plastic_snap"));
  });
});

describe("weatherResist", () => {
  it("weather tight outdoor best weather resist", () => {
    expect(weatherResist("weather_tight_outdoor")).toBeGreaterThan(weatherResist("fabric_collapsible"));
  });
});

describe("binCost", () => {
  it("weather tight outdoor most expensive", () => {
    expect(binCost("weather_tight_outdoor")).toBeGreaterThan(binCost("fabric_collapsible"));
  });
});

describe("airtightSeal", () => {
  it("vacuum seal bag has airtight seal", () => {
    expect(airtightSeal("vacuum_seal_bag")).toBe(true);
  });
  it("clear plastic snap does not", () => {
    expect(airtightSeal("clear_plastic_snap")).toBe(false);
  });
});

describe("foldFlat", () => {
  it("fabric collapsible folds flat", () => {
    expect(foldFlat("fabric_collapsible")).toBe(true);
  });
  it("clear plastic snap does not", () => {
    expect(foldFlat("clear_plastic_snap")).toBe(false);
  });
});

describe("material", () => {
  it("weather tight outdoor uses hdpe gasket latch", () => {
    expect(material("weather_tight_outdoor")).toBe("hdpe_gasket_latch");
  });
});

describe("bestUse", () => {
  it("vacuum seal bag for seasonal clothes compress", () => {
    expect(bestUse("vacuum_seal_bag")).toBe("seasonal_clothes_compress");
  });
});

describe("storageBins", () => {
  it("returns 5 types", () => {
    expect(storageBins()).toHaveLength(5);
  });
});
