import { describe, it, expect } from "vitest";
import {
  fitAccuracy, wearResist, speedBore, loadCapacity,
  boreCost, bushed, tapered, boreProfile,
  bestUse, hubBoreWheels,
} from "../hub-bore-wheel-calc.js";

describe("fitAccuracy", () => {
  it("precision bore lathe best fit accuracy", () => {
    expect(fitAccuracy("precision_bore_lathe")).toBeGreaterThan(fitAccuracy("straight_bore_standard"));
  });
});

describe("wearResist", () => {
  it("bushed bore bronze best wear resist", () => {
    expect(wearResist("bushed_bore_bronze")).toBeGreaterThan(wearResist("straight_bore_standard"));
  });
});

describe("speedBore", () => {
  it("straight bore standard fastest bore", () => {
    expect(speedBore("straight_bore_standard")).toBeGreaterThan(speedBore("bushed_bore_bronze"));
  });
});

describe("loadCapacity", () => {
  it("bronze bearing heavy best load capacity", () => {
    expect(loadCapacity("bushed_bore_bronze")).toBeGreaterThan(loadCapacity("straight_bore_standard"));
  });
});

describe("boreCost", () => {
  it("precision bore lathe most expensive", () => {
    expect(boreCost("precision_bore_lathe")).toBeGreaterThan(boreCost("straight_bore_standard"));
  });
});

describe("bushed", () => {
  it("bushed bore bronze is bushed", () => {
    expect(bushed("bushed_bore_bronze")).toBe(true);
  });
  it("straight bore standard not bushed", () => {
    expect(bushed("straight_bore_standard")).toBe(false);
  });
});

describe("tapered", () => {
  it("tapered bore axle is tapered", () => {
    expect(tapered("tapered_bore_axle")).toBe(true);
  });
  it("straight bore standard not tapered", () => {
    expect(tapered("straight_bore_standard")).toBe(false);
  });
});

describe("boreProfile", () => {
  it("bushed bore bronze uses bronze sleeve bore", () => {
    expect(boreProfile("bushed_bore_bronze")).toBe("bronze_sleeve_bore");
  });
});

describe("bestUse", () => {
  it("straight bore standard best for general hub fit", () => {
    expect(bestUse("straight_bore_standard")).toBe("general_hub_fit");
  });
});

describe("hubBoreWheels", () => {
  it("returns 5 types", () => {
    expect(hubBoreWheels()).toHaveLength(5);
  });
});
