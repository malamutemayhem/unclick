import { describe, it, expect } from "vitest";
import {
  tiePoints, contactQuality, durability, portability,
  boardCost, hasPowerRail, transparent, baseType,
  bestUse, breadboards,
} from "../breadboard-calc.js";

describe("tiePoints", () => {
  it("full size standard most tie points", () => {
    expect(tiePoints("full_size_standard")).toBeGreaterThan(tiePoints("mini_breadboard_tiny"));
  });
});

describe("contactQuality", () => {
  it("transparent clear base best contact quality", () => {
    expect(contactQuality("transparent_clear_base")).toBeGreaterThan(contactQuality("mini_breadboard_tiny"));
  });
});

describe("durability", () => {
  it("power rail integrated most durable", () => {
    expect(durability("power_rail_integrated")).toBeGreaterThan(durability("mini_breadboard_tiny"));
  });
});

describe("portability", () => {
  it("mini breadboard tiny most portable", () => {
    expect(portability("mini_breadboard_tiny")).toBeGreaterThan(portability("full_size_standard"));
  });
});

describe("boardCost", () => {
  it("power rail integrated most expensive", () => {
    expect(boardCost("power_rail_integrated")).toBeGreaterThan(boardCost("mini_breadboard_tiny"));
  });
});

describe("hasPowerRail", () => {
  it("full size standard has power rail", () => {
    expect(hasPowerRail("full_size_standard")).toBe(true);
  });
  it("mini breadboard tiny no power rail", () => {
    expect(hasPowerRail("mini_breadboard_tiny")).toBe(false);
  });
});

describe("transparent", () => {
  it("transparent clear base is transparent", () => {
    expect(transparent("transparent_clear_base")).toBe(true);
  });
  it("full size standard not transparent", () => {
    expect(transparent("full_size_standard")).toBe(false);
  });
});

describe("baseType", () => {
  it("power rail integrated uses metal plate mount", () => {
    expect(baseType("power_rail_integrated")).toBe("metal_plate_mount");
  });
});

describe("bestUse", () => {
  it("transparent clear base best for teaching demo proto", () => {
    expect(bestUse("transparent_clear_base")).toBe("teaching_demo_proto");
  });
});

describe("breadboards", () => {
  it("returns 5 types", () => {
    expect(breadboards()).toHaveLength(5);
  });
});
