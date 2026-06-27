import { describe, it, expect } from "vitest";
import {
  effectiveness, speed, damage, coverage,
  fsCost, waterFree, forElectrical, agent,
  bestUse, fireSuppresses,
} from "../fire-suppress-calc.js";

describe("effectiveness", () => {
  it("co2 most effective", () => {
    expect(effectiveness("co2_total_flood")).toBeGreaterThan(effectiveness("dry_sprinkler_preaction"));
  });
});

describe("speed", () => {
  it("wet sprinkler fastest", () => {
    expect(speed("wet_sprinkler_pipe")).toBeGreaterThan(speed("dry_sprinkler_preaction"));
  });
});

describe("damage", () => {
  it("clean agent least damage", () => {
    expect(damage("clean_agent_fm200")).toBeGreaterThan(damage("wet_sprinkler_pipe"));
  });
});

describe("coverage", () => {
  it("wet sprinkler best coverage", () => {
    expect(coverage("wet_sprinkler_pipe")).toBeGreaterThan(coverage("water_mist_high_press"));
  });
});

describe("fsCost", () => {
  it("clean agent most expensive", () => {
    expect(fsCost("clean_agent_fm200")).toBeGreaterThan(fsCost("wet_sprinkler_pipe"));
  });
});

describe("waterFree", () => {
  it("clean agent is water free", () => {
    expect(waterFree("clean_agent_fm200")).toBe(true);
  });
  it("wet sprinkler not water free", () => {
    expect(waterFree("wet_sprinkler_pipe")).toBe(false);
  });
});

describe("forElectrical", () => {
  it("clean agent for electrical", () => {
    expect(forElectrical("clean_agent_fm200")).toBe(true);
  });
  it("wet sprinkler not for electrical", () => {
    expect(forElectrical("wet_sprinkler_pipe")).toBe(false);
  });
});

describe("agent", () => {
  it("water mist uses atomized water droplet mist", () => {
    expect(agent("water_mist_high_press")).toBe("atomized_water_droplet_mist");
  });
});

describe("bestUse", () => {
  it("clean agent best for server room", () => {
    expect(bestUse("clean_agent_fm200")).toBe("server_room_data_center_protect");
  });
});

describe("fireSuppresses", () => {
  it("returns 5 types", () => {
    expect(fireSuppresses()).toHaveLength(5);
  });
});
