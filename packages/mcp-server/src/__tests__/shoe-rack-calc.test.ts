import { describe, it, expect } from "vitest";
import {
  pairCapacity, easyAccess, dustProtection, floorSpace,
  rackCost, noAssembly, dualPurpose, designStyle,
  bestSpace, shoeRacks,
} from "../shoe-rack-calc.js";

describe("pairCapacity", () => {
  it("stackable tier most pair capacity", () => {
    expect(pairCapacity("stackable_tier")).toBeGreaterThan(pairCapacity("bench_seat_combo"));
  });
});

describe("easyAccess", () => {
  it("spinning lazy susan easiest access", () => {
    expect(easyAccess("spinning_lazy_susan")).toBeGreaterThan(easyAccess("bench_seat_combo"));
  });
});

describe("dustProtection", () => {
  it("drop front box best dust protection", () => {
    expect(dustProtection("drop_front_box")).toBeGreaterThan(dustProtection("stackable_tier"));
  });
});

describe("floorSpace", () => {
  it("over door hanging saves most floor space", () => {
    expect(floorSpace("over_door_hanging")).toBeGreaterThan(floorSpace("bench_seat_combo"));
  });
});

describe("rackCost", () => {
  it("spinning lazy susan most expensive", () => {
    expect(rackCost("spinning_lazy_susan")).toBeGreaterThan(rackCost("over_door_hanging"));
  });
});

describe("noAssembly", () => {
  it("over door hanging needs no assembly", () => {
    expect(noAssembly("over_door_hanging")).toBe(true);
  });
  it("stackable tier needs assembly", () => {
    expect(noAssembly("stackable_tier")).toBe(false);
  });
});

describe("dualPurpose", () => {
  it("bench seat combo is dual purpose", () => {
    expect(dualPurpose("bench_seat_combo")).toBe(true);
  });
  it("over door hanging is not", () => {
    expect(dualPurpose("over_door_hanging")).toBe(false);
  });
});

describe("designStyle", () => {
  it("spinning lazy susan uses rotating carousel tower", () => {
    expect(designStyle("spinning_lazy_susan")).toBe("rotating_carousel_tower");
  });
});

describe("bestSpace", () => {
  it("drop front box for sneaker display collect", () => {
    expect(bestSpace("drop_front_box")).toBe("sneaker_display_collect");
  });
});

describe("shoeRacks", () => {
  it("returns 5 types", () => {
    expect(shoeRacks()).toHaveLength(5);
  });
});
