import { describe, it, expect } from "vitest";
import {
  chargeWeightKg, operatingTemperatureCelsius, tapToTapMinutes,
  slagRatioPercent, fluxWeightKg, energyConsumptionKwhPerT,
  refractoryLifeHeats, emissionsRating, dailyOutputTonnes, furnaceTypes,
} from "../smelting-calc.js";

describe("chargeWeightKg", () => {
  it("larger furnace = heavier charge", () => {
    expect(chargeWeightKg(10, "blast")).toBeGreaterThan(chargeWeightKg(5, "blast"));
  });
  it("induction densest charge", () => {
    expect(chargeWeightKg(5, "induction")).toBeGreaterThan(chargeWeightKg(5, "reverberatory"));
  });
});

describe("operatingTemperatureCelsius", () => {
  it("electric arc hottest", () => {
    expect(operatingTemperatureCelsius("electric_arc")).toBeGreaterThan(
      operatingTemperatureCelsius("reverberatory")
    );
  });
});

describe("tapToTapMinutes", () => {
  it("induction fastest", () => {
    expect(tapToTapMinutes("induction")).toBeLessThan(tapToTapMinutes("blast"));
  });
});

describe("slagRatioPercent", () => {
  it("blast furnace most slag", () => {
    expect(slagRatioPercent("blast")).toBeGreaterThan(slagRatioPercent("induction"));
  });
});

describe("fluxWeightKg", () => {
  it("blast furnace needs most flux", () => {
    expect(fluxWeightKg(1000, "blast")).toBeGreaterThan(fluxWeightKg(1000, "induction"));
  });
});

describe("energyConsumptionKwhPerT", () => {
  it("electric arc uses most energy", () => {
    expect(energyConsumptionKwhPerT("electric_arc")).toBeGreaterThan(
      energyConsumptionKwhPerT("cupola")
    );
  });
});

describe("refractoryLifeHeats", () => {
  it("blast furnace lasts longest", () => {
    expect(refractoryLifeHeats("blast")).toBeGreaterThan(refractoryLifeHeats("electric_arc"));
  });
});

describe("emissionsRating", () => {
  it("induction cleanest", () => {
    expect(emissionsRating("induction")).toBeLessThan(emissionsRating("blast"));
  });
});

describe("dailyOutputTonnes", () => {
  it("electric arc highest output", () => {
    expect(dailyOutputTonnes("electric_arc", 10)).toBeGreaterThan(
      dailyOutputTonnes("reverberatory", 10)
    );
  });
});

describe("furnaceTypes", () => {
  it("returns 5 types", () => {
    expect(furnaceTypes()).toHaveLength(5);
  });
});
