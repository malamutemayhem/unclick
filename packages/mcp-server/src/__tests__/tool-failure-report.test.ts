import { describe, expect, it } from "vitest";

import {
  buildToolFailureBugReport,
  shouldAutoReportFailure,
} from "../tool-failure-report.js";
import type { FailureClassification } from "../tool-failure-class.js";

const toolBug: FailureClassification = {
  failureClass: "tool_bug",
  ownerActionable: true,
  severity: "critical",
};

const usage: FailureClassification = {
  failureClass: "usage",
  ownerActionable: false,
  severity: "action_needed",
};

describe("tool failure bug reporter", () => {
  it("builds dashboard-only bug reports for owner-actionable failures", () => {
    const report = buildToolFailureBugReport(
      "ptv_search",
      "ptv_search: Cannot read properties of undefined",
      toolBug,
      { query: "Brighton Beach", api_key: "secret" },
    );

    expect(report).toMatchObject({
      tool_name: "ptv_search",
      severity: "critical",
      notify: false,
    });
    expect(report.request_payload).toMatchObject({
      failure_class: "tool_bug",
      owner_actionable: true,
      args: {
        query: "Brighton Beach",
        api_key: "[redacted]",
      },
    });
  });

  it("does not auto-report user-side usage failures", () => {
    expect(shouldAutoReportFailure("ptv_departures", "stop_id is required", usage, 1_000)).toBe(false);
  });

  it("throttles duplicate owner-actionable reports", () => {
    expect(shouldAutoReportFailure("x", "same failure", toolBug, 1_000)).toBe(true);
    expect(shouldAutoReportFailure("x", "same failure", toolBug, 1_001)).toBe(false);
    expect(shouldAutoReportFailure("x", "same failure", toolBug, 16 * 60 * 1_000)).toBe(true);
  });
});
