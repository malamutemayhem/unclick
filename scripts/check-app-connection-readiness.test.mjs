import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  evaluateConnectionReadinessSources,
  loadConnectionReadinessSources,
} from "./check-app-connection-readiness.mjs";

function cloneSources(sources) {
  return structuredClone(sources);
}

function actionText(receipt) {
  return receipt.action_needed.join("\n");
}

describe("app connection readiness", () => {
  it("passes the current login-first connector contract", async () => {
    const sources = await loadConnectionReadinessSources(process.cwd());
    const receipt = evaluateConnectionReadinessSources(sources, {
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "pass");
    assert.deepEqual(receipt.platforms, ["github", "vercel", "supabase"]);
    assert.deepEqual(receipt.action_needed, []);
    assert.ok(receipt.global_checks.some((check) => check.name === "tool_keychain_status_merges_all_connection_sources" && check.status === "pass"));
  });

  it("blocks when an app is missing from the Apps catalog", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.appCatalogData.apps = sources.appCatalogData.apps.filter((app) => app.slug !== "supabase");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["supabase"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /supabase: apps_catalog_visible/);
  });

  it("blocks when setup-pending OAuth errors hide the token fallback path", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.connectPage = sources.connectPage
      .replaceAll("setup_pending", "setup_not_ready")
      .replaceAll("setSetupPending", "setSetupMessage")
      .replaceAll("Token entry is only a fallback", "Manual entry is available.");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["vercel"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /setup_pending_keeps_fallback_visible/);
  });

  it("blocks when MCP keychain status cannot see /connect stored credentials", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.keychainTool = sources.keychainTool
      .replaceAll("user_credentials", "legacy_user_credentials")
      .replaceAll("managed_app_connections", "legacy_managed_app_connections")
      .replaceAll("connected_source", "connection_source");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["vercel"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /tool_keychain_status_merges_all_connection_sources/);
  });

  it("blocks when OAuth start and callback disagree on env names", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.oauthInit = sources.oauthInit.replace(
      'vercel:            "VERCEL_CLIENT_ID"',
      'vercel:            "VERCEL_OAUTH_CLIENT_ID"'
    );

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["vercel"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /oauth_env_names_match_start_and_callback/);
  });

  it("blocks when OAuth start does not check the provider client secret", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.oauthInit = sources.oauthInit.replace(
      'supabase:          "SUPABASE_OAUTH_CLIENT_SECRET",',
      ""
    );

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["supabase"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /oauth_init_supported/);
    assert.match(actionText(receipt), /oauth_env_names_match_start_and_callback/);
  });
});
