import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  addLiveConnectionReadinessChecks,
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
    assert.deepEqual(receipt.platforms, ["github", "vercel", "supabase", "higgsfield", "gmail", "google-drive", "dropbox", "onedrive"]);
    assert.deepEqual(receipt.action_needed, []);
    assert.ok(receipt.global_checks.some((check) => check.name === "tool_keychain_status_merges_all_connection_sources" && check.status === "pass"));
    assert.ok(receipt.global_checks.some((check) => check.name === "admin_apps_separates_saved_visibility_from_live_proof" && check.status === "pass"));
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

  it("blocks when a default connector is missing from the Popular lens", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.appLenses = sources.appLenses.replace('"dropbox", ', "");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["dropbox"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /dropbox: popular_lens_visible/);
  });

  it("blocks when a server-owned OAuth app is missing from the Connect page allowlist", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.connectPage = sources.connectPage.replace(/\s+"dropbox",\r?\n/, "\n");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["dropbox"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /dropbox: connect_page_server_oauth_button/);
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

  it("blocks when Admin Apps treats saved connections as proof-only green connections", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.appLenses = sources.appLenses
      .replace('case "connected": return hasSavedConnection(connector);', 'case "connected": return isConnected(connector);')
      .replace('case "not-connected": return Boolean(connector) && !hasSavedConnection(connector);', 'case "not-connected": return Boolean(connector) && !isConnected(connector);')
      .replace('if (hasSavedConnection(connector)) return "Manage";', 'if (isConnected(connector)) return "Manage";');

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["vercel"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /admin_apps_separates_saved_visibility_from_live_proof/);
  });

  it("blocks when the popup watcher waits for proof-only connected state", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.adminTools = sources.adminTools.replaceAll("hasSavedConnection(connector)", "isConnected(connector)");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["vercel"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /admin_apps_separates_saved_visibility_from_live_proof/);
  });

  it("blocks when Admin Apps sends login apps through the extra modal hop", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.adminTools = sources.adminTools.replace(
      "openConnectionPopup(`/connect/${app.slug}`, app.slug);",
      "setConnectTarget(app);"
    );

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["supabase"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /admin_apps_open_login_apps_directly/);
  });

  it("blocks when Admin Apps loses the code-registry fallback for sign-in apps", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.adminTools = sources.adminTools
      .replace("function buildAdminConnectorMap", "function buildMissingConnectorMap")
      .replace("CONNECTORS[app.slug]", "undefined");

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["gmail"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /admin_apps_registry_fallback_keeps_login_apps_connectable/);
  });

  it("blocks when saved credentials regress to scary check-needed wording", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.adminTools = sources.adminTools
      .replace('label: "Login saved"', 'label: "Needs check"')
      .replace('label: "Key saved"', 'label: "Needs check"');

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["github"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /admin_apps_saved_status_uses_customer_language/);
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

  it("blocks when login-first tool schemas require pasted tokens", async () => {
    const sources = cloneSources(await loadConnectionReadinessSources(process.cwd()));
    sources.toolWiring = sources.toolWiring.replace(
      /(\{ name: "dropbox_search"[\s\S]*?required: \[)"query"(\][\s\S]*?\}\s*\},\s*\{ name: "dropbox_get_account")/,
      '$1"access_token", "query"$2'
    );

    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["dropbox"],
      now: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /tool_schema_allows_connected_credentials/);
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

  it("blocks when production OAuth init is still setup-pending", async () => {
    const sources = await loadConnectionReadinessSources(process.cwd());
    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["supabase"],
      now: "2026-06-18T00:00:00.000Z",
    });

    await addLiveConnectionReadinessChecks(receipt, {
      liveUrl: "https://unclick.world",
      fetchImpl: async () => new Response(JSON.stringify({
        setup_pending: true,
        missing_fields: ["client_id", "client_secret"],
      }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /supabase: live_oauth_init_ready/);
    assert.match(actionText(receipt), /client_id,client_secret/);
  });

  it("reports the production OAuth error when the deployed endpoint rejects a platform", async () => {
    const sources = await loadConnectionReadinessSources(process.cwd());
    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["gmail"],
      now: "2026-06-18T00:00:00.000Z",
    });

    await addLiveConnectionReadinessChecks(receipt, {
      liveUrl: "https://unclick.world",
      fetchImpl: async () => new Response(JSON.stringify({
        error: "Unsupported OAuth platform.",
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    });

    assert.equal(receipt.status, "blocker");
    assert.match(actionText(receipt), /gmail: live_oauth_init_ready/);
    assert.match(actionText(receipt), /Unsupported OAuth platform/);
  });

  it("passes the live OAuth init check when production returns a provider-ready payload", async () => {
    const sources = await loadConnectionReadinessSources(process.cwd());
    const receipt = evaluateConnectionReadinessSources(sources, {
      platforms: ["supabase"],
      now: "2026-06-18T00:00:00.000Z",
    });

    await addLiveConnectionReadinessChecks(receipt, {
      liveUrl: "https://unclick.world",
      fetchImpl: async () => new Response(JSON.stringify({
        success: true,
        client_id: "client-id",
        redirect_uri: "https://unclick.world/api/oauth-callback",
        state: "state",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    });

    assert.equal(receipt.status, "pass");
    assert.equal(actionText(receipt), "");
  });
});
