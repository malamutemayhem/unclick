import { describe, it, expect } from "vitest";
import {
  castDistance, dragPower, lineCapacity, beginnerFriendly,
  reelCost, antiReverse, levelWind, gearSystem,
  bestFishing, fishingReels,
} from "../fishing-reel-calc.js";

describe("castDistance", () => {
  it("baitcasting low profile longest cast", () => {
    expect(castDistance("baitcasting_low_profile")).toBeGreaterThan(castDistance("spincast_closed"));
  });
});

describe("dragPower", () => {
  it("conventional trolling most drag power", () => {
    expect(dragPower("conventional_trolling")).toBeGreaterThan(dragPower("spincast_closed"));
  });
});

describe("lineCapacity", () => {
  it("conventional trolling most line capacity", () => {
    expect(lineCapacity("conventional_trolling")).toBeGreaterThan(lineCapacity("spincast_closed"));
  });
});

describe("beginnerFriendly", () => {
  it("spincast closed most beginner friendly", () => {
    expect(beginnerFriendly("spincast_closed")).toBeGreaterThan(beginnerFriendly("baitcasting_low_profile"));
  });
});

describe("reelCost", () => {
  it("conventional trolling most expensive", () => {
    expect(reelCost("conventional_trolling")).toBeGreaterThan(reelCost("spincast_closed"));
  });
});

describe("antiReverse", () => {
  it("spinning open face has anti reverse", () => {
    expect(antiReverse("spinning_open_face")).toBe(true);
  });
  it("fly reel does not", () => {
    expect(antiReverse("fly_reel")).toBe(false);
  });
});

describe("levelWind", () => {
  it("baitcasting low profile has level wind", () => {
    expect(levelWind("baitcasting_low_profile")).toBe(true);
  });
  it("spinning open face does not", () => {
    expect(levelWind("spinning_open_face")).toBe(false);
  });
});

describe("gearSystem", () => {
  it("fly reel uses large arbor click drag", () => {
    expect(gearSystem("fly_reel")).toBe("large_arbor_click_drag");
  });
});

describe("bestFishing", () => {
  it("conventional trolling for offshore deep sea big game", () => {
    expect(bestFishing("conventional_trolling")).toBe("offshore_deep_sea_big_game");
  });
});

describe("fishingReels", () => {
  it("returns 5 types", () => {
    expect(fishingReels()).toHaveLength(5);
  });
});
