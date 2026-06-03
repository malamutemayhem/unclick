// XGate Part 3: DataGate (SQL destructive-action gating).
//
// Pre-execution guardrail for SQL. It PARSES the statement (it never relies on
// a regex blocklist of "bad strings", which research showed is trivially
// bypassed via comments, string literals, stacked statements, and subqueries)
// and decides whether the action may run BEFORE it reaches the database.
//
// Detection model:
//   1. A dependency-free tokenizer strips line/block comments, masks string
//      literals, double-quoted identifiers, and dollar-quoted bodies, tracks
//      parenthesis depth, and splits on top-level semicolons. This means a
//      `;`, `WHERE`, or `DROP` hidden inside a string or a subquery cannot
//      change the verdict.
//   2. Each statement is classified by its leading command (CTE and
//      `EXPLAIN ANALYZE` wrappers are unwrapped, because both can execute the
//      inner statement).
//   3. Verdicts combine fail-closed: anything unparseable or unknown becomes
//      "ask"; destructive shapes become "deny" (or "ask" in dev for DDL).
//
// Pure, deterministic, never throws. On any doubt it returns "ask".
import type {
  Environment,
  Gate,
  GateContext,
  GateResult,
  GateVerdict,
} from "../types.js";

// Internal precedence used only to pick the deciding statement WITHIN this
// gate. The cross-gate combination lives in Part 1's policy-engine; we do not
// import its VERDICT_PRECEDENCE so this gate stays a pure type-only consumer
// of the contract and remains testable in isolation.
const LOCAL_PRECEDENCE: Record<GateVerdict, number> = {
  deny: 3,
  ask: 2,
  rewrite: 1,
  allow: 0,
};

type RiskClass =
  | "drop"
  | "truncate"
  | "alter_drop"
  | "ddl_other"
  | "unscoped_dml"
  | "scoped_dml"
  | "read"
  | "benign"
  | "privilege"
  | "review"
  | "unknown";

const DESTRUCTIVE: ReadonlySet<RiskClass> = new Set<RiskClass>([
  "drop",
  "truncate",
  "alter_drop",
  "unscoped_dml",
]);

interface Token {
  word: string;
  depth: number;
}

interface ParsedStatement {
  tokens: Token[];
  masked: string;
}

interface ParseResult {
  ok: boolean;
  statements: ParsedStatement[];
}

interface Classification {
  cls: RiskClass;
  ruleId: string;
  masked: string;
}

const ENV_RANK: Record<Environment, number> = { dev: 0, staging: 1, prod: 2 };

function isWordChar(c: string): boolean {
  return (
    (c >= "a" && c <= "z") ||
    (c >= "A" && c <= "Z") ||
    (c >= "0" && c <= "9") ||
    c === "_"
  );
}

