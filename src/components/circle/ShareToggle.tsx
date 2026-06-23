/**
 * ShareToggle - the presentational pill for one matrix cell.
 *
 * It renders state, it does not decide state. The page passes a derived
 * visual (or a master on/mixed pair) plus whether the cell is interactive
 * (clickable) and whether it is dimmed (view-only, faded). Those two flags
 * are deliberately separate: a cell can be interactive-and-bright, or
 * non-interactive-and-dimmed (a peer-to-peer relationship you may see but not
 * change). All sharing logic lives in lib/circle/permissions.ts.
 */

import { Minus } from "lucide-react";
import type { ShareVisual } from "@/lib/circle/permissions";

type ShareToggleProps =
  | {
      mode?: "share";
      visual: ShareVisual;
      interactive?: boolean;
      dimmed?: boolean;
      onToggle?: () => void;
      label: string;
    }
  | {
      mode: "master";
      on: boolean;
      mixed?: boolean;
      interactive?: boolean;
      dimmed?: boolean;
      onToggle?: () => void;
      label: string;
    };

const ON = "#3FB950"; // semantic green for "sharing is on", distinct from the teal page accent

function trackClass(level: "off" | "in" | "out" | "both"): string {
  switch (level) {
    case "both": return "border-[#3FB950] bg-[#3FB950]/80";
    case "out":  return "border-[#3FB950]/60 bg-[#3FB950]/30";
    case "in":   return "border-[#3FB950]/40 bg-[#3FB950]/10";
    default:     return "border-white/10 bg-white/[0.04]";
  }
}

export default function ShareToggle(props: ShareToggleProps) {
  const interactive = props.interactive ?? false;
  const dimmed = props.dimmed ?? false;

  const isMaster = props.mode === "master";
  const masterOn = isMaster ? props.on : false;
  const masterMixed = isMaster ? Boolean(props.mixed) : false;
  const visual: ShareVisual = isMaster
    ? (masterOn || masterMixed ? "out" : "off")
    : props.visual;

  const knobRight = isMaster ? (masterOn || masterMixed) : (visual === "out" || visual === "both");
  const level: "off" | "in" | "out" | "both" = isMaster
    ? (masterOn ? "both" : masterMixed ? "out" : "off")
    : visual;

  // Chevrons sit in the space the knob is NOT covering, matching the mockup:
  // knob right => chevrons on the left; knob left => chevrons on the right.
  const chevrons = isMaster
    ? ""
    : knobRight
      ? (visual === "both" ? "<>" : ">")
      : (visual === "in" ? "<" : "");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isMaster ? (masterMixed ? "mixed" : masterOn) : visual !== "off"}
      aria-label={props.label}
      title={props.label}
      disabled={!interactive}
      onClick={interactive ? props.onToggle : undefined}
      className={[
        "relative inline-flex h-6 w-12 shrink-0 items-center rounded-full border transition-colors",
        trackClass(level),
        interactive ? "cursor-pointer hover:border-[#3FB950]/70" : "cursor-default",
        dimmed ? "opacity-40" : "",
      ].join(" ")}
    >
      {chevrons && (
        <span
          className={`pointer-events-none absolute inset-0 flex items-center px-1.5 text-[9px] font-bold ${
            knobRight ? "justify-start" : "justify-end"
          }`}
          style={{ color: ON }}
          aria-hidden="true"
        >
          {chevrons}
        </span>
      )}
      <span
        className={`pointer-events-none absolute flex h-4 w-4 items-center justify-center rounded-full bg-white shadow transition-transform ${
          knobRight ? "translate-x-7" : "translate-x-1"
        }`}
        aria-hidden="true"
      >
        {masterMixed && <Minus className="h-2.5 w-2.5 text-[#3FB950]" />}
      </span>
    </button>
  );
}
