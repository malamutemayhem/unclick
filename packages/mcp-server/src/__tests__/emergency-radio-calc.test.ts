import { describe, it, expect } from "vitest";
import {
  bandRange, powerResilience, portability, alertCapability,
  radioCost, canTransmit, hasFlashlight, powerSource,
  bestScenario, emergencyRadios,
} from "../emergency-radio-calc.js";

describe("bandRange", () => {
  it("ham shortwave widest band range", () => {
    expect(bandRange("ham_shortwave")).toBeGreaterThan(bandRange("two_way_walkie"));
  });
});

describe("powerResilience", () => {
  it("hand crank solar most resilient power", () => {
    expect(powerResilience("hand_crank_solar")).toBeGreaterThan(powerResilience("noaa_alert_desktop"));
  });
});

describe("portability", () => {
  it("pocket am fm most portable", () => {
    expect(portability("pocket_am_fm")).toBeGreaterThan(portability("ham_shortwave"));
  });
});

describe("alertCapability", () => {
  it("noaa alert desktop best alert capability", () => {
    expect(alertCapability("noaa_alert_desktop")).toBeGreaterThan(alertCapability("pocket_am_fm"));
  });
});

describe("radioCost", () => {
  it("ham shortwave most expensive", () => {
    expect(radioCost("ham_shortwave")).toBeGreaterThan(radioCost("pocket_am_fm"));
  });
});

describe("canTransmit", () => {
  it("ham shortwave can transmit", () => {
    expect(canTransmit("ham_shortwave")).toBe(true);
  });
  it("hand crank solar cannot", () => {
    expect(canTransmit("hand_crank_solar")).toBe(false);
  });
});

describe("hasFlashlight", () => {
  it("hand crank solar has flashlight", () => {
    expect(hasFlashlight("hand_crank_solar")).toBe(true);
  });
  it("noaa alert desktop does not", () => {
    expect(hasFlashlight("noaa_alert_desktop")).toBe(false);
  });
});

describe("powerSource", () => {
  it("hand crank solar uses dynamo solar usb aaa", () => {
    expect(powerSource("hand_crank_solar")).toBe("dynamo_solar_usb_aaa");
  });
});

describe("bestScenario", () => {
  it("hand crank solar best for power outage disaster kit", () => {
    expect(bestScenario("hand_crank_solar")).toBe("power_outage_disaster_kit");
  });
});

describe("emergencyRadios", () => {
  it("returns 5 types", () => {
    expect(emergencyRadios()).toHaveLength(5);
  });
});
