/**
 * Safety guard for the Supabase migration-runner.
 *
 * Goal (dogfood): let UnClick apply a migration to a connected Supabase project
 * via the caller's UnClick key - the same server-side-token pattern as
 * api/git-proxy.ts, so the agent can run "deploy the migration" without a human
 * pasting SQL into a dashboard. This module is the PURE, deny-by-default gate
 * that runs BEFORE any SQL is sent to the Supabase Management API. It performs
 * no I/O and holds no secrets, so it is trivially testable and safe to compose.
 *
 * v0 policy: refuse statements that can destroy data or schema (DROP, TRUNCATE,
 * DELETE) unless the caller explicitly opts in with allowDestructive. Ordinary
 * forward migrations (CREATE, ALTER ... ADD, UPDATE/INSERT, COMMENT, CREATE
 * INDEX) pass. Comments and quoted / dollar-quoted regions are stripped first,
 * so a keyword sitting inside a string literal or a function body never trips
 * the gate (and, conversely, if stripping ever fails the keyword survives and
 * we err toward refusing - safe by default).
 *
 * This is a coarse safety net, NOT a SQL parser. The runner that calls this
 * must ALSO apply through the Supabase migration pipeline / a transaction and
 * record migration history. See docs/prd/supabase-migration-runner.md.
 */

// Order matters: strip dollar-quoted bodies first (they may legally contain
// `--`, `/* */`, or `'` that are NOT comments/strings), then comments, then
// single-quoted strings.
const DOLLAR_QUOTED = /\$([A-Za-z_]\w*)?\$[\s\S]*?\$\1\$/g;
const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g;
const LINE_COMMENT = /--[^\n]*/g;
const SINGLE_QUOTED = /'(?:[^']|'')*'/g;

/** Remove comments and string/dollar-quoted literals so only executable code remains. */
export function stripNonCode(sql: string): string {
  return (sql ?? "")
    .replace(DOLLAR_QUOTED, " ")
    .replace(BLOCK_COMMENT, " ")
    .replace(LINE_COMMENT, " ")
    .replace(SINGLE_QUOTED, " ");
}

/** Statements that can destroy data or schema. Whole-word, case-insensitive. */
const DESTRUCTIVE: { name: string; re: RegExp }[] = [
  { name: "DROP", re: /\bDROP\b/i },
  { name: "TRUNCATE", re: /\bTRUNCATE\b/i },
  { name: "DELETE", re: /\bDELETE\b/i },
];

/** Any write/DDL keyword - used to decide whether SQL is read-only. */
const WRITE_OR_DDL =
  /\b(INSERT|UPDATE|DELETE|MERGE|CREATE|ALTER|DROP|TRUNCATE|GRANT|REVOKE|COMMENT|REINDEX|REFRESH|CALL|DO|VACUUM|ANALYZE|COPY|SET)\b/i;

export type MigrationRisk = "empty" | "additive" | "destructive";

export interface MigrationGuardOptions {
  /** Permit DROP/TRUNCATE/DELETE. Off by default; the caller must opt in. */
  allowDestructive?: boolean;
}

export interface MigrationGuardResult {
  /** True when the SQL is allowed to run under the given options. */
  ok: boolean;
  risk: MigrationRisk;
  /** Destructive keywords found in executable code (de-duped, upper-case). */
  matched: string[];
  /** Human-readable reason when ok is false. */
  reason?: string;
}

/**
 * Decide whether a migration's SQL may run. Deny-by-default for destructive
 * statements; empty input is refused; everything else (additive migrations)
 * passes. Never throws.
 */
export function guardMigrationSql(
  sql: string,
  opts: MigrationGuardOptions = {},
): MigrationGuardResult {
  const trimmed = (sql ?? "").trim();
  if (trimmed === "") {
    return { ok: false, risk: "empty", matched: [], reason: "Empty SQL: nothing to run." };
  }

  const code = stripNonCode(trimmed);
  const matched = DESTRUCTIVE.filter((d) => d.re.test(code)).map((d) => d.name);

  if (matched.length > 0 && !opts.allowDestructive) {
    return {
      ok: false,
      risk: "destructive",
      matched,
      reason:
        `Refusing destructive SQL (${matched.join(", ")}) without allowDestructive. ` +
        `These can drop tables/columns or delete rows. Re-run with allowDestructive: true ` +
        `only after an explicit, reviewed decision.`,
    };
  }

  return { ok: true, risk: matched.length > 0 ? "destructive" : "additive", matched };
}

/**
 * Best-effort: true when the SQL only reads (no write or DDL keyword in
 * executable code). Useful for a dry-run / verify path that may run without the
 * destructive gate. Conservative: unknown or empty input returns false.
 */
export function isReadOnlySql(sql: string): boolean {
  const code = stripNonCode((sql ?? "").trim());
  if (code.trim() === "") return false;
  return !WRITE_OR_DDL.test(code);
}
