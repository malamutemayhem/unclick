import { describe, expect, it } from "vitest";
import { runStagehandProbe, type StagehandLike } from "../probes/stagehand.js";

describe("Stagehand probe scaffold", () => {
  it("maps injected browser observations to findings", async () => {
    const fakeStagehand: StagehandLike = {
      async observeSecurity() {
        return [{
          check_id: "securitypass.stagehand.login-csrf",
          title: "Login flow resists CSRF replay",
          ok: false,
          evidence: { step: "submit-login" },
          remediation: "Add a verified CSRF token to the login form.",
        }];
      },
    };
    const result = await runStagehandProbe(
      { type: "url", url: "https://example.com" },
      fakeStagehand,
    );
    expect(result.probe).toBe("stagehand");
    expect(result.findings[0].verdict).toBe("fail");
    expect(result.findings[0].severity).toBe("medium");
  });

  it("returns not-applicable when no URL is present", async () => {
    const fakeStagehand: StagehandLike = {
      async observeSecurity() {
        throw new Error("should not run without a URL");
      },
    };
    const result = await runStagehandProbe({ type: "git", url: undefined }, fakeStagehand);
    expect(result.findings[0].verdict).toBe("na");
    expect(result.findings[0].check_id).toBe("securitypass.stagehand.target-url");
  });
});

