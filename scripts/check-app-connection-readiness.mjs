#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_LOGIN_FIRST_PLATFORMS = ["github", "vercel", "supabase"];

const SOURCE_PATHS = {
  connectors: "src/lib/connectors.ts",
  appCatalog: "src/data/app-catalog.generated.json",
  connectorSetup: "packages/mcp-server/src/connector-setup.ts",
  connectorSetupGenerated: "src/data/connector-setup.generated.json",
  oauthInit: "api/oauth-init.ts",
  oauthCallback: "api/oauth-callback.ts",
  oauthState: "api/oauth-state.ts",
  credentialsApi: "api/credentials.ts",
  connectPage: "src/pages/Connect.tsx",
  connectAppModal: "src/components/apps/ConnectAppModal.tsx",
  appIcon: "src/components/apps/AppIcon.tsx",
  appIconGlyphs: "src/components/apps/appIconGlyphs.ts",
  keychainTool: "packages/mcp-server/src/keychain-tool.ts",
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
  const setMatch = text.match(new RegExp(`const\\s+${setName}\\s*=\\s*new\\s+Set\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, "m"));
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

function findApp(appCatalogData, slug) {
  const apps = Array.isArray(appCatalogData?.apps) ? appCatalogData.apps : [];
  return apps.find((app) => app?.slug === slug) ?? null;
}

function findConnectorSetup(connectorSetupData, slug) {
  return connectorSetupData?.connectors?.[slug] ?? null;
}

function envValueFromBlock(block, key) {
  const match = block.match(new RegExp(`${key}\\s*:\\s*"([^"]+)"`));
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
    "admin_modal_routes_login_apps_to_connect_page",
    sources.connectAppModal.includes("connector.auth_type === \"oauth2\"")
      && sources.connectAppModal.includes("href={`/connect/${app.slug}`}")
      && sources.connectAppModal.includes("Continue to"),
    "Admin Apps sends OAuth apps to the full /connect/:slug login journey."
  );

  addCheck(
    globalChecks,
    "credential_read_path_checks_user_and_managed_connections",
    sources.credentialsApi.includes("user_credentials")
      && sources.credentialsApi.includes("managed_app_connections")
      && sources.credentialsApi.includes("fetchManagedConnectionCredentials"),
    "The credentials API can read stored OAuth/token rows and managed connection rows."
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

  for (const platform of platforms) {
    const checks = [];
    const connectorBlock = objectBlockForKey(sources.connectors, platform);
    const callbackBlock = objectBlockForKey(sources.oauthCallback, platform);
    const setupBlock = objectBlockForKey(sources.connectorSetup, platform);
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
    const callbackClientEnv = envValueFromBlock(callbackBlock, "clientIdEnv");
    const callbackRedirectEnv = envValueFromBlock(callbackBlock, "redirectUriEnv");
    const callbackSecretEnv = envValueFromBlock(callbackBlock, "clientSecretEnv");
    const initUsesPkce = includesSlugInSet(sources.oauthInit, "PKCE_PLATFORMS", platform);
    const callbackUsesPkce = callbackBlock.includes("requiresPkce:") && callbackBlock.includes("true");
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
      sources.oauthInit.includes(`"${platform}"`)
        && Boolean(initRedirectEnv)
        && Boolean(initClientEnv)
        && Boolean(initClientSecretEnv)
        && sources.oauthInit.includes("providerSetupPending"),
      "OAuth start endpoint allow-lists the platform and returns setup-pending instead of a dead end."
    );

    addCheck(
      checks,
      "oauth_callback_supported",
      Boolean(callbackBlock)
        && Boolean(callbackClientEnv)
        && Boolean(callbackRedirectEnv)
        && callbackBlock.includes("extractCredentials")
        && callbackBlock.includes("access_token"),
      "OAuth callback endpoint can exchange the provider code and extract stored credentials."
    );

    addCheck(
      checks,
      "oauth_env_names_match_start_and_callback",
      Boolean(initClientEnv)
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
      sources.oauthState.includes(`case "${platform}"`)
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

    results.push({
      platform,
      status: missingChecks(checks).length === 0 ? "pass" : "blocker",
      checks,
    });
  }

  const blockers = [
    ...missingChecks(globalChecks).map((check) => ({ scope: "global", ...check })),
    ...results.flatMap((result) => missingChecks(result.checks).map((check) => ({
      scope: result.platform,
      ...check,
    }))),
  ];

  return {
    kind: "app_connection_readiness_receipt_v1",
    generated_at: now,
    status: blockers.length === 0 ? "pass" : "blocker",
    platforms,
    global_checks: globalChecks,
    platform_results: results,
    action_needed: blockers.map((check) => `${check.scope}: ${check.name} - ${check.message}`),
  };
}

export async function evaluateConnectionReadiness(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const sources = await loadConnectionReadinessSources(cwd);
  return evaluateConnectionReadinessSources(sources, options);
}

async function main() {
  const cwd = getArgValue("cwd", process.cwd());
  const platforms = getPlatformArgs();
  const receipt = await evaluateConnectionReadiness({
    cwd,
    platforms: platforms.length ? platforms : undefined,
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
