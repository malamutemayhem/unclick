import { useSearchParams } from "react-router-dom";
import { COMPUTE_TIERS, TIER_META, type ComputeTier } from "./computeTypes";
import ApiTierPanel from "./ApiTierPanel";
import LocalTierPanel from "./LocalTierPanel";
import SubscriptionTierPanel from "./SubscriptionTierPanel";

function resolveTab(param: string | null): ComputeTier {
  if (param === "api" || param === "local" || param === "subscription") return param;
  return "local";
}

export default function ComputeTabShell() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tier"));

  const setTab = (tier: ComputeTier) => {
    setSearchParams({ tier }, { replace: true });
  };

  return (
    <div className="space-y-4">
      <nav className="flex gap-1 rounded-lg border border-border/40 bg-card/20 p-1">
        {COMPUTE_TIERS.map((tier) => {
          const meta = TIER_META[tier];
          const active = activeTab === tier;
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
              <span className="block">{meta.label}</span>
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
