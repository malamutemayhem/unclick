#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_LOGIN_FIRST_PLATFORMS = [
  "github",
  "vercel",
  "supabase",
  "higgsfield",
  "gmail",
  "google-drive",
  "dropbox",
  "onedrive",
];
const DYNAMIC_OAUTH_PLATFORMS = new Set(["higgsfield"]);
const POPULAR_LOGIN_FIRST_PLATFORMS = [
  "github",
  "vercel",
  "supabase",
  "gmail",
  "google-drive",
  "dropbox",
  "onedrive",
];

const SOURCE_PATHS = {
  connectors: "src/lib/connectors.ts",
  appCatalog: "src/data/app-catalog.generated.json",
  appLenses: "src/components/apps/appLenses.ts",
  connectorSetup: "packages/mcp-server/src/connector-setup.ts",
  connectorSetupGenerated: "src/data/connector-setup.generated.json",
  oauthInit: "api/oauth-init.ts",
  oauthCallback: "api/oauth-callback.ts",
  oauthState: "api/oauth-state.ts",
  credentialsApi: "api/credentials.ts",
  connectPage: "src/pages/Connect.tsx",
  connectAppModal: "src/components/apps/ConnectAppModal.tsx",
  adminTools: "src/pages/admin/AdminTools.tsx",
  hostedMcpLogin: "src/pages/admin/hostedMcpLogin.ts",
  appIcon: "src/components/apps/AppIcon.tsx",
  appIconGlyphs: "src/components/apps/appIconGlyphs.ts",
  hostedMcpBridge: "packages/mcp-server/src/higgsfield-tool.ts",
  vaultBridge: "packages/mcp-server/src/vault-bridge.ts",
  vercelTool: "packages/mcp-server/src/vercel-tool.ts",
  supabaseTool: "packages/mcp-server/src/supabase-tool.ts",
  dropboxTool: "packages/mcp-server/src/dropbox-tool.ts",
  gmailTool: "packages/mcp-server/src/gmail-tool.ts",
  googleDriveTool: "packages/mcp-server/src/google-drive-tool.ts",
  onedriveTool: "packages/mcp-server/src/onedrive-tool.ts",
  keychainTool: "packages/mcp-server/src/keychain-tool.ts",
  toolWiring: "packages/mcp-server/src/tool-wiring.ts",
  adminMemory: "api/memory-admin.ts",
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function readJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function getArgValue(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function getPlatformArgs() {
  return process.argv
    .filter((arg) => arg.startsWith("--platform="))
    .flatMap((arg) => arg.slice("--platform=".length).split(","))
    .map((platform) => platform.trim())
    .filter(Boolean);
}

function hasWord(text, word) {
  const escaped = String(word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

function includesSlugInSet(text, setName, slug) {
  const setMatch = text.match(new RegExp(`const\\s+${setName}\\b[^=]*=\\s*new\\s+Set\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, "m"));
  return Boolean(setMatch?.[1]?.includes(`"${slug}"`) || setMatch?.[1]?.includes(`'${slug}'`));
}

function objectBlockForKey(text, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[\\s,{])(?:"${escaped}"|${escaped})\\s*:\\s*\\{`, "m");
  const match = pattern.exec(text);
  if (!match) return "";

  const braceStart = text.indexOf("{", match.index + match[0].lastIndexOf("{"));
  if (braceStart < 0) return "";

  let depth = 0;
  let quote = "";
  let escapedChar = false;
  for (let index = braceStart; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (escapedChar) {
        escapedChar = false;
      } else if (char === "\\") {
        escapedChar = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(braceStart, index + 1);
    }
  }
  return "";
}

function objectBlockForConst(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`const\\s+${escaped}\\b[^=]*=\\s*\\{`, "m").exec(text);
  if (!match) return "";

  const braceStart = text.indexOf("{", match.index);
  if (braceStart < 0) return "";

  let depth = 0;
  let quote = "";
  let escapedChar = false;
  for (let index = braceStart; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (escapedChar) {
        escapedChar = false;
      } else if (char === "\\") {
        escapedChar = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(braceStart, index + 1);
    }
  }
  return "";
}

function toolChunkForSlug(text, slug) {
  const escaped = String(slug).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const header = new RegExp(`//\\s*[─-]+\\s*${escaped}-tool\\.ts\\s*[─-]+`, "m").exec(text);
  if (!header) return "";
  const start = header.index + header[0].length;
  const next = /\/\/\s*[─-]+\s*[a-z0-9-]+-tool\.ts\s*[─-]+/m.exec(text.slice(start));
  return text.slice(start, next ? start + next.index : text.length);
}

function requiresTokenField(toolChunk) {
  return /required\s*:\s*\[[^\]]*["'](?:access_token|api_key|bearer_token)["'][^\]]*\]/m.test(toolChunk);
}

function findApp(appCatalogData, slug) {
  const apps = Array.isArray(appCatalogData?.apps) ? appCatalogData.apps : [];
  return apps.find((app) => app?.slug === slug) ?? null;
}

function findConnectorSetup(connectorSetupData, slug) {
  return connectorSetupData?.connectors?.[slug] ?? null;
}

function requiresPopularLens(platform) {
  return POPULAR_LOGIN_FIRST_PLATFORMS.includes(platform);
}

function requiresServerOAuthButton(platform) {
  return DEFAULT_LOGIN_FIRST_PLATFORMS.includes(platform);
}

function envValueFromBlock(block, key) {
  const escaped = String(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`(?:"${escaped}"|${escaped})\\s*:\\s*"([^"]+)"`));
  return match?.[1] ?? "";
}

function addCheck(checks, name, ok, message, details = {}) {
  checks.push({
    name,
    status: ok ? "pass" : "blocker",
    message,
    ...details,
  });
}

function missingChecks(checks) {
  return checks.filter((check) => check.status !== "pass");
}

function receiptBlockers(receipt) {
  return [
    ...missingChecks(receipt.global_checks).map((check) => ({ scope: "global", ...check })),
    ...receipt.platform_results.flatMap((result) => missingChecks(result.checks).map((check) => ({
      scope: result.platform,
      ...check,
    }))),
  ];
}

function refreshReceiptStatus(receipt) {
  for (const result of receipt.platform_results) {
    result.status = missingChecks(result.checks).length === 0 ? "pass" : "blocker";
  }
  const blockers = receiptBlockers(receipt);
  receipt.status = blockers.length === 0 ? "pass" : "blocker";
  receipt.action_needed = blockers.map((check) => `${check.scope}: ${check.name} - ${check.message}`);
  return receipt;
}

async function readSourceFile(cwd, sourcePath) {
  return readFile(path.join(cwd, sourcePath), "utf8");
}

export async function loadConnectionReadinessSources(cwd = process.cwd()) {
  const entries = await Promise.all(
    Object.entries(SOURCE_PATHS).map(async ([key, sourcePath]) => {
      const text = await readSourceFile(cwd, sourcePath);
      return [key, text];
    })
  );
  const sources = Object.fromEntries(entries);
  return {
    ...sources,
    appCatalogData: readJson(sources.appCatalog, { apps: [] }),
    connectorSetupData: readJson(sources.connectorSetupGenerated, { connectors: {} }),
  };
}

export function evaluateConnectionReadinessSources(
  sources,
  options = {},
) {
  const platforms = unique(
    (options.platforms?.length ? options.platforms : DEFAULT_LOGIN_FIRST_PLATFORMS)
      .map((platform) => normalize(platform))
  );
  const now = options.now ?? new Date().toISOString();
  const results = [];
  const globalChecks = [];

  addCheck(
    globalChecks,
    "setup_pending_keeps_fallback_visible",
    sources.connectPage.includes("setup_pending")
      && sources.connectPage.includes("setSetupPending")
      && sources.connectPage.includes("Use a token instead")
      && sources.connectPage.includes("Token entry is only a fallback"),
    "The connect page treats provider setup-pending as recoverable and keeps token fallback visible."
  );

  addCheck(
    globalChecks,
    "admin_apps_open_login_apps_directly",
    sources.adminTools.includes("function shouldUseConnectPage")
      && sources.adminTools.includes("connector.auth_type === \"oauth2\"")
      && sources.adminTools.includes("openConnectionPopup(`/connect/${app.slug}`")
      && sources.adminTools.includes("connector.supports_managed_connection || connector.supports_hosted_mcp_connection")
      && sources.adminTools.includes("setConnectTarget(app)"),
    "Admin Apps opens sign-in apps directly into /connect/:slug and reserves the modal for managed, hosted MCP, and key-entry flows."
  );

  addCheck(
    globalChecks,
    "admin_apps_center_connect_popups",
    sources.adminTools.includes("const width = 560")
      && sources.adminTools.includes("const height = 760")
      && sources.adminTools.includes("const left = Math.max")
      && sources.adminTools.includes("const top = Math.max")
      && sources.adminTools.includes("left=${left},top=${top}")
      && sources.hostedMcpLogin.includes("const width = 560")
      && sources.hostedMcpLogin.includes("const height = 760")
      && sources.hostedMcpLogin.includes("const left = Math.max")
      && sources.hostedMcpLogin.includes("const top = Math.max")
      && sources.hostedMcpLogin.includes("left=${left},top=${top}"),
    "Admin Apps opens provider and hosted MCP sign-in popups centered on the user's current browser window."
  );

  addCheck(
    globalChecks,
    "admin_apps_registry_fallback_keeps_login_apps_connectable",
    sources.adminTools.includes("function buildAdminConnectorMap")
      && sources.adminTools.includes("CONNECTORS[app.slug]")
      && sources.adminTools.includes("auth_type: config.authType")
      && sources.adminTools.includes('supports_hosted_mcp_connection: app.slug === "higgsfield"'),
    "Admin Apps falls back to the code connector registry so missing database connector rows cannot make sign-in apps look built-in."
  );

  addCheck(
    globalChecks,
    "admin_apps_saved_status_uses_customer_language",
    sources.adminTools.includes("if (c.credential?.is_valid)")
      && sources.adminTools.includes('label: "Connected"')
      && sources.connectAppModal.includes('statusLabel ?? "Connected"')
      && sources.connectAppModal.includes("is connected in UnClick")
      && sources.connectAppModal.includes("can use this connection across your devices"),
    "Saved credentials use customer-facing Connected language instead of sounding broken."
  );

  addCheck(
    globalChecks,
    "oauth_start_owns_provider_authorization_url",
    sources.oauthInit.includes("AUTHORIZE_SCOPES")
      && sources.oauthInit.includes("function buildAuthorizationUrl")
      && sources.oauthInit.includes("authorization_url: authorizationUrl")
      && sources.connectPage.includes("data.authorization_url ?? buildOAuthUrl"),
    "The OAuth start endpoint returns the provider sign-in URL with the same scopes the backend expects, while the page keeps a browser fallback."
  );

  addCheck(
    globalChecks,
    "hosted_mcp_tool_arguments_keep_native_shape",
    sources.hostedMcpBridge.includes("params: { name: toolName, arguments: toolArgs }")
      && !sources.hostedMcpBridge.includes("arguments: { params: toolArgs }")
      && sources.hostedMcpBridge.includes("modelExploreCandidates")
      && !/return\s+uniqueNativeArgCandidates\(\s*\[\s*\.\.\.actions[\s\S]*?,\s*base\s*,?\s*\]/.test(sources.hostedMcpBridge),
    "Hosted MCP bridge calls pass native tool arguments directly and avoid actionless model-exploration retries."
  );

  addCheck(
    globalChecks,
    "credential_read_path_checks_user_and_managed_connections",
    sources.credentialsApi.includes("user_credentials")
      && sources.credentialsApi.includes("managed_app_connections")
      && sources.credentialsApi.includes("fetchManagedConnectionCredentials"),
    "The credentials API can read stored OAuth/token rows and managed connection rows."
  );

  const proofStampTools = [
    sources.vercelTool,
    sources.supabaseTool,
    sources.dropboxTool,
    sources.gmailTool,
    sources.googleDriveTool,
    sources.onedriveTool,
    sources.hostedMcpBridge,
  ];
  addCheck(
    globalChecks,
    "successful_tool_calls_stamp_live_connection_proof",
    sources.credentialsApi.includes('req.method === "PATCH"')
      && sources.credentialsApi.includes("last_tested_at: testedAt")
      && sources.vaultBridge.includes("function credentialResolvedFromUnClick")
      && sources.vaultBridge.includes("function markCredentialLiveTested")
      && proofStampTools.every((source) => source.includes("markCredentialLiveTested")),
    "A successful provider tool call can stamp live connection proof so saved apps move from Needs check to Connected."
  );

  addCheck(
    globalChecks,
    "tool_keychain_status_merges_all_connection_sources",
    sources.keychainTool.includes("platform_credentials")
      && sources.keychainTool.includes("user_credentials")
      && sources.keychainTool.includes("managed_app_connections")
      && sources.keychainTool.includes("connected_source")
      && sources.keychainTool.includes("source:         r.source"),
    "The MCP keychain status path reports the same stored connections that the web app can create."
  );

  addCheck(
    globalChecks,
    "admin_connected_badges_merge_all_connection_sources",
    sources.adminMemory.includes("platform_credentials")
      && sources.adminMemory.includes("user_credentials")
      && sources.adminMemory.includes("managed_app_connections")
      && sources.adminMemory.includes('"mixed"'),
    "The admin connected badge can see old keychain rows, /connect rows, and managed connection rows."
  );

  const adminAppsSeparatesSavedAndProof = sources.appLenses.includes("export function hasSavedConnection")
    && sources.appLenses.includes("export function isConnected")
    && sources.appLenses.includes('credential.connection_state === "connected"')
    && sources.appLenses.includes("credential.last_tested_at")
    && sources.appLenses.includes('credential.connection_state === "pending"')
    && sources.appLenses.includes('credential.connection_state !== "failing"')
    && /case\s+"connected"\s*:\s*return\s+hasSavedConnection\(connector\)/.test(sources.appLenses)
    && /case\s+"not-connected"\s*:\s*return\s+Boolean\(connector\)\s*&&\s*!hasSavedConnection\(connector\)/.test(sources.appLenses)
    && /if\s*\(\s*hasSavedConnection\(connector\)\s*\)\s*return\s+"Manage"/.test(sources.appLenses);
  const adminModalShowsSavedUnproven = sources.connectAppModal.includes("hasSavedConnection")
    && sources.connectAppModal.includes("is connected in UnClick")
    && sources.connectAppModal.includes("can use this connection across your devices");
  const adminPopupAcceptsSavedConnection = sources.adminTools.includes("watchConnectionPopup")
    && sources.adminTools.includes("hasSavedConnection(connector)");
  addCheck(
    globalChecks,
    "admin_apps_separates_saved_visibility_from_live_proof",
    adminAppsSeparatesSavedAndProof && adminModalShowsSavedUnproven && adminPopupAcceptsSavedConnection,
    "Admin Apps keeps saved-connection visibility separate from live proof so saved OAuth/key rows cannot disappear from the Connected lens."
  );

  for (const platform of platforms) {
    const checks = [];
    const usesDynamicOAuth = DYNAMIC_OAUTH_PLATFORMS.has(platform);
    const connectorBlock = objectBlockForKey(sources.connectors, platform);
    const callbackBlock = usesDynamicOAuth ? sources.oauthCallback : objectBlockForKey(sources.oauthCallback, platform);
    const setupBlock = objectBlockForKey(sources.connectorSetup, platform);
    const toolChunk = toolChunkForSlug(sources.toolWiring, platform);
    const app = findApp(sources.appCatalogData, platform);
    const generatedSetup = findConnectorSetup(sources.connectorSetupData, platform);
    const initRedirectEnv = (() => {
      const block = objectBlockForConst(sources.oauthInit, "REDIRECT_URI_ENV");
      return envValueFromBlock(block, platform);
    })();
    const initClientEnv = (() => {
      const block = objectBlockForConst(sources.oauthInit, "CLIENT_ID_ENV");
      return envValueFromBlock(block, platform);
    })();
    const initClientSecretEnv = (() => {
      const block = objectBlockForConst(sources.oauthInit, "CLIENT_SECRET_ENV");
      return envValueFromBlock(block, platform);
    })();
    const callbackClientEnv = usesDynamicOAuth ? "" : envValueFromBlock(callbackBlock, "clientIdEnv");
    const callbackRedirectEnv = usesDynamicOAuth ? "" : envValueFromBlock(callbackBlock, "redirectUriEnv");
    const callbackSecretEnv = usesDynamicOAuth ? "" : envValueFromBlock(callbackBlock, "clientSecretEnv");
    const initUsesPkce = usesDynamicOAuth
      ? sources.oauthInit.includes("code_challenge_method")
      : includesSlugInSet(sources.oauthInit, "PKCE_PLATFORMS", platform);
    const callbackUsesPkce = usesDynamicOAuth
      ? callbackBlock.includes("code_verifier")
      : callbackBlock.includes("requiresPkce:") && callbackBlock.includes("true");
    const localGlyphForced = sources.appIcon.includes(`"${platform}"`) || sources.appIcon.includes(`'${platform}'`);
    const localGlyphExists = sources.appIconGlyphs.includes(`${platform}:`);

    addCheck(
      checks,
      "frontend_connector_login_first",
      Boolean(connectorBlock)
        && connectorBlock.includes('authType:    "oauth2"')
        && connectorBlock.includes("authUrl:")
        && connectorBlock.includes("tokenUrl:")
        && /fallback/i.test(connectorBlock)
        && /Use only if/i.test(connectorBlock),
      "Frontend connector registry exposes provider login with a clearly labeled token fallback."
    );

    addCheck(
      checks,
      "apps_catalog_visible",
      Boolean(app) && app.category && app.category !== "Other",
      "Apps catalog contains the connector in a real category so users can find it.",
      app ? { category: app.category, tool_count: app.toolCount ?? null } : {}
    );

    if (requiresPopularLens(platform)) {
      addCheck(
        checks,
        "popular_lens_visible",
        includesSlugInSet(sources.appLenses, "POPULAR_SLUGS", platform),
        "Default login-first connectors appear in the Popular Apps lens so users can find them without searching."
      );
    }

    if (requiresServerOAuthButton(platform)) {
      addCheck(
        checks,
        "connect_page_server_oauth_button",
        includesSlugInSet(sources.connectPage, "SERVER_OAUTH_CLIENT_ID_SLUGS", platform),
        "Server-owned OAuth connectors are allow-listed on the Connect page so the provider login button renders without a public client ID."
      );
    }

    addCheck(
      checks,
      "connector_setup_metadata",
      Boolean(setupBlock)
        && Boolean(generatedSetup)
        && Boolean(generatedSetup.displayName)
        && Boolean(generatedSetup.credential)
        && Boolean(generatedSetup.setupUrl),
      "Connection setup metadata exists in source and generated data."
    );

    addCheck(
      checks,
      "oauth_init_supported",
      usesDynamicOAuth
        ? sources.oauthInit.includes(`"${platform}"`)
          && sources.oauthInit.includes("HIGGSFIELD_MCP_REGISTER_URL")
          && sources.oauthInit.includes("token_endpoint_auth_method: \"none\"")
          && sources.oauthInit.includes("HIGGSFIELD_MCP_OAUTH_COOKIE")
        : sources.oauthInit.includes(`"${platform}"`)
        && Boolean(initRedirectEnv)
        && Boolean(initClientEnv)
        && Boolean(initClientSecretEnv)
        && sources.oauthInit.includes("providerSetupPending"),
      "OAuth start endpoint allow-lists the platform and returns setup-pending instead of a dead end."
    );

    addCheck(
      checks,
      "oauth_callback_supported",
      usesDynamicOAuth
        ? callbackBlock.includes("exchangeHiggsfieldMcp")
          && callbackBlock.includes("HIGGSFIELD_MCP_TOKEN_URL")
          && callbackBlock.includes("client_id: flow.client_id")
          && callbackBlock.includes('credential_kind: "higgsfield_mcp_oauth"')
        : Boolean(callbackBlock)
        && Boolean(callbackClientEnv)
        && Boolean(callbackRedirectEnv)
        && callbackBlock.includes("extractCredentials")
        && callbackBlock.includes("access_token"),
      "OAuth callback endpoint can exchange the provider code and extract stored credentials."
    );

    addCheck(
      checks,
      "oauth_env_names_match_start_and_callback",
      usesDynamicOAuth
        ? sources.oauthInit.includes("oauth2/register")
          && sources.oauthCallback.includes("client_id: flow.client_id")
        : Boolean(initClientEnv)
        && Boolean(callbackClientEnv)
        && initClientEnv === callbackClientEnv
        && Boolean(initClientSecretEnv)
        && Boolean(callbackSecretEnv)
        && initClientSecretEnv === callbackSecretEnv
        && Boolean(initRedirectEnv)
        && Boolean(callbackRedirectEnv)
        && initRedirectEnv === callbackRedirectEnv,
      "OAuth start and callback agree on client ID, client secret, and redirect URI environment names.",
      {
        dynamic_oauth_registration: usesDynamicOAuth || null,
        init_client_env: initClientEnv || null,
        callback_client_env: callbackClientEnv || null,
        init_client_secret_env: initClientSecretEnv || null,
        callback_client_secret_env: callbackSecretEnv || null,
        init_redirect_env: initRedirectEnv || null,
        callback_redirect_env: callbackRedirectEnv || null,
      }
    );

    addCheck(
      checks,
      "oauth_state_is_signed",
      usesDynamicOAuth
        ? sources.oauthState.includes("OAUTH_STATE_SECRET")
          && sources.oauthState.includes("MCP_OAUTH_SIGNING_SECRET")
          && sources.oauthInit.includes("state_secret")
        : sources.oauthState.includes(`case "${platform}"`)
          || (sources.oauthState.includes("OAUTH_STATE_SECRET") && Boolean(callbackSecretEnv)),
      "OAuth state has a signing secret path for this provider."
    );

    addCheck(
      checks,
      "pkce_start_callback_consistent",
      initUsesPkce === callbackUsesPkce,
      "PKCE is either enabled on both OAuth start and callback, or on neither.",
      { pkce_in_init: initUsesPkce, pkce_in_callback: callbackUsesPkce }
    );

    addCheck(
      checks,
      "app_icon_has_render_path",
      Boolean(app)
        && (
          Boolean(app.domain && String(app.domain).includes("."))
          || (localGlyphForced && localGlyphExists)
        ),
      "App icon has either a real favicon domain or an explicit local glyph."
    );

    addCheck(
      checks,
      "tool_schema_allows_connected_credentials",
      !toolChunk || !requiresTokenField(toolChunk),
      "Login-first tools keep token fields optional so a stored web connection can satisfy tool calls.",
      { tool_surface: Boolean(toolChunk) }
    );

    results.push({
      platform,
      status: missingChecks(checks).length === 0 ? "pass" : "blocker",
      checks,
    });
  }

  return refreshReceiptStatus({
    kind: "app_connection_readiness_receipt_v1",
    generated_at: now,
    status: "pass",
    platforms,
    global_checks: globalChecks,
    platform_results: results,
    action_needed: [],
  });
}

function normalizeLiveUrl(liveUrl) {
  const trimmed = String(liveUrl ?? "").trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
}

function missingText(data) {
  const missingFields = Array.isArray(data?.missing_fields)
    ? data.missing_fields
    : (data?.missing ? [data.missing] : []);
  return missingFields.length ? missingFields.join(",") : "unknown";
}

export async function addLiveConnectionReadinessChecks(receipt, options = {}) {
  const liveUrl = normalizeLiveUrl(options.liveUrl ?? process.env.APP_CONNECTION_LIVE_URL);
  if (!liveUrl) return receipt;

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    addCheck(
      receipt.global_checks,
      "live_fetch_available",
      false,
      "Live app-connection readiness needs a fetch implementation."
    );
    return refreshReceiptStatus(receipt);
  }

  const apiKey = String(options.apiKey ?? process.env.APP_CONNECTION_PROBE_API_KEY ?? "uc_app_connection_readiness_probe");
  const endpoint = `${liveUrl}/api/oauth-init`;
  const livePlatforms = unique(options.platforms?.length ? options.platforms : receipt.platforms);

  for (const platform of livePlatforms) {
    const platformResult = receipt.platform_results.find((result) => result.platform === platform);
    if (!platformResult) continue;

    try {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, api_key: apiKey }),
      });
      const data = await response.json().catch(() => ({}));
      const errorText = typeof data?.error === "string" ? data.error : "";
      const ok = Boolean(
        response.ok
        && data?.success === true
        && typeof data?.client_id === "string"
        && data.client_id.length > 0
        && typeof data?.redirect_uri === "string"
        && data.redirect_uri.length > 0
        && data?.setup_pending !== true
      );
      const setupPending = data?.setup_pending === true;
      addCheck(
        platformResult.checks,
        "live_oauth_init_ready",
        ok,
        setupPending
          ? `Production OAuth init is still setup-pending; missing ${missingText(data)}.`
          : errorText
            ? `Production OAuth init failed: ${errorText}`
          : "Production OAuth init returns a provider-ready login payload, not setup-pending.",
        {
          live_url: liveUrl,
          http_status: response.status,
          setup_pending: setupPending,
          missing_fields: Array.isArray(data?.missing_fields) ? data.missing_fields : [],
        }
      );
    } catch (error) {
      addCheck(
        platformResult.checks,
        "live_oauth_init_ready",
        false,
        `Production OAuth init could not be checked: ${error instanceof Error ? error.message : String(error)}.`,
        { live_url: liveUrl }
      );
    }
  }

  return refreshReceiptStatus(receipt);
}

export async function evaluateConnectionReadiness(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const sources = await loadConnectionReadinessSources(cwd);
  const receipt = evaluateConnectionReadinessSources(sources, options);
  return addLiveConnectionReadinessChecks(receipt, options);
}

async function main() {
  const cwd = getArgValue("cwd", process.cwd());
  const platforms = getPlatformArgs();
  const liveUrl = getArgValue("live-url", process.env.APP_CONNECTION_LIVE_URL ?? "");
  const live = hasFlag("live") || Boolean(liveUrl);
  const receipt = await evaluateConnectionReadiness({
    cwd,
    platforms: platforms.length ? platforms : undefined,
    liveUrl: live ? liveUrl : "",
  });
  console.log(JSON.stringify(receipt, null, 2));
  process.exitCode = receipt.status === "pass" ? 0 : 1;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const modulePath = path.resolve(fileURLToPath(import.meta.url));
if (invokedPath === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
