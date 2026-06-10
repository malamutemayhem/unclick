import { describe, it, expect } from "vitest";
import {
  watchDurationHours, pegsPerWatch, compassPointsOnBoard, speedHolesCount,
  courseRecordInterval, boardDiameterCm, pegMaterial, watchesPerDay,
  historicalAccuracyDeg, watchPeriods,
} from "../traverse-board-calc.js";

describe("watchDurationHours", () => {
  it("dog watch is shorter", () => {
    expect(watchDurationHours("first_dog")).toBeLessThan(
      watchDurationHours("first")
    );
  });
});

describe("pegsPerWatch", () => {
  it("dog watch has fewer pegs", () => {
    expect(pegsPerWatch("first_dog")).toBeLessThan(pegsPerWatch("first"));
  });
});

describe("compassPointsOnBoard", () => {
  it("returns 32", () => {
    expect(compassPointsOnBoard()).toBe(32);
  });
});

describe("speedHolesCount", () => {
  it("returns 8", () => {
    expect(speedHolesCount()).toBe(8);
  });
});

describe("courseRecordInterval", () => {
  it("returns 30", () => {
    expect(courseRecordInterval()).toBe(30);
  });
});

describe("boardDiameterCm", () => {
  it("returns 30", () => {
    expect(boardDiameterCm()).toBe(30);
  });
});

describe("pegMaterial", () => {
  it("returns boxwood", () => {
    expect(pegMaterial()).toBe("boxwood");
  });
});

describe("watchesPerDay", () => {
  it("returns 7", () => {
    expect(watchesPerDay()).toBe(7);
  });
});

describe("historicalAccuracyDeg", () => {
  it("returns 11.25", () => {
    expect(historicalAccuracyDeg()).toBe(11.25);
  });
});

describe("watchPeriods", () => {
  it("returns 6 periods", () => {
    expect(watchPeriods()).toHaveLength(6);
  });
});
