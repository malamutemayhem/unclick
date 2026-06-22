// Builder access profiles for agent seats that need to build, push, deploy,
// and work with provider secrets through UnClick-controlled paths.

export type BuilderAccessProfile =
  | "observer"
  | "scoped_builder"
  | "trusted_builder"
  | "secret_steward"
  | "release_captain"
  | "break_glass_admin";

export type BuilderCapability =
  | "status.read"
  | "repo.read"
  | "repo.branch.write"
  | "repo.pull_request.write"
  | "repo.checks.read"
  | "repo.actions.rerun"
  | "repo.git_push"
  | "deploy.preview.write"
  | "deploy.production.promote"
  | "provider.management.read"
  | "provider.management.write"
  | "provider.env.read"
  | "provider.env.write"
  | "provider.domain.write"
  | "secret.use_indirect"
  | "secret.write"
  | "secret.rotate"
  | "secret.reveal"
  | "audit.write"
  | "lease.short_required";

export interface BuilderProfileDefinition {
  label: string;
  rank: number;
  defaultLeaseMinutes: number;
  secretMode: "none" | "indirect" | "write_or_rotate" | "reveal";
  capabilities: readonly BuilderCapability[];
  guardrails: readonly string[];
}

export const BUILDER_ACCESS_PROFILES: Record<BuilderAccessProfile, BuilderProfileDefinition> = {
  observer: {
    label: "Observer",
    rank: 0,
    defaultLeaseMinutes: 240,
    secretMode: "none",
    capabilities: ["status.read", "repo.read", "repo.checks.read"],
    guardrails: [
      "Read-only status and code inspection.",
      "Cannot write provider state, push code, deploy, or touch secrets.",
    ],
  },
  scoped_builder: {
    label: "Scoped Builder",
    rank: 10,
    defaultLeaseMinutes: 180,
    secretMode: "none",
    capabilities: [
      "status.read",
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "audit.write",
    ],
    guardrails: [
      "Can create patches and pull requests in owned files.",
      "Cannot receive or use raw secrets.",
    ],
  },
  trusted_builder: {
    label: "Trusted Builder",
    rank: 20,
    defaultLeaseMinutes: 120,
    secretMode: "indirect",
    capabilities: [
      "status.read",
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "repo.actions.rerun",
      "repo.git_push",
      "deploy.preview.write",
      "provider.management.read",
      "secret.use_indirect",
      "audit.write",
    ],
    guardrails: [
      "Can use connected provider credentials without printing or revealing them.",
      "Needs a real git push credential path, not only catalog or read-only connector visibility.",
    ],
  },
  secret_steward: {
    label: "Secret Steward",
    rank: 30,
    defaultLeaseMinutes: 60,
    secretMode: "write_or_rotate",
    capabilities: [
      "status.read",
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "repo.actions.rerun",
      "repo.git_push",
      "deploy.preview.write",
      "provider.management.read",
      "provider.management.write",
      "provider.env.read",
      "provider.env.write",
      "provider.domain.write",
      "secret.use_indirect",
      "secret.write",
      "secret.rotate",
      "audit.write",
      "lease.short_required",
    ],
    guardrails: [
      "Can create or rotate provider secrets and environment variables.",
      "Should pass secrets directly to provider APIs or vault storage, not paste them into chat.",
      "Every secret mutation needs a short lease and an audit receipt.",
    ],
  },
  release_captain: {
    label: "Release Captain",
    rank: 40,
    defaultLeaseMinutes: 45,
    secretMode: "write_or_rotate",
    capabilities: [
      "status.read",
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "repo.actions.rerun",
      "repo.git_push",
      "deploy.preview.write",
      "deploy.production.promote",
      "provider.management.read",
      "provider.management.write",
      "provider.env.read",
      "provider.env.write",
      "provider.domain.write",
      "secret.use_indirect",
      "secret.write",
      "secret.rotate",
      "audit.write",
      "lease.short_required",
    ],
    guardrails: [
      "Can merge or promote only after proof gates pass.",
      "Cannot bypass audit receipts for secret or deployment work.",
    ],
  },
  break_glass_admin: {
    label: "Break Glass Admin",
    rank: 50,
    defaultLeaseMinutes: 15,
    secretMode: "reveal",
    capabilities: [
      "status.read",
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "repo.actions.rerun",
      "repo.git_push",
      "deploy.preview.write",
      "deploy.production.promote",
      "provider.management.read",
      "provider.management.write",
      "provider.env.read",
      "provider.env.write",
      "provider.domain.write",
      "secret.use_indirect",
      "secret.write",
      "secret.rotate",
      "secret.reveal",
      "audit.write",
      "lease.short_required",
    ],
    guardrails: [
      "Temporary emergency tier for raw secret reveal, provider admin repair, or unblock work.",
      "Use only with explicit operator approval, shortest lease, and a full audit receipt.",
    ],
  },
} as const;