// Single-pass, dependency-free SQL scanner. Produces one ParsedStatement per
// top-level statement, with word tokens tagged by parenthesis depth and a
// literal-masked snippet for evidence. ok=false when a literal/comment is
// unterminated or parentheses are unbalanced, which the gate treats as
// unparseable and fails closed.
function parseSql(sql: string): ParseResult {
  const statements: ParsedStatement[] = [];
  let tokens: Token[] = [];
  let masked = "";
  let depth = 0;
  let word = "";
  let wordDepth = 0;
  let ok = true;
  const n = sql.length;
  let i = 0;

  const flushWord = (): void => {
    if (word.length > 0) {
      tokens.push({ word: word.toUpperCase(), depth: wordDepth });
      word = "";
    }
  };

  const pushStatement = (): void => {
    flushWord();
    const cleaned = masked.replace(/\s+/g, " ").trim();
    // A statement counts only if it carries at least one word token. This
    // skips empty fragments from trailing or stacked separators (e.g.
    // "DROP TABLE t; ; ;") so they cannot create phantom statements.
    if (tokens.length > 0) {
      statements.push({ tokens, masked: cleaned });
    }
    tokens = [];
    masked = "";
  };

  while (i < n) {
    const c = sql[i];
    const next = i + 1 < n ? sql[i + 1] : "";

    // Line comment: -- ... end of line. A comment separates tokens, so the
    // pending word is flushed first (DROP--x\nTABLE is two tokens).
    if (c === "-" && next === "-") {
      flushWord();
      i += 2;
      while (i < n && sql[i] !== "\n") i++;
      masked += " ";
      continue;
    }

    // Block comment: /* ... */ with Postgres-style nesting. A comment
    // separates tokens, so DROP/*x*/TABLE parses as two tokens.
    if (c === "/" && next === "*") {
      flushWord();
      i += 2;
      let nest = 1;
      while (i < n && nest > 0) {
        if (sql[i] === "/" && sql[i + 1] === "*") {
          nest += 1;
          i += 2;
          continue;
        }
        if (sql[i] === "*" && sql[i + 1] === "/") {
          nest -= 1;
          i += 2;
          continue;
        }
        i += 1;
      }
      if (nest > 0) ok = false;
      masked += " ";
      continue;
    }

    // Single-quoted string literal, with '' as an embedded quote.
    if (c === "'") {
      flushWord();
      i += 1;
      let closed = false;
      while (i < n) {
        if (sql[i] === "'") {
          if (sql[i + 1] === "'") {
            i += 2;
            continue;
          }
          i += 1;
          closed = true;
          break;
        }
        i += 1;
      }
      if (!closed) ok = false;
      masked += "'?'";
      continue;
    }

    // Double-quoted identifier, with "" as an embedded quote.
    if (c === '"') {
      flushWord();
      i += 1;
      let closed = false;
      while (i < n) {
        if (sql[i] === '"') {
          if (sql[i + 1] === '"') {
            i += 2;
            continue;
          }
          i += 1;
          closed = true;
          break;
        }
        i += 1;
      }
      if (!closed) ok = false;
      masked += '"?"';
      continue;
    }

    // Dollar-quoted body: $tag$ ... $tag$ (tag may be empty: $$ ... $$).
    if (c === "$") {
      let j = i + 1;
      while (j < n && isWordChar(sql[j])) j++;
      if (j < n && sql[j] === "$") {
        const tag = sql.slice(i, j + 1);
        flushWord();
        i = j + 1;
        const end = sql.indexOf(tag, i);
        if (end === -1) {
          ok = false;
          i = n;
        } else {
          i = end + tag.length;
        }
        masked += "$?$";
        continue;
      }
      // Not a dollar-quote opener (e.g. a $1 placeholder); treat as punctuation.
      flushWord();
      masked += c;
      i += 1;
      continue;
    }

    if (isWordChar(c)) {
      if (word.length === 0) wordDepth = depth;
      word += c;
      masked += c;
      i += 1;
      continue;
    }

    // Any non-word character ends the current word.
    flushWord();

    if (c === "(") {
      depth += 1;
      masked += "(";
      i += 1;
      continue;
    }
    if (c === ")") {
      depth -= 1;
      masked += ")";
      i += 1;
      continue;
    }
    if (c === ";") {
      masked += ";";
      if (depth === 0) {
        pushStatement();
      }
      i += 1;
      continue;
    }

    masked += c;
    i += 1;
  }

  pushStatement();

  // Unbalanced parentheses mean we could not understand the structure.
  if (depth !== 0) ok = false;

  return { ok, statements };
}

const VERB_SET = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "TRUNCATE", "ALTER", "CREATE"];
const DML_VERBS = ["SELECT", "INSERT", "UPDATE", "DELETE"];

function hasTopLevelWord(tokens: Token[], target: string): boolean {
  return tokens.some((t) => t.depth === 0 && t.word === target);
}

