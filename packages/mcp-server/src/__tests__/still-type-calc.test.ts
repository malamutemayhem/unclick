import { describe, it, expect } from "vitest";
import {
  purityRating, flavorRetention, outputAbvPercent,
  runTimeHours, capacityLiters, copperContact,
  skillRequired, bestSpirit, costEstimate, stillTypes,
} from "../still-type-calc.js";

describe("purityRating", () => {
  it("reflux is purest", () => {
    expect(purityRating("reflux")).toBeGreaterThan(
      purityRating("pot")
    );
  });
});

describe("flavorRetention", () => {
  it("alembic retains most flavor", () => {
    expect(flavorRetention("alembic")).toBeGreaterThan(
      flavorRetention("column")
    );
  });
});

describe("outputAbvPercent", () => {
  it("reflux has highest abv output", () => {
    expect(outputAbvPercent("reflux")).toBeGreaterThan(
      outputAbvPercent("alembic")
    );
  });
});

describe("runTimeHours", () => {
  it("alembic takes longest", () => {
    expect(runTimeHours("alembic")).toBeGreaterThan(
      runTimeHours("column")
    );
  });
});

describe("capacityLiters", () => {
  it("column has most capacity", () => {
    expect(capacityLiters("column")).toBeGreaterThan(
      capacityLiters("alembic")
    );
  });
});

describe("copperContact", () => {
  it("alembic has most copper contact", () => {
    expect(copperContact("alembic")).toBeGreaterThan(
      copperContact("reflux")
    );
  });
});

describe("skillRequired", () => {
  it("alembic needs most skill", () => {
    expect(skillRequired("alembic")).toBeGreaterThan(
      skillRequired("column")
    );
  });
});

describe("bestSpirit", () => {
  it("pot still best for whiskey", () => {
    expect(bestSpirit("pot")).toBe("whiskey");
  });
});

describe("costEstimate", () => {
  it("column costs most", () => {
    expect(costEstimate("column")).toBeGreaterThan(
      costEstimate("reflux")
    );
  });
});

describe("stillTypes", () => {
  it("returns 5 types", () => {
    expect(stillTypes()).toHaveLength(5);
  });
});
