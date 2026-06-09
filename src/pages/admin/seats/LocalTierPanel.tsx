import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Save, AlertTriangle } from "lucide-react";
import {
  latestProfileCheckInAt,
  AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY,
  buildSeatOverrideStoragePayload,
  buildSeatPerformanceScores,
  loadSeatOverridesFromStorage,
  normalizeSeatRoutingPolicy,
  mapProfilesToSeats,
  unmatchedRecentProfiles,
  type AISeat,
  type FishbowlProfile,
  type SeatRoutingPolicy,
} from "../AdminAgentsSeatUtils";
import { useSession } from "@/lib/auth";

const AI_SEAT_EMOJI_OPTIONS = [
  { emoji: "💻", label: "Laptop / default" },
  { emoji: "🖥️", label: "Desktop" },
  { emoji: "📱", label: "Mobile" },
  { emoji: "🔳", label: "Tablet" },
  { emoji: "🔲", label: "Virtual slot" },
  { emoji: "🖱️", label: "Mouse" },
  { emoji: "⌨️", label: "Keyboard" },
  { emoji: "🎛️", label: "Control panel" },
  { emoji: "🕹️", label: "Controller" },
  { emoji: "📺", label: "Display" },
  { emoji: "🔌", label: "Plugged in" },
  { emoji: "🔋", label: "Battery" },
  { emoji: "🪫", label: "Low battery" },
  { emoji: "📶", label: "Signal bars" },
  { emoji: "🛜", label: "Wi-Fi" },
  { emoji: "🌐", label: "Web seat" },
  { emoji: "💾", label: "Local disk" },
  { emoji: "💽", label: "Archive disk" },
  { emoji: "🧮", label: "Compute" },
  { emoji: "📟", label: "Terminal" },
  { emoji: "🖨️", label: "Printer" },
  { emoji: "📠", label: "Legacy line" },
] as const;

const AI_SEATS: AISeat[] = [
  {
    id: "seat-1",
    name: "AI Seat 1",
    emoji: "💻",
    provider: "Unknown AI",
    device: "Unknown device",
    status: "Ready",
    state: "Cycle-share capacity",
    load: 25,
    assigned: "General capacity",
    issue: "",
    routingPolicy: "auto",
  },
  {
    id: "seat-2",
    name: "AI Seat 2",
    emoji: "💻",
    provider: "Unknown AI",
    device: "Unknown device",
    status: "Ready",
    state: "Cycle-share capacity",
    load: 25,
    assigned: "General capacity",
    issue: "",
    routingPolicy: "auto",
  },
  {
    id: "seat-3",
    name: "AI Seat 3",
    emoji: "💻",
    provider: "Unknown AI",
    device: "Unknown device",
    status: "Ready",
    state: "Cycle-share capacity",
    load: 25,
    assigned: "General capacity",
    issue: "",
    routingPolicy: "auto",
  },
  {
    id: "seat-4",
    name: "AI Seat 4",
    emoji: "💻",
    provider: "Unknown AI",
    device: "Unknown device",
    status: "Ready",
    state: "Cycle-share capacity",
    load: 25,
    assigned: "General capacity",
    issue: "",
    routingPolicy: "auto",
  },
  {
    id: "virtual-review",
    name: "Virtual review seat",
    emoji: "🔲",
    provider: "Virtual support",
    device: "Spawned when physical capacity is unavailable",
    status: "Standby",
    state: "Fallback only",
    load: 0,
    assigned: "Review / fallback",
    issue: "",
    isVirtual: true,
    routingPolicy: "avoid",
  },
];

function loadSeatOverrides(): AISeat[] {
  return loadSeatOverridesFromStorage(AI_SEATS);
}

function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("unclick_api_key") ?? "";
}

function relativeTime(iso: string | null | undefined): string {
  if (!iso) return "No check-in yet";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "Unknown";
  const diffSec = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 14) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString();
}

async function api<T>(action: string, opts: RequestInit = {}, authToken = getApiKey()): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string> | undefined),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  const res = await fetch(`/api/memory-admin?action=${action}`, { ...opts, headers });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

function profileDisplayName(profile: FishbowlProfile): string {
  const name = profile.display_name?.trim();
  if (name) return name;
  return profile.agent_id
    .replace(/^chatgpt[-_]/, "")
    .replace(/^codex[-_]/, "")
    .replace(/^claude[-_]/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\bAi\b/g, "AI");
}

