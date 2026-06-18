import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { CONNECTORS, type ConnectorConfig, type CredentialField } from "@/lib/connectors";
import { useSession } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { presets } from "@/lib/design-system";
import { getApp } from "@/lib/appCatalog";
import { AppIcon } from "@/components/apps/AppIcon";

// --- Types ---------------------------------------------------------------------

type PageState =
  | { kind: "idle" }
  | { kind: "connecting" }
  | { kind: "callback"; code: string; state: string | null }
  | { kind: "success" }
  | { kind: "error"; message: string };

interface OAuthInitResponse {
  state?: string;
  redirect_uri?: string;
  client_id?: string;
  code_challenge?: string;
  code_challenge_method?: string;
  authorization_url?: string;
  error?: string;
  setup_pending?: boolean;
  missing?: "client_id" | "client_secret" | "redirect_uri" | "state_secret";
  missing_fields?: Array<"client_id" | "client_secret" | "redirect_uri" | "state_secret">;
}

// --- OAuth helpers -------------------------------------------------------------

const VITE_ENV = import.meta.env as Record<string, string>;

function oauthClientIdEnvKey(slug: string): string {
  if (slug === "supabase") return "VITE_SUPABASE_OAUTH_CLIENT_ID";
  return `VITE_${slug.toUpperCase().replace(/-/g, "_")}_CLIENT_ID`;
}

function serverProvidesOAuthClientId(slug: string): boolean {
  return slug === "vercel" || slug === "supabase";
}

/** Returns the OAuth2 authorization URL for a platform, or null if client_id not configured. */
function buildOAuthUrl(
  connector: ConnectorConfig,
  redirectUri: string,
  state: string,
  pkce?: { clientId?: string; codeChallenge?: string; codeChallengeMethod?: string }
): string | null {
  if (connector.authType !== "oauth2") return null;

  const clientIdKey = oauthClientIdEnvKey(connector.slug);
  const clientId    = pkce?.clientId ?? VITE_ENV[clientIdKey];
  if (!clientId) return null;

  let authUrl = connector.authUrl ?? "";

  if (connector.slug === "shopify") {
    const store = sessionStorage.getItem("shopify_store") ?? "";
    if (!store) return null;
    authUrl = authUrl.replace("{store}", store);
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id:     clientId,
    redirect_uri:  redirectUri,
    state,
    ...(connector.extraAuthParams ?? {}),
  });
  const scope = (connector.scopes ?? []).join(" ");
  if (scope) params.set("scope", scope);
  if (pkce?.codeChallenge) {
    params.set("code_challenge", pkce.codeChallenge);
    params.set("code_challenge_method", pkce.codeChallengeMethod ?? "S256");
  }

  return `${authUrl}?${params.toString()}`;
}


/** Parse a fetch Response that should be JSON, surviving plaintext error pages. */
async function safeJson<T>(res: Response): Promise<T | { error: string }> {
  const text = await res.text().catch(() => "");
  try {
    return JSON.parse(text) as T;
  } catch {
    return {
      error: res.ok
        ? "The server sent an unexpected reply. Please try again."
        : `Server error (${res.status}). The app login setup is not starting cleanly yet. Use the token fallback for now, or try again after the OAuth settings are fixed.`,
    };
  }
}

/** Returns the stored API key from localStorage, or empty string. */
function getApiKey(): string {
  try {
    return localStorage.getItem("unclick_api_key") ?? "";
  } catch {
    return "";
  }
}

// --- Sub-components ------------------------------------------------------------

function ScopeList({ scopes }: { scopes: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {scopes.map((s) => (
        <Badge
          key={s}
          variant="outline"
          className="text-xs font-mono border-border/60 text-body"
        >
          {s}
        </Badge>
      ))}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  disabled,
}: {
  field:    CredentialField;
  value:    string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const fieldId = `credential_${field.key}`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId} className="text-sm text-heading">
          {field.label}
        </Label>
        {field.findGuideUrl && (
          <a
            href={field.findGuideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            Where do I find this?
          </a>
        )}
      </div>
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
      <div className="relative">
        <Input
          id={fieldId}
          type={field.secret && !revealed ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          className="bg-card/40 border-border/60 text-heading placeholder:text-muted-foreground pr-16"
        />
        {field.secret && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-heading"
          >
            {revealed ? "hide" : "show"}
          </button>
        )}
      </div>
    </div>
  );
}

