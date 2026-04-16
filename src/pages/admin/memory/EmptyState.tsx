import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  heading: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export default function EmptyState({ icon: Icon, heading, description, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2B93B]/10 text-[#E2B93B]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{heading}</h3>
      <p className="mt-2 max-w-sm text-xs text-white/50">{description}</p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#E2B93B] px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
