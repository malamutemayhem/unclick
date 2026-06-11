import { describe, it, expect } from "vitest";
import {
  capacity, gentleness, sealability, multiInlet,
  dgCost, submerged, forBulkReclaim, flight,
  bestUse, dragConveyorTypes,
} from "../drag-conveyor-calc.js";

describe("capacity", () => {
  it("reclaim drag highest capacity", () => {
    expect(capacity("reclaim_drag_silo")).toBeGreaterThan(capacity("cable_drag_tubular"));
  });
});

describe("gentleness", () => {
  it("cable drag gentlest", () => {
    expect(gentleness("cable_drag_tubular")).toBeGreaterThan(gentleness("reclaim_drag_silo"));
  });
});

describe("sealability", () => {
  it("cable drag best sealability", () => {
    expect(sealability("cable_drag_tubular")).toBeGreaterThan(sealability("dewatering_drag_screen"));
  });
});

describe("multiInlet", () => {
  it("cable drag most inlets", () => {
    expect(multiInlet("cable_drag_tubular")).toBeGreaterThan(multiInlet("dewatering_drag_screen"));
  });
});

describe("dgCost", () => {
  it("cable drag most expensive", () => {
    expect(dgCost("cable_drag_tubular")).toBeGreaterThan(dgCost("paddle_drag_standard"));
  });
});

describe("submerged", () => {
  it("chain drag is submerged", () => {
    expect(submerged("chain_drag_submerged")).toBe(true);
  });
  it("paddle drag not submerged", () => {
    expect(submerged("paddle_drag_standard")).toBe(false);
  });
});

describe("forBulkReclaim", () => {
  it("reclaim drag for bulk reclaim", () => {
    expect(forBulkReclaim("reclaim_drag_silo")).toBe(true);
  });
  it("cable drag not for bulk reclaim", () => {
    expect(forBulkReclaim("cable_drag_tubular")).toBe(false);
  });
});

describe("flight", () => {
  it("dewatering uses perforated screen", () => {
    expect(flight("dewatering_drag_screen")).toBe("perforated_flight_screen_bottom_liquid_drain");
  });
});

describe("bestUse", () => {
  it("cable drag for fragile snack food", () => {
    expect(bestUse("cable_drag_tubular")).toBe("fragile_snack_pet_food_coffee_bean_gentle");
  });
});

describe("dragConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(dragConveyorTypes()).toHaveLength(5);
  });
});
