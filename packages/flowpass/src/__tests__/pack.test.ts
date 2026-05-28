import { describe, expect, it } from "vitest";

import { parseFlowPassPack } from "../index.js";

describe("FlowPass pack parser", () => {
  it("parses the deep-research plain-English YAML pack shape", () => {
    const pack = parseFlowPassPack(`
flow: signup-and-create-project
description: New user signs up, verifies email, creates first project
url: https://example.com/signup
tags: [smoke, signup, critical-path]
journey:
  kind: signup
steps:
  - go to the homepage
  - click sign up
  - fill in email field with "{{user.email}}"
  - submit the form
  - expect_email:
      to: "{{user.email}}"
      within: 30s
      subject_contains: Confirm your email
      extract_link: confirm_url
  - verify the project appears in the project list
assertions:
  - api: POST /api/projects status 201
hats:
  - driver
  - verifier
  - network-observer
  - state-auditor
  - synthesiser
`);

    expect(pack.id).toBe("signup-and-create-project");
    expect(pack.journey.kind).toBe("signup");
    expect(pack.steps).toContain("entry-route");
    expect(pack.steps).toContain("primary-cta");
    expect(pack.steps).toContain("form-readiness");
    expect(pack.steps).toContain("handoff-proof");
    expect(pack.plainEnglishSteps).toHaveLength(6);
    expect(pack.assertions[0]).toContain("POST /api/projects");
  });

  it("rejects duplicate hats instead of hiding panel ambiguity", () => {
    expect(() =>
      parseFlowPassPack({
        name: "Duplicate hat pack",
        url: "https://example.com",
        steps: ["go to the homepage"],
        hats: ["driver", "driver"],
      }),
    ).toThrow(/duplicate hat/i);
  });
});
