/**
 * AdminInduction - /admin/induction
 *
 * Edit the Induction: the ordered, grouped, easy-English checklist a connected
 * AI agent reads when it joins UnClick. Rows are grouped into collapsible
 * sections and kept in strict top-to-bottom order. You can add, edit, delete,
 * and reorder rows and sections, then Save. Content is global (one induction
 * for the whole platform) and stored via /api/induction.
 *
 * Phase 2 will add a connect-time gate that forces an agent to read these rows
 * before any tool runs. This page is the source the gate reads from.
 */
import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth";
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Check,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface ApiRow {
  section: string;
  section_order: number;
  position: number;
  rule: string;
  why: string | null;
  enabled: boolean;
}

interface Row {
  key: number;
  rule: string;
  why: string;
  enabled: boolean;
}

interface Section {
  key: number;
  name: string;
  rows: Row[];
}

let keySeq = 1;
const nextKey = () => keySeq++;

function groupRows(rows: ApiRow[]): Section[] {
  const order: string[] = [];
  const byName = new Map<string, Row[]>();
  for (const r of rows) {
    if (!byName.has(r.section)) {
      byName.set(r.section, []);
      order.push(r.section);
    }
    byName.get(r.section)!.push({
      key: nextKey(),
      rule: r.rule ?? "",
      why: r.why ?? "",
      enabled: r.enabled !== false,
    });
  }
  return order.map((name) => ({ key: nextKey(), name, rows: byName.get(name)! }));
}

function flatten(sections: Section[]): Array<{ section: string; rule: string; why: string; enabled: boolean }> {
  const out: Array<{ section: string; rule: string; why: string; enabled: boolean }> = [];
  for (const s of sections) {
    for (const r of s.rows) {
      if (!r.rule.trim()) continue;
      out.push({ section: s.name.trim() || "General", rule: r.rule.trim(), why: r.why.trim(), enabled: r.enabled });
    }
  }
  return out;
}

function move<T>(arr: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(index, 1);
  copy.splice(target, 0, item);
  return copy;
}

