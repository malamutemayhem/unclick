import { describe, it, expect } from "vitest";
import {
  dotDuration, dashDuration, wordSpaceMs, charSpaceMs, messageTimeMs,
  wireResistanceOhms, batteryVoltage, relaySpacing, keyForceGrams,
  operatorSpeed, lineCapacity, telegraphTypes,
} from "../telegraph-calc.js";

describe("dotDuration", () => {
  it("20 wpm = 60ms", () => {
    expect(dotDuration(20)).toBe(60);
  });
  it("zero wpm = 0", () => {
    expect(dotDuration(0)).toBe(0);
  });
});

describe("dashDuration", () => {
  it("3x dot", () => {
    expect(dashDuration(20)).toBe(180);
  });
});

describe("wordSpaceMs", () => {
  it("7x dot", () => {
    expect(wordSpaceMs(20)).toBe(420);
  });
});

describe("charSpaceMs", () => {
  it("3x dot", () => {
    expect(charSpaceMs(20)).toBe(180);
  });
});

describe("messageTimeMs", () => {
  it("positive time", () => {
    expect(messageTimeMs(10, 20)).toBeGreaterThan(0);
  });
});

describe("wireResistanceOhms", () => {
  it("positive ohms", () => {
    expect(wireResistanceOhms(10, 14)).toBeGreaterThan(0);
  });
});

describe("batteryVoltage", () => {
  it("short line = 6V", () => {
    expect(batteryVoltage(5)).toBe(6);
  });
  it("long line = 120V", () => {
    expect(batteryVoltage(300)).toBe(120);
  });
});

describe("relaySpacing", () => {
  it("positive km", () => {
    expect(relaySpacing(24, 14)).toBeGreaterThan(0);
  });
});

describe("keyForceGrams", () => {
  it("morse_key = 80g", () => {
    expect(keyForceGrams("morse_key")).toBe(80);
  });
});

describe("operatorSpeed", () => {
  it("capped at 35 wpm", () => {
    expect(operatorSpeed(100)).toBe(35);
  });
});

describe("lineCapacity", () => {
  it("equals wires", () => {
    expect(lineCapacity(4)).toBe(4);
  });
});

describe("telegraphTypes", () => {
  it("returns 5 types", () => {
    expect(telegraphTypes()).toHaveLength(5);
  });
});
