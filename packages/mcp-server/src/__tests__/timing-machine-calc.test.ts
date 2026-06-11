import { describe, it, expect } from "vitest";
import {
  rateAccuracy, beatError, positionTest, dataRecord,
  machineCost, digital, multiPosition, sensorType,
  bestUse, timingMachines,
} from "../timing-machine-calc.js";

describe("rateAccuracy", () => {
  it("computer connect full most accurate rate", () => {
    expect(rateAccuracy("computer_connect_full")).toBeGreaterThan(rateAccuracy("mechanical_listen_basic"));
  });
});

describe("beatError", () => {
  it("computer connect full best beat error detect", () => {
    expect(beatError("computer_connect_full")).toBeGreaterThan(beatError("mechanical_listen_basic"));
  });
});

describe("positionTest", () => {
  it("multi position auto best position test", () => {
    expect(positionTest("multi_position_auto")).toBeGreaterThan(positionTest("electronic_micro_phone"));
  });
});

describe("dataRecord", () => {
  it("computer connect full best data record", () => {
    expect(dataRecord("computer_connect_full")).toBeGreaterThan(dataRecord("electronic_micro_phone"));
  });
});

describe("machineCost", () => {
  it("computer connect full most expensive", () => {
    expect(machineCost("computer_connect_full")).toBeGreaterThan(machineCost("mechanical_listen_basic"));
  });
});

describe("digital", () => {
  it("digital display modern is digital", () => {
    expect(digital("digital_display_modern")).toBe(true);
  });
  it("mechanical listen basic not digital", () => {
    expect(digital("mechanical_listen_basic")).toBe(false);
  });
});

describe("multiPosition", () => {
  it("multi position auto is multi position", () => {
    expect(multiPosition("multi_position_auto")).toBe(true);
  });
  it("digital display modern not multi position", () => {
    expect(multiPosition("digital_display_modern")).toBe(false);
  });
});

describe("sensorType", () => {
  it("computer connect full uses usb precision sensor", () => {
    expect(sensorType("computer_connect_full")).toBe("usb_precision_sensor");
  });
});

describe("bestUse", () => {
  it("mechanical listen basic best for basic rate check", () => {
    expect(bestUse("mechanical_listen_basic")).toBe("basic_rate_check");
  });
});

describe("timingMachines", () => {
  it("returns 5 types", () => {
    expect(timingMachines()).toHaveLength(5);
  });
});
