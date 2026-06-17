import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Copy, ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

const PUBLIC_MCP_URL = "https://unclick.world/api/mcp";
const STORAGE_KEY = "unclick_api_key";

type ProfileResponse = {
  api_key?: { prefix?: string | null } | null;
  generated_api_key?: string | null;
  email?: string | null;
  error?: string;
};

type PublicPairResponse = {
  paired?: boolean;
  error?: string;
};

function maskPrivateValue(value: string) {
  return value
    .replace(/uc_[A-Za-z0-9_-]{8,}/g, (key) => `${key.slice(0, 6)}...${key.slice(-4)}`)
    .replace(
      /(pair=)([A-Za-z0-9_-]{6})[A-Za-z0-9_-]{8,}([A-Za-z0-9_-]{4})/g,
      "$1$2...$3",
    )
    .replace(
      /(\/api\/mcp\/p\/)([A-Za-z0-9_-]{6})[A-Za-z0-9_-]{8,}([A-Za-z0-9_-]{4})/g,
      "$1$2...$3",
    );
}

export default function PairingCompletePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, loading } = useSession();
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState("");
  const [publicPairStatus, setPublicPairStatus] = useState<"idle" | "none" | "paired" | "error">("idle");
  const [copied, setCopied] = useState<"public" | "compat" | null>(null);
  const pairId = searchParams.get("pair") ?? "";

  useEffect(() => {
    if (!loading && !session) {
      const next = pairId ? `/pair/connected?pair=${encodeURIComponent(pairId)}` : "/pair/connected";
      navigate(`/login?next=${encodeURIComponent(next)}`, { replace: true });
    }
  }, [loading, navigate, pairId, session]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    (async () => {
      setLoadingProfile(true);
      setError("");
      setPublicPairStatus(pairId ? "idle" : "none");
      try {
        const res = await fetch("/api/memory-admin?action=admin_profile", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const body = (await res.json().catch(() => ({}))) as ProfileResponse;
        if (cancelled) return;
        if (!res.ok) {
          setError(body.error ?? "Your sign-in worked, but we could not prepare the connection yet.");
          return;
        }
        setEmail(body.email ?? session.user.email ?? "");
        if (body.generated_api_key) {
          setApiKey(body.generated_api_key);
          try {
            localStorage.setItem(STORAGE_KEY, body.generated_api_key);
          } catch {
            // Ignore private browsing storage failures.
          }
        } else if (body.api_key?.prefix) {
          try {
            const cached = localStorage.getItem(STORAGE_KEY) ?? "";
            if (cached.startsWith(body.api_key.prefix)) setApiKey(cached);
          } catch {
            // Ignore.
          }
        }

        if (pairId) {
          const pairRes = await fetch("/api/memory-admin?action=public_mcp_pair", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ pair_id: pairId }),
          });
          const pairBody = (await pairRes.json().catch(() => ({}))) as PublicPairResponse;
          if (cancelled) return;
          if (!pairRes.ok || !pairBody.paired) {
            setPublicPairStatus("error");
            setError(pairBody.error ?? "Your sign-in worked, but the public pairing could not be saved yet.");
            return;
          }
          setPublicPairStatus("paired");
        } else {
          setPublicPairStatus("none");
        }
      } catch (err) {
        if (!cancelled) {
          setPublicPairStatus(pairId ? "error" : "none");
          setError(err instanceof Error ? err.message : "Network error.");
        }
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pairId, session]);

  async function copy(value: string, key: "public" | "compat") {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1800);
  }

  const compatibilityUrl = apiKey ? `${PUBLIC_MCP_URL}?key=${apiKey}` : "";
  const displayCompatibilityUrl = compatibilityUrl ? maskPrivateValue(compatibilityUrl) : "";
  const pairedMcpUrl =
    pairId && publicPairStatus === "paired"
      ? `${PUBLIC_MCP_URL}/p/${encodeURIComponent(pairId)}`
      : "";
  const primaryMcpUrl = pairedMcpUrl || PUBLIC_MCP_URL;
  const displayPrimaryMcpUrl = pairedMcpUrl ? maskPrivateValue(pairedMcpUrl) : PUBLIC_MCP_URL;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[72vh] w-full max-w-2xl items-center px-4 py-20">
        <section className="w-full rounded-2xl border border-border/60 bg-card/45 p-6 shadow-lg sm:p-8">
          {loading || loadingProfile ? (
            <div className="py-10 text-center">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-primary" />
              <h1 className="mt-4 text-xl font-semibold text-heading">Preparing UnClick</h1>
              <p className="mt-1 text-sm text-muted-foreground">One moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h1 className="mt-4 text-2xl font-semibold text-heading">UnClick is ready</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {email ? `${email} is signed in. ` : ""}
                  {publicPairStatus === "paired"
                    ? "This pairing token is saved. The normal MCP URL is still https://unclick.world/api/mcp. Use the paired URL below only if your AI app keeps asking for fresh links."
                    : "Return to your AI app and keep using the public MCP URL."}
                </p>
              </div>

              {error ? (
                <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}

              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-heading">
                      {pairedMcpUrl ? "Fallback paired URL for this AI app" : "Use the public door first"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {pairedMcpUrl
                        ? "Use this only if the generic MCP URL cannot finish web sign-in. It is not your API key, but keep it private."
                        : "This address carries no personal key. After pairing, it can stay forever."}
                    </p>
                    {publicPairStatus === "paired" ? (
                      <p className="mt-2 text-xs font-medium text-primary">Public pairing saved.</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 flex items-stretch gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-md border border-border/50 bg-background/50 px-3 py-2 font-mono text-xs text-heading">
                    {displayPrimaryMcpUrl}
                  </code>
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 bg-primary text-black hover:opacity-90"
                    onClick={() => void copy(primaryMcpUrl, "public")}
                  >
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    {copied === "public" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <details className="rounded-xl border border-border/60 bg-background/25 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-heading">
                  Compatibility URL for older AI apps
                </summary>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Use this only if your AI app cannot use web sign-in or paired URLs. It contains a private connection key, so the full value stays hidden on screen.
                </p>
                {compatibilityUrl ? (
                  <div className="mt-3 flex items-stretch gap-2">
                    <code className="min-w-0 flex-1 truncate rounded-md border border-border/50 bg-card/60 px-3 py-2 font-mono text-xs text-heading">
                      {displayCompatibilityUrl}
                    </code>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                      onClick={() => void copy(compatibilityUrl, "compat")}
                    >
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      {copied === "compat" ? "Copied" : "Copy"}
                    </Button>
                  </div>
                ) : (
                  <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">
                    This browser does not have the private key available. Open the installer to make a fresh compatibility URL.
                  </p>
                )}
              </details>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild className="bg-primary text-black hover:opacity-90">
                  <Link to="/admin/apps">
                    Connect apps
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/#install">Open installer</Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