export default function AdminInduction() {
  const { session } = useSession();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/induction");
        if (!res.ok) throw new Error(`Load failed (${res.status})`);
        const body = (await res.json()) as { rows: ApiRow[]; is_default: boolean };
        if (cancelled) return;
        const grouped = groupRows(body.rows ?? []);
        setSections(grouped);
        setIsDefault(Boolean(body.is_default));
        setOpen(new Set(grouped.map((s) => s.key)));
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rowCount = useMemo(() => sections.reduce((n, s) => n + s.rows.length, 0), [sections]);

  function mutate(next: Section[]) {
    setSections(next);
    setDirty(true);
    setSaved(false);
  }

  function toggleOpen(key: number) {
    setOpen((prev) => {
      const copy = new Set(prev);
      if (copy.has(key)) copy.delete(key);
      else copy.add(key);
      return copy;
    });
  }

  function updateRow(sIdx: number, rIdx: number, patch: Partial<Row>) {
    mutate(sections.map((s, i) => (i !== sIdx ? s : { ...s, rows: s.rows.map((r, j) => (j !== rIdx ? r : { ...r, ...patch })) })));
  }

  function addRow(sIdx: number) {
    mutate(sections.map((s, i) => (i !== sIdx ? s : { ...s, rows: [...s.rows, { key: nextKey(), rule: "", why: "", enabled: true }] })));
  }

  function deleteRow(sIdx: number, rIdx: number) {
    mutate(sections.map((s, i) => (i !== sIdx ? s : { ...s, rows: s.rows.filter((_, j) => j !== rIdx) })));
  }

  function moveRow(sIdx: number, rIdx: number, delta: number) {
    mutate(sections.map((s, i) => (i !== sIdx ? s : { ...s, rows: move(s.rows, rIdx, delta) })));
  }

  function renameSection(sIdx: number, name: string) {
    mutate(sections.map((s, i) => (i !== sIdx ? s : { ...s, name })));
  }

  function addSection() {
    const s: Section = { key: nextKey(), name: "New section", rows: [{ key: nextKey(), rule: "", why: "", enabled: true }] };
    mutate([...sections, s]);
    setOpen((prev) => new Set(prev).add(s.key));
  }

  function deleteSection(sIdx: number) {
    mutate(sections.filter((_, i) => i !== sIdx));
  }

  function moveSection(sIdx: number, delta: number) {
    mutate(move(sections, sIdx, delta));
  }

  async function save() {
    if (!session) {
      setError("Sign in to save.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/induction?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ rows: flatten(sections) }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? `Save failed (${res.status})`);
      setIsDefault(false);
      setDirty(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <GraduationCap className="h-6 w-6 text-[#E2B93B]" />
            Induction
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[#888]">
            The first thing a connected AI reads. In order, top to bottom. Edit any row,
            add or remove rows, and move the order with the arrows. Keep it short and plain.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving || !dirty}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#61C1C4] px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">{error}</div>
      )}
      {isDefault && !loading && (
        <div className="mb-4 rounded-lg border border-[#E2B93B]/30 bg-[#E2B93B]/[0.06] px-4 py-3 text-xs text-[#E2B93B]">
          Showing the built-in default induction. Edit and Save to make it yours.
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-[#666]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading induction...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((s, sIdx) => {
            const isOpen = open.has(s.key);
            return (
              <div key={s.key} className="rounded-xl border border-[#61C1C4]/12 bg-[#61C1C4]/[0.035]">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button type="button" onClick={() => toggleOpen(s.key)} className="text-white/50 hover:text-white" aria-label={isOpen ? "Collapse" : "Expand"}>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  <input
                    value={s.name}
                    onChange={(e) => renameSection(sIdx, e.target.value)}
                    className="min-w-0 flex-1 rounded bg-transparent px-1 py-1 text-sm font-semibold text-white outline-none focus:bg-white/[0.04]"
                    aria-label="Section name"
                  />
                  <span className="shrink-0 text-[11px] text-[#666]">{s.rows.length} rows</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button type="button" onClick={() => moveSection(sIdx, -1)} disabled={sIdx === 0} className="rounded p-1 text-white/40 hover:bg-white/[0.06] hover:text-white disabled:opacity-30" aria-label="Move section up"><ArrowUp className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => moveSection(sIdx, 1)} disabled={sIdx === sections.length - 1} className="rounded p-1 text-white/40 hover:bg-white/[0.06] hover:text-white disabled:opacity-30" aria-label="Move section down"><ArrowDown className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => deleteSection(sIdx)} className="rounded p-1 text-red-400/70 hover:bg-red-500/10 hover:text-red-300" aria-label="Delete section"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>

                {isOpen && (
                  <div className="space-y-2 border-t border-[#61C1C4]/10 p-3">
                    {s.rows.map((r, rIdx) => (
                      <div key={r.key} className={`rounded-lg border border-[#61C1C4]/10 bg-[#61C1C4]/[0.025] p-3 ${r.enabled ? "" : "opacity-50"}`}>
                        <div className="flex items-start gap-2">
                          <span className="mt-2 w-5 shrink-0 text-right text-[11px] text-[#555]">{rIdx + 1}</span>
                          <div className="min-w-0 flex-1 space-y-2">
                            <input
                              value={r.rule}
                              onChange={(e) => updateRow(sIdx, rIdx, { rule: e.target.value })}
                              placeholder="The rule, in easy English"
                              className="w-full rounded border border-[#61C1C4]/15 bg-[#61C1C4]/[0.04] px-2 py-1.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#61C1C4]/50"
                            />
                            <input
                              value={r.why}
                              onChange={(e) => updateRow(sIdx, rIdx, { why: e.target.value })}
                              placeholder="Why it matters (optional)"
                              className="w-full rounded border border-[#61C1C4]/10 bg-[#61C1C4]/[0.025] px-2 py-1.5 text-xs text-white/70 outline-none placeholder:text-white/20 focus:border-[#61C1C4]/40"
                            />
                          </div>
                          <div className="flex shrink-0 flex-col items-center gap-1">
                            <button type="button" onClick={() => updateRow(sIdx, rIdx, { enabled: !r.enabled })} className="rounded p-1 text-white/40 hover:bg-white/[0.06] hover:text-white" aria-label={r.enabled ? "Disable row" : "Enable row"}>
                              {r.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </button>
                            <button type="button" onClick={() => moveRow(sIdx, rIdx, -1)} disabled={rIdx === 0} className="rounded p-1 text-white/40 hover:bg-white/[0.06] hover:text-white disabled:opacity-30" aria-label="Move row up"><ArrowUp className="h-3.5 w-3.5" /></button>
                            <button type="button" onClick={() => moveRow(sIdx, rIdx, 1)} disabled={rIdx === s.rows.length - 1} className="rounded p-1 text-white/40 hover:bg-white/[0.06] hover:text-white disabled:opacity-30" aria-label="Move row down"><ArrowDown className="h-3.5 w-3.5" /></button>
                            <button type="button" onClick={() => deleteRow(sIdx, rIdx)} className="rounded p-1 text-red-400/70 hover:bg-red-500/10 hover:text-red-300" aria-label="Delete row"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => addRow(sIdx)} className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/[0.06] hover:text-white">
                      <Plus className="h-3.5 w-3.5" /> Add row
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button type="button" onClick={addSection} className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-white/[0.12] px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/[0.04] hover:text-white">
            <Plus className="h-4 w-4" /> Add section
          </button>

          <p className="pt-2 text-[11px] text-[#555]">{sections.length} sections, {rowCount} rows. {dirty ? "Unsaved changes." : "All changes saved."}</p>
        </div>
      )}
    </div>
  );
}
