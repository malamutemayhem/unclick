import { describe, it, expect } from "vitest";
import {
  collectionGPerHive, processingMethod, processingTimeHours, activeCompoundPercent,
  shelfLifeMonths, storageTempCelsius, bioavailability, allergyRisk,
  costPerGram, propolisForms,
} from "../propolis-calc.js";

describe("collectionGPerHive", () => {
  it("returns 150", () => {
    expect(collectionGPerHive()).toBe(150);
  });
});

describe("processingMethod", () => {
  it("raw is scraped", () => {
    expect(processingMethod("raw")).toBe("scraping");
  });
  it("tincture uses alcohol extraction", () => {
    expect(processingMethod("tincture")).toBe("alcohol_extraction");
  });
});

describe("processingTimeHours", () => {
  it("tincture takes longest", () => {
    expect(processingTimeHours("tincture")).toBeGreaterThan(
      processingTimeHours("raw")
    );
  });
});

describe("activeCompoundPercent", () => {
  it("extract has highest active compounds", () => {
    expect(activeCompoundPercent("extract")).toBeGreaterThan(
      activeCompoundPercent("tincture")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("raw lasts longest", () => {
    expect(shelfLifeMonths("raw")).toBeGreaterThan(
      shelfLifeMonths("extract")
    );
  });
});

describe("storageTempCelsius", () => {
  it("powder needs cold storage", () => {
    expect(storageTempCelsius("powder")).toBeLessThan(
      storageTempCelsius("raw")
    );
  });
});

describe("bioavailability", () => {
  it("tincture has best bioavailability", () => {
    expect(bioavailability("tincture")).toBeGreaterThan(
      bioavailability("raw")
    );
  });
});

describe("allergyRisk", () => {
  it("raw has highest allergy risk", () => {
    expect(allergyRisk("raw")).toBeGreaterThan(allergyRisk("capsule"));
  });
});

describe("costPerGram", () => {
  it("capsule is most expensive", () => {
    expect(costPerGram("capsule")).toBeGreaterThan(costPerGram("raw"));
  });
});

describe("propolisForms", () => {
  it("returns 5 forms", () => {
    expect(propolisForms()).toHaveLength(5);
  });
});
