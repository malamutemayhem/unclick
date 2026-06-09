import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  DollarSign,
  Gauge,
  Loader2,
  RefreshCw,
  Save,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/auth";
import {
  SEATS_API_DEFAULT_PROVIDER_ORDER,
  labelForSeatsApiProvider,
  type SeatsApiProviderSummary,
  type SeatsApiUsageSummary,
} from "@/lib/seatsApiUsage";

interface UsageSummaryResponse {
  summary: SeatsApiUsageSummary;
}

const STATUS_COPY: Record<SeatsApiProviderSummary["budgetStatus"], { label: string; className: string }> = {
  none: {
    label: "No cap",
    className: "border-white/[0.08] bg-white/[0.04] text-[#999]",
  },
  ok: {
    label: "OK",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
  warning: {
    label: "Warn",
    className: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]",
  },
  over: {
    label: "Throttle",
    className: "border-red-400/30 bg-red-400/10 text-red-300",
  },
};

function emptyProviderSummary(provider: string): SeatsApiProviderSummary {
  return {
    provider,
    label: labelForSeatsApiProvider(provider),
    inputTokens: 0,
    outputTokens: 0,
    cachedInputTokens: 0,
    totalTokens: 0,
    requestCount: 0,
    estimatedCostUsd: 0,
    monthlyBudgetUsd: null,
    budgetUsedPercent: null,
    budgetStatus: "none",
  };
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 100 ? 2 : 4,
  }).format(value);
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function formatMonth(iso: string): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "Current month";
  return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

async function usageRequest<T>(
  action: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...(options.headers as Record<string, string> | undefined),
  };
  const response = await fetch(`/api/seats-api-usage?action=${action}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error ?? `Request failed: ${response.status}`);
  }
  return await response.json() as T;
}

function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "teal",
}: {
  title: string;
  value: string;
  detail: string;
  icon: typeof DollarSign;
  tone?: "teal" | "yellow" | "red";
}) {
  const toneClass = tone === "yellow"
    ? "text-[#E2B93B]"
    : tone === "red"
      ? "text-red-300"
      : "text-[#61C1C4]";

  return (
    <Card className="border-white/[0.06] bg-white/[0.03]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase text-[#777]">{title}</p>
          <Icon className={`h-4 w-4 ${toneClass}`} />
        </div>
        <p className="mt-3 text-2xl font-semibold tabular-nums text-white">{value}</p>
        <p className="mt-1 text-xs text-[#777]">{detail}</p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: SeatsApiProviderSummary["budgetStatus"] }) {
  const copy = STATUS_COPY[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${copy.className}`}>
      {copy.label}
    </span>
  );
}

