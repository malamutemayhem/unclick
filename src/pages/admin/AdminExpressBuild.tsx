import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  FileCode2,
  FileText,
  Loader2,
  NotebookTabs,
  Plus,
  Rocket,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth";
import {
  DEFAULT_EXPRESSROOM_DRAFT_INPUT,
  EXPRESSROOM_CODE_STATUS_LABELS,
  EXPRESSROOM_DRAFT_STATUS_LABELS,
  EXPRESSROOM_GUARDRAILS,
  EXPRESSROOM_INDUCTION_TEXT,
  EXPRESSROOM_REQUIRED_FIELDS,
  buildExpressRoomOfficialJobDescription,
  countReadyExpressRoomFields,
  type ExpressRoomCodeStatus,
  type ExpressRoomDraft,
  type ExpressRoomDraftInput,
} from "./expressroom";

type Priority = "low" | "normal" | "high" | "urgent";

interface DraftListResponse {
  drafts?: ExpressRoomDraft[];
  error?: string;
}

interface DraftCreateResponse {
  draft?: ExpressRoomDraft;
  error?: string;
}

interface DraftPromoteResponse {
  draft?: ExpressRoomDraft;
  todo?: { id: string; title: string };
  reused?: boolean;
  error?: string;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function clip(value: string, max = 180): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).trimEnd()}...`;
}

function makeMarkdownBrief(input: ExpressRoomDraftInput): string {
  return [
    `# ${input.job_name_mirror.trim() || "Manual ExpressBuild draft"}`,
    "",
    "## What Chris told the chat agent",
    input.brief_markdown.trim() || "- Not captured yet.",
    "",
    "## Short description",
    input.short_description.trim() || "- Not captured yet.",
    "",
    "## Supplied code status",
    EXPRESSROOM_CODE_STATUS_LABELS[input.supplied_code_status ?? "not_supplied"],
  ].join("\n");
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-wide text-white/45">{children}</span>;
}

function ManualPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#E2B93B]/35 bg-[#E2B93B]/10 px-2.5 py-1 text-xs font-semibold text-[#E2B93B]">
      {children}
    </span>
  );
}

