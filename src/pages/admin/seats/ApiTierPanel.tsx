import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X, Check, AlertTriangle, Settings } from "lucide-react";
import { TIER_META } from "./computeTypes";
import {
  API_PROVIDER_CATALOG,
  findCatalogEntry,
  findModel,
  formatCost,
  formatContextWindow,
  loadStoredProviders,
  saveStoredProviders,
  type ApiProviderCatalogEntry,
  type StoredApiProvider,
} from "./apiProviderCatalog";

export default function ApiTierPanel() {
  const meta = TIER_META.api;
  const [providers, setProviders] = useState<StoredApiProvider[]>(() => loadStoredProviders());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    saveStoredProviders(providers);
  }, [providers]);

  const addProvider = useCallback((provider: StoredApiProvider) => {
    setProviders((prev) => [...prev, provider]);
    setShowAddForm(false);
  }, []);

  const removeProvider = useCallback((id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
    setEditingId(null);
  }, []);

  const updateProvider = useCallback((id: string, patch: Partial<StoredApiProvider>) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const activeCount = providers.filter((p) => p.status === "active").length;
  const errorCount = providers.filter((p) => p.status === "error").length;

  return (
    <section className="space-y-4">
      <ApiSummaryBar
        total={providers.length}
        active={activeCount}
        errors={errorCount}
      />

      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
        <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-heading">{meta.label} Providers</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Cloud API endpoints for per-token compute. Each provider routes through UnClick's tool surface.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs font-medium text-heading transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
            Add provider
          </button>
        </div>

        {providers.length > 0 ? (
          <>
            <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(140px,1fr)_100px_100px_80px_minmax(120px,0.6fr)] gap-3 border-b border-border/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Provider</span>
              <span>Model</span>
              <span>Input cost</span>
              <span>Output cost</span>
              <span>Context</span>
              <span>Controls</span>
            </div>
            <div className="divide-y divide-border/30">
              {providers.map((provider) => (
                <ProviderRow
                  key={provider.id}
                  provider={provider}
                  editing={editingId === provider.id}
                  onEdit={() => setEditingId(editingId === provider.id ? null : provider.id)}
                  onRemove={() => removeProvider(provider.id)}
                  onUpdate={(patch) => updateProvider(provider.id, patch)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">No API providers configured yet.</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Connect cloud API endpoints (OpenAI, Anthropic, Groq) to route per-token compute through UnClick.
            </p>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddProviderModal
          existingSlugs={providers.map((p) => p.slug)}
          onAdd={addProvider}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </section>
  );
}

function ApiSummaryBar({
  total,
  active,
  errors,
}: {
  total: number;
  active: number;
  errors: number;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      <SummaryCard label="Total providers" value={total} />
      <SummaryCard
        label="Active"
        value={active}
        accent={active > 0 ? "emerald" : undefined}
      />
      <SummaryCard
        label="Errors"
        value={errors}
        accent={errors > 0 ? "rose" : undefined}
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "emerald" | "rose";
}) {
  const colorClass = accent === "emerald"
    ? "border-emerald-400/30 bg-emerald-400/5"
    : accent === "rose"
      ? "border-rose-400/30 bg-rose-400/5"
      : "border-border/40 bg-card/20";
  const valueColor = accent === "emerald"
    ? "text-emerald-300"
    : accent === "rose"
      ? "text-rose-300"
      : "text-heading";

  return (
    <div className={`rounded-lg border p-3 ${colorClass}`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}

function ProviderRow({
  provider,
  editing,
  onEdit,
  onRemove,
  onUpdate,
}: {
  provider: StoredApiProvider;
  editing: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<StoredApiProvider>) => void;
}) {
  const catalog = findCatalogEntry(provider.slug);
  const model = findModel(provider.slug, provider.modelId);
  const statusColor = provider.status === "active"
    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
    : provider.status === "error"
      ? "border-rose-400/30 bg-rose-400/10 text-rose-300"
      : "border-border/40 bg-card/40 text-muted-foreground";

  return (
    <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(140px,1fr)_100px_100px_80px_minmax(120px,0.6fr)] items-center gap-3 px-4 py-3 text-xs">
      <div className="min-w-0">
        <p className="truncate font-semibold text-heading">{provider.name}</p>
        <p className="truncate text-[10px] text-muted-foreground">{provider.endpoint}</p>
        <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] ${statusColor}`}>
          {provider.status}
        </span>
      </div>
      <div className="min-w-0">
        {editing ? (
          <select
            value={provider.modelId}
            onChange={(e) => onUpdate({ modelId: e.target.value })}
            className="w-full rounded-md border border-border/40 bg-card/40 px-2 py-1 text-xs text-heading outline-none focus:border-primary/40"
            aria-label="Select model"
          >
            {(catalog?.models ?? []).map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        ) : (
          <>
            <p className="truncate text-heading">{model?.name ?? provider.modelId}</p>
            {model?.contextWindow && (
              <p className="text-[10px] text-muted-foreground">{formatContextWindow(model.contextWindow)} context</p>
            )}
          </>
        )}
      </div>
      <p className="text-muted-foreground">{formatCost(model?.costPerMInput)}</p>
      <p className="text-muted-foreground">{formatCost(model?.costPerMOutput)}</p>
      <p className="text-muted-foreground">{formatContextWindow(model?.contextWindow)}</p>
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <select
              value={provider.status}
              onChange={(e) => onUpdate({ status: e.target.value as StoredApiProvider["status"] })}
              className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[10px] text-muted-foreground outline-none hover:border-primary/40 focus:border-primary/40"
              aria-label="Provider status"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
            </select>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md border border-border/40 bg-card/40 p-1.5 text-muted-foreground transition-colors hover:text-primary"
              title="Done editing"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md border border-border/40 bg-card/40 p-1.5 text-muted-foreground transition-colors hover:text-primary"
              title="Edit provider"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-md border border-border/40 bg-card/40 p-1.5 text-muted-foreground transition-colors hover:text-rose-400"
              title="Remove provider"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function AddProviderModal({
  existingSlugs,
  onAdd,
  onClose,
}: {
  existingSlugs: string[];
  onAdd: (provider: StoredApiProvider) => void;
  onClose: () => void;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [rateLimitRpm, setRateLimitRpm] = useState<string>("");

  const catalog = selectedSlug ? findCatalogEntry(selectedSlug) : null;

  useEffect(() => {
    if (catalog) {
      setEndpoint(catalog.defaultEndpoint);
      setSelectedModelId(catalog.models[0]?.id ?? "");
    }
  }, [catalog]);

  const canSubmit = selectedSlug && selectedModelId && endpoint;

  const handleSubmit = () => {
    if (!canSubmit || !catalog) return;
    const rpm = parseInt(rateLimitRpm, 10);
    onAdd({
      id: `${selectedSlug}-${Date.now()}`,
      slug: selectedSlug,
      name: catalog.name,
      modelId: selectedModelId,
      endpoint,
      status: "active",
      rateLimitRpm: Number.isFinite(rpm) && rpm > 0 ? rpm : undefined,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border/40 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-border/40 p-5">
          <div>
            <h2 className="text-base font-semibold text-heading">Add API provider</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Select a cloud provider and model to route through UnClick.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-heading"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-heading">Provider</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {API_PROVIDER_CATALOG.map((entry) => {
                const alreadyAdded = existingSlugs.includes(entry.slug);
                const selected = selectedSlug === entry.slug;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    disabled={alreadyAdded}
                    onClick={() => setSelectedSlug(entry.slug)}
                    className={`rounded-lg border p-3 text-left transition-colors ${
                      selected
                        ? "border-primary/60 bg-primary/10"
                        : alreadyAdded
                          ? "cursor-not-allowed border-border/20 bg-card/10 opacity-50"
                          : "border-border/40 bg-card/20 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <p className="text-xs font-semibold text-heading">{entry.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {alreadyAdded ? "Already added" : entry.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {catalog && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-heading">Model</label>
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full rounded-md border border-border/40 bg-card/40 px-3 py-2 text-sm text-heading outline-none focus:border-primary/40"
                >
                  {catalog.models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {formatCost(m.costPerMInput)} in / {formatCost(m.costPerMOutput)} out
                    </option>
                  ))}
                </select>
                {selectedModelId && (() => {
                  const m = findModel(selectedSlug, selectedModelId);
                  if (!m) return null;
                  return (
                    <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
                      {m.contextWindow && <span>Context: {formatContextWindow(m.contextWindow)}</span>}
                      {m.maxOutput && <span>Max output: {formatContextWindow(m.maxOutput)}</span>}
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-heading">API endpoint</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full rounded-md border border-border/40 bg-card/40 px-3 py-2 text-sm text-heading outline-none focus:border-primary/40"
                  placeholder="https://api.example.com/v1"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-heading">
                  Rate limit (RPM, optional)
                </label>
                <input
                  type="number"
                  value={rateLimitRpm}
                  onChange={(e) => setRateLimitRpm(e.target.value)}
                  className="w-full rounded-md border border-border/40 bg-card/40 px-3 py-2 text-sm text-heading outline-none focus:border-primary/40"
                  placeholder="e.g. 60"
                  min="1"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/40 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border/40 bg-card/40 px-4 py-2 text-sm text-body transition-colors hover:text-heading"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Add provider
          </button>
        </div>
      </div>
    </div>
  );
}