export function AdminSeatsApiUsagePanel() {
  const { session, loading: sessionLoading } = useSession();
  const [summary, setSummary] = useState<SeatsApiUsageSummary | null>(null);
  const [budgetDrafts, setBudgetDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [savingProvider, setSavingProvider] = useState<string | null>(null);
  const [error, setError] = useState("");

  const accessToken = session?.access_token ?? "";

  const loadSummary = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    try {
      const response = await usageRequest<UsageSummaryResponse>("summary", accessToken);
      setSummary(response.summary);
      const drafts: Record<string, string> = {};
      for (const provider of SEATS_API_DEFAULT_PROVIDER_ORDER) {
        drafts[provider] = "";
      }
      for (const provider of response.summary.providers) {
        drafts[provider.provider] = provider.monthlyBudgetUsd ? String(provider.monthlyBudgetUsd) : "";
      }
      setBudgetDrafts(drafts);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load API spend";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSummary();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadSummary]);

  const providerRows = useMemo(() => {
    const byProvider = new Map((summary?.providers ?? []).map((row) => [row.provider, row]));
    const rows = SEATS_API_DEFAULT_PROVIDER_ORDER.map((provider) => byProvider.get(provider) ?? emptyProviderSummary(provider));
    for (const row of summary?.providers ?? []) {
      if (!SEATS_API_DEFAULT_PROVIDER_ORDER.some((provider) => provider === row.provider)) rows.push(row);
    }
    return rows;
  }, [summary]);

  const alertCount = providerRows.filter((row) => row.budgetStatus === "warning" || row.budgetStatus === "over").length;
  const cappedCount = providerRows.filter((row) => row.monthlyBudgetUsd && row.monthlyBudgetUsd > 0).length;
  const maxSpend = Math.max(1, ...providerRows.map((row) => row.estimatedCostUsd));
  const periodLabel = summary ? formatMonth(summary.periodStart) : "Current month";

  async function saveBudget(provider: string) {
    if (!accessToken) return;
    const raw = (budgetDrafts[provider] ?? "").trim();
    const monthlyBudgetUsd = Number(raw);
    if (!raw || !Number.isFinite(monthlyBudgetUsd) || monthlyBudgetUsd <= 0) {
      toast({
        title: "Budget not saved",
        description: "Enter a monthly cap greater than 0.",
      });
      return;
    }

    setSavingProvider(provider);
    try {
      await usageRequest("set_budget", accessToken, {
        method: "POST",
        body: JSON.stringify({
          provider,
          monthly_budget_usd: monthlyBudgetUsd,
          warn_at_percent: 80,
          throttle_at_percent: 100,
        }),
      });
      toast({ title: "Budget saved", description: `${labelForSeatsApiProvider(provider)} cap updated.` });
      await loadSummary();
    } catch (err) {
      toast({
        title: "Budget not saved",
        description: err instanceof Error ? err.message : "The budget could not be saved.",
      });
    } finally {
      setSavingProvider(null);
    }
  }

  async function removeBudget(provider: string) {
    if (!accessToken) return;
    setSavingProvider(provider);
    try {
      await usageRequest("delete_budget", accessToken, {
        method: "POST",
        body: JSON.stringify({ provider }),
      });
      setBudgetDrafts((current) => ({ ...current, [provider]: "" }));
      toast({ title: "Budget removed", description: `${labelForSeatsApiProvider(provider)} cap cleared.` });
      await loadSummary();
    } catch (err) {
      toast({
        title: "Budget not removed",
        description: err instanceof Error ? err.message : "The budget could not be removed.",
      });
    } finally {
      setSavingProvider(null);
    }
  }

  if (sessionLoading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-[#777]">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading session
      </div>
    );
  }

  if (!session) {
    return (
      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardContent className="p-4 text-sm text-[#999]">Sign in to view API spend.</CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Usage and spend</h2>
          <p className="mt-1 text-xs text-[#777]">{periodLabel} API tier accounting</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void loadSummary()}
          disabled={loading}
          className="border-white/[0.08] bg-white/[0.04] text-[#ddd] hover:bg-white/[0.08] hover:text-white"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard
          title="Spend"
          value={formatUsd(summary?.totals.estimatedCostUsd ?? 0)}
          detail="Estimated from logged tokens"
          icon={DollarSign}
        />
        <MetricCard
          title="Tokens"
          value={formatCount(summary?.totals.totalTokens ?? 0)}
          detail={`${formatCount(summary?.totals.cachedInputTokens ?? 0)} cached input`}
          icon={Activity}
        />
        <MetricCard
          title="Requests"
          value={formatCount(summary?.totals.requestCount ?? 0)}
          detail={`${providerRows.length} providers visible`}
          icon={Gauge}
        />
        <MetricCard
          title="Caps"
          value={String(cappedCount)}
          detail={alertCount ? `${alertCount} need attention` : "No active alerts"}
          icon={ShieldAlert}
          tone={alertCount ? "red" : "yellow"}
        />
      </div>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm text-white">Provider spend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 pt-0">
          {providerRows.map((row) => {
            const width = Math.max(2, Math.min(100, (row.estimatedCostUsd / maxSpend) * 100));
            return (
              <div key={row.provider} className="grid gap-2 sm:grid-cols-[150px_1fr_90px] sm:items-center">
                <div className="flex items-center gap-2">
                  <StatusBadge status={row.budgetStatus} />
                  <span className="text-sm text-[#ddd]">{row.label}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#61C1C4]"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="text-right text-sm tabular-nums text-[#ddd]">{formatUsd(row.estimatedCostUsd)}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm text-white">Budgets by provider</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/[0.06] hover:bg-transparent">
                <TableHead className="text-[#777]">Provider</TableHead>
                <TableHead className="text-right text-[#777]">Tokens</TableHead>
                <TableHead className="text-right text-[#777]">Spend</TableHead>
                <TableHead className="text-[#777]">Monthly cap</TableHead>
                <TableHead className="text-[#777]">Status</TableHead>
                <TableHead className="text-right text-[#777]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerRows.map((row) => {
                const progress = Math.min(100, Math.max(0, row.budgetUsedPercent ?? 0));
                const isSaving = savingProvider === row.provider;
                return (
                  <TableRow key={row.provider} className="border-white/[0.06] hover:bg-white/[0.02]">
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-white">{row.label}</p>
                        <p className="text-[11px] text-[#666]">{formatCount(row.requestCount)} requests</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums text-[#ddd]">
                      {formatCount(row.totalTokens)}
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums text-[#ddd]">
                      {formatUsd(row.estimatedCostUsd)}
                    </TableCell>
                    <TableCell className="min-w-[170px]">
                      <div className="flex items-center gap-2">
                        <Input
                          inputMode="decimal"
                          value={budgetDrafts[row.provider] ?? ""}
                          onChange={(event) => setBudgetDrafts((current) => ({
                            ...current,
                            [row.provider]: event.target.value,
                          }))}
                          placeholder="USD"
                          className="h-8 border-white/[0.08] bg-black/20 text-sm text-white placeholder:text-[#555]"
                        />
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={row.budgetStatus === "over" ? "h-full rounded-full bg-red-300" : "h-full rounded-full bg-[#E2B93B]"}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={row.budgetStatus} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => void saveBudget(row.provider)}
                          disabled={isSaving}
                          className="h-8 w-8 border-white/[0.08] bg-white/[0.04] text-[#ddd] hover:bg-white/[0.08] hover:text-white"
                          title="Save budget"
                        >
                          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => void removeBudget(row.provider)}
                          disabled={isSaving || !row.monthlyBudgetUsd}
                          className="h-8 w-8 border-white/[0.08] bg-white/[0.04] text-[#ddd] hover:bg-white/[0.08] hover:text-white"
                          title="Remove budget"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export default AdminSeatsApiUsagePanel;
