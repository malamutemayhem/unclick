import { z } from "zod";

const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);
const ProfileSchema = z.enum(["smoke", "standard", "deep"]);

// Targets describe what the runner is allowed to talk to. Multiple targets
// per pack so a SaaS can scope web, api, and a github repo in one scan.
const TargetSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["url", "git", "mcp", "api"]),
  url: z.string().url().optional(),
  repo: z.string().optional(),
  branch: z.string().optional(),
  notes: z.string().optional(),
});

// Scope contract: pointer to the signed authorization artefact. Verification
// is a separate runtime call (securitypass_verify_scope) that walks DNS TXT
// or .well-known proof. The schema only stores the reference + expected
// proof tokens; nothing here is executable.
const ScopeContractSchema = z.object({
  contract_id: z.string().min(1),
  proof_method: z.enum(["dns_txt", "well_known", "bug_bounty_program", "signed_email"]),
  expected_token: z.string().min(1).optional(),
  bug_bounty_program: z.enum(["hackerone", "bugcrowd", "intigriti", "yeswehack"]).optional(),
  in_scope_assets: z.array(z.string()).default([]),
  out_of_scope_assets: z.array(z.string()).default([]),
  signed_at: z.string().datetime().optional(),
});

// One check entry per probe class. category maps to OWASP / OWASP-LLM /
// MITRE ATLAS / SOC2 control families so the report can group by domain.
const CheckSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  severity: SeveritySchema,
  probe: z.string().min(1),
  description: z.string().optional(),
  expected: z.unknown().optional(),
  on_fail: z.string().optional(),
  remediation: z.string().optional(),
  tags: z.array(z.string()).default([]),
  profiles: z.array(ProfileSchema).default(["smoke", "standard", "deep"]),
});

// Hat = adversarial reviewer in the Crews deliberation. The 10 canonical
// hats live in the brief; packs can add a Customer Hat with a freeform
// brief that overrides defaults for that tenant.
const HatSchema = z.object({
  id: z.string().min(1),
  role: z.enum([
    "pen_tester",
    "defensive_engineer",
    "appsec_specialist",
    "cloud_security",
    "supply_chain_auditor",
    "ai_ml_security",
    "compliance_auditor",
    "legal",
    "threat_intel",
    "customer",
  ]),
  veto: z.boolean().default(false),
  brief: z.string().optional(),
});

// Thresholds gate run verdicts. fail_on triggers a hard fail for the run if
// any finding crosses the listed severities; warn_on degrades to "other".
const ThresholdsSchema = z.object({
  fail_on: z.array(SeveritySchema).default(["critical", "high"]),
  warn_on: z.array(SeveritySchema).default(["medium"]),
  min_pass_rate: z.number().min(0).max(1).default(0.9),
});

// Heal budget caps how many auto-remediation attempts the runner will spend
// before giving up. Always paired with a separate cost cap (USD).
const HealBudgetSchema = z.object({
  max_attempts: z.number().int().min(0).default(0),
  max_cost_usd: z.number().min(0).default(0),
  max_wall_seconds: z.number().int().min(0).default(0),
});

// Monitor schedule keeps a pack continuously evaluated. cron is a 5-field
// expression in UTC; channels lists where to ping when the verdict changes.
const MonitorSchema = z.object({
  enabled: z.boolean().default(false),
  cron: z.string().optional(),
  channels: z.array(z.string()).default([]),
  diff_only: z.boolean().default(true),
});

// Fixtures pin known inputs (auth sessions, sample payloads) so re-runs are
// reproducible. Sensitive values must reference BackstagePass vault entries
// rather than be inlined; the schema enforces only the reference shape.
const FixtureSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["http_session", "credential_ref", "sample_payload", "graphql_query"]),
  vault_ref: z.string().optional(),
  value: z.unknown().optional(),
});

export const SecurityPackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "must be semver"),
  description: z.string().default(""),
  targets: z.array(TargetSchema).min(1),
  scope_contract: ScopeContractSchema,
  checks: z.array(CheckSchema).min(1),
  hats: z.array(HatSchema).default([]),
  thresholds: ThresholdsSchema.default({
    fail_on: ["critical", "high"],
    warn_on: ["medium"],
    min_pass_rate: 0.9,
  }),
  heal_budget: HealBudgetSchema.default({
    max_attempts: 0,
    max_cost_usd: 0,
    max_wall_seconds: 0,
  }),
  monitor: MonitorSchema.default({
    enabled: false,
    channels: [],
    diff_only: true,
  }),
  fixtures: z.array(FixtureSchema).default([]),
});

export type SecurityPack = z.infer<typeof SecurityPackSchema>;
export type SecurityPackInput = z.input<typeof SecurityPackSchema>;
export type PackTarget = z.infer<typeof TargetSchema>;
export type PackCheck = z.infer<typeof CheckSchema>;
export type PackHat = z.infer<typeof HatSchema>;
export type PackThresholds = z.infer<typeof ThresholdsSchema>;
export type PackHealBudget = z.infer<typeof HealBudgetSchema>;
export type PackMonitor = z.infer<typeof MonitorSchema>;
export type PackFixture = z.infer<typeof FixtureSchema>;
export type PackScopeContract = z.infer<typeof ScopeContractSchema>;