// --- Main page -----------------------------------------------------------------

export default function ConnectPage() {
  const { platform }      = useParams<{ platform: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const code              = searchParams.get("code");
  const stateParam        = searchParams.get("state");

  const connector: ConnectorConfig | null =
    platform ? (CONNECTORS[platform] ?? null) : null;

  const [pageState, setPageState]     = useState<PageState>({ kind: "idle" });
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [shopifyStore, setShopifyStore] = useState("");
  const [apiKey, setApiKey]           = useState(getApiKey);
  const [mintingKey, setMintingKey]   = useState(false);
  const [mintError, setMintError]     = useState<string | null>(null);
  const [showManualPaste, setShowManualPaste] = useState(false);
  const [alreadyProvisioned, setAlreadyProvisioned] = useState(false);
  const [resettingKey, setResettingKey] = useState(false);
  const [setupPending, setSetupPending] = useState<string | null>(null);
  const callbackFired                 = useRef(false);
  const connectedParam                = searchParams.get("connected");
  const oauthErrorParam               = searchParams.get("oauth_error");

  const { session } = useSession();

  async function handleMintKey() {
    if (!session) return;
    setMintingKey(true);
    setMintError(null);
    try {
      const res = await fetch("/api/memory-admin?action=generate_api_key", {
        method:  "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const body = (await safeJson(res)) as {
        api_key?:           string | null;
        already_provisioned?: boolean;
        error?:             string;
      };
      if (!res.ok) {
        setMintError(body.error ?? "Could not get your private UnClick account key.");
        return;
      }
      if (body.api_key) {
        try { localStorage.setItem("unclick_api_key", body.api_key); } catch { /* ignore */ }
        setApiKey(body.api_key);
        return;
      }
      setAlreadyProvisioned(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error.";
      setMintError(message);
    } finally {
      setMintingKey(false);
    }
  }

  async function handleResetKey() {
    if (!session) return;
    setResettingKey(true);
    setMintError(null);
    try {
      const res = await fetch("/api/memory-admin?action=reset_api_key", {
        method:  "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const body = (await safeJson(res)) as { api_key?: string; error?: string };
      if (!res.ok || !body.api_key) {
        setMintError(body.error ?? "Could not reset your private UnClick account key.");
        return;
      }
      try { localStorage.setItem("unclick_api_key", body.api_key); } catch { /* ignore */ }
      setApiKey(body.api_key);
      setAlreadyProvisioned(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error.";
      setMintError(message);
    } finally {
      setResettingKey(false);
    }
  }

  // -- Handle OAuth callback ------------------------------------------------
  useEffect(() => {
    let handledQueryState = false;

    if (connectedParam === "1") {
      setPageState({ kind: "success" });
      handledQueryState = true;
    }

    if (oauthErrorParam && !handledQueryState) {
      setPageState({ kind: "error", message: oauthErrorParam });
      handledQueryState = true;
    }

    if (handledQueryState) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("connected");
      nextParams.delete("oauth_error");
      setSearchParams(nextParams, { replace: true });
    }
  }, [connectedParam, oauthErrorParam, searchParams, setSearchParams]);

  useEffect(() => {
    if (!code || !connector || callbackFired.current) return;
    callbackFired.current = true;

    if (!stateParam) {
      setPageState({ kind: "error", message: "Missing OAuth state. Please try again." });
      return;
    }

    const currentApiKey = apiKey || getApiKey();
    if (!currentApiKey) {
      setPageState({
        kind:    "error",
        message: "No private UnClick account key found. Add the key below and try again.",
      });
      return;
    }

    setPageState({ kind: "callback", code, state: stateParam });

    const body: Record<string, string> = {
      platform: connector.slug,
      code,
      state: stateParam,
      api_key:  currentApiKey,
    };
    const storedStore = sessionStorage.getItem("shopify_store");
    if (connector.slug === "shopify" && storedStore) {
      body.store = storedStore;
    }

    fetch("/api/oauth-callback", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    })
      .then(async (res) => {
        const data = (await safeJson(res)) as { success?: boolean; error?: string };
        if (res.ok && data.success) {
          sessionStorage.removeItem("shopify_store");
          setPageState({ kind: "success" });
        } else {
          setPageState({ kind: "error", message: data.error ?? "Connection failed." });
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Network error.";
        setPageState({ kind: "error", message });
      });
  }, [code, connector, stateParam, apiKey]);

  // -- Loading / unknown service --------------------------------------------
  if (!connector) {
    return (
      <div className={presets.page}>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center space-y-4 max-w-md">
            <p className="text-body text-lg">
              {platform ? `This app is not listed yet: ${platform}` : "No app specified."}
            </p>
            <Link to="/admin/apps" className="text-primary hover:underline text-sm">
              Back to apps
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // -- Success state --------------------------------------------------------
  if (pageState.kind === "success") {
    return (
      <ConnectShell connector={connector}>
        <div className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-heading">
              {connector.name} connected
            </h2>
            <p className="text-sm text-body mt-1">
              Saved to your UnClick account. Your admin Apps page will update automatically.
            </p>
          </div>

          <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            You can close this window.
          </p>

          <Link to="/admin/apps" className="inline-block text-sm text-body hover:text-heading">
            Back to apps
          </Link>
        </div>
      </ConnectShell>
    );
  }

  // -- Error state ----------------------------------------------------------
  if (pageState.kind === "error") {
    return (
      <ConnectShell connector={connector}>
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-heading">Connection failed</h2>
            <p className="text-sm text-red-300/90 mt-1">{pageState.message}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border/60 text-heading"
            onClick={() => {
              callbackFired.current = false;
              const nextParams = new URLSearchParams(searchParams);
              nextParams.delete("code");
              nextParams.delete("state");
              nextParams.delete("connected");
              nextParams.delete("oauth_error");
              setSearchParams(nextParams, { replace: true });
              setPageState({ kind: "idle" });
            }}
          >
            Try again
          </Button>
        </div>
      </ConnectShell>
    );
  }

  // -- Callback processing --------------------------------------------------
  if (pageState.kind === "callback" || pageState.kind === "connecting") {
    return (
      <ConnectShell connector={connector}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-body text-sm">
            {pageState.kind === "callback"
              ? "Finishing the secure sign-in..."
              : `Connecting to ${connector.name}...`}
          </p>
        </div>
      </ConnectShell>
    );
  }

  // -- Idle: show connect form ----------------------------------------------

  const isOAuth2          = connector.authType === "oauth2";
  const oauthClientKey     = isOAuth2 ? VITE_ENV[oauthClientIdEnvKey(connector.slug)] : "";
  const oauthNotConfigured =
    isOAuth2 && !oauthClientKey && !serverProvidesOAuthClientId(connector.slug) && connector.slug !== "shopify" && connector.slug !== "higgsfield";

  function handleFieldChange(key: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const currentApiKey = apiKey.trim();
    if (!currentApiKey) {
      setPageState({ kind: "error", message: "Private UnClick account key is required." });
      return;
    }

    setPageState({ kind: "connecting" });
    try {
      const res = await fetch("/api/credentials", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          platform:    connector.slug,
          credentials: fieldValues,
          api_key:     currentApiKey,
        }),
      });
      const data = (await safeJson(res)) as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        localStorage.setItem("unclick_api_key", currentApiKey);
        setPageState({ kind: "success" });
      } else {
        setPageState({ kind: "error", message: data.error ?? "Failed to save credentials." });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error.";
      setPageState({ kind: "error", message });
    }
  }

  async function handleOAuthConnect() {
    const normalizedStore =
      connector.slug === "shopify"
        ? shopifyStore.trim().replace(/\.myshopify\.com$/i, "")
        : "";

    if (connector.slug === "shopify" && !normalizedStore) return;

    try {
      const res = await fetch("/api/oauth-init", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          platform: connector.slug,
          api_key:  apiKey.trim(),
          ...(normalizedStore ? { store: normalizedStore } : {}),
        }),
      });

      const data = (await safeJson(res)) as OAuthInitResponse;
      if (data.setup_pending) {
        const missingLabels: Record<NonNullable<OAuthInitResponse["missing"]>, string> = {
          client_id:     "client ID",
          client_secret: "client secret",
          redirect_uri:  "redirect URI",
          state_secret:  "OAuth state secret",
        };
        const missingFields = data.missing_fields?.length
          ? data.missing_fields
          : data.missing
            ? [data.missing]
            : [];
        const labels = missingFields.map((field) => missingLabels[field]).filter(Boolean);
        const missing = labels.length === 0
          ? "provider setup"
          : labels.length === 1
            ? labels[0]
            : labels.length === 2
              ? `${labels[0]} and ${labels[1]}`
              : `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
        setSetupPending(`${connector.name} login needs UnClick admin setup before it can open: missing ${missing}. Use the token fallback below for now.`);
        setPageState({ kind: "idle" });
        return;
      }
      if (!res.ok || !data.state || !data.redirect_uri) {
        setPageState({ kind: "error", message: data.error ?? "Could not start the sign-in. Please try again." });
        return;
      }

      if (normalizedStore) {
        sessionStorage.setItem("shopify_store", normalizedStore);
      }

      const url = data.authorization_url ?? buildOAuthUrl(connector, data.redirect_uri, data.state, {
        clientId: data.client_id,
        codeChallenge: data.code_challenge,
        codeChallengeMethod: data.code_challenge_method,
      });
      if (!url) {
        setSetupPending(`${connector.name} login needs UnClick admin setup before it can open. Use the token fallback below for now.`);
        setPageState({ kind: "idle" });
        return;
      }

      window.location.href = url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error.";
      setPageState({ kind: "error", message });
    }
  }

  const allFieldsFilled = connector.credentialFields.every(
    (f) => (fieldValues[f.key] ?? "").trim() !== ""
  );
  const oauthLoginReady = isOAuth2 && !oauthNotConfigured;

  return (
    <ConnectShell connector={connector}>
      <div className="space-y-6">
        {/* Account-key onboarding. */}
        {session && !apiKey ? (
          <div className="space-y-3">
            <p className="text-xs text-body leading-relaxed">
              This connects {connector.name} to your UnClick account, not directly
              to one AI app. This is your private UnClick account key, not a
              disposable installer code.
            </p>

            {alreadyProvisioned ? (
              <>
                <div className="rounded-lg border border-border/60 bg-card/40 p-4 space-y-2">
                  <p className="text-sm text-heading">
                    You already have a private UnClick account key on file.
                  </p>
                  <p className="text-xs text-body leading-relaxed">
                    Since the key lives only in your browser and you do not
                    have it here, you can either make a fresh one now or
                    paste the existing one if you saved it elsewhere.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void handleResetKey()}
                  disabled={resettingKey}
                  className="w-full flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/[0.07] px-4 py-3 text-left hover:bg-primary/10 transition-colors disabled:opacity-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    1
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-heading">
                      {resettingKey ? "Making a new key..." : "Make a new key"}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Replaces the old account key. Static MCP URLs using it will need the new one.
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowManualPaste((v) => !v)}
                  className="w-full flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-left hover:bg-card/60 transition-colors"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-heading font-semibold text-sm">
                    2
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-heading">
                      Paste my existing key
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Keeps your existing account key. Existing compatibility URLs keep working.
                    </span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void handleMintKey()}
                  disabled={mintingKey}
                  className="w-full flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/[0.07] px-4 py-3 text-left hover:bg-primary/10 transition-colors disabled:opacity-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    1
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-heading">
                      {mintingKey ? "Getting your key..." : "Get my private UnClick account key"}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Long-lived account key, saved to this browser.
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowManualPaste((v) => !v)}
                  className="w-full flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-left hover:bg-card/60 transition-colors"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-heading font-semibold text-sm">
                    2
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-heading">
                      I have one already
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Paste your existing uc_ or agt_live_ account key.
                    </span>
                  </span>
                </button>
              </>
            )}

            {showManualPaste && (
              <div className="space-y-1.5 border border-border/60 rounded-lg p-4 bg-card/40">
                <Label htmlFor="api_key" className="text-sm text-heading">
                  Private UnClick account key
                </Label>
                <Input
                  id="api_key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="uc_xxxxxxxx or agt_live_xxxxxxxx"
                  className="bg-card/40 border-border/60 text-heading placeholder:text-muted-foreground"
                />
              </div>
            )}

            {mintError && (
              <p className="text-xs text-red-300/90">{mintError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-1.5 border border-border/60 rounded-lg p-4 bg-card/40">
            <Label htmlFor="api_key" className="text-sm text-heading">
              Private UnClick account key
            </Label>
            <p className="text-xs text-muted-foreground">
              Needed once in this browser so UnClick can save this app login to your account.{" "}
              This is not a disposable installer code.{" "}
              <Link to="/" className="text-primary hover:underline">Get one here.</Link>
            </p>
            <Input
              id="api_key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="uc_xxxxxxxx or agt_live_xxxxxxxx"
              className="bg-card/40 border-border/60 text-heading placeholder:text-muted-foreground"
            />
          </div>
        )}

        {/* OAuth2 flow */}
        {isOAuth2 && (
          <div className="rounded-lg border border-primary/25 bg-primary/[0.06] p-4 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-heading">
                Sign in with {connector.name}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This opens {connector.name} login and saves the connected account
                to your private UnClick key. Token entry is only a fallback.
              </p>
            </div>

            {connector.scopes && connector.scopes.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Permissions requested
                </p>
                <ScopeList scopes={connector.scopes} />
              </div>
            )}

            {connector.slug === "shopify" && (
              <div className="space-y-1.5">
                <Label htmlFor="shopify_store" className="text-sm text-heading">
                  Shopify store name
                </Label>
                <Input
                  id="shopify_store"
                  value={shopifyStore}
                  onChange={(e) => setShopifyStore(e.target.value)}
                  placeholder="mystore"
                  className="bg-card/40 border-border/60 text-heading placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Without .myshopify.com</p>
              </div>
            )}

            {oauthNotConfigured ? (
              <div className="border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-primary/90">
                  Login setup is pending for {connector.name}. Use the manual fallback below,
                  or enter credentials directly in your MCP config.
                </p>
              </div>
            ) : (
              <Button
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold"
                onClick={() => {
                  setSetupPending(null);
                  void handleOAuthConnect();
                }}
                disabled={!apiKey.trim() || (connector.slug === "shopify" && !shopifyStore.trim())}
              >
                {oauthLoginReady ? `Continue to ${connector.name} login` : `Connect with ${connector.name}`}
              </Button>
            )}

            {setupPending && (
              <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3">
                <p className="text-sm text-amber-100">{setupPending}</p>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  token fallback
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Manual form (always shown for non-oauth2; shown as fallback for oauth2) */}
        {isOAuth2 ? (
          <details className="rounded-lg border border-border/60 bg-card/40 p-4">
            <summary className="cursor-pointer text-sm font-medium text-heading">
              Use a token instead
            </summary>
            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4">
              {connector.credentialFields.map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={fieldValues[field.key] ?? ""}
                  onChange={(v) => handleFieldChange(field.key, v)}
                  disabled={false}
                />
              ))}

              <Button
                type="submit"
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold"
                disabled={!apiKey.trim() || !allFieldsFilled}
              >
                Save token fallback
              </Button>
            </form>
          </details>
        ) : (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            {connector.credentialFields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={fieldValues[field.key] ?? ""}
                onChange={(v) => handleFieldChange(field.key, v)}
                disabled={false}
              />
            ))}

            <Button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold"
              disabled={!apiKey.trim() || !allFieldsFilled}
            >
              Save credentials
            </Button>
          </form>
        )}

        {connector.docsUrl && (
          <p className="text-center text-xs text-muted-foreground">
            <a
              href={connector.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-heading"
            >
              {connector.name} API docs
            </a>
          </p>
        )}
      </div>
    </ConnectShell>
  );
}

// --- Shell layout --------------------------------------------------------------

function ConnectShell({
  connector,
  children,
}: {
  connector: ConnectorConfig;
  children:  React.ReactNode;
}) {
  const authLabel: Record<string, string> = {
    oauth2:    "Account login",
    api_key:   "API key",
    bot_token: "Bot token",
  };
  const app = getApp(connector.slug);

  return (
    <div className={presets.page}>
      <Navbar />
      <main className="flex items-start justify-center pt-24 pb-24 px-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <header className="text-center space-y-4">
            <Link
              to="/admin/apps"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-heading"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Apps
            </Link>

            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto">
              <AppIcon
                name={connector.name}
                category={app?.category ?? "Developer & infra"}
                domain={app?.domain}
                slug={connector.slug}
                size={40}
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-heading">
                Connect {connector.name}
              </h1>
              <p className="text-sm text-body mt-2">{connector.description}</p>
            </div>

            <Badge
              variant="outline"
              className="border-border/60 text-muted-foreground text-xs"
            >
              {authLabel[connector.authType] ?? connector.authType}
            </Badge>
          </header>

          {/* Card */}
          <div className="bg-card/60 border border-border/60 rounded-xl p-6 backdrop-blur-sm">
            {children}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Stored for your UnClick account. Your AI apps use it through UnClick after you approve it.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
