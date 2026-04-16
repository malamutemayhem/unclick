import { useEffect, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  Plus,
  Shield,
  X,
  Check,
} from "lucide-react";
import EmptyState from "./EmptyState";

interface ContextEntry {
  id: string;
  category: string;
  key: string;
  value: string;
  priority: number;
  decay_tier: string;
}

const DECAY_COLORS: Record<string, { dot: string; text: string }> = {
  hot: { dot: "bg-red-500", text: "text-red-500" },
  warm: { dot: "bg-amber-500", text: "text-amber-500" },
  cold: { dot: "bg-blue-400", text: "text-blue-400" },
};

export default function ContextTab() {
  const [entries, setEntries] = useState<ContextEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState("");
  const [formKey, setFormKey] = useState("");
  const [formValue, setFormValue] = useState("");

  const fetchEntries = () => {
    fetch("/api/memory-admin?action=admin_business_context&method=list")
      .then((r) => r.json())
      .then((body) => {
        setEntries((body as { data: ContextEntry[] }).data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreate = async () => {
    if (!formCategory.trim() || !formKey.trim() || !formValue.trim()) return;
    await fetch("/api/memory-admin?action=admin_business_context&method=create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: formCategory, key: formKey, value: formValue }),
    });
    setFormCategory("");
    setFormKey("");
    setFormValue("");
    setShowForm(false);
    fetchEntries();
  };

  const handleUpdate = async (id: string) => {
    await fetch("/api/memory-admin?action=admin_business_context&method=update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, value: formValue, category: formCategory }),
    });
    setEditingId(null);
    setFormCategory("");
    setFormKey("");
    setFormValue("");
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/memory-admin?action=admin_business_context&method=delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchEntries();
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= entries.length) return;

    const updated = [...entries];
    const aId = updated[index].id;
    const bId = updated[swapIndex].id;
    const aPriority = updated[index].priority;
    const bPriority = updated[swapIndex].priority;

    await fetch("/api/memory-admin?action=admin_business_context&method=reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          { id: aId, priority: bPriority },
          { id: bId, priority: aPriority },
        ],
      }),
    });
    fetchEntries();
  };

  const startEdit = (entry: ContextEntry) => {
    setEditingId(entry.id);
    setFormCategory(entry.category);
    setFormKey(entry.key);
    setFormValue(entry.value);
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-white/40">Loading context...</div>;
  }

  if (entries.length === 0 && !showForm) {
    return (
      <EmptyState
        icon={Shield}
        heading="Your master context is empty"
        description="This is the first thing your agent reads every session. Add your name, role, key projects, and preferences here."
        ctaLabel="Add your first context entry"
        onCta={() => setShowForm(true)}
      />
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {entries.map((entry, idx) => {
          const decay = DECAY_COLORS[entry.decay_tier] ?? DECAY_COLORS.cold;
          const isEditing = editingId === entry.id;

          if (isEditing) {
            return (
              <div
                key={entry.id}
                className="rounded-lg border border-[#E2B93B]/30 bg-white/[0.03] p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs font-medium text-white/60">Editing</span>
                  <span className="font-mono text-xs text-[#E2B93B]">{entry.key}</span>
                </div>
                <div className="mb-2 flex gap-2">
                  <input
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Category"
                    className="w-32 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
                  />
                </div>
                <textarea
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleUpdate(entry.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-[#E2B93B] px-3 py-1.5 text-xs font-medium text-black hover:opacity-90"
                  >
                    <Check className="h-3 w-3" /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white"
                  >
                    <X className="h-3 w-3" /> Cancel
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4"
            >
              {/* Priority badge */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#E2B93B]/15 text-xs font-bold text-[#E2B93B]">
                {idx + 1}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {entry.category}
                  </span>
                  <span className="text-sm font-medium text-white">{entry.key}</span>
                </div>
                <p className="mt-1 text-xs text-white/60">{entry.value}</p>
              </div>

              {/* Decay tier */}
              <div className="flex shrink-0 items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${decay.dot}`} />
                <span className={`text-[10px] ${decay.text}`}>{entry.decay_tier}</span>
              </div>

              {/* Reorder buttons */}
              <div className="flex shrink-0 flex-col gap-0.5">
                <button
                  onClick={() => handleReorder(idx, "up")}
                  disabled={idx === 0}
                  className="rounded p-0.5 text-white/30 hover:text-white disabled:opacity-20"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleReorder(idx, "down")}
                  disabled={idx === entries.length - 1}
                  className="rounded p-0.5 text-white/30 hover:text-white disabled:opacity-20"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Edit + Delete */}
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => startEdit(entry)}
                  className="rounded p-1.5 text-white/30 hover:bg-white/[0.06] hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="rounded p-1.5 text-white/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add form */}
      {showForm ? (
        <div className="mt-4 rounded-lg border border-[#E2B93B]/30 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs font-medium text-white/60">New context entry</div>
          <div className="mb-2 flex gap-2">
            <input
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              placeholder="Category (e.g. identity)"
              className="w-44 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
            />
            <input
              value={formKey}
              onChange={(e) => setFormKey(e.target.value)}
              placeholder="Key (e.g. name)"
              className="flex-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
            />
          </div>
          <textarea
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Value"
            rows={3}
            className="w-full rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#E2B93B]/50 focus:outline-none"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-1 rounded-md bg-[#E2B93B] px-3 py-1.5 text-xs font-medium text-black hover:opacity-90"
            >
              <Plus className="h-3 w-3" /> Add entry
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setFormCategory("");
                setFormKey("");
                setFormValue("");
              }}
              className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white"
            >
              <X className="h-3 w-3" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-dashed border-white/[0.1] px-4 py-2 text-xs text-white/50 transition-colors hover:border-[#E2B93B]/30 hover:text-[#E2B93B]"
        >
          <Plus className="h-3.5 w-3.5" /> Add Context Entry
        </button>
      )}
    </div>
  );
}
