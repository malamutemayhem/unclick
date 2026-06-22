import { describe, expect, it } from "vitest";

import {
  BUILDER_ACCESS_PROFILES,
  requiredProfileForProvider,
  validateBuilderAccessPlan,
} from "./builder-access-profiles.js";

describe("builder access profiles", () => {
  it("allows trusted builders to use secrets indirectly without revealing them", () => {
    const trusted = BUILDER_ACCESS_PROFILES.trusted_builder;

    expect(trusted.secretMode).toBe("indirect");
    expect(trusted.capabilities).toContain("secret.use_indirect");
    expect(trusted.capabilities).not.toContain("secret.write");
    expect(trusted.capabilities).not.toContain("secret.reveal");
  });

  it("keeps raw secret reveal limited to break-glass admin", () => {
    expect(BUILDER_ACCESS_PROFILES.secret_steward.capabilities).toContain("secret.write");
    expect(BUILDER_ACCESS_PROFILES.secret_steward.capabilities).toContain("secret.rotate");
    expect(BUILDER_ACCESS_PROFILES.secret_steward.capabilities).not.toContain("secret.reveal");
    expect(BUILDER_ACCESS_PROFILES.break_glass_admin.capabilities).toContain("secret.reveal");
    expect(BUILDER_ACCESS_PROFILES.break_glass_admin.defaultLeaseMinutes).toBeLessThan(
      BUILDER_ACCESS_PROFILES.secret_steward.defaultLeaseMinutes
    );
  });

  it("requires a real GitHub branch push path for builder work", () => {
    const blockers = validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities: [
        "pull_request_create_or_update",
        "checks_read",
      ],
    });

    expect(blockers).toContain("github runtime is missing github_contents_write_or_git_push_credential.");
    expect(blockers).toContain("github runtime is missing branch_create_and_push.");
  });

  it("passes GitHub builder work when push and PR capabilities are present", () => {
    expect(validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities: [
        "github_contents_write_or_git_push_credential",
        "branch_create_and_push",
        "pull_request_create_or_update",
        "checks_read",
      ],
    })).toEqual([]);
  });

  it("raises provider secret work to a secret steward profile", () => {
    expect(requiredProfileForProvider("supabase", false)).toBe("trusted_builder");
    expect(requiredProfileForProvider("supabase", true)).toBe("secret_steward");
    expect(validateBuilderAccessPlan({
      provider: "supabase",
      profile: "trusted_builder",
      needsSecretWork: true,
      runtimeCapabilities: [
        "organizations_read",
        "projects_read",
        "database_or_edge_function_write_when_assigned",
        "secret_write_or_rotation_when_assigned",
      ],
    })).toContain("supabase builder work needs secret_steward, got trusted_builder.");
  });

  it("allows Vercel secret work only with the secret steward lane or higher", () => {
    expect(validateBuilderAccessPlan({
      provider: "vercel",
      profile: "secret_steward",
      needsSecretWork: true,
      runtimeCapabilities: [
        "vercel_project_read_write",
        "deployment_create_and_inspect",
        "environment_variable_write",
        "domain_alias_write_when_assigned",
      ],
    })).toEqual([]);
  });
});
