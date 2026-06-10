import { describe, it, expect } from "vitest";
import {
  altitudeMeters, precipitationRisk, verticalExtent,
  iceCrystalContent, durationHours, producesThunder,
  fairWeather, weatherIndication, photographyAppeal, cloudTypes,
} from "../cloud-type-calc.js";

describe("altitudeMeters", () => {
  it("cumulonimbus reaches highest", () => {
    expect(altitudeMeters("cumulonimbus")).toBeGreaterThan(
      altitudeMeters("stratus")
    );
  });
});

describe("precipitationRisk", () => {
  it("cumulonimbus has highest precipitation risk", () => {
    expect(precipitationRisk("cumulonimbus")).toBeGreaterThan(
      precipitationRisk("cirrus")
    );
  });
});

describe("verticalExtent", () => {
  it("cumulonimbus has greatest vertical extent", () => {
    expect(verticalExtent("cumulonimbus")).toBeGreaterThan(
      verticalExtent("stratus")
    );
  });
});

describe("iceCrystalContent", () => {
  it("cirrus has most ice crystals", () => {
    expect(iceCrystalContent("cirrus")).toBeGreaterThan(
      iceCrystalContent("stratus")
    );
  });
});

describe("durationHours", () => {
  it("stratus lasts longest", () => {
    expect(durationHours("stratus")).toBeGreaterThan(
      durationHours("cumulonimbus")
    );
  });
});

describe("producesThunder", () => {
  it("cumulonimbus produces thunder", () => {
    expect(producesThunder("cumulonimbus")).toBe(true);
  });
  it("cirrus does not", () => {
    expect(producesThunder("cirrus")).toBe(false);
  });
});

describe("fairWeather", () => {
  it("cumulus indicates fair weather", () => {
    expect(fairWeather("cumulus")).toBe(true);
  });
  it("nimbostratus does not", () => {
    expect(fairWeather("nimbostratus")).toBe(false);
  });
});

describe("weatherIndication", () => {
  it("cumulonimbus indicates severe storm", () => {
    expect(weatherIndication("cumulonimbus")).toBe("severe_storm");
  });
});

describe("photographyAppeal", () => {
  it("cumulonimbus is most photogenic", () => {
    expect(photographyAppeal("cumulonimbus")).toBeGreaterThan(
      photographyAppeal("nimbostratus")
    );
  });
});

describe("cloudTypes", () => {
  it("returns 5 types", () => {
    expect(cloudTypes()).toHaveLength(5);
  });
});
