import { describe, it, expect } from "vitest";
import {
  signalQuality, noiseRejection, maxRunLength, flexibility,
  cableCost, digitalSignal, lockingConnector, connectorType,
  bestUse, audioCables,
} from "../audio-cable-calc.js";

describe("signalQuality", () => {
  it("xlr balanced best signal quality", () => {
    expect(signalQuality("xlr_balanced")).toBeGreaterThan(signalQuality("rca_analog"));
  });
});

describe("noiseRejection", () => {
  it("xlr balanced best noise rejection", () => {
    expect(noiseRejection("xlr_balanced")).toBeGreaterThan(noiseRejection("rca_analog"));
  });
});

describe("maxRunLength", () => {
  it("xlr balanced longest run length", () => {
    expect(maxRunLength("xlr_balanced")).toBeGreaterThan(maxRunLength("usb_digital_audio"));
  });
});

describe("flexibility", () => {
  it("usb digital audio most flexible", () => {
    expect(flexibility("usb_digital_audio")).toBeGreaterThan(flexibility("optical_toslink"));
  });
});

describe("cableCost", () => {
  it("xlr balanced most expensive", () => {
    expect(cableCost("xlr_balanced")).toBeGreaterThan(cableCost("rca_analog"));
  });
});

describe("digitalSignal", () => {
  it("optical toslink is digital signal", () => {
    expect(digitalSignal("optical_toslink")).toBe(true);
  });
  it("rca analog is not", () => {
    expect(digitalSignal("rca_analog")).toBe(false);
  });
});

describe("lockingConnector", () => {
  it("xlr balanced has locking connector", () => {
    expect(lockingConnector("xlr_balanced")).toBe(true);
  });
  it("rca analog does not", () => {
    expect(lockingConnector("rca_analog")).toBe(false);
  });
});

describe("connectorType", () => {
  it("optical toslink uses fiber optic square tip", () => {
    expect(connectorType("optical_toslink")).toBe("fiber_optic_square_tip");
  });
});

describe("bestUse", () => {
  it("xlr balanced for studio mic monitor", () => {
    expect(bestUse("xlr_balanced")).toBe("studio_mic_monitor");
  });
});

describe("audioCables", () => {
  it("returns 5 types", () => {
    expect(audioCables()).toHaveLength(5);
  });
});