export default function LocalTierPanel() {
  const { session, loading: sessionLoading } = useSession();
  const authToken = session?.access_token ?? getApiKey();
  const [seats, setSeats] = useState<AISeat[]>(() => loadSeatOverrides());
  const [profiles, setProfiles] = useState<FishbowlProfile[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [profilesError, setProfilesError] = useState<string | null>(null);
  const [editingSeatId, setEditingSeatId] = useState<string | null>(null);
  const issues = seats.filter((seat) => seat.issue);
  const seatProfiles = useMemo(() => mapProfilesToSeats(seats, profiles), [profiles, seats]);
  const extraProfiles = useMemo(
    () => unmatchedRecentProfiles(profiles, seatProfiles.values()),
    [profiles, seatProfiles],
  );
  const performanceScores = useMemo(
    () => buildSeatPerformanceScores(seats, profiles),
    [profiles, seats],
  );
  const matchedProfileCount = seatProfiles.size;
  const checkInSummary = profilesError
    ? profilesError
    : sessionLoading
      ? "Checking session..."
      : profilesLoading
      ? "Checking live seats..."
      : profiles.length > 0
        ? `${profiles.length} live check-in${profiles.length === 1 ? "" : "s"} loaded`
        : "No live seat check-ins loaded yet";

  const loadProfiles = useCallback(async () => {
    if (sessionLoading) return;
    if (!authToken) {
      setProfiles([]);
      setProfilesError("Sign in to load live check-ins.");
      return;
    }
    setProfilesLoading(true);
    setProfilesError(null);
    try {
      const res = await api<{ profiles?: FishbowlProfile[] }>("fishbowl_read", {
        method: "POST",
        body: JSON.stringify({
          limit: 20,
        }),
      }, authToken);
      setProfiles(
        (res.profiles ?? [])
          .filter((profile) => profile.user_agent_hint !== "admin-ui")
          .sort((a, b) => {
            const aMs = Date.parse(latestProfileCheckInAt(a) ?? a.created_at);
            const bMs = Date.parse(latestProfileCheckInAt(b) ?? b.created_at);
            return bMs - aMs;
          }),
      );
    } catch (error) {
      setProfiles([]);
      setProfilesError(error instanceof Error ? error.message : "Could not load live check-ins.");
    } finally {
      setProfilesLoading(false);
    }
  }, [authToken, sessionLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY, JSON.stringify(buildSeatOverrideStoragePayload(seats)));
  }, [seats]);

  useEffect(() => {
    if (sessionLoading) return;
    queueMicrotask(() => void loadProfiles());
    const id = window.setInterval(() => void loadProfiles(), 30_000);
    return () => window.clearInterval(id);
  }, [loadProfiles, sessionLoading]);

  const updateSeat = (seatId: string, patch: Partial<AISeat>) => {
    setSeats((current) => current.map((seat) => (seat.id === seatId ? { ...seat, ...patch } : seat)));
  };

  const updateRoutingPolicy = (seatId: string, routingPolicy: SeatRoutingPolicy) => {
    updateSeat(seatId, { routingPolicy: normalizeSeatRoutingPolicy(routingPolicy) });
  };

  const spreadEvenly = () => {
    const physical = seats.filter((seat) => !seat.isVirtual);
    const share = physical.length > 0 ? Math.floor(100 / physical.length) : 0;
    const remainder = physical.length > 0 ? 100 - share * physical.length : 0;
    let physicalIndex = 0;
    setSeats((current) =>
      current.map((seat) => {
        if (seat.isVirtual) return { ...seat, load: 0 };
        const load = share + (physicalIndex < remainder ? 1 : 0);
        physicalIndex += 1;
        return { ...seat, load };
      }),
    );
  };

  return (
    <section className="space-y-4">
      <PerformanceMonitorPanel scores={performanceScores} loading={profilesLoading || sessionLoading} />

      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
        <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-heading">Local Seats</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              On-device AI capacity with the newest live check-in shown in each row. Cycle-share is a planning guide.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`hidden rounded-md border px-2 py-1 text-[11px] md:inline-flex ${
                profilesError
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : profiles.length > 0
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-border/40 bg-card/40 text-muted-foreground"
              }`}
              title={matchedProfileCount > 0 ? `${matchedProfileCount} seats matched to live check-ins` : checkInSummary}
            >
              {checkInSummary}
            </span>
            <button
              type="button"
              onClick={() => void loadProfiles()}
              className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-heading"
            >
              {profilesLoading ? "Checking..." : "Refresh"}
            </button>
            <span className="inline-flex w-fit items-center rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Fungible mode
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(210px,1.4fr)_110px_130px_minmax(150px,0.8fr)_minmax(180px,1.2fr)_minmax(190px,1fr)] gap-3 border-b border-border/40 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>Seat</span>
          <span>Status</span>
          <span className="flex items-center justify-between gap-2">
            <span>Cycle share</span>
            <button
              type="button"
              onClick={spreadEvenly}
              className="rounded border border-border/40 bg-card/40 px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-heading transition-colors hover:border-primary/40"
            >
              Even split
            </button>
          </span>
          <span>Last check-in</span>
          <span>Assigned work</span>
          <span>Controls</span>
        </div>
        <div className="divide-y divide-border/30">
          {seats.map((seat) => {
            const editing = editingSeatId === seat.id;
            const matchedProfile = seatProfiles.get(seat.id);
            const matchedCheckInAt = matchedProfile ? latestProfileCheckInAt(matchedProfile) : null;
            const emojiOptions = AI_SEAT_EMOJI_OPTIONS.some((option) => option.emoji === seat.emoji)
              ? AI_SEAT_EMOJI_OPTIONS
              : [{ emoji: seat.emoji, label: "Custom" }, ...AI_SEAT_EMOJI_OPTIONS];
            const routingPolicy = normalizeSeatRoutingPolicy(seat.routingPolicy);
            return (
              <div
                key={seat.id}
                className="grid grid-cols-[minmax(210px,1.4fr)_110px_130px_minmax(150px,0.8fr)_minmax(180px,1.2fr)_minmax(190px,1fr)] items-center gap-3 px-4 py-3 text-xs"
              >
                <div className="min-w-0">
                  {editing ? (
                    <div className="space-y-1">
                      <div className="grid grid-cols-[92px_1fr] gap-1">
                        <select
                          value={seat.emoji}
                          onChange={(event) => updateSeat(seat.id, { emoji: event.target.value })}
                          className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-xs text-heading outline-none focus:border-primary/40"
                          aria-label="Seat emoji"
                        >
                          {emojiOptions.map((option) => (
                            <option key={`${seat.id}-${option.emoji}`} value={option.emoji}>
                              {option.emoji} {option.label}
                            </option>
                          ))}
                        </select>
                        <input
                          value={seat.name}
                          onChange={(event) => updateSeat(seat.id, { name: event.target.value })}
                          className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-xs text-heading outline-none focus:border-primary/40"
                          aria-label="Seat name"
                        />
                      </div>
                      <input
                        value={seat.provider}
                        onChange={(event) => updateSeat(seat.id, { provider: event.target.value })}
                        className="w-full rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[10px] text-body outline-none focus:border-primary/40"
                        aria-label="Seat provider"
                      />
                      <input
                        value={seat.device}
                        onChange={(event) => updateSeat(seat.id, { device: event.target.value })}
                        className="w-full rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[10px] text-body outline-none focus:border-primary/40"
                        aria-label="Seat device"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="truncate font-semibold text-heading">
                        <span className="mr-1.5" aria-hidden="true">{seat.emoji}</span>
                        {seat.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{seat.provider}</p>
                      <p className="text-[10px] text-muted-foreground">{seat.device}</p>
                    </>
                  )}
                </div>
                <div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      seat.status === "Ready"
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : seat.status === "Standby"
                          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                          : "border-border/40 bg-card/40 text-muted-foreground"
                    }`}
                  >
                    {seat.status}
                  </span>
                  <p className="mt-1 text-[10px] text-muted-foreground">{seat.state}</p>
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={seat.load}
                    onChange={(event) => updateSeat(seat.id, { load: Number(event.target.value) })}
                    className="w-full accent-primary"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">{seat.load}%</p>
                </div>
                <div className="min-w-0">
                  {matchedProfile && matchedCheckInAt ? (
                    <>
                      <p className="truncate text-xs font-medium text-heading" title={matchedProfile.agent_id}>
                        {relativeTime(matchedCheckInAt)}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {profileDisplayName(matchedProfile)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground">No check-in yet</p>
                      <p className="text-[10px] text-muted-foreground/70">
                        {profilesError
                          ? "Check-in feed unavailable"
                          : profilesLoading
                            ? "Checking..."
                            : profiles.length > 0
                              ? "No matching live seat"
                              : "Waiting for live seat"}
                      </p>
                    </>
                  )}
                </div>
                <input
                  value={seat.assigned}
                  onChange={(event) => updateSeat(seat.id, { assigned: event.target.value })}
                  className="w-full rounded-md border border-transparent bg-transparent px-0 py-1 text-body outline-none transition-colors focus:border-border/40 focus:bg-card/40 focus:px-2"
                  aria-label={`${seat.name} assigned work`}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title={editing ? "Save seat edits" : "Edit seat"}
                    onClick={() => setEditingSeatId(editing ? null : seat.id)}
                    className="rounded-md border border-border/40 bg-card/40 p-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {editing ? <Save className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                  </button>
                  <select
                    value={routingPolicy}
                    onChange={(event) => updateRoutingPolicy(seat.id, event.target.value as SeatRoutingPolicy)}
                    className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[10px] text-muted-foreground outline-none transition-colors hover:border-primary/40 focus:border-primary/40"
                    aria-label={`${seat.name} routing policy`}
                  >
                    <option value="auto">Auto</option>
                    <option value="prefer">Prefer</option>
                    <option value="avoid">Avoid</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  {seat.issue ? (
                    <span className="text-[10px] text-amber-300">{seat.issue}</span>
                  ) : seat.isVirtual ? (
                    <span className="text-[10px] text-amber-300">Fallback</span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">Manual</span>
                  )}
                </div>
              </div>
            );
          })}
          {extraProfiles.map((profile) => {
            const checkedInAt = latestProfileCheckInAt(profile);
            const checkedInMs = checkedInAt ? Date.parse(checkedInAt) : NaN;
            const isReady = Number.isFinite(checkedInMs) && Date.now() - checkedInMs < 15 * 60 * 1000;
            return (
              <div
                key={`live-${profile.agent_id}`}
                className="grid grid-cols-[minmax(210px,1.4fr)_110px_130px_minmax(150px,0.8fr)_minmax(180px,1.2fr)_minmax(190px,1fr)] items-center gap-3 bg-primary/[0.025] px-4 py-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-heading">
                    <span className="mr-1.5" aria-hidden="true">{profile.emoji ?? "💻"}</span>
                    {profileDisplayName(profile)}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">{profile.agent_id}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{profile.user_agent_hint ?? "Live seat"}</p>
                </div>
                <div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      isReady
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/30 bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {isReady ? "Ready" : "Seen"}
                  </span>
                  <p className="mt-1 text-[10px] text-muted-foreground">Auto-detected</p>
                </div>
                <div>
                  <div className="h-1.5 w-full rounded-full bg-border/60">
                    <div className="h-1.5 w-1/4 rounded-full bg-primary" />
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">Auto</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-heading" title={profile.agent_id}>
                    {relativeTime(checkedInAt)}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {profile.current_status ? "Status updated" : "Checked in"}
                  </p>
                </div>
                <p className="text-body">General capacity</p>
                <p className="text-[10px] text-primary">Live seat</p>
              </div>
            );
          })}
        </div>
      </div>

      {issues.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <h3 className="text-sm font-semibold text-heading">Needs attention</h3>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-body">
            {issues.map((seat) => (
              <li key={seat.id}>
                <span className="font-medium text-heading">{seat.name}:</span> {seat.issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function PerformanceMonitorPanel({
  scores,
  loading,
}: {
  scores: ReturnType<typeof buildSeatPerformanceScores>;
  loading: boolean;
}) {
  const topScores = scores.slice(0, 6);
  const watchCount = scores.filter((score) => score.status !== "strong").length;
  return (
    <section className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
      <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-heading">Performance monitor</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Live seat score from check-ins, missed tethers, load, and routing policy.
          </p>
        </div>
        <span
          className={`w-fit rounded-md border px-2 py-1 text-[11px] ${
            watchCount > 0
              ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {loading ? "Refreshing..." : watchCount > 0 ? `${watchCount} need watch` : "All strong"}
        </span>
      </div>
      <div className="grid gap-2 p-4 md:grid-cols-2 xl:grid-cols-3">
        {topScores.map((score) => (
          <div key={score.id} className="rounded-lg border border-border/30 bg-card/30 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-heading">{score.label}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{score.reasons.join(", ")}</p>
              </div>
              <span
                className={`rounded-md border px-2 py-1 text-xs font-semibold ${
                  score.status === "strong"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : score.status === "watch"
                      ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                      : score.status === "stale"
                        ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                        : "border-rose-400/30 bg-rose-400/10 text-rose-300"
                }`}
              >
                {score.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
