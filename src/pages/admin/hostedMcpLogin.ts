import { getApiKey as readStoredApiKey, setApiKey as storeApiKey } from "@/lib/apiKeyStore";

type Fetcher = typeof fetch;

interface OAuthInitResponse {
  authorization_url?: string;
  error?: string;
}

interface GenerateKeyResponse {
  api_key?: string | null;
  already_provisioned?: boolean;
  error?: string;
}

interface HostedMcpLoginOptions {
  slug: string;
  sessionAccessToken: string | null | undefined;
  fetcher?: Fetcher;
  windowRef?: Window;
  readApiKey?: () => string;
  storeApiKeyValue?: (key: string) => boolean;
  /**
   * Client mirror of the server UNCLICK_LOGIN_CONNECT_ENABLED flag. Injected so
   * tests can pin it; defaults to reading VITE_UNCLICK_LOGIN_CONNECT_ENABLED.
   */
  loginConnectEnabled?: boolean;
}

// Client mirror of the server UNCLICK_LOGIN_CONNECT_ENABLED flag (default OFF).
// When on AND the user has a session, the hosted-MCP sign-in authenticates with
// the Supabase session JWT and never asks for the browser-cached account key,
// matching what /connect/:platform (Connect.tsx) already does. The server
// enforces its own flag independently; the cached-key path stays as the
// fallback when the flag is off or there is no session.
function viteLoginConnectEnabled(): boolean {
  const env = import.meta.env as Record<string, string | undefined>;
  const v = String(env.VITE_UNCLICK_LOGIN_CONNECT_ENABLED ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

export function openHostedConnectionPopup(windowRef: Window, slug: string): Window | null {
  const width = 560;
  const height = 760;
  const dualScreenLeft = windowRef.screenLeft ?? windowRef.screenX ?? 0;
  const dualScreenTop = windowRef.screenTop ?? windowRef.screenY ?? 0;
  const viewportWidth =
    windowRef.outerWidth
    || windowRef.document?.documentElement?.clientWidth
    || windowRef.screen?.width
    || width;
  const viewportHeight =
    windowRef.outerHeight
    || windowRef.document?.documentElement?.clientHeight
    || windowRef.screen?.height
    || height;
  const left = Math.max(0, Math.round(dualScreenLeft + (viewportWidth - width) / 2));
  const top = Math.max(0, Math.round(dualScreenTop + (viewportHeight - height) / 2));
  const popup = windowRef.open(
    "",
    `unclick_connect_${slug}`,
    `popup=yes,width=${width},height=${height},left=${left},top=${top}`,
  );
  if (!popup) return null;
  popup.focus();
  try {
    popup.document.title = "Connect app";
    popup.document.body.style.margin = "0";
    popup.document.body.style.background = "#061a22";
    popup.document.body.style.color = "#e7fbff";
    popup.document.body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    popup.document.body.innerHTML = [
      "<div style=\"min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center;\">",
      "<div>",
      "<div style=\"width:28px;height:28px;margin:0 auto 14px;border:3px solid rgba(119,235,238,.25);border-top-color:#77ebee;border-radius:50%;animation:spin 1s linear infinite;\"></div>",
      "<p style=\"margin:0;font-size:15px;font-weight:700;\">Opening secure sign-in...</p>",
      "<p style=\"margin:8px 0 0;font-size:12px;color:rgba(231,251,255,.66);\">This window will continue with the app provider.</p>",
      "<style>@keyframes spin{to{transform:rotate(360deg)}}</style>",
      "</div>",
      "</div>",
    ].join("");
  } catch {
    // Best effort only. Some browsers may lock about:blank document writes.
  }
  return popup;
}

export async function ensureLocalConnectionApiKey({
  sessionAccessToken,
  fetcher = fetch,
  readApiKey = readStoredApiKey,
  storeApiKeyValue = storeApiKey,
}: Omit<HostedMcpLoginOptions, "slug" | "windowRef" | "loginConnectEnabled">): Promise<string> {
  const existing = readApiKey().trim();
  if (existing) return existing;
  if (!sessionAccessToken) throw new Error("Sign in again to connect apps.");

  const res = await fetcher("/api/memory-admin?action=generate_api_key", {
    method: "POST",
    headers: { Authorization: `Bearer ${sessionAccessToken}` },
  });
  const body = (await res.json().catch(() => ({}))) as GenerateKeyResponse;
  if (!res.ok) throw new Error(body.error ?? `Could not prepare account access (${res.status}).`);
  if (body.api_key && storeApiKeyValue(body.api_key)) return body.api_key;

  throw new Error(
    body.already_provisioned
      ? "This browser needs your private UnClick account key once before it can save a new app login."
      : "Could not prepare your UnClick account key for this browser.",
  );
}

export async function startHostedMcpLogin({
  slug,
  sessionAccessToken,
  fetcher = fetch,
  windowRef = window,
  readApiKey,
  storeApiKeyValue,
  loginConnectEnabled = viteLoginConnectEnabled(),
}: HostedMcpLoginOptions): Promise<Window | null> {
  const popup = openHostedConnectionPopup(windowRef, slug);
  try {
    // Login-connect: with the flag on and a live session, the session JWT
    // authenticates oauth-init and the server stores a server-scheme row keyed
    // to the account lane. No browser-cached UnClick account key is required or
    // requested, mirroring Connect.tsx. Otherwise fall back to the cached/minted
    // api-key path unchanged.
    const useSession = loginConnectEnabled && Boolean(sessionAccessToken);

    let res: Response;
    if (useSession) {
      res = await fetcher("/api/oauth-init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionAccessToken}`,
        },
        body: JSON.stringify({ platform: slug }),
      });
    } else {
      const apiKey = await ensureLocalConnectionApiKey({
        sessionAccessToken,
        fetcher,
        readApiKey,
        storeApiKeyValue,
      });
      res = await fetcher("/api/oauth-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: slug, api_key: apiKey }),
      });
    }
    const body = (await res.json().catch(() => ({}))) as OAuthInitResponse;
    if (!res.ok || !body.authorization_url) {
      throw new Error(body.error ?? `Could not start ${slug} sign-in (${res.status}).`);
    }
    if (!popup) {
      windowRef.location.assign(body.authorization_url);
      return null;
    }
    popup.location.assign(body.authorization_url);
    return popup;
  } catch (err) {
    if (popup && !popup.closed) popup.close();
    throw err;
  }
}
