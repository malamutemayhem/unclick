import { describe, it, expect } from "vitest";
import {
  validateStartup,
  isUrl,
  isPositiveInteger,
  isOneOf,
  matchesPattern,
  auditConnectorReadiness,
} from "../startup-validator.js";

describe("validateStartup", () => {
  it("passes when all required vars are present", () => {
    const result = validateStartup(
      [{ name: "API_KEY", required: true }],
      { API_KEY: "sk_123" },
    );
    expect(result.ok).toBe(true);
    expect(result.issues.filter((i) => i.severity === "error")).toHaveLength(0);
  });

  it("fails when a required var is missing", () => {
    const result = validateStartup(
      [{ name: "API_KEY", required: true }],
      {},
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0].severity).toBe("error");
    expect(result.issues[0].envVar).toBe("API_KEY");
  });

  it("fails when a required var is empty", () => {
    const result = validateStartup(
      [{ name: "API_KEY", required: true }],
      { API_KEY: "  " },
    );
    expect(result.ok).toBe(false);
  });

  it("reports info for missing optional vars", () => {
    const result = validateStartup(
      [{ name: "OPTIONAL_KEY", required: false }],
      {},
    );
    expect(result.ok).toBe(true);
    expect(result.issues[0].severity).toBe("info");
  });

  it("validates values with custom validator", () => {
    const result = validateStartup(
      [{ name: "PORT", required: true, validate: isPositiveInteger }],
      { PORT: "abc" },
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0].message).toContain("positive integer");
  });

  it("passes valid custom validation", () => {
    const result = validateStartup(
      [{ name: "PORT", required: true, validate: isPositiveInteger }],
      { PORT: "3000" },
    );
    expect(result.ok).toBe(true);
    expect(result.issues.filter((i) => i.severity === "error")).toHaveLength(0);
  });

  it("includes description in error messages", () => {
    const result = validateStartup(
      [{ name: "DB_URL", required: true, description: "PostgreSQL connection string" }],
      {},
    );
    expect(result.issues[0].message).toContain("PostgreSQL connection string");
  });

  it("handles multiple requirements", () => {
    const result = validateStartup(
      [
        { name: "A", required: true },
        { name: "B", required: true },
        { name: "C", required: false },
      ],
      { A: "val" },
    );
    expect(result.ok).toBe(false);
    expect(result.issues.filter((i) => i.severity === "error")).toHaveLength(1);
    expect(result.issues.filter((i) => i.severity === "info")).toHaveLength(1);
  });
});

describe("validators", () => {
  describe("isUrl", () => {
    it("accepts valid URLs", () => {
      expect(isUrl("https://example.com")).toBeNull();
      expect(isUrl("http://localhost:3000")).toBeNull();
    });

    it("rejects invalid URLs", () => {
      expect(isUrl("not-a-url")).not.toBeNull();
    });
  });

  describe("isPositiveInteger", () => {
    it("accepts positive integers", () => {
      expect(isPositiveInteger("42")).toBeNull();
      expect(isPositiveInteger("1")).toBeNull();
    });

    it("rejects non-positive or non-integer", () => {
      expect(isPositiveInteger("0")).not.toBeNull();
      expect(isPositiveInteger("-1")).not.toBeNull();
      expect(isPositiveInteger("3.14")).not.toBeNull();
      expect(isPositiveInteger("abc")).not.toBeNull();
    });
  });

  describe("isOneOf", () => {
    it("accepts allowed values", () => {
      const check = isOneOf("dev", "staging", "prod");
      expect(check("dev")).toBeNull();
      expect(check("prod")).toBeNull();
    });

    it("rejects other values", () => {
      const check = isOneOf("dev", "prod");
      expect(check("test")).not.toBeNull();
    });
  });

  describe("matchesPattern", () => {
    it("accepts matching values", () => {
      const check = matchesPattern(/^sk_/, "must start with sk_");
      expect(check("sk_test_123")).toBeNull();
    });

    it("rejects non-matching values", () => {
      const check = matchesPattern(/^sk_/, "must start with sk_");
      expect(check("pk_123")).toBe("must start with sk_");
    });
  });
});

describe("auditConnectorReadiness", () => {
  it("identifies ready connectors", () => {
    const result = auditConnectorReadiness(
      { github: ["GITHUB_TOKEN"], slack: ["SLACK_TOKEN"] },
      { GITHUB_TOKEN: "tok", SLACK_TOKEN: "tok" },
    );
    expect(result.ready).toEqual(["github", "slack"]);
    expect(result.missing).toHaveLength(0);
  });

  it("identifies missing connectors", () => {
    const result = auditConnectorReadiness(
      { github: ["GITHUB_TOKEN"], slack: ["SLACK_TOKEN", "SLACK_CHANNEL"] },
      { GITHUB_TOKEN: "tok" },
    );
    expect(result.ready).toEqual(["github"]);
    expect(result.missing).toHaveLength(1);
    expect(result.missing[0].connector).toBe("slack");
    expect(result.missing[0].missingVars).toContain("SLACK_TOKEN");
  });

  it("treats empty strings as missing", () => {
    const result = auditConnectorReadiness(
      { github: ["GITHUB_TOKEN"] },
      { GITHUB_TOKEN: "" },
    );
    expect(result.missing).toHaveLength(1);
  });
});