function classifyStatement(stmt: ParsedStatement): Classification {
  const masked = stmt.masked;
  const top = stmt.tokens.filter((t) => t.depth === 0).map((t) => t.word);
  if (top.length === 0) {
    return { cls: "unknown", ruleId: "sql.unknown_command", masked };
  }

  let cmd = top[0];

  // EXPLAIN is read-only on its own, but EXPLAIN ANALYZE executes the inner
  // statement, so unwrap to the inner verb when ANALYZE is present.
  if (cmd === "EXPLAIN") {
    const analyzes = stmt.tokens.some((t) => t.word === "ANALYZE");
    if (!analyzes) {
      return { cls: "read", ruleId: "sql.read", masked };
    }
    const inner = top.find((w) => VERB_SET.includes(w));
    if (!inner) {
      return { cls: "read", ruleId: "sql.read", masked };
    }
    cmd = inner;
  }

  // A CTE (WITH ...) hides the real command after the parenthesised bodies.
  // The CTE bodies are at depth > 0, so the top-level verb is the real one.
  if (cmd === "WITH") {
    const inner = top.find((w) => DML_VERBS.includes(w));
    if (!inner) {
      return { cls: "unknown", ruleId: "sql.unknown_command", masked };
    }
    cmd = inner;
  }

  switch (cmd) {
    case "DROP":
      return { cls: "drop", ruleId: "sql.ddl_drop", masked };
    case "TRUNCATE":
      return { cls: "truncate", ruleId: "sql.ddl_truncate", masked };
    case "ALTER":
      return hasTopLevelWord(stmt.tokens, "DROP")
        ? { cls: "alter_drop", ruleId: "sql.ddl_alter_drop", masked }
        : { cls: "ddl_other", ruleId: "sql.ddl_other", masked };
    case "CREATE":
    case "COMMENT":
      return { cls: "ddl_other", ruleId: "sql.ddl_other", masked };
    case "DELETE":
    case "UPDATE":
      return hasTopLevelWord(stmt.tokens, "WHERE")
        ? { cls: "scoped_dml", ruleId: "sql.scoped_dml", masked }
        : { cls: "unscoped_dml", ruleId: "sql.unscoped_dml", masked };
    case "INSERT":
      return { cls: "scoped_dml", ruleId: "sql.insert", masked };
    case "SELECT":
    case "TABLE":
    case "VALUES":
    case "SHOW":
      return { cls: "read", ruleId: "sql.read", masked };
    case "BEGIN":
    case "START":
    case "COMMIT":
    case "END":
    case "ROLLBACK":
    case "SAVEPOINT":
    case "RELEASE":
    case "SET":
    case "RESET":
    case "DISCARD":
    case "VACUUM":
    case "ANALYZE":
    case "REINDEX":
    case "CLUSTER":
    case "REFRESH":
    case "CHECKPOINT":
    case "LISTEN":
    case "UNLISTEN":
    case "NOTIFY":
      return { cls: "benign", ruleId: "sql.benign", masked };
    case "GRANT":
    case "REVOKE":
      return { cls: "privilege", ruleId: "sql.privilege", masked };
    case "CALL":
    case "DO":
    case "COPY":
    case "EXECUTE":
    case "PREPARE":
      // COPY ... TO PROGRAM and DO/CALL can run procedural or shell code, so
      // they are never auto-allowed.
      return { cls: "review", ruleId: "sql.review", masked };
    default:
      return { cls: "unknown", ruleId: "sql.unknown_command", masked };
  }
}

// Effective environment is the STRICTER of the session environment and any
// environment the action names, so an agent in a dev session that targets prod
// is judged as prod.
function resolveEnv(ctx: GateContext): Environment {
  const sessionEnv = ctx.environment;
  const targetEnv = ctx.action.targetEnv;
  if (!targetEnv) return sessionEnv;
  return ENV_RANK[targetEnv] >= ENV_RANK[sessionEnv] ? targetEnv : sessionEnv;
}

function verdictFor(cls: RiskClass, env: Environment): GateVerdict {
  switch (cls) {
    case "drop":
    case "truncate":
    case "alter_drop":
      // DDL drops: permissive in dev (ask), strict elsewhere (deny).
      return env === "dev" ? "ask" : "deny";
    case "unscoped_dml":
      // A DELETE/UPDATE that touches every row is denied everywhere.
      return "deny";
    case "ddl_other":
      // Additive schema change: frictionless in dev, flagged in shared envs.
      return env === "dev" ? "allow" : "ask";
    case "privilege":
    case "review":
    case "unknown":
      return "ask";
    case "scoped_dml":
    case "read":
    case "benign":
    default:
      return "allow";
  }
}

function reasonFor(cls: RiskClass, verdict: GateVerdict, env: Environment): string {
  switch (cls) {
    case "drop":
      return verdict === "deny"
        ? `DROP is destructive DDL and is denied in ${env}.`
        : `DROP is destructive DDL; asking for confirmation in ${env}.`;
    case "truncate":
      return verdict === "deny"
        ? `TRUNCATE removes all rows and is denied in ${env}.`
        : `TRUNCATE removes all rows; asking for confirmation in ${env}.`;
    case "alter_drop":
      return verdict === "deny"
        ? `ALTER ... DROP removes schema objects and is denied in ${env}.`
        : `ALTER ... DROP removes schema objects; asking for confirmation in ${env}.`;
    case "unscoped_dml":
      return "DELETE/UPDATE without a top-level WHERE clause would affect every row; denied.";
    case "ddl_other":
      return verdict === "ask"
        ? `Schema change in ${env}; asking for confirmation.`
        : "Additive schema change in dev; allowed.";
    case "privilege":
      return "GRANT/REVOKE changes privileges; asking for confirmation.";
    case "review":
      return "Statement can run procedural or external code (CALL/DO/COPY); asking for confirmation.";
    case "unknown":
      return "Statement command was not recognised; failing closed to ask.";
    case "scoped_dml":
      return "Scoped DML (WHERE-bounded or additive); allowed.";
    case "read":
      return "Read-only statement; allowed.";
    case "benign":
    default:
      return "Non-destructive statement; allowed.";
  }
}

