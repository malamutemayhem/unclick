import { describe, it, expect } from "vitest";
import {
  durability, ventilation, portability, petCapacity,
  carrierCost, airlineApproved, collapsible, shellMaterial,
  bestTrip, petCarriers,
} from "../pet-carrier-calc.js";

describe("durability", () => {
  it("hard shell airline most durable", () => {
    expect(durability("hard_shell_airline")).toBeGreaterThan(durability("sling_shoulder"));
  });
});

describe("ventilation", () => {
  it("sling shoulder best ventilation", () => {
    expect(ventilation("sling_shoulder")).toBeGreaterThan(ventilation("backpack_bubble"));
  });
});

describe("portability", () => {
  it("sling shoulder most portable", () => {
    expect(portability("sling_shoulder")).toBeGreaterThan(portability("hard_shell_airline"));
  });
});

describe("petCapacity", () => {
  it("rolling wheeled largest capacity", () => {
    expect(petCapacity("rolling_wheeled")).toBeGreaterThan(petCapacity("sling_shoulder"));
  });
});

describe("carrierCost", () => {
  it("rolling wheeled most expensive", () => {
    expect(carrierCost("rolling_wheeled")).toBeGreaterThan(carrierCost("sling_shoulder"));
  });
});

describe("airlineApproved", () => {
  it("hard shell airline is airline approved", () => {
    expect(airlineApproved("hard_shell_airline")).toBe(true);
  });
  it("backpack bubble is not", () => {
    expect(airlineApproved("backpack_bubble")).toBe(false);
  });
});

describe("collapsible", () => {
  it("soft sided tote is collapsible", () => {
    expect(collapsible("soft_sided_tote")).toBe(true);
  });
  it("hard shell airline is not", () => {
    expect(collapsible("hard_shell_airline")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("backpack bubble uses pc bubble window frame", () => {
    expect(shellMaterial("backpack_bubble")).toBe("pc_bubble_window_frame");
  });
});

describe("bestTrip", () => {
  it("sling shoulder for quick errand tiny pet", () => {
    expect(bestTrip("sling_shoulder")).toBe("quick_errand_tiny_pet");
  });
});

describe("petCarriers", () => {
  it("returns 5 types", () => {
    expect(petCarriers()).toHaveLength(5);
  });
});
