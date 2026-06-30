/**
 * MemoryHealthPill - compact live health indicator for the admin shell.
 *
 * Shows a dot + short label summarising whether UnClick is reachable and
 * whether there is anything in memory. Hovering or focusing reveals a
 * small breakdown. Auto-refreshes every 60 seconds so users can watch
 * their memory grow.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth";

const API_KEY_STORAGE = "unclick_api_key";
const REFRESH_MS = 60_000;

interface HealthData {
  connected: boolean;
  configured: boolean;
  has_context: boolean;
  context_count: number;
  fact_count: number;
  last_session: string | null;
  last_used_at: string | null;
}

// "unknown" means the last fetch failed or has not returned yet, so we must
// not keep claiming the old "Memory on" state. "off" means a fetch succeeded
// and reported not connected.
type Tone = "healthy" | "warn" | "off" | "unknown";

function pickTone(data: HealthData | null, errored: boolean): Tone {
  if (errored) return "unknown";
  if (!data) return "unknown";
  if (data.connected && (data.has_context || data.fact_count > 0)) return "healthy";
  if (data.connected) return "warn";
  return "off";
}

function shortTime(iso: string | null): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export default function MemoryHealthPill() {
  const [data, setData] = useState<HealthData | null>(null);
  const [errored, setErrored] = useState(false);
  const [checking, setChecking] = useState(false);
  const { session } = useSession();
  const storedApiKey = useMemo(() => {
    try {
      return localStorage.getItem(API_KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  }, []);

  const token = session?.access_token;
  const apiKey = token ? "" : storedApiKey;

  const fetchOnce = useCallback(async () => {
    if (!apiKey && !token) return;
    setChecking(true);
    try {
      let res: Response;
      if (apiKey) {
        res = await fetch(
          `/api/memory-admin?action=admin_check_connection&api_key=${encodeURIComponent(apiKey)}`
        );
      } else {
        res = await fetch("/api/memory-admin?action=admin_check_connection", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      if (!res.ok) {
        setErrored(true);
        return;
      }
      const body = (await res.json()) as HealthData;
      setData(body);
      setErrored(false);
    } catch {
      // A failed fetch must not keep showing a stale green pill.
      setErrored(true);
    } finally {
      setChecking(false);
    }
  }, [apiKey, token]);

  useEffect(() => {
    if (!apiKey && !token) return;
    let cancelled = false;
    const run = () => { if (!cancelled) void fetchOnce(); };
    run();
    const iv = window.setInterval(run, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
    };
  }, [apiKey, token, fetchOnce]);

  const tone = pickTone(data, errored);
  const label =
    tone === "healthy"
      ? "Memory on"
      : tone === "warn"
      ? "No memory yet"
      : tone === "off"
      ? "Not connected"
      : "Checking...";
  const dotClass =
    tone === "healthy"
      ? "bg-green-500"
      : tone === "warn"
      ? "bg-[#E2B93B]"
      : tone === "off"
      ? "bg-white/20"
      : "bg-white/40";

  const title =
    tone === "unknown"
      ? "Memory status unknown - last check did not return. Click Check now to retry."
      : data
      ? `${label}. Identity: ${data.context_count}. Facts: ${data.fact_count}. Last session ${
          data.last_session ?? data.last_used_at ? `${shortTime(data.last_session ?? data.last_used_at)} ago` : "never"
        }.`
      : "Memory status unknown";

  return (
    <span
      title={title}
      aria-label={title}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70"
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotClass} ${checking ? "animate-pulse" : ""}`} />
      <span className="hidden sm:inline">{label}</span>
      <button
        type="button"
        onClick={() => void fetchOnce()}
        disabled={checking}
        className="ml-0.5 rounded-full px-1 text-[10px] text-white/45 transition-colors hover:text-white/80 disabled:opacity-40"
        title="Check memory status now"
      >
        Check now
      </button>
    </span>
  );
}
