import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BatteryCharging,
  CreditCard,
  Lightbulb,
  PiggyBank,
  ReceiptText,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSession } from "@/lib/auth";

const ECONOMICS_STORAGE_KEY = "unclick_seats_compute_economics_v1";
const API_SPEND_STORAGE_KEYS = [
  "unclick_seats_api_spend_v1",
  "unclick_seats_api_usage_spend_v1",
  "unclick_seats_api_economics_v1",
] as const;

export interface ApiSpendSnapshot {
  monthlySpend: number;
  embeddingSpend: number;
  batchEligibleSpend: number;
  sourceLabel: string;
}

export interface LocalComputeInputs {
  hardwareCost: number;
  amortizationMonths: number;
  averageWatts: number;
  hoursPerDay: number;
  electricityRate: number;
}

export interface SubscriptionEconomicsInputs {
  planName: string;
  monthlyPrice: number;
  programmaticCredit: number;
  programmaticUsed: number;
}

export interface EconomicsState {
  api: ApiSpendSnapshot;
  local: LocalComputeInputs;
  subscription: SubscriptionEconomicsInputs;
}

const DEFAULT_ECONOMICS_STATE: EconomicsState = {
  api: {
    monthlySpend: 0,
    embeddingSpend: 0,
    batchEligibleSpend: 0,
    sourceLabel: "Waiting for API tier spend data",
  },
  local: {
    hardwareCost: 900,
    amortizationMonths: 24,
    averageWatts: 260,
    hoursPerDay: 6,
    electricityRate: 0.28,
  },
  subscription: {
    planName: "Claude Max",
    monthlyPrice: 100,
    programmaticCredit: 100,
    programmaticUsed: 42,
  },
};

function readNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatCurrency(value: number): string {
  return `$${roundCurrency(value).toLocaleString(undefined, {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateMonthlyLocalCompute(inputs: LocalComputeInputs) {
  const amortizationMonths = Math.max(1, inputs.amortizationMonths);
  const hardwareAmortization = inputs.hardwareCost / amortizationMonths;
  const kilowattHours = (inputs.averageWatts / 1000) * inputs.hoursPerDay * 30;
  const electricityCost = kilowattHours * inputs.electricityRate;
  const total = hardwareAmortization + electricityCost;

  return {
    hardwareAmortization: roundCurrency(hardwareAmortization),
    electricityCost: roundCurrency(electricityCost),
    kilowattHours: Math.round(kilowattHours * 10) / 10,
    total: roundCurrency(total),
  };
}

export function buildEconomicsTips(
  api: ApiSpendSnapshot,
  localMonthlyCost: number,
  subscription: SubscriptionEconomicsInputs,
): string[] {
  const tips: string[] = [];
  const remainingCredit = Math.max(0, subscription.programmaticCredit - subscription.programmaticUsed);

  if (api.embeddingSpend > 0) {
    tips.push(
      `API embeddings are costing ${formatCurrency(api.embeddingSpend)}/mo. Running Nomic Embed locally can move most embedding usage toward near-zero marginal cost.`,
    );
  } else {
    tips.push("When WP-4 spend data lands, compare embedding API spend against local Nomic Embed before scaling retrieval jobs.");
  }

  if (subscription.programmaticCredit > 0) {
    tips.push(
      `${subscription.planName} includes ${formatCurrency(subscription.programmaticCredit)} of programmatic credit. You have used ${formatCurrency(subscription.programmaticUsed)}, leaving ${formatCurrency(remainingCredit)}.`,
    );
  } else {
    tips.push(`${subscription.planName} has no tracked programmatic credit yet. Treat background automation as metered until the provider proves otherwise.`);
  }

  if (api.batchEligibleSpend > 0) {
    tips.push(
      `Consider batch API for non-urgent tasks. Moving ${formatCurrency(api.batchEligibleSpend)} of work to batch pricing could save about ${formatCurrency(api.batchEligibleSpend * 0.5)}.`,
    );
  } else {
    tips.push("Flag non-urgent API jobs for batch pricing once WP-4 exposes batch-eligible spend.");
  }

  if (api.monthlySpend > localMonthlyCost && localMonthlyCost > 0) {
    tips.push(
      `Local compute is estimated at ${formatCurrency(localMonthlyCost)}/mo. Use it for repeat OCR and retrieval work before sending routine jobs to API providers.`,
    );
  } else {
    tips.push("Keep final answer generation on subscription seats when the user is present, and reserve API calls for background or frontier tasks.");
  }

  return tips;
}

function safeReadStorage(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readApiSpendSnapshot(): ApiSpendSnapshot {
  for (const key of API_SPEND_STORAGE_KEYS) {
    const candidate = safeReadStorage(key);
    if (!candidate || typeof candidate !== "object") continue;
    const record = candidate as Record<string, unknown>;
    const monthlySpend = readNumber(
      record.monthlySpend ?? record.apiSpendThisMonth ?? record.totalSpend ?? record.spendThisMonth,
      0,
    );
    const embeddingSpend = readNumber(record.embeddingSpend ?? record.embeddingsSpend ?? record.embeddingCost, 0);
    const batchEligibleSpend = readNumber(record.batchEligibleSpend ?? record.batchableSpend ?? record.nonUrgentSpend, 0);
    if (monthlySpend > 0 || embeddingSpend > 0 || batchEligibleSpend > 0) {
      return {
        monthlySpend,
        embeddingSpend,
        batchEligibleSpend,
        sourceLabel: `Loaded from ${key}`,
      };
    }
  }
  return DEFAULT_ECONOMICS_STATE.api;
}

function readSavedState(): EconomicsState {
  const saved = safeReadStorage(ECONOMICS_STORAGE_KEY);
  const savedRecord = saved && typeof saved === "object" ? (saved as Record<string, unknown>) : {};
  const savedLocal = savedRecord.local && typeof savedRecord.local === "object"
    ? (savedRecord.local as Record<string, unknown>)
    : {};
  const savedSubscription = savedRecord.subscription && typeof savedRecord.subscription === "object"
    ? (savedRecord.subscription as Record<string, unknown>)
    : {};

  return {
    api: readApiSpendSnapshot(),
    local: {
      hardwareCost: readNumber(savedLocal.hardwareCost, DEFAULT_ECONOMICS_STATE.local.hardwareCost),
      amortizationMonths: readNumber(savedLocal.amortizationMonths, DEFAULT_ECONOMICS_STATE.local.amortizationMonths),
      averageWatts: readNumber(savedLocal.averageWatts, DEFAULT_ECONOMICS_STATE.local.averageWatts),
      hoursPerDay: readNumber(savedLocal.hoursPerDay, DEFAULT_ECONOMICS_STATE.local.hoursPerDay),
      electricityRate: readNumber(savedLocal.electricityRate, DEFAULT_ECONOMICS_STATE.local.electricityRate),
    },
    subscription: {
      planName: typeof savedSubscription.planName === "string"
        ? savedSubscription.planName
        : DEFAULT_ECONOMICS_STATE.subscription.planName,
      monthlyPrice: readNumber(savedSubscription.monthlyPrice, DEFAULT_ECONOMICS_STATE.subscription.monthlyPrice),
      programmaticCredit: readNumber(
        savedSubscription.programmaticCredit,
        DEFAULT_ECONOMICS_STATE.subscription.programmaticCredit,
      ),
      programmaticUsed: readNumber(
        savedSubscription.programmaticUsed,
        DEFAULT_ECONOMICS_STATE.subscription.programmaticUsed,
      ),
    },
  };
}

function saveState(state: EconomicsState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ECONOMICS_STORAGE_KEY, JSON.stringify({
      local: state.local,
      subscription: state.subscription,
    }));
  } catch {
    // Local estimate persistence is best-effort only.
  }
}

export default function AdminSeatsSubscription() {
  const { session } = useSession();
  const [state, setState] = useState<EconomicsState>(() => readSavedState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const localEstimate = useMemo(() => calculateMonthlyLocalCompute(state.local), [state.local]);
  const tips = useMemo(
    () => buildEconomicsTips(state.api, localEstimate.total, state.subscription),
    [localEstimate.total, state.api, state.subscription],
  );
  const totalTracked = state.api.monthlySpend + localEstimate.total + state.subscription.monthlyPrice;
  const subscriptionNet = Math.max(0, state.subscription.monthlyPrice - state.subscription.programmaticCredit);

  const updateLocal = (field: keyof LocalComputeInputs, value: string) => {
    setState((current) => ({
      ...current,
      local: {
        ...current.local,
        [field]: readNumber(value, current.local[field]),
      },
    }));
  };

  const updateSubscription = (field: keyof SubscriptionEconomicsInputs, value: string) => {
    setState((current) => ({
      ...current,
      subscription: {
        ...current.subscription,
        [field]: field === "planName" ? value : readNumber(value, current.subscription[field] as number),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Subscription compute</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#888]">
            Cross-tier economics for API, local, and subscription compute.
          </p>
        </div>
        <div className="rounded-xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.06] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-[#61C1C4]">Tracked monthly mix</p>
          <p className="mt-1 text-xl font-semibold text-white">{formatCurrency(totalTracked)}</p>
          <p className="mt-0.5 text-[11px] text-[#888]">
            {session ? "Saved in this browser for this account." : "Sign in to pair estimates with your account context."}
          </p>
        </div>
      </header>

      <section aria-labelledby="compute-at-a-glance" className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#61C1C4]" />
          <h2 id="compute-at-a-glance" className="text-sm font-semibold text-white">Your compute at a glance</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          <MetricCard
            icon={ReceiptText}
            title="API tier"
            value={formatCurrency(state.api.monthlySpend)}
            detail={`${formatCurrency(state.api.embeddingSpend)} embeddings, ${formatCurrency(state.api.batchEligibleSpend)} batch-ready`}
            footer={state.api.sourceLabel}
          />
          <MetricCard
            icon={BatteryCharging}
            title="Local tier"
            value={formatCurrency(localEstimate.total)}
            detail={`${formatCurrency(localEstimate.hardwareAmortization)} hardware, ${formatCurrency(localEstimate.electricityCost)} electricity`}
            footer={`${localEstimate.kilowattHours} kWh per month`}
          />
          <MetricCard
            icon={CreditCard}
            title="Subscription tier"
            value={formatCurrency(state.subscription.monthlyPrice)}
            detail={`${formatCurrency(state.subscription.programmaticCredit)} tracked programmatic credit`}
            footer={`Net after tracked credit: ${formatCurrency(subscriptionNet)}`}
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#E2B93B]" />
            <h2 className="text-sm font-semibold text-white">Local compute estimate</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField
              label="Hardware cost"
              prefix="$"
              value={state.local.hardwareCost}
              onChange={(value) => updateLocal("hardwareCost", value)}
            />
            <NumberField
              label="Amortization months"
              value={state.local.amortizationMonths}
              onChange={(value) => updateLocal("amortizationMonths", value)}
            />
            <NumberField
              label="Average watts"
              value={state.local.averageWatts}
              onChange={(value) => updateLocal("averageWatts", value)}
            />
            <NumberField
              label="Hours per day"
              value={state.local.hoursPerDay}
              onChange={(value) => updateLocal("hoursPerDay", value)}
            />
            <NumberField
              label="Electricity rate"
              prefix="$"
              suffix="/kWh"
              step="0.01"
              value={state.local.electricityRate}
              onChange={(value) => updateLocal("electricityRate", value)}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#E2B93B]" />
            <h2 className="text-sm font-semibold text-white">Subscription costs</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] text-[#888]">Plan name</span>
              <input
                value={state.subscription.planName}
                onChange={(event) => updateSubscription("planName", event.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#444] focus:border-[#E2B93B]/40 focus:outline-none"
              />
            </label>
            <NumberField
              label="Monthly price"
              prefix="$"
              value={state.subscription.monthlyPrice}
              onChange={(value) => updateSubscription("monthlyPrice", value)}
            />
            <NumberField
              label="Programmatic credit"
              prefix="$"
              value={state.subscription.programmaticCredit}
              onChange={(value) => updateSubscription("programmaticCredit", value)}
            />
            <NumberField
              label="Programmatic used"
              prefix="$"
              value={state.subscription.programmaticUsed}
              onChange={(value) => updateSubscription("programmaticUsed", value)}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="compute-smart-tips" className="rounded-xl border border-[#E2B93B]/20 bg-[#E2B93B]/[0.05] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[#E2B93B]" />
          <h2 id="compute-smart-tips" className="text-sm font-semibold text-white">Smart tips</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {tips.map((tip) => (
            <div key={tip} className="flex gap-3 rounded-lg border border-white/[0.06] bg-black/20 p-3">
              <PiggyBank className="mt-0.5 h-4 w-4 shrink-0 text-[#E2B93B]" />
              <p className="text-xs leading-5 text-[#ddd]">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  detail,
  footer,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  detail: string;
  footer: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#666]">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-[#aaa]">{detail}</p>
      <p className="mt-3 border-t border-white/[0.04] pt-2 text-[11px] text-[#666]">{footer}</p>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix = "",
  suffix = "",
  step = "1",
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  const inputId = `compute-economics-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-1 block text-[11px] text-[#888]">{label}</label>
      <span className="flex items-center rounded-lg border border-white/[0.08] bg-black/30 focus-within:border-[#E2B93B]/40">
        {prefix && <span className="pl-3 text-xs text-[#666]">{prefix}</span>}
        <input
          id={inputId}
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none"
        />
        {suffix && <span className="pr-3 text-xs text-[#666]">{suffix}</span>}
      </span>
    </div>
  );
}
