import { describe, it, expect } from "vitest";
import {
  storageCapacity, organization, portability, security,
  chestCost, lockable, hasWheels, drawerType,
  bestUser, toolChests,
} from "../tool-chest-calc.js";

describe("storageCapacity", () => {
  it("rolling cabinet highest storage capacity", () => {
    expect(storageCapacity("rolling_cabinet")).toBeGreaterThan(storageCapacity("soft_bag_tote"));
  });
});

describe("organization", () => {
  it("wall mount panel best organization", () => {
    expect(organization("wall_mount_panel")).toBeGreaterThan(organization("soft_bag_tote"));
  });
});

describe("portability", () => {
  it("soft bag tote most portable", () => {
    expect(portability("soft_bag_tote")).toBeGreaterThan(portability("wall_mount_panel"));
  });
});

describe("security", () => {
  it("rolling cabinet highest security", () => {
    expect(security("rolling_cabinet")).toBeGreaterThan(security("soft_bag_tote"));
  });
});

describe("chestCost", () => {
  it("rolling cabinet most expensive", () => {
    expect(chestCost("rolling_cabinet")).toBeGreaterThan(chestCost("soft_bag_tote"));
  });
});

describe("lockable", () => {
  it("rolling cabinet is lockable", () => {
    expect(lockable("rolling_cabinet")).toBe(true);
  });
  it("wall mount panel is not", () => {
    expect(lockable("wall_mount_panel")).toBe(false);
  });
});

describe("hasWheels", () => {
  it("rolling cabinet has wheels", () => {
    expect(hasWheels("rolling_cabinet")).toBe(true);
  });
  it("top chest stack does not", () => {
    expect(hasWheels("top_chest_stack")).toBe(false);
  });
});

describe("drawerType", () => {
  it("rolling cabinet uses ball bearing slide deep", () => {
    expect(drawerType("rolling_cabinet")).toBe("ball_bearing_slide_deep");
  });
});

describe("bestUser", () => {
  it("soft bag tote best for handyman house call", () => {
    expect(bestUser("soft_bag_tote")).toBe("handyman_house_call");
  });
});

describe("toolChests", () => {
  it("returns 5 types", () => {
    expect(toolChests()).toHaveLength(5);
  });
});
