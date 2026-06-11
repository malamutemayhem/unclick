import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * OptionRibbon: the floating switcher between the live home and every
 * homepage design option. One pill group, the active page dimmed, so
 * comparing directions is one tap from anywhere.
 */

const OPTIONS = [
  { id: "current", label: "current", to: "/" },
  { id: "a", label: "a", to: "/home-preview" },
  { id: "b", label: "b", to: "/home-preview-b" },
  { id: "c", label: "c", to: "/home-preview-c" },
  { id: "d", label: "d", to: "/home-preview-d" },
  { id: "e", label: "e", to: "/home-preview-e" },
  { id: "f", label: "f", to: "/home-preview-f" },
  { id: "g", label: "g", to: "/home-preview-g" },
] as const;

export type OptionId = (typeof OPTIONS)[number]["id"];

export default function OptionRibbon({ active }: { active: OptionId }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-0.5 rounded-full border border-primary/30 bg-[#071e29]/95 p-1 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md">
        <Eye className="ml-2 mr-1 h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden="true" />
        {OPTIONS.map((option) => (
          <Link
            key={option.id}
            to={option.to}
            aria-current={option.id === active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
              option.id === active
                ? "bg-primary/20 text-heading"
                : "text-primary/80 hover:bg-white/[0.06] hover:text-heading",
            )}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
