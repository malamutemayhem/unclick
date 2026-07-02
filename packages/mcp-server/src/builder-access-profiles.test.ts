import { describe, expect, it } from "vitest";

import {
  BUILDER_ACCESS_PROFILES,
  BUILDER_SESSION_PROVISIONING_CONTRACTS,
  inferBuilderRuntimeCapabilities,
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

  it("does not treat a connected GitHub catalog app as a builder push path", () => {
    const runtimeCapabilities = inferBuilderRuntimeCapabilities("github", [
      "github_connected_catalog_visible",
    ]);

    expect(runtimeCapabilities).toEqual([]);
    expect(validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities,
    })).toContain("github runtime is missing github_contents_write_or_git_push_credential.");
  });

  it("classifies the missing Claude Code push credential as a runtime provisioning failure", () => {
    const runtimeCapabilities = inferBuilderRuntimeCapabilities("github", [
      "unclick_github_connection_available",
      "github_pull_request_write_verified",
      "github_checks_read_verified",
    ]);

    expect(runtimeCapabilities).not.toContain("github_contents_write_or_git_push_credential");
    expect(runtimeCapabilities).not.toContain("branch_create_and_push");
    expect(BUILDER_SESSION_PROVISIONING_CONTRACTS.github.failureMode).toMatch(/session git credential/);
    expect(validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities,
    })).toEqual([
      "github runtime is missing github_contents_write_or_git_push_credential.",
      "github runtime is missing branch_create_and_push.",
    ]);
  });

  it("allows an UnClick-only GitHub builder when the UnClick bridge proves write tools", () => {
    const runtimeCapabilities = inferBuilderRuntimeCapabilities("github", [
      "unclick_github_connection_available",
      "unclick_github_branch_write_verified",
      "unclick_github_contents_write_verified",
      "unclick_github_pull_request_write_verified",
      "unclick_github_checks_read_verified",
    ]);

    expect(validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities,
    })).toEqual([]);
  });

  it("documents direct session connectors and UnClick-internal connectors as separate planes", () => {
    expect(BUILDER_SESSION_PROVISIONING_CONTRACTS.github.connectorPlanes).toEqual([
      "direct_session_connector",
      "unclick_internal_connector",
    ]);
    expect(BUILDER_SESSION_PROVISIONING_CONTRACTS.github.failureMode).toMatch(/inside UnClick/);
    expect(BUILDER_SESSION_PROVISIONING_CONTRACTS.github.failureMode).toMatch(/direct session git credential/);
  });

  it("passes GitHub builder work when a session proves the actual git push path", () => {
    const runtimeCapabilities = inferBuilderRuntimeCapabilities("github", [
      "git_credential_helper_configured",
      "git_proxy_auth_configured",
      "git_push_probe_succeeded",
      "github_pull_request_write_verified",
      "github_checks_read_verified",
    ]);

    expect(validateBuilderAccessPlan({
      provider: "github",
      profile: "trusted_builder",
      runtimeCapabilities,
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

  it("does not treat connected Vercel catalog access as target team deployment scope", () => {
    const runtimeCapabilities = inferBuilderRuntimeCapabilities("vercel", [
      "vercel_connected_catalog_visible",
    ]);

    expect(runtimeCapabilities).toEqual([]);
    expect(validateBuilderAccessPlan({
      provider: "vercel",
      profile: "secret_steward",
      needsSecretWork: true,
      runtimeCapabilities,
    })).toEqual([
      "vercel runtime is missing vercel_project_read_write.",
      "vercel runtime is missing deployment_create_and_inspect.",
      "vercel runtime is missing environment_variable_write.",
      "vercel runtime is missing domain_alias_write_when_assigned.",
    ]);
  });
});
