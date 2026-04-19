/**
 * MemoryHealthPill - compact live health indicator for the admin shell.
 *
 * Shows a dot + short label summarising whether UnClick is reachable and
 * whether there is anything in memory. Hovering or focusing reveals a
 * small breakdown. Auto-refreshes every 60 seconds so users can watch
 * their memory grow.
 */

import { useEffect, useMemo, useState } from "react";

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

type Tone = "healthy" | "warn" | "off";

function pickTone(data: HealthData | null): Tone {
  if (!data) return "off";
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
  const apiKey = useMemo(() => {
    try {
      return localStorage.getItem(API_KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;
    async function fetchOnce() {
      try {
        const res = await fetch(
          `/api/memory-admin?action=admin_check_connection&api_key=${encodeURIComponent(apiKey)}`
        );
        if (!res.ok) return;
        const body = (await res.json()) as HealthData;
        if (!cancelled) setData(body);
      } catch {
        // ignore
      }
    }
    fetchOnce();
    const iv = window.setInterval(fetchOnce, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
    };
  }, [apiKey]);

  const tone = pickTone(data);
  const label =
    tone === "healthy"
      ? "Memory on"
      : tone === "warn"
      ? "No memory yet"
      : "Not connected";
  const dotClass =
    tone === "healthy"
      ? "bg-green-500"
      : tone === "warn"
      ? "bg-[#E2B93B]"
      : "bg-white/20";

  const title = data
    ? `${label}. Identity: ${data.context_count}. Facts: ${data.fact_count}. Last session ${shortTime(
        data.last_session ?? data.last_used_at
      )} ago.`
    : "Memory status unknown";

  return (
    <span
      title={title}
      aria-label={title}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70"
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotClass}`} />
      <span className="hidden sm:inline">{label}</span>
    </span>
  );
}
