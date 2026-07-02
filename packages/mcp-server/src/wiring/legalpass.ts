// wiring/legalpass.ts
// Per-app MCP wiring for the legalpass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: LegalPass (issue-spotting guardrails)

import { legalpassEditItem, legalpassRun, legalpassSavePack, legalpassStatus, legalpassVerdict } from "../legalpass-tool.js";

export const legalpassTools = [
  // ── legalpass-tool.ts ──────────────────────────────────────────────────────
  {
    name: "legalpass_run",
    description: "Run a LegalPass issue-spotting pass against a URL, contract upload, or repo. With fixture_text, returns deterministic public evidence; without it, returns the guarded run plan.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["target"] },
        { required: ["target_url"] },
      ],
      properties: {
        pack_id: { type: "string", description: "LegalPass pack slug (default: legalpass-mvp-v0)" },
        target_url: { type: "string", description: "URL target shortcut for TestPass-style callers" },
        target: {
          type: "object",
          additionalProperties: false,
          properties: {
            kind: { type: "string", enum: ["url", "contract_upload", "repo"] },
            url: { type: "string", description: "Target URL for url runs" },
            upload_ref: { type: "string", description: "Upload reference for contract_upload runs" },
            repo: { type: "string", description: "Repository identifier for repo runs" },
            branch: { type: "string", description: "Optional branch name for repo runs" },
            commit: { type: "string", description: "Optional commit SHA for repo runs" },
          },
          required: ["kind"],
        },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile (default: smoke)" },
        jurisdictions: { type: "array", items: { type: "string" }, description: "Optional jurisdiction routing hints" },
        fixture_text: { type: "string", description: "Public text to check deterministically for dogfood or local proof" },
        target_sha: { type: "string", description: "Optional commit or target evidence SHA to bind the LegalPass receipt to a specific target version" },
      },
    },
  },
  {
    name: "legalpass_status",
    description: "Fetch the stored LegalPass run result and audit log for a run started through legalpass_run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The LegalPass run id returned by legalpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "legalpass_save_pack",
    description: "Save or update a LegalPass custom playbook pack. Requires an enabled citation_verifier hat.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["pack"] },
        { required: ["yaml"] },
      ],
      properties: {
        pack_id: { type: "string", description: "Optional pack id override for YAML payloads" },
        pack: { type: "object", description: "LegalPass pack object" },
        yaml: { type: "string", description: "LegalPass pack YAML" },
        overwrite: { type: "boolean", description: "Allow replacing an existing pack id" },
      },
    },
  },
  {
    name: "legalpass_edit_item",
    description: "Apply a human reviewer override to a LegalPass item and return an audit entry with before/after state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The LegalPass run id returned by legalpass_run" },
        item_id: { type: "string", description: "The LegalPass item id to edit" },
        verdict: { type: "string", enum: ["check", "fail", "na", "other", "pending"], description: "Reviewer override verdict" },
        finding: { type: "string", description: "Replacement finding text, linted by PassGuard" },
        on_fail_comment: { type: "string", description: "Replacement fail comment, linted by PassGuard" },
        reviewer_note: { type: "string", description: "Human reviewer note for the audit trail, linted by PassGuard" },
        notes: { type: "string", description: "Alias for reviewer_note, for TestPass-style callers" },
        actor_user_id: { type: "string", description: "Optional actor id for the override audit entry" },
      },
      required: ["run_id", "item_id"],
    },
  },
  {
    name: "legalpass_verdict",
    description: "Lint LegalPass-style verdict text against the issue-spotter guardrail and return the legally reviewed disclaimer banner for Pass-family outputs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        verdict_text: { type: "string", description: "Verdict or finding text to check before display" },
        disclaimer_length: { type: "string", enum: ["chat", "results", "tos"], description: "Disclaimer length to return (default: results)" },
      },
    },
  },

  // ── uxpass-tool.ts (journey/usability QC, sister to TestPass) ──────────────
  {
    name: "uxpass_run",
    description: "Run a UX journey/usability check synchronously against a URL. Executes the deterministic uxpass-core check set and returns the run id, status, UX Score, summary, and uxpass_receipt_v1. UIPass now owns visual/interface polish; this legacy UXPass runner still calls out when screenshots or mobile/desktop proof are missing for visible surfaces. Pass either url (a one-off check) or pack_name (resolves the registered pack's url). The hats parameter is accepted for forward compatibility but is currently ignored; LLM hats land in a later chunk. Response includes was_duplicate: boolean indicating whether the row was already present (idempotent retry).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_name: { type: "string", description: "Name of a registered UXPass pack; the pack's url is used as the target" },
        url: { type: "string", description: "Target URL for a one-off run (takes precedence over pack_name)" },
        hats: {
          type: "array",
          items: { type: "string" },
          description: "Reserved for future use. Currently ignored; the deterministic runner evaluates the full uxpass-core check set on every run.",
        },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key (UUIDv5 from thread_id + prompt_hash + time_bucket recommended). Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
      },
    },
  },
  {
    name: "uxpass_status",
    description: "Fetch the status, UX Score, summary, and uxpass_receipt_v1 for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_html",
    description: "Get the HTML report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_json",
    description: "Get the JSON report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_md",
    description: "Get the Markdown report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_register_pack",
    description: "Register a UXPass pack from a YAML string. Validates the basic shape (required keys: name, url, viewports, themes, hats, synthesiser, budgets, remediation) and persists the pack so uxpass_run can reference it by name. Returns the assigned pack_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_yaml: { type: "string", description: "Full pack definition as a YAML string" },
      },
      required: ["pack_yaml"],
    },
  },

  // ── seopass-tool.ts (search visibility QC, sister to UXPass) ────────────────
  {
    name: "seopass_run",
    description: "Run SEOPass against a public URL or registered pack. Returns a live-readonly SEO verdict, score, findings, fix prompts, and an in-session run id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target URL for a one-off SEOPass read-only run" },
        pack_name: { type: "string", description: "Name of a registered SEOPass pack; the pack URL is used as the target" },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "seopass_status",
    description: "Fetch the stored in-session status and report for a SEOPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The SEOPass run id returned by seopass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "seopass_register_pack",
    description: "Register a SEOPass pack from a YAML string. Validates required keys and stores the pack locally for seopass_run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_yaml: { type: "string", description: "Full SEOPass pack definition as a YAML string" },
      },
      required: ["pack_yaml"],
    },
  },
  {
    name: "seopass_lighthouse_plan",
    description: "Build the heavier Lighthouse execution plan for a SEOPass target URL. seopass_run already emits a lightweight live-readonly verdict.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target URL to audit with Lighthouse" },
        strategy: { type: "string", enum: ["mobile", "desktop"], description: "Lighthouse strategy (default: mobile)" },
        categories: { type: "array", items: { type: "string" }, description: "Lighthouse categories to request" },
      },
      required: ["url"],
    },
  },

  // -- geopass-tool.ts (AI answer-engine readiness QC, sister to SEOPass) ----
  {
    name: "geopass_run",
    description: "Run GEOPass against a public URL. Returns a live-readonly AI answer-engine readiness receipt covering answer extractability, entity clarity, citation/sourceability, freshness cues, content structure, llms.txt, and AI bot visibility. GEOPass reports readiness only and does not guarantee rankings or citations.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target public http(s) URL for a one-off GEOPass read-only run" },
        target_url: { type: "string", description: "Alias for url" },
        checks: {
          type: "array",
          minItems: 1,
          description: "Optional GEOPass check ids. Defaults to the public-safe live checklist.",
          items: {
            type: "string",
            enum: [
              "ai-bot-crawlability",
              "llms-txt",
              "answer-extractability",
              "entity-clarity",
              "citation-readiness",
              "freshness-cues",
              "content-structure",
              "schema-org-citation-grade",
              "brand-mention-readiness",
              "wikidata-presence",
              "common-crawl-presence",
              "aggregate-ai-engine-readiness",
            ],
          },
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
      },
    },
  },
  {
    name: "geopass_status",
    description: "Fetch the stored in-session GEOPass report and geopass_receipt_v1 envelope for a run started through geopass_run.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The GEOPass run id returned by geopass_run" },
      },
      required: ["run_id"],
    },
  },

  // ── flowpass-tool.ts (end-to-end journey QC with fixture proof) ────────────
  {
    name: "flowpass_run",
    description: "Run FlowPass against a public fixture or registered pack. Returns journey readiness, step verdicts, hat outputs, exclusions, and a stored report. Without fixture proof, returns a plan-only receipt instead of pretending a live journey ran.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "Target URL for a one-off FlowPass run" },
        url: { type: "string", description: "Alias for target_url" },
        pack_id: { type: "string", description: "Registered FlowPass pack id" },
        pack_name: { type: "string", description: "Registered FlowPass pack name" },
        pack_yaml: { type: "string", description: "FlowPass YAML pack using plain-English steps" },
        pack: { type: "object", description: "FlowPass pack object" },
        fixture: {
          type: "object",
          description: "Public fixture evidence for route, CTA, form, success, failure, navigation, handoff, side channels, timing, and accessibility.",
        },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile label. Defaults to smoke." },
        journey_id: { type: "string", description: "Optional journey id override" },
        journey_name: { type: "string", description: "Optional journey name override" },
        journey_kind: { type: "string", enum: ["signup", "auth", "checkout", "onboarding", "support", "custom"] },
        generated_at: { type: "string", description: "Optional ISO timestamp for reproducible fixture tests" },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "flowpass_status",
    description: "Fetch the stored FlowPass run status, score, summary, and open disagreement queue entries for a run started in this MCP session.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The FlowPass run id returned by flowpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "flowpass_report",
    description: "Fetch a FlowPass report in json, markdown, html, or fix_prompt format for a run started in this MCP session.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The FlowPass run id returned by flowpass_run" },
        format: { type: "string", enum: ["json", "markdown", "html", "fix_prompt"], description: "Report format. Defaults to json." },
      },
      required: ["run_id"],
    },
  },
  {
    name: "flowpass_register_pack",
    description: "Register a FlowPass pack from YAML or an object. Validates plain-English steps, hats, assertions, and optional fixture evidence.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["pack_yaml"] },
        { required: ["pack"] },
      ],
      properties: {
        pack_yaml: { type: "string", description: "FlowPass YAML pack" },
        pack: { type: "object", description: "FlowPass pack object" },
        overwrite: { type: "boolean", description: "Allow replacing an existing pack id" },
      },
    },
  },
  {
    name: "flowpass_record",
    description: "Convert supplied rrweb or structured session events into a draft FlowPass pack. This safe MCP surface does not start a live browser recording by itself.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "Target URL the recording or session events came from" },
        session_events: { type: "array", items: { type: "string" }, description: "Structured event summaries or pre-captured rrweb-derived step labels" },
      },
      required: ["target_url"],
    },
  },
  {
    name: "flowpass_quarantine",
    description: "List, add, or resolve FlowPass quarantines for flows that should not be trusted as gates.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string", enum: ["list", "add", "resolve"], description: "Defaults to list" },
        flow_id: { type: "string", description: "Flow id for add or resolve" },
        reason: { type: "string", description: "Reason when adding a quarantine" },
      },
    },
  },
  {
    name: "flowpass_disagreement_queue",
    description: "List or resolve FlowPass Driver versus Verifier disagreements.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string", enum: ["list", "resolve"], description: "Defaults to list" },
        run_id: { type: "string", description: "Optional FlowPass run id to filter" },
        disagreement_id: { type: "string", description: "Disagreement id for resolve" },
        reviewer_note: { type: "string", description: "Human note for disagreement resolution" },
      },
    },
  },

  // ── securitypass-tool.ts (scope-gated security receipts) ─────────────────
  {
    name: "securitypass_run",
    description: "Start a scope-gated SecurityPass scan against a registered pack or target URL. Returns a safe securitypass_receipt_v1 proof envelope without raw secrets or PoC payloads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string", description: "Pack id, e.g. 'securitypass-web-baseline'" },
        pack_yaml: { type: "string", description: "Optional pack YAML to validate and run without prior registration" },
        target_id: { type: "string", description: "Target id inside the SecurityPass pack" },
        target_url: { type: "string", description: "Target URL (must be in pack scope)" },
        contract_id: { type: "string", description: "Scope contract id for skeleton URL scans" },
        proof_method: { type: "string", enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"] },
        expected_token: { type: "string", description: "Expected scope proof token" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], default: "smoke" },
      },
    },
  },
  {
    name: "securitypass_status",
    description: "Poll the state of a SecurityPass run. Returns status, verdict summary, counts, and a safe securitypass_receipt_v1 proof envelope.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by securitypass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_report",
    description: "Fetch the synthesised report for a completed run (executive narrative + findings). format=json|markdown|html.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string" },
        format: { type: "string", enum: ["json", "markdown", "html"], default: "json" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_register_pack",
    description: "Save a SecurityPack YAML for the calling tenant. Validates against the schema.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string" },
        yaml: { type: "string", description: "Pack contents as YAML" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "securitypass_verify_scope",
    description: "Verify scope authorisation for a target via DNS TXT or /.well-known proof. Required before any active probe runs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_type: { type: "string", enum: ["url", "git", "mcp", "api"] },
        target_url: { type: "string" },
        target_repo: { type: "string" },
        proof_method: { type: "string", enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"] },
        contract_id: { type: "string", description: "Signed scope contract id" },
        expected_token: { type: "string", description: "Token to look for in DNS TXT or /.well-known" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
      },
      required: ["proof_method"],
    },
  },
  {
    name: "securitypass_disclosure_status",
    description: "Check the 90+30 responsible-disclosure timer state for a finding (notified, acked, extended, public, withdrawn).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
  {
    name: "securitypass_finding_detail",
    description: "Fetch a single finding including PoC payload (curl / prompt / payload) and remediation. PoC is generated, never auto-fired.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },

  // ── sloppass-tool.ts (AI-code quality QC and diff review) ────────────────
  {
    name: "sloppass_run",
    description: "Run SlopPass against caller-provided source files, a unified diff, or a GitHub PR target whose public .diff should be fetched. Returns an evidence-backed slop-signal receipt plus JSON, markdown, and HTML reports. SlopPass does not execute code, clone repositories, persist source content, or make paid model calls by default.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["files"] },
        { required: ["diff"] },
        {
          required: ["target"],
          properties: {
            target: {
              type: "object",
              required: ["kind"],
              properties: { kind: { type: "string", enum: ["pr"] } },
            },
          },
        },
      ],
      properties: {
        target: {
          type: "object",
          additionalProperties: false,
          description: "Target being inspected. For live GitHub PR review, use kind=pr with repo plus number, or url/pr_url.",
          properties: {
            kind: { type: "string", enum: ["repo", "branch", "diff", "files", "pr", "artifact"] },
            label: { type: "string", minLength: 1 },
            files: { type: "array", items: { type: "string", minLength: 1 } },
            ref: { type: "string" },
            repo: { type: "string", pattern: "^[A-Za-z0-9][A-Za-z0-9-]{0,38}/[A-Za-z0-9._-]{1,100}$", description: "GitHub repo in owner/name form for kind=pr." },
            number: {
              oneOf: [
                { type: "integer", minimum: 1 },
                { type: "string", pattern: "^[1-9][0-9]*$" },
              ],
              description: "GitHub pull request number for kind=pr.",
            },
            url: { type: "string", description: "GitHub pull request URL for kind=pr." },
            pr_url: { type: "string", description: "GitHub pull request URL for kind=pr." },
          },
          required: ["kind", "label"],
        },
        files: {
          type: "array",
          minItems: 1,
          description: "Source files to inspect. Use this for scoped local artifacts or paste-backed code review.",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              path: { type: "string", minLength: 1 },
              content: { type: "string" },
              start_line: { type: "number", description: "Optional starting line for a diff hunk or sliced file." },
            },
            required: ["path", "content"],
          },
        },
        diff: { type: "string", description: "Unified diff text to inspect. Added lines are converted into scoped file evidence." },
        checks: {
          type: "array",
          minItems: 1,
          description: "Optional SlopPass check categories to run. Defaults to all built-in categories.",
          items: {
            type: "string",
            enum: [
              "grounding_api_reality",
              "logic_plausibility",
              "scaffold_without_substance",
              "test_proof_theatre",
              "slopocalypse_failure_mode",
              "maintenance_change_risk",
              "vcs_integration_risk",
            ],
          },
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
        provider: {
          type: "string",
          enum: ["http", "openai", "anthropic", "google", "ollama"],
          description: "Provider mode to record in the receipt. Defaults to http and does not call a model.",
        },
      },
      required: ["target"],
    },
  },

  // ── compliancepass-tool.ts (evidence-backed readiness guidance) ───────────
  {
    name: "compliancepass_run",
    description: "Run CompliancePass against a local repo path. Returns evidence-backed readiness guidance, gaps, next actions, and an in-session run id. Historical EnterprisePass references are treated as this same product.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        repo_path: { type: "string", description: "Local repository path to scan. Defaults to the MCP server working directory." },
        target_name: { type: "string", description: "Human-readable target name for the report. Defaults to UnClick." },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "compliancepass_status",
    description: "Fetch the stored in-session status and summary for a CompliancePass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "compliancepass_report_json",
    description: "Fetch the full JSON CompliancePass readiness report for a completed in-session run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "compliancepass_report_md",
    description: "Fetch a Markdown CompliancePass readiness report for a completed in-session run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },

  // ── copypass-tool.ts (copy quality QC with CopyRoom receipt support) ─────
  {
    name: "copypass_run",
    description: "Start a deterministic CopyPass review for caller-provided AI-generated copy. Returns evidence-backed copy findings, scope boundaries, disclaimer text, a structured copypass_receipt_v1 proof envelope, and optional CopyRoom exact-copy receipt.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        copy_text: { type: "string", description: "The AI-generated copy to review. Optional when copyroom_source_packet is provided; exact-copy verification compares this text byte-for-byte against the packet." },
        copyroom_required: {
          type: "boolean",
          description: "Set true when exact fidelity matters. Missing copyroom_source_packet returns COPYROOM_MISSING instead of a run with a null receipt.",
        },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "Exact source packet for CopyRoom fidelity work. Use this instead of retyping source text when code, prompts, labels, tables, documents, or user-provided text must stay exact.",
          properties: {
            source_id: { type: "string", description: "Stable source identifier." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to copy or verify." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        copyroom_output_pointer: { type: "string", description: "Pointer to the intended output artifact for the CopyRoom receipt." },
        channel: { type: "string", description: "Optional surface label such as homepage_hero, pricing_section, or onboarding_email." },
        audience: { type: "string", description: "Optional intended audience for the copy." },
        goal: { type: "string", description: "Optional goal for the copy, such as clarity, conversion, or trust." },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Review depth label for this scoped run. Defaults to smoke." },
      },
      required: [],
    },
  },
  {
    name: "copypass_status",
    description: "Fetch the current status, notes, deterministic findings, disclaimer, copypass_receipt_v1 proof envelope, and CopyRoom receipt for a CopyPass run started in this MCP session.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by copypass_run" },
      },
      required: ["run_id"],
    },
  },

  // -- fidelitycopy-tool.ts (deterministic exact-copy receipts) ---------------
  {
    name: "fidelitycopy_copy",
    description:
      "Create a deterministic FidelityCopy receipt for exact copy work. AI may request the copy, but this tool computes source/output hashes and returns PASS only when the selected mode proves exact or approved fidelity.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        source_text: { type: "string", description: "Exact source text to copy. Mutually exclusive with source_base64." },
        source_base64: { type: "string", description: "Exact source bytes as base64. Mutually exclusive with source_text." },
        source_ref: { type: "string", description: "Source pointer used in the receipt." },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "CopyRoom source packet used as the source of truth. Mutually exclusive with source_text/source_base64.",
          properties: {
            source_id: { type: "string", description: "Stable CopyRoom source id." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to copy." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        destination_label: { type: "string", description: "Human label for the output destination when output_ref is not supplied." },
        output_ref: { type: "string", description: "Output pointer used in the receipt." },
        output_text: { type: "string", description: "Output text for approved_transform mode." },
        output_base64: { type: "string", description: "Output bytes for approved_transform mode as base64." },
        mode: {
          type: "string",
          enum: ["raw_bytes", "text_exact", "json_canonical", "approved_transform"],
          description: "Verification mode. Defaults to raw_bytes.",
        },
        allowed_changes: {
          oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          description: "Required for approved_transform PASS.",
        },
        provenance_ref: { type: "string", description: "Optional Boardroom, issue, PR, or CopyRoom pointer for audit trail." },
      },
      required: [],
    },
  },
  {
    name: "fidelitypass_verify_copy",
    description:
      "Recompute a FidelityCopy/FidelityPass verdict from source and output bytes, or return N/A when no exact 1:1 copy is in scope. Missing bytes, stale metadata, or prose-only AI proof cannot PASS.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        exact_copy_required: {
          type: "boolean",
          description: "Set false only when the target has no exact 1:1 copy, transcription, mirroring, or preservation scope. Returns N/A.",
        },
        copy_scope: {
          type: "string",
          enum: ["exact_copy", "not_applicable"],
          description: "Explicit FidelityPass scope. Use not_applicable to record the XPass N/A row when no exact copy is in scope.",
        },
        scope_reason: {
          type: "string",
          description: "Reason why FidelityPass is N/A for this target. Used only when exact_copy_required=false or copy_scope=not_applicable.",
        },
        source_text: { type: "string", description: "Exact source text to verify. Mutually exclusive with source_base64." },
        source_base64: { type: "string", description: "Exact source bytes as base64. Mutually exclusive with source_text." },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "CopyRoom source packet used as the source of truth. Mutually exclusive with source_text/source_base64.",
          properties: {
            source_id: { type: "string", description: "Stable CopyRoom source id." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to verify." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        output_text: { type: "string", description: "Exact output text to verify. Mutually exclusive with output_base64." },
        output_base64: { type: "string", description: "Exact output bytes as base64. Mutually exclusive with output_text." },
        source_ref: { type: "string", description: "Source pointer used in the recomputed receipt." },
        output_ref: { type: "string", description: "Output pointer used in the recomputed receipt." },
        mode: {
          type: "string",
          enum: ["raw_bytes", "text_exact", "json_canonical", "approved_transform"],
          description: "Verification mode. Defaults to raw_bytes or the provided receipt mode.",
        },
        receipt: { type: "object", description: "Optional previous FidelityCopy receipt to compare against recomputed hashes." },
        receipt_payload: { type: "object", description: "Alias for receipt." },
        proof_text: { type: "string", description: "Optional prose proof. Prose alone is suppressed, not accepted as PASS." },
        allowed_changes: {
          oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          description: "Required for approved_transform PASS.",
        },
        provenance_ref: { type: "string", description: "Optional Boardroom, issue, PR, or CopyRoom pointer for audit trail." },
      },
      required: [],
    },
  },

  // ── crews-tool.ts (Orchestrator Wizard) ──────────────────────────────────────
  {
    name: "start_crew_run",
    description: "Call this tool when the user wants to start a Crews Council run. In a sampling-capable MCP client, it prepares the run, asks advisors for opinions, runs peer review, persists the Chairman synthesis, and returns a ConversationalCard. If sampling is unavailable, the card reports SAMPLING_NOT_SUPPORTED. Response card surfaces was_duplicate when an existing run is returned for an already-seen task_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        crew_id: { type: "string", description: "The UUID of the Crew to run" },
        task_prompt: { type: "string", description: "The task the Council should deliberate on" },
        token_budget: { type: "number", description: "Optional token budget (default 150000)" },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key (UUIDv5 from thread_id + prompt_hash + time_bucket recommended). Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
      },
      required: ["crew_id", "task_prompt"],
    },
  },
  {
    name: "get_run",
    description: "Call this tool when the user wants the status of a specific Crews run. Returns a ConversationalCard summarising stage progress, token usage, and any failure artifact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run_id returned by start_crew_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "list_runs",
    description: "Call this tool when the user wants a recent history of Crews runs. Returns a ConversationalCard with a run count and the newest few run ids.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        crew_id: { type: "string", description: "Optional: filter to one crew" },
        limit: { type: "number", description: "Optional: max rows to return (default 50, capped at 100)" },
      },
    },
  },

] as const;

export const legalpassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // legalpass-tool.ts
  legalpass_run:       (args) => legalpassRun(args),
  legalpass_status:    (args) => legalpassStatus(args),
  legalpass_save_pack: (args) => legalpassSavePack(args),
  legalpass_edit_item: (args) => legalpassEditItem(args),
  legalpass_verdict:   (args) => legalpassVerdict(args),
};
