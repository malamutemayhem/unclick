import { describe, it, expect } from "vitest";
import {
  frequencyScore, avgDamageUsd, detectionDifficulty,
  technicalSkillNeeded, recoveryTimeDays, targetsHumans,
  requiresNetworkAccess, primaryDefense, owaspCategory, networkAttacks,
} from "../network-attack-calc.js";

describe("frequencyScore", () => {
  it("phishing most frequent", () => {
    expect(frequencyScore("phishing")).toBeGreaterThan(
      frequencyScore("mitm")
    );
  });
});

describe("avgDamageUsd", () => {
  it("ransomware most damaging", () => {
    expect(avgDamageUsd("ransomware")).toBeGreaterThan(
      avgDamageUsd("phishing")
    );
  });
});

describe("detectionDifficulty", () => {
  it("mitm hardest to detect", () => {
    expect(detectionDifficulty("mitm")).toBeGreaterThan(
      detectionDifficulty("ddos")
    );
  });
});

describe("technicalSkillNeeded", () => {
  it("mitm needs most skill", () => {
    expect(technicalSkillNeeded("mitm")).toBeGreaterThan(
      technicalSkillNeeded("phishing")
    );
  });
});

describe("recoveryTimeDays", () => {
  it("ransomware longest recovery", () => {
    expect(recoveryTimeDays("ransomware")).toBeGreaterThan(
      recoveryTimeDays("ddos")
    );
  });
});

describe("targetsHumans", () => {
  it("phishing targets humans", () => {
    expect(targetsHumans("phishing")).toBe(true);
  });
  it("ddos does not", () => {
    expect(targetsHumans("ddos")).toBe(false);
  });
});

describe("requiresNetworkAccess", () => {
  it("ddos requires network access", () => {
    expect(requiresNetworkAccess("ddos")).toBe(true);
  });
  it("phishing does not", () => {
    expect(requiresNetworkAccess("phishing")).toBe(false);
  });
});

describe("primaryDefense", () => {
  it("sql injection defended by parameterized queries", () => {
    expect(primaryDefense("sql_injection")).toBe("parameterized_queries");
  });
});

describe("owaspCategory", () => {
  it("sql injection in injection category", () => {
    expect(owaspCategory("sql_injection")).toBe("injection");
  });
});

describe("networkAttacks", () => {
  it("returns 5 attacks", () => {
    expect(networkAttacks()).toHaveLength(5);
  });
});
