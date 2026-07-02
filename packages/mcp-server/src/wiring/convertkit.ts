// wiring/convertkit.ts
// Per-app MCP wiring for the convertkit connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Commerce / Creator

import { ckListSubscribers, ckAddSubscriber, ckListForms, ckListSequences, ckListTags, ckTagSubscriber } from "../convertkit-tool.js";
import { COMMONSENSEPASS_CLAIM_KINDS } from "../commonsensepass-tool.js";

export const convertkitTools = [
  // ── convertkit-tool.ts ───────────────────────────────────────────────────────
  {
    name: "ck_list_subscribers",
    description: "List all subscribers in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_secret: { type: "string", description: "ConvertKit API secret" },
        page: { type: "number" },
        from: { type: "string", description: "Filter by created date (ISO 8601)" },
        to: { type: "string" },
        sort_field: { type: "string" },
        sort_order: { type: "string", description: "asc or desc" },
      },
      required: ["api_secret"],
    },
  },
  {
    name: "ck_add_subscriber",
    description: "Subscribe an email address to a ConvertKit form.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "ConvertKit API key" },
        form_id: { type: "string" },
        email: { type: "string" },
        first_name: { type: "string" },
      },
      required: ["api_key", "form_id", "email"],
    },
  },
  {
    name: "ck_list_forms",
    description: "List all forms in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_list_sequences",
    description: "List all email sequences in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_list_tags",
    description: "List all tags in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_tag_subscriber",
    description: "Apply a tag to a subscriber in ConvertKit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        tag_id: { type: "string" },
        email: { type: "string" },
        first_name: { type: "string" },
      },
      required: ["api_key", "tag_id", "email"],
    },
  },

  // -- commonsensepass-tool.ts (worker sanity-gate verdicts) ------------------
  {
    name: "commonsensepass_check",
    description: "Run the verdict-only CommonSensePass sanity gate before a worker claims healthy, quiet, no_work, pass, done, merge_ready, duplicate_wake, or route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        claim: { type: "string", enum: [...COMMONSENSEPASS_CLAIM_KINDS], description: "Worker claim to sanity-check." },
        context: {
          type: "object",
          additionalProperties: true,
          description: "Evidence packet for the claim, such as todos, active_jobs, PR state, wake state, SHAs, or lane evidence.",
        },
        evidence: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional evidence entries to echo when no rule-specific evidence is available.",
        },
      },
      required: ["claim", "context"],
    },
  },
  {
    name: "commonsensepass_rules",
    description: "Return the worker-readable CommonSensePass rules, verdict vocabulary, and fixture ids. Set include_fixtures=true for full example packets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        include_fixtures: { type: "boolean", default: false, description: "Include full deterministic worker fixture packets." },
      },
    },
  },

  // -- xpass-aggregated-verdict-tool.ts (conductor receipt with SHA binding) --
  {
    name: "xpass_aggregated_verdict",
    description: "Return one XPass conductor verdict for a target PR/change at a specific commit SHA. Selected PASS receipts must name the same head SHA; stale, unscoped, missing, or blocker receipts cannot produce a green verdict.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target: {
          type: "object",
          additionalProperties: false,
          description: "Target change to inspect. target.sha or target.head_sha is required for anti-stale proof binding.",
          properties: {
            type: { type: "string", description: "Target type, such as pr, branch, commit, url, artifact, or change." },
            kind: { type: "string", description: "Alias for target.type." },
            id: { type: "string", description: "PR number, issue id, branch label, or artifact id." },
            pr_number: { type: "number", description: "PR number when the target is a pull request." },
            prNumber: { type: "number", description: "Alias for pr_number." },
            sha: { type: "string", description: "Current target commit SHA." },
            head_sha: { type: "string", description: "Alias for sha." },
            headSha: { type: "string", description: "Alias for sha." },
            url: { type: "string", description: "Optional target URL." },
            ref: { type: "string", description: "Optional branch, PR, or artifact ref." },
            title: { type: "string", description: "Optional target title used for check selection." },
            description: { type: "string", description: "Optional target summary used for check selection." },
            files: { type: "array", items: { type: "string" }, description: "Changed file paths for check selection." },
            changed_files: { type: "array", items: { type: "string" }, description: "Alias for files." },
          },
        },
        title: { type: "string", description: "Optional PR/change title used for check selection." },
        description: { type: "string", description: "Optional PR/change description used for check selection." },
        context: { type: "string", description: "Optional extra context used for check selection." },
        body: { type: "string", description: "Optional body text used for check selection." },
        summary: { type: "string", description: "Optional summary text used for check selection." },
        tags: { type: "array", items: { type: "string" }, description: "Optional tags used for check selection." },
        changed_files: { type: "array", items: { type: "string" }, description: "Changed file paths for check selection." },
        changedFiles: { type: "array", items: { type: "string" }, description: "Alias for changed_files." },
        files: { type: "array", items: { type: "string" }, description: "Alias for changed_files." },
        owned_files: { type: "array", items: { type: "string" }, description: "Owned file paths for check selection." },
        ownedFiles: { type: "array", items: { type: "string" }, description: "Alias for owned_files." },
        enabled_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional suite restriction. When supplied, XPass only gates the selected checks that are enabled here.",
        },
        selected_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional explicit XPass product checks to require for this verdict.",
        },
        available_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional worker availability list. Selected checks outside this list are NOT RUN and cannot make the verdict green.",
        },
        pass_results: {
          type: "array",
          description: "Underlying Pass receipts or summarized results. Green results must include target_sha/head_sha matching target.sha.",
          items: {
            type: "object",
            additionalProperties: true,
            properties: {
              check: { type: "string" },
              name: { type: "string" },
              status: { type: "string" },
              result: { type: "string" },
              verdict: { type: "string" },
              run_id: { type: "string" },
              receipt_id: { type: "string" },
              url: { type: "string" },
              summary: { type: "string" },
              message: { type: "string" },
              generated_at: { type: "string" },
              target_sha: { type: "string" },
              head_sha: { type: "string" },
            },
          },
        },
        results: {
          type: "object",
          additionalProperties: true,
          description: "Map form of pass_results keyed by check name.",
        },
        require_council: { type: "boolean", description: "Force the Crews Council recommendation on this XPass receipt." },
        force_council: { type: "boolean", description: "Alias for require_council." },
        generated_at: { type: "string", description: "Optional deterministic timestamp for tests or replay." },
        now: { type: "string", description: "Alias for generated_at." },
      },
      required: ["target"],
    },
  },
] as const;

export const convertkitHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // convertkit-tool.ts
  ck_list_subscribers:     (args) => ckListSubscribers(args),
  ck_add_subscriber:       (args) => ckAddSubscriber(args),
  ck_list_forms:           (args) => ckListForms(args),
  ck_list_sequences:       (args) => ckListSequences(args),
  ck_list_tags:            (args) => ckListTags(args),
  ck_tag_subscriber:       (args) => ckTagSubscriber(args),
};
