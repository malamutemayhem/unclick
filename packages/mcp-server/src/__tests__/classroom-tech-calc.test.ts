import { describe, it, expect } from "vitest";
import {
  engagementBoost, implementationCost, trainingRequired,
  accessibilityScore, dataInsights, worksOffline,
  personalized, primaryBenefit, deploymentModel, classroomTechs,
} from "../classroom-tech-calc.js";

describe("engagementBoost", () => {
  it("virtual lab biggest engagement boost", () => {
    expect(engagementBoost("virtual_lab")).toBeGreaterThan(
      engagementBoost("lms")
    );
  });
});

describe("implementationCost", () => {
  it("ai tutor most expensive", () => {
    expect(implementationCost("ai_tutor")).toBeGreaterThan(
      implementationCost("student_response")
    );
  });
});

describe("trainingRequired", () => {
  it("virtual lab needs most training", () => {
    expect(trainingRequired("virtual_lab")).toBeGreaterThan(
      trainingRequired("student_response")
    );
  });
});

describe("accessibilityScore", () => {
  it("ai tutor most accessible", () => {
    expect(accessibilityScore("ai_tutor")).toBeGreaterThan(
      accessibilityScore("smartboard")
    );
  });
});

describe("dataInsights", () => {
  it("ai tutor best data insights", () => {
    expect(dataInsights("ai_tutor")).toBeGreaterThan(
      dataInsights("smartboard")
    );
  });
});

describe("worksOffline", () => {
  it("smartboard works offline", () => {
    expect(worksOffline("smartboard")).toBe(true);
  });
  it("lms does not", () => {
    expect(worksOffline("lms")).toBe(false);
  });
});

describe("personalized", () => {
  it("ai tutor is personalized", () => {
    expect(personalized("ai_tutor")).toBe(true);
  });
  it("smartboard is not", () => {
    expect(personalized("smartboard")).toBe(false);
  });
});

describe("primaryBenefit", () => {
  it("virtual lab enables safe experimentation", () => {
    expect(primaryBenefit("virtual_lab")).toBe("safe_experimentation");
  });
});

describe("deploymentModel", () => {
  it("ai tutor is ai service", () => {
    expect(deploymentModel("ai_tutor")).toBe("ai_service");
  });
});

describe("classroomTechs", () => {
  it("returns 5 technologies", () => {
    expect(classroomTechs()).toHaveLength(5);
  });
});