export default function AdminExpressBuild() {
  const { session } = useSession();
  const token = session?.access_token;
  const authHeader = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token],
  );
  const [drafts, setDrafts] = useState<ExpressRoomDraft[]>([]);
  const [form, setForm] = useState<ExpressRoomDraftInput>(DEFAULT_EXPRESSROOM_DRAFT_INPUT);
  const [priority, setPriority] = useState<Priority>("normal");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const readyFields = countReadyExpressRoomFields(form);
  const canCreate = readyFields === EXPRESSROOM_REQUIRED_FIELDS.length && Boolean(token);
  const generatedBrief = makeMarkdownBrief(form);

  const fetchDrafts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/memory-admin?action=expressroom_list_drafts", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 100 }),
      });
      const body = (await res.json().catch(() => ({}))) as DraftListResponse;
      if (!res.ok) throw new Error(body.error ?? "Failed to load ExpressRoom");
      setDrafts(body.drafts ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load ExpressRoom");
    } finally {
      setLoading(false);
    }
  }, [authHeader, token]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      void fetchDrafts();
    }, 0);
    return () => window.clearTimeout(handle);
  }, [fetchDrafts]);

  async function createDraft() {
    if (!canCreate) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/memory-admin?action=expressroom_create_draft", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          brief_markdown: generatedBrief,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as DraftCreateResponse;
      if (!res.ok) throw new Error(body.error ?? "Failed to create Manual draft");
      setForm(DEFAULT_EXPRESSROOM_DRAFT_INPUT);
      setNotice("Manual ExpressRoom draft saved.");
      await fetchDrafts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create Manual draft");
    } finally {
      setSaving(false);
    }
  }

  async function promoteDraft(draft: ExpressRoomDraft) {
    if (!token) return;
    setPromotingId(draft.id);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/memory-admin?action=expressroom_promote_to_todo", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ draft_id: draft.id, priority }),
      });
      const body = (await res.json().catch(() => ({}))) as DraftPromoteResponse;
      if (!res.ok) throw new Error(body.error ?? "Failed to insert into Jobs");
      const todoId = body.todo?.id ?? body.draft?.official_todo_id;
      setNotice(todoId ? `Inserted into official Jobs Board: ${todoId}` : "Draft already has an official job mirror.");
      await fetchDrafts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to insert into Jobs");
    } finally {
      setPromotingId(null);
    }
  }

  function updateForm<Key extends keyof ExpressRoomDraftInput>(key: Key, value: ExpressRoomDraftInput[Key]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#61C1C4]/20 bg-[#0f1717] p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <ManualPill>Manual ExpressBuild</ManualPill>
              <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-white/45">
                ExpressRoom
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">ExpressBuild</h1>
            <p className="mt-2 text-sm leading-6 text-white/60">
              ExpressRoom stores Manual draft builds from outside chat seats. It is disconnected
              from the usual assembly line until you insert a draft into the official Jobs Board.
            </p>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-3 lg:min-w-[420px]">
            <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
              <p className="text-xs uppercase tracking-wide text-white/35">Room</p>
              <p className="mt-1 font-semibold text-white">Drafts only</p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
              <p className="text-xs uppercase tracking-wide text-white/35">Insert path</p>
              <p className="mt-1 font-semibold text-white">Jobs Board</p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
              <p className="text-xs uppercase tracking-wide text-white/35">Done claims</p>
              <p className="mt-1 font-semibold text-white">Not here</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
          <div className="mb-4 flex items-center gap-2">
            <NotebookTabs className="h-4 w-4 text-[#61C1C4]" />
            <h2 className="text-sm font-semibold text-white">Builder induction</h2>
          </div>
          <p className="text-sm leading-6 text-white/60">{EXPRESSROOM_INDUCTION_TEXT}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {EXPRESSROOM_REQUIRED_FIELDS.map((field) => (
              <div key={field} className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                <p className="text-xs uppercase tracking-wide text-white/35">Required</p>
                <p className="mt-1 text-sm font-semibold text-white">{field}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Rocket className="h-4 w-4 text-[#E2B93B]" />
            <h2 className="text-sm font-semibold text-white">Clean insertion path</h2>
          </div>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-white/60">
            <li>Capture the Manual brief and supplied code in ExpressRoom.</li>
            <li>Mirror or create the official job name so both places make sense.</li>
            <li>Insert into the Jobs Board when the draft needs real UnClick integration.</li>
            <li>Use normal repo fit, tests, PR, review, and proof before any DONE claim.</li>
          </ol>
        </div>
      </section>

      <section className="rounded-xl border border-red-400/20 bg-red-500/[0.04] p-5">
        <div className="mb-4 flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-red-200" />
          <h2 className="text-sm font-semibold text-red-100">Manual draft alarm bells</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {EXPRESSROOM_GUARDRAILS.map((guardrail) => (
            <div key={guardrail} className="rounded-lg border border-red-300/15 bg-black/20 p-3 text-sm leading-6 text-red-100/75">
              {guardrail}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Add Manual ExpressRoom job</h2>
            <p className="mt-1 text-sm text-white/50">
              Use this when a chat seat or you want to dump the intake, draft code, and mirror name directly.
            </p>
          </div>
          <ManualPill>{readyFields}/{EXPRESSROOM_REQUIRED_FIELDS.length} ready</ManualPill>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2">
            <FieldLabel>Job name mirror</FieldLabel>
            <input
              value={form.job_name_mirror}
              onChange={(event) => updateForm("job_name_mirror", event.target.value)}
              maxLength={200}
              placeholder="Same name as the official job, or the intended official name"
              className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
            />
          </label>
          <label className="space-y-2">
            <FieldLabel>Official job id mirror</FieldLabel>
            <input
              value={form.official_todo_id ?? ""}
              onChange={(event) => updateForm("official_todo_id", event.target.value || null)}
              placeholder="Optional existing Jobs Board id"
              className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
            />
          </label>
          <label className="space-y-2 lg:col-span-2">
            <FieldLabel>Short description</FieldLabel>
            <input
              value={form.short_description}
              onChange={(event) => updateForm("short_description", event.target.value)}
              maxLength={1000}
              placeholder="Quick read of what this Manual draft is trying to build"
              className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
            />
          </label>
          <label className="space-y-2">
            <FieldLabel>Detailed intake brief</FieldLabel>
            <textarea
              value={form.brief_markdown}
              onChange={(event) => updateForm("brief_markdown", event.target.value)}
              rows={10}
              placeholder="Paste the full chat intake here. This becomes the Brief MD."
              className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#61C1C4]/50"
            />
          </label>
          <label className="space-y-2">
            <FieldLabel>Supplied code</FieldLabel>
            <textarea
              value={form.supplied_code ?? ""}
              onChange={(event) => updateForm("supplied_code", event.target.value)}
              rows={10}
              placeholder="Paste draft code, patch notes, file contents, or say what was not supplied."
              className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#61C1C4]/50"
            />
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="space-y-2">
              <FieldLabel>Code state</FieldLabel>
              <select
                value={form.supplied_code_status ?? "not_supplied"}
                onChange={(event) => updateForm("supplied_code_status", event.target.value as ExpressRoomCodeStatus)}
                className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
              >
                {Object.entries(EXPRESSROOM_CODE_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <FieldLabel>Jobs priority when inserted</FieldLabel>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
                className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
              >
                <option value="low">low</option>
                <option value="normal">normal</option>
                <option value="high">high</option>
                <option value="urgent">urgent</option>
              </select>
            </label>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#61C1C4]" />
              <FieldLabel>Brief MD preview</FieldLabel>
            </div>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-md bg-black/30 p-3 text-xs leading-5 text-white/60">
              {generatedBrief}
            </pre>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={createDraft}
            disabled={!canCreate || saving}
            className="inline-flex items-center gap-2 rounded-lg border border-[#61C1C4]/35 bg-[#61C1C4]/15 px-4 py-2 text-sm font-semibold text-[#61C1C4] hover:bg-[#61C1C4]/25 disabled:opacity-40"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Manual draft
          </button>
          <button
            type="button"
            onClick={() => setForm(DEFAULT_EXPRESSROOM_DRAFT_INPUT)}
            className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-white/55 hover:bg-white/[0.04]"
          >
            Clear
          </button>
          {error && <p className="text-sm text-red-300">{error}</p>}
          {notice && <p className="text-sm text-green-300">{notice}</p>}
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">ExpressRoom table</h2>
            <p className="mt-1 text-sm text-white/50">
              Manual drafts live here until they are inserted into official Jobs.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void fetchDrafts()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-white/60 hover:bg-white/[0.04]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        {drafts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.12] p-8 text-center">
            <FileCode2 className="mx-auto h-8 w-8 text-white/35" />
            <p className="mt-3 text-sm font-semibold text-white">No Manual ExpressRoom drafts yet</p>
            <p className="mt-1 text-sm text-white/45">
              Add the first brief and supplied code above, or let a connected chat seat create one directly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-white/35">
                  <th className="px-3 py-2">Job name mirror</th>
                  <th className="px-3 py-2">Short description</th>
                  <th className="px-3 py-2">Brief MD</th>
                  <th className="px-3 py-2">Supplied code</th>
                  <th className="px-3 py-2">Official job</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((draft) => {
                  const description = buildExpressRoomOfficialJobDescription(draft);
                  return (
                    <tr key={draft.id} className="align-top">
                      <td className="rounded-l-lg border-y border-l border-white/[0.06] bg-black/20 px-3 py-3">
                        <p className="font-semibold text-white">{draft.job_name_mirror}</p>
                        <p className="mt-1 text-xs text-white/35">{formatDate(draft.updated_at)}</p>
                        <p className="mt-2 text-xs text-[#E2B93B]">
                          {EXPRESSROOM_DRAFT_STATUS_LABELS[draft.express_status]}
                        </p>
                      </td>
                      <td className="border-y border-white/[0.06] bg-black/20 px-3 py-3 text-white/60">
                        {clip(draft.short_description, 220)}
                      </td>
                      <td className="border-y border-white/[0.06] bg-black/20 px-3 py-3">
                        <pre className="max-h-28 max-w-[260px] overflow-auto whitespace-pre-wrap text-xs leading-5 text-white/50">
                          {clip(draft.brief_markdown, 420)}
                        </pre>
                      </td>
                      <td className="border-y border-white/[0.06] bg-black/20 px-3 py-3">
                        <div className="mb-2 inline-flex rounded-full border border-white/[0.08] px-2 py-1 text-xs text-white/45">
                          {EXPRESSROOM_CODE_STATUS_LABELS[draft.supplied_code_status]}
                        </div>
                        <pre className="max-h-28 max-w-[260px] overflow-auto whitespace-pre-wrap text-xs leading-5 text-white/50">
                          {draft.supplied_code.trim() ? clip(draft.supplied_code, 420) : "No code supplied."}
                        </pre>
                      </td>
                      <td className="border-y border-white/[0.06] bg-black/20 px-3 py-3">
                        {draft.official_todo_id ? (
                          <Link
                            to={`/admin/jobs#todo-${draft.official_todo_id}`}
                            className="inline-flex items-center gap-1 text-[#61C1C4] hover:text-[#8be4e6]"
                          >
                            Jobs mirror <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        ) : (
                          <span className="text-white/35">Not inserted</span>
                        )}
                      </td>
                      <td className="rounded-r-lg border-y border-r border-white/[0.06] bg-black/20 px-3 py-3">
                        <button
                          type="button"
                          onClick={() => void promoteDraft(draft)}
                          disabled={Boolean(draft.official_todo_id) || promotingId === draft.id}
                          title={description}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#E2B93B]/35 bg-[#E2B93B]/10 px-3 py-2 text-xs font-semibold text-[#E2B93B] hover:bg-[#E2B93B]/20 disabled:opacity-40"
                        >
                          {promotingId === draft.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Rocket className="h-3.5 w-3.5" />}
                          Insert to Jobs
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