export type BuilderProvider = "github" | "vercel" | "supabase";

export interface BuilderProviderRequirements {
  minimumProfile: BuilderAccessProfile;
  secretWorkProfile: BuilderAccessProfile;
  capabilities: readonly BuilderCapability[];
  runtimeRequirements: readonly string[];
  notes: readonly string[];
}

export const BUILDER_PROVIDER_REQUIREMENTS: Record<BuilderProvider, BuilderProviderRequirements> = {
  github: {
    minimumProfile: "trusted_builder",
    secretWorkProfile: "secret_steward",
    capabilities: [
      "repo.read",
      "repo.branch.write",
      "repo.pull_request.write",
      "repo.checks.read",
      "repo.actions.rerun",
      "repo.git_push",
    ],
    runtimeRequirements: [
      "github_contents_write_or_git_push_credential",
      "branch_create_and_push",
      "pull_request_create_or_update",
      "checks_read",
    ],
    notes: [
      "GitHub catalog access is not enough for builders.",
      "A builder that must make code live needs a working git push path or a GitHub API path that can write branches.",
    ],
  },
  vercel: {
    minimumProfile: "trusted_builder",
    secretWorkProfile: "secret_steward",
    capabilities: [
      "deploy.preview.write",
      "provider.env.read",
      "provider.env.write",
      "provider.domain.write",
    ],
    runtimeRequirements: [
      "vercel_project_read_write",
      "deployment_create_and_inspect",
      "environment_variable_write",
      "domain_alias_write_when_assigned",
    ],
    notes: [
      "Preview deploys can be Trusted Builder work.",
      "Environment variables, domains, aliases, and production promotion need Secret Steward or Release Captain.",
    ],
  },
  supabase: {
    minimumProfile: "trusted_builder",
    secretWorkProfile: "secret_steward",
    capabilities: [
      "provider.management.read",
      "provider.management.write",
      "provider.env.write",
      "secret.use_indirect",
      "secret.write",
      "secret.rotate",
    ],
    runtimeRequirements: [
      "organizations_read",
      "projects_read",
      "database_or_edge_function_write_when_assigned",
      "secret_write_or_rotation_when_assigned",
    ],
    notes: [
      "Organizations Read and Projects Read are enough for status proof.",
      "Database, Edge Function, Auth, Storage, or secret mutation work needs Secret Steward.",
    ],
  },
} as const;

export interface BuilderAccessPlan {
  profile: BuilderAccessProfile;
  provider: BuilderProvider;
  needsSecretWork?: boolean;
  runtimeCapabilities?: readonly string[];
}

export function profileAtLeast(profile: BuilderAccessProfile, minimum: BuilderAccessProfile): boolean {
  return BUILDER_ACCESS_PROFILES[profile].rank >= BUILDER_ACCESS_PROFILES[minimum].rank;
}

export function profileAllowsCapability(profile: BuilderAccessProfile, capability: BuilderCapability): boolean {
  return BUILDER_ACCESS_PROFILES[profile].capabilities.includes(capability);
}

export function requiredProfileForProvider(
  provider: BuilderProvider,
  needsSecretWork = false
): BuilderAccessProfile {
  const requirements = BUILDER_PROVIDER_REQUIREMENTS[provider];
  return needsSecretWork ? requirements.secretWorkProfile : requirements.minimumProfile;
}

export function validateBuilderAccessPlan(plan: BuilderAccessPlan): string[] {
  const requirements = BUILDER_PROVIDER_REQUIREMENTS[plan.provider];
  const requiredProfile = requiredProfileForProvider(plan.provider, plan.needsSecretWork === true);
  const blockers: string[] = [];

  if (!profileAtLeast(plan.profile, requiredProfile)) {
    blockers.push(`${plan.provider} builder work needs ${requiredProfile}, got ${plan.profile}.`);
  }

  for (const capability of requirements.capabilities) {
    if (!profileAllowsCapability(plan.profile, capability)) {
      blockers.push(`${plan.profile} is missing capability ${capability}.`);
    }
  }

  const runtimeCapabilities = new Set(plan.runtimeCapabilities ?? []);
  for (const requirement of requirements.runtimeRequirements) {
    if (!runtimeCapabilities.has(requirement)) {
      blockers.push(`${plan.provider} runtime is missing ${requirement}.`);
    }
  }

  return blockers;
}
