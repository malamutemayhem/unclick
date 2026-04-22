/**
 * AdminBuild - UnClick Build cockpit (/admin/build)
 *
 * Read-only v0: displays Vibe Kanban projects and their tasks.
 * Proxy layer: /api/build proxies to the Vibe Kanban REST API so
 * credentials never reach the browser.
 *
 * Chunk 2 adds write actions (create task, move status).
 * Chunk 4 adds TestPass integration.
 */

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Kanban,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────

interface VKProject {
  id:         string;
  name:       string;
  color?:     string;
  sort_order?: number;
}

interface VKTask {
  id:          string;
  title:       string;
  status_id?:  string;
  priority?:   string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  assignee_user_id?: string | null;
}

interface ProjectWithTasks extends VKProject {
  tasks:    VKTask[];
  loading:  boolean;
  expanded: boolean;
  error:    string | null;
}

// ── Helpers ───────────────────────────────────────────────────────

function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Rough heuristic: map status_id or priority to a readable label/color.
// Vibe Kanban uses user-defined status IDs; we bucket by common patterns.
function taskStatusLabel(task: VKTask): { label: string; color: string } {
  const sid = (task.status_id ?? "").toLowerCase();
  if (sid.includes("done") || sid.includes("complete") || sid.includes("close")) {
    return { label: "Done", color: "text-green-400" };
  }
  if (sid.includes("progress") || sid.includes("doing") || sid.includes("active")) {
    return { label: "In Progress", color: "text-[#61C1C4]" };
  }
  if (sid.includes("stall") || sid.includes("block") || sid.includes("wait")) {
    return { label: "Stalled", color: "text-[#E2B93B]" };
  }
  if (sid.includes("cancel") || sid.includes("reject")) {
    return { label: "Cancelled", color: "text-red-400" };
  }
  return { label: "Todo", color: "text-[#888]" };
}