// Best-effort redaction for evidence strings. The decision is parse-based;
// this only keeps secrets out of the stored evidence (the gate already masks
// string/dollar bodies, so this is a defence-in-depth backstop for raw
// snippets in the unparseable path).
function redact(text: string): string {
  let out = text;
  out = out.replace(/AKIA[0-9A-Z]{12,}/g, "[REDACTED]");
  out = out.replace(/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}/g, "[REDACTED]");
  out = out.replace(/\bxox[abposr]-[A-Za-z0-9-]{8,}/g, "[REDACTED]");
  out = out.replace(/\bsk-[A-Za-z0-9_-]{16,}/g, "[REDACTED]");
  out = out.replace(/\b[A-Fa-f0-9]{32,}\b/g, "[REDACTED]");
  if (out.length > 200) out = out.slice(0, 197) + "...";
  return out;
}

function makeResult(
  verdict: GateVerdict,
  ruleId: string,
  reason: string,
  evidence: string[],
): GateResult {
  return {
    gate: "DataGate",
    verdict,
    ruleId,
    reason,
    evidence: evidence.map(redact),
  };
}

export const dataGate: Gate = (ctx: GateContext): GateResult => {
  try {
    const action = ctx?.action;
    if (!action || action.class !== "sql") {
      return makeResult(
        "allow",
        "sql.not_applicable",
        "Action is not a SQL action; DataGate abstains.",
        [],
      );
    }

    const raw = typeof action.raw === "string" ? action.raw : "";
    if (raw.trim().length === 0) {
      return makeResult(
        "ask",
        "sql.unparseable",
        "Empty or missing SQL; cannot verify safety, failing closed.",
        [],
      );
    }

    const env = resolveEnv(ctx);
    const parsed = parseSql(raw);

    if (!parsed.ok || parsed.statements.length === 0) {
      return makeResult(
        "ask",
        "sql.unparseable",
        "SQL could not be parsed cleanly (unterminated literal/comment or unbalanced parentheses); failing closed.",
        [`sql: ${raw}`],
      );
    }

    const classified: Classification[] = parsed.statements.map(classifyStatement);
    const destructive = classified.filter((c) => DESTRUCTIVE.has(c.cls));

    // Stacked statements where any one is destructive are the documented
    // Postgres-MCP bypass: a benign-looking prefix carries a destructive
    // payload. Denied in every environment.
    if (classified.length > 1 && destructive.length > 0) {
      return makeResult(
        "deny",
        "sql.multi_statement",
        `Multi-statement SQL (${classified.length} statements) contains a destructive statement; stacked queries are a known guard bypass and are denied.`,
        [
          `statements: ${classified.length}`,
          ...destructive.map((d) => `destructive: ${d.masked}`),
        ],
      );
    }

    let best: { verdict: GateVerdict; ruleId: string; cls: RiskClass; masked: string } | null = null;
    for (const c of classified) {
      const verdict = verdictFor(c.cls, env);
      if (best === null || LOCAL_PRECEDENCE[verdict] > LOCAL_PRECEDENCE[best.verdict]) {
        best = { verdict, ruleId: c.ruleId, cls: c.cls, masked: c.masked };
      }
    }

    // best is always set: statements.length > 0 is guaranteed above.
    const decided = best as { verdict: GateVerdict; ruleId: string; cls: RiskClass; masked: string };
    return makeResult(
      decided.verdict,
      decided.ruleId,
      reasonFor(decided.cls, decided.verdict, env),
      [`env: ${env}`, `stmt: ${decided.masked}`],
    );
  } catch {
    // Gates must never throw. Any unexpected internal state fails closed.
    return makeResult(
      "ask",
      "sql.error",
      "DataGate hit an unexpected internal state; failing closed to ask.",
      [],
    );
  }
};
