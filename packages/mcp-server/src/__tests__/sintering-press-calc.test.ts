import { describe, it, expect } from "vitest";
import {
  densification, throughput, sinterTemp, cycleTime,
  spCost, pressureAssist, forNanoPowder, sinterConfig,
  bestUse, sinteringPressTypes,
} from "../sintering-press-calc.js";

describe("densification", () => {
  it("spark plasma best densification", () => {
    expect(densification("spark_plasma")).toBeGreaterThan(densification("conventional_sinter"));
  });
});

describe("throughput", () => {
  it("conventional highest throughput", () => {
    expect(throughput("conventional_sinter")).toBeGreaterThan(throughput("spark_plasma"));
  });
});

describe("sinterTemp", () => {
  it("spark plasma best sinter temp rating", () => {
    expect(sinterTemp("spark_plasma")).toBeGreaterThan(sinterTemp("conventional_sinter"));
  });
});

describe("cycleTime", () => {
  it("spark plasma best cycle time", () => {
    expect(cycleTime("spark_plasma")).toBeGreaterThan(cycleTime("conventional_sinter"));
  });
});

describe("spCost", () => {
  it("spark plasma most expensive", () => {
    expect(spCost("spark_plasma")).toBeGreaterThan(spCost("conventional_sinter"));
  });
});

describe("pressureAssist", () => {
  it("hot press is pressure assist", () => {
    expect(pressureAssist("hot_press_sinter")).toBe(true);
  });
  it("conventional not pressure assist", () => {
    expect(pressureAssist("conventional_sinter")).toBe(false);
  });
});

describe("forNanoPowder", () => {
  it("spark plasma for nano powder", () => {
    expect(forNanoPowder("spark_plasma")).toBe(true);
  });
  it("conventional not for nano powder", () => {
    expect(forNanoPowder("conventional_sinter")).toBe(false);
  });
});

describe("sinterConfig", () => {
  it("microwave uses volumetric heating rapid uniform energy", () => {
    expect(sinterConfig("microwave_sinter")).toBe("microwave_sintering_volumetric_heating_rapid_uniform_energy");
  });
});

describe("bestUse", () => {
  it("field assist for flash sinter electric current ultra fast", () => {
    expect(bestUse("field_assist_sinter")).toBe("flash_sinter_field_assist_sintering_electric_current_ultra_fast");
  });
});

describe("sinteringPressTypes", () => {
  it("returns 5 types", () => {
    expect(sinteringPressTypes()).toHaveLength(5);
  });
});
