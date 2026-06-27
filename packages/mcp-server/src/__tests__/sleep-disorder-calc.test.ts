import { describe, it, expect } from "vitest";
import {
  prevalenceRate, severityImpact, diagnosisDifficulty, treatmentComplexity,
  daytimeImpairment, requiresSleepStudy, geneticComponent,
  primaryTreatment, affectedSleepPhase, sleepDisorders,
} from "../sleep-disorder-calc.js";

describe("prevalenceRate", () => {
  it("insomnia most prevalent", () => {
    expect(prevalenceRate("insomnia")).toBeGreaterThan(prevalenceRate("narcolepsy"));
  });
});

describe("severityImpact", () => {
  it("narcolepsy most severe impact", () => {
    expect(severityImpact("narcolepsy")).toBeGreaterThan(severityImpact("restless_legs"));
  });
});

describe("diagnosisDifficulty", () => {
  it("narcolepsy hardest to diagnose", () => {
    expect(diagnosisDifficulty("narcolepsy")).toBeGreaterThan(diagnosisDifficulty("insomnia"));
  });
});

describe("treatmentComplexity", () => {
  it("narcolepsy most complex treatment", () => {
    expect(treatmentComplexity("narcolepsy")).toBeGreaterThan(treatmentComplexity("insomnia"));
  });
});

describe("daytimeImpairment", () => {
  it("narcolepsy worst daytime impairment", () => {
    expect(daytimeImpairment("narcolepsy")).toBeGreaterThan(daytimeImpairment("parasomnia"));
  });
});

describe("requiresSleepStudy", () => {
  it("apnea requires sleep study", () => {
    expect(requiresSleepStudy("apnea")).toBe(true);
  });
  it("insomnia does not", () => {
    expect(requiresSleepStudy("insomnia")).toBe(false);
  });
});

describe("geneticComponent", () => {
  it("all have genetic component", () => {
    for (const d of sleepDisorders()) {
      expect(geneticComponent(d)).toBe(true);
    }
  });
});

describe("primaryTreatment", () => {
  it("apnea treated with cpap", () => {
    expect(primaryTreatment("apnea")).toBe("cpap_device");
  });
});

describe("affectedSleepPhase", () => {
  it("narcolepsy affects rem", () => {
    expect(affectedSleepPhase("narcolepsy")).toBe("rem_intrusion");
  });
});

describe("sleepDisorders", () => {
  it("returns 5 disorders", () => {
    expect(sleepDisorders()).toHaveLength(5);
  });
});
