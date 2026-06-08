import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const docPaths = [
  "AGENTS.md",
  "AUTOPILOT.md",
  "CLAUDE.md",
  "README.md",
  ".github/OPERATIONS.md",
  ".github/architecture-qc-checklist.md",
  "docs/adding-a-connector.md",
  "packages/mcp-server/README.md",
  "packages/mcp-server/public/icon.svg",
  "packages/memory-mcp/CLAUDE.md",
  "packages/testpass/packs/anti-stomp-v0.yaml",
  "packages/testpass/packs/testpass-core.yaml",
  "packages/testpass/packs/testpass-fishbowl-v0.yaml",
  "public/vibe-coding/CHECKLIST.md",
  "public/vibe-coding/CLAUDE.md",
  "public/vibe-coding/PLANNING.md",
  "public/vibe-coding/REVIEW-RUBRIC.md",
  "public/vibe-coding/STRATEGY.md",
  "public/enterprise/latest.json",
  "supabase/migrations/20260420030000_user_credentials.sql",
  "supabase/migrations/20260420040000_user_credentials_label.sql",
  "supabase/migrations/20260420050000_agent_trace.sql",
  "supabase/migrations/20260420100000_backstagepass_audit.sql",
  "supabase/migrations/20260420110000_user_credentials_status.sql",
];

test("core docs and TestPass packs do not contain em dashes", () => {
  const offenders = [];

  for (const relativePath of docPaths) {
    const absolutePath = path.join(repoRoot, relativePath);
    const content = fs.readFileSync(absolutePath, "utf8");
    if (content.includes("—")) {
      offenders.push(relativePath);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `Found em dashes in: ${offenders.join(", ")}`
  );
});
