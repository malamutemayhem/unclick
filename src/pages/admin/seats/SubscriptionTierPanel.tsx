import { TIER_META } from "./computeTypes";

export default function SubscriptionTierPanel() {
  const meta = TIER_META.subscription;
  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
        <div className="border-b border-border/40 px-4 py-3">
          <h2 className="text-sm font-semibold text-heading">{meta.label} Compute</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{meta.description}</p>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No subscription providers linked yet.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Link provider subscriptions (Claude Pro, ChatGPT Plus, Cursor Pro) to
            track seat capacity and renewal status.
          </p>
        </div>
      </div>
    </section>
  );
}
