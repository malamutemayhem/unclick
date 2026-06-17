import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type AuthorizeResponse = {
  redirect_to?: string;
  error?: string;
};

const REQUIRED_PARAMS = ["client_id", "redirect_uri", "response_type", "code_challenge", "code_challenge_method"];

export default function McpAuthorizePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, loading } = useSession();
  const [error, setError] = useState("");
  const [authorizing, setAuthorizing] = useState(false);

  const nextPath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `/mcp/authorize?${query}` : "/mcp/authorize";
  }, [searchParams]);

  const missingParam = useMemo(() => REQUIRED_PARAMS.find((key) => !searchParams.get(key)) ?? "", [searchParams]);
  const clientLabel = searchParams.get("client_name") || "this MCP app";

  useEffect(() => {
    if (!loading && !session) {
      navigate(`/login?next=${encodeURIComponent(nextPath)}`, { replace: true });
    }
  }, [loading, navigate, nextPath, session]);

  const handleConnect = useCallback(async () => {
    if (!session) return;
    setError("");
    if (missingParam) {
      setError(`Missing ${missingParam}.`);
      return;
    }

    setAuthorizing(true);
    const body = Object.fromEntries(searchParams.entries());
    try {
      const res = await fetch("/api/mcp/oauth/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as AuthorizeResponse;
      if (!res.ok || !data.redirect_to) {
        setError(data.error ?? "Could not connect this MCP app.");
        setAuthorizing(false);
        return;
      }
      window.location.assign(data.redirect_to);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
      setAuthorizing(false);
    }
  }, [missingParam, searchParams, session]);

  const hasBlockingError = Boolean(missingParam);
  const displayError = error || (missingParam ? `Missing ${missingParam}.` : "");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[72vh] w-full max-w-xl items-center px-4 py-20">
        <section className="w-full rounded-lg border border-border/60 bg-card/45 p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
            {displayError ? (
              <ShieldCheck className="h-6 w-6 text-primary" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-primary" />
            )}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-heading">
            {displayError ? "Connection needs attention" : "Connect UnClick"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {displayError || `Approve ${clientLabel} to use your UnClick tools.`}
          </p>
          {!hasBlockingError ? (
            <Button
              className="mt-6 gap-2 bg-primary text-black hover:opacity-90"
              disabled={loading || !session || authorizing}
              onClick={handleConnect}
            >
              {authorizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {error ? "Try again" : "Connect UnClick"}
            </Button>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