function priorityBadge(priority: string | undefined) {
  if (!priority) return null;
  const p = priority.toLowerCase();
  const cls =
    p === "urgent" ? "border-red-500/30 bg-red-500/10 text-red-400" :
    p === "high"   ? "border-orange-500/30 bg-orange-500/10 text-orange-400" :
    p === "medium" ? "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]" :
    "border-white/[0.06] bg-white/[0.03] text-[#666]";
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cls}`}>
      {priority}
    </span>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────

function StatsBar({ projects }: { projects: ProjectWithTasks[] }) {
  const allTasks = projects.flatMap((p) => p.tasks);
  const total      = allTasks.length;
  const inProgress = allTasks.filter((t) => taskStatusLabel(t).label === "In Progress").length;
  const done       = allTasks.filter((t) => taskStatusLabel(t).label === "Done").length;
  const stalled    = allTasks.filter((t) => taskStatusLabel(t).label === "Stalled").length;

  const stat = (label: string, value: number, cls: string) => (
    <div className="flex flex-col gap-0.5 rounded-lg border border-white/[0.06] bg-[#111111] px-4 py-3 text-center">
      <span className={`text-xl font-semibold tabular-nums ${cls}`}>{value}</span>
      <span className="text-[11px] text-[#666]">{label}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stat("Total tasks",  total,      "text-white")}
      {stat("In progress",  inProgress, "text-[#61C1C4]")}
      {stat("Stalled",      stalled,    "text-[#E2B93B]")}
      {stat("Done",         done,       "text-green-400")}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────

export default function AdminBuild() {
  const { session } = useSession();

  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const authHeader = session
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};

  const fetchProjects = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/build?action=list_projects", { headers: authHeader });
      if (!res.ok) {
        const b = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(b.error ?? `Failed with ${res.status}`);
      }
      const b = await res.json() as { projects: VKProject[] };
      setProjects(
        (b.projects ?? []).map((p) => ({ ...p, tasks: [], loading: false, expanded: false, error: null })),
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { void fetchProjects(); }, [fetchProjects]);

  async function toggleProject(idx: number) {
    const proj = projects[idx];
    if (!proj) return;
    if (proj.expanded) {
      setProjects((prev) => prev.map((p, i) => i === idx ? { ...p, expanded: false } : p));
      return;
    }
    // Expand and load tasks if not yet fetched
    setProjects((prev) => prev.map((p, i) => i === idx ? { ...p, expanded: true, loading: true } : p));
    try {
      const res = await fetch(`/api/build?action=list_tasks&project_id=${encodeURIComponent(proj.id)}`, {
        headers: authHeader,
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(b.error ?? `Failed with ${res.status}`);
      }
      const b = await res.json() as { tasks: VKTask[] };
      setProjects((prev) => prev.map((p, i) =>
        i === idx ? { ...p, loading: false, tasks: b.tasks ?? [], error: null } : p,
      ));
    } catch (err) {
      setProjects((prev) => prev.map((p, i) =>
        i === idx ? { ...p, loading: false, error: (err as Error).message } : p,
      ));
    }
  }

  // ── Unconfigured state ───────────────────────────────────────
  if (!loading && error?.includes("VIBE_KANBAN_URL")) {
    return (
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-white">Build</h1>
        <p className="mb-8 text-sm text-[#888]">UnClick Build cockpit - Vibe Kanban orchestration</p>
        <div className="rounded-xl border border-[#E2B93B]/20 bg-[#E2B93B]/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
            <div>
              <p className="text-sm font-medium text-white">Vibe Kanban not connected</p>
              <p className="mt-1 text-xs text-[#888]">
                Set these Vercel environment variables to connect your Vibe Kanban instance:
              </p>
              <div className="mt-3 space-y-1 font-mono text-xs text-[#E2B93B]">
                <p>VIBE_KANBAN_URL=https://your-app.up.railway.app</p>
                <p>VIBE_KANBAN_TOKEN=your-bearer-token</p>
                <p>VIBE_KANBAN_ORG_ID=your-org-uuid</p>
              </div>
              <p className="mt-3 text-xs text-[#666]">
                See the Railway deployment guide below to get these values.
              </p>
            </div>
          </div>
        </div>
        <DeployGuide />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Build</h1>
          <p className="mt-1 text-sm text-[#888]">Vibe Kanban project orchestration</p>
        </div>
        <button
          onClick={fetchProjects}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#888] transition-colors hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-[#666]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading projects...</span>
        </div>
      ) : error ? (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-[#111111] p-8 text-center">
          <Kanban className="mx-auto h-8 w-8 text-[#333]" />
          <p className="mt-3 text-sm text-[#666]">No projects found</p>
          <p className="mt-1 text-xs text-[#444]">
            Create a project in Vibe Kanban and it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <StatsBar projects={projects} />

          <div className="space-y-3">
            {projects.map((proj, idx) => {
              const statusCounts = {
                inProgress: proj.tasks.filter((t) => taskStatusLabel(t).label === "In Progress").length,
                stalled:    proj.tasks.filter((t) => taskStatusLabel(t).label === "Stalled").length,
                done:       proj.tasks.filter((t) => taskStatusLabel(t).label === "Done").length,
                todo:       proj.tasks.filter((t) => taskStatusLabel(t).label === "Todo").length,
              };
              const lastActivity = proj.tasks.reduce<string | null>((latest, t) => {
                const ts = t.updated_at ?? t.created_at;
                if (!ts) return latest;
                if (!latest || ts > latest) return ts;
                return latest;
              }, null);

              return (
                <div key={proj.id} className="rounded-xl border border-white/[0.06] bg-[#111111]">
                  {/* Project header */}
                  <button
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    onClick={() => toggleProject(idx)}
                  >
                    <div
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: proj.color ?? "#61C1C4" }}
                    />
                    <span className="flex-1 text-sm font-semibold text-white">{proj.name}</span>
                    <div className="flex items-center gap-3 text-[11px] text-[#666]">
                      {proj.tasks.length > 0 && (
                        <>
                          {statusCounts.inProgress > 0 && (
                            <span className="text-[#61C1C4]">{statusCounts.inProgress} active</span>
                          )}
                          {statusCounts.stalled > 0 && (
                            <span className="text-[#E2B93B]">{statusCounts.stalled} stalled</span>
                          )}
                          <span>{proj.tasks.length} tasks</span>
                          <span>last {timeAgo(lastActivity)}</span>
                        </>
                      )}
                      {proj.expanded && !proj.loading && proj.tasks.length === 0 && (
                        <span>no tasks</span>
                      )}
                    </div>
                    {proj.expanded
                      ? <ChevronDown className="h-4 w-4 shrink-0 text-[#555]" />
                      : <ChevronRight className="h-4 w-4 shrink-0 text-[#555]" />}
                  </button>

                  {/* Task list */}
                  {proj.expanded && (
                    <div className="border-t border-white/[0.06]">
                      {proj.loading ? (
                        <div className="flex items-center gap-2 px-5 py-4 text-[#666]">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span className="text-xs">Loading tasks...</span>
                        </div>
                      ) : proj.error ? (
                        <div className="flex items-center gap-2 px-5 py-4 text-red-400">
                          <XCircle className="h-3.5 w-3.5" />
                          <span className="text-xs">{proj.error}</span>
                        </div>
                      ) : proj.tasks.length === 0 ? (
                        <p className="px-5 py-4 text-xs text-[#555]">No tasks in this project.</p>
                      ) : (
                        <div className="divide-y divide-white/[0.04]">
                          {proj.tasks.map((task) => {
                            const { label, color } = taskStatusLabel(task);
                            return (
                              <div key={task.id} className="flex items-start gap-3 px-5 py-3">
                                <StatusIcon label={label} />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm text-white">{task.title}</p>
                                  {task.description && (
                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[#555]">
                                      {task.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                  {priorityBadge(task.priority)}
                                  <span className={`text-[11px] font-medium ${color}`}>{label}</span>
                                  {(task.updated_at ?? task.created_at) && (
                                    <span className="flex items-center gap-0.5 text-[11px] text-[#555]">
                                      <Clock className="h-3 w-3" />
                                      {timeAgo(task.updated_at ?? task.created_at)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusIcon({ label }: { label: string }) {
  if (label === "Done") return <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />;
  if (label === "In Progress") return <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-[#61C1C4]" />;
  if (label === "Stalled") return <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E2B93B]" />;
  if (label === "Cancelled") return <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />;
  return <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[#555]" />;
}

// ── Railway deployment guide (shown when unconfigured) ────────────

function DeployGuide() {
  return (
    <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#111111] p-6">
      <h2 className="mb-4 text-sm font-semibold text-white">Railway deployment guide</h2>
      <ol className="space-y-4 text-sm text-[#888]">
        <li>
          <span className="mr-2 font-semibold text-white">1.</span>
          Sign up at{" "}
          <a href="https://railway.app" target="_blank" rel="noreferrer" className="text-[#61C1C4] hover:underline">
            railway.app
          </a>{" "}
          (GitHub OAuth, free tier, no credit card needed for initial deploy).
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">2.</span>
          Create a new project. Add a{" "}
          <strong className="text-white">PostgreSQL</strong> service (Railway addon).
          Copy the <code className="rounded bg-white/[0.04] px-1 py-0.5 text-xs text-[#ccc]">DATABASE_URL</code> from its Variables tab.
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">3.</span>
          Add a second service, deploy from{" "}
          <strong className="text-white">GitHub repo</strong>:{" "}
          <code className="rounded bg-white/[0.04] px-1 py-0.5 text-xs text-[#ccc]">BloopAI/vibe-kanban</code>.
          Railway auto-detects the Dockerfile.
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">4.</span>
          Set these env vars on the Vibe Kanban service:
          <div className="mt-2 space-y-1 rounded-lg bg-black/30 p-3 font-mono text-[11px] text-[#ccc]">
            <p>DATABASE_URL=${"{"}"{'{'}{'{'}Postgres.DATABASE_URL{'}'}{'}'}{'}'}</p>
            <p>VIBEKANBAN_REMOTE_JWT_SECRET={"<random-32-char-string>"}</p>
            <p>SELF_HOST_LOCAL_AUTH_EMAIL=chris@malamutemayhem.com</p>
            <p>SELF_HOST_LOCAL_AUTH_PASSWORD={"<strong-password>"}</p>
            <p>VK_ALLOWED_ORIGINS=https://unclick.world</p>
          </div>
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">5.</span>
          Once deployed, note your Railway public URL (e.g.{" "}
          <code className="rounded bg-white/[0.04] px-1 py-0.5 text-xs text-[#ccc]">https://myapp.up.railway.app</code>).
          Log in to Vibe Kanban, go to Settings, copy your Bearer token.
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">6.</span>
          Add to Vercel env vars (unclick-agent-native-endpoints project):
          <div className="mt-2 space-y-1 rounded-lg bg-black/30 p-3 font-mono text-[11px] text-[#ccc]">
            <p>VIBE_KANBAN_URL=https://myapp.up.railway.app</p>
            <p>VIBE_KANBAN_TOKEN={"<your-bearer-token>"}</p>
            <p>VIBE_KANBAN_ORG_ID={"<your-org-uuid-from-vibe-kanban-settings>"}</p>
          </div>
        </li>
        <li>
          <span className="mr-2 font-semibold text-white">7.</span>
          Redeploy on Vercel (or wait for auto-deploy). Refresh this page.
        </li>
      </ol>
    </div>
  );
}
