import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, HardDrive, CreditCard } from "lucide-react";
import { COMPUTE_TIERS, TIER_META, countSeatsByTier, type ComputeTier } from "./computeTypes";
import type { AISeat } from "../AdminAgentsSeatUtils";
import ApiTierPanel from "./ApiTierPanel";
import LocalTierPanel from "./LocalTierPanel";
import SubscriptionTierPanel from "./SubscriptionTierPanel";

const TIER_ICONS: Record<ComputeTier, typeof Zap> = {
  api: Zap,
  local: HardDrive,
  subscription: CreditCard,
};

function resolveTab(param: string | null): ComputeTier {
  if (param === "api" || param === "local" || param === "subscription") return param;
  return "local";
}

export default function ComputeTabShell({ seats = [] }: { seats?: AISeat[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tier"));
  const tierCounts = useMemo(() => countSeatsByTier(seats), [seats]);

  const setTab = (tier: ComputeTier) => {
    setSearchParams({ tier }, { replace: true });
  };

  return (
    <div className="space-y-4">
      <nav className="flex gap-1 rounded-lg border border-border/40 bg-card/20 p-1">
        {COMPUTE_TIERS.map((tier) => {
          const meta = TIER_META[tier];
          const active = activeTab === tier;
          const Icon = TIER_ICONS[tier];
          const count = tierCounts[tier];
          return (
            <button
              key={tier}
              type="button"
              onClick={() => setTab(tier)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-card/40 hover:text-heading"
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      active
                        ? "bg-primary/20 text-primary"
                        : "bg-border/30 text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </span>
              <span className="block text-[10px] font-normal opacity-70">{meta.description}</span>
            </button>
          );
        })}
      </nav>

      {activeTab === "api" && <ApiTierPanel />}
      {activeTab === "local" && <LocalTierPanel />}
      {activeTab === "subscription" && <SubscriptionTierPanel />}
    </div>
  );
}
