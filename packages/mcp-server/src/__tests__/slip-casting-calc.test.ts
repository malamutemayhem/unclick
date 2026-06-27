import { describe, it, expect } from "vitest";
import {
  wallThicknessMm, castingTimeMinutes, defloccGPerLiter, slipSpecificGravity,
  moldLifeCasts, dryingTimeBetweenCastsHours, detailResolution,
  undercutsAllowed, costPerMold, moldMaterials,
} from "../slip-casting-calc.js";

describe("wallThicknessMm", () => {
  it("longer casting makes thicker wall", () => {
    expect(wallThicknessMm(20)).toBeGreaterThan(wallThicknessMm(10));
  });
});

describe("castingTimeMinutes", () => {
  it("thicker wall needs more time", () => {
    expect(castingTimeMinutes(8)).toBeGreaterThan(castingTimeMinutes(4));
  });
});

describe("defloccGPerLiter", () => {
  it("returns 3", () => {
    expect(defloccGPerLiter()).toBe(3);
  });
});

describe("slipSpecificGravity", () => {
  it("returns 1.75", () => {
    expect(slipSpecificGravity()).toBe(1.75);
  });
});

describe("moldLifeCasts", () => {
  it("rubber lasts longest", () => {
    expect(moldLifeCasts("rubber")).toBeGreaterThan(
      moldLifeCasts("plaster")
    );
  });
});

describe("dryingTimeBetweenCastsHours", () => {
  it("rubber dries fastest between casts", () => {
    expect(dryingTimeBetweenCastsHours("rubber")).toBeLessThan(
      dryingTimeBetweenCastsHours("plaster")
    );
  });
});

describe("detailResolution", () => {
  it("rubber has best detail", () => {
    expect(detailResolution("rubber")).toBeGreaterThan(
      detailResolution("hump_mold")
    );
  });
});

describe("undercutsAllowed", () => {
  it("rubber allows undercuts", () => {
    expect(undercutsAllowed("rubber")).toBe(true);
  });
  it("plaster does not allow undercuts", () => {
    expect(undercutsAllowed("plaster")).toBe(false);
  });
});

describe("costPerMold", () => {
  it("rubber is most expensive", () => {
    expect(costPerMold("rubber")).toBeGreaterThan(
      costPerMold("hump_mold")
    );
  });
});

describe("moldMaterials", () => {
  it("returns 5 materials", () => {
    expect(moldMaterials()).toHaveLength(5);
  });
});
