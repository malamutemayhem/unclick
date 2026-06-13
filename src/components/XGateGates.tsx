import {
  Terminal,
  GitBranch,
  Database,
  KeyRound,
  CreditCard,
  Rocket,
  Crosshair,
  Eraser,
  Gauge,
  Ban,
  type LucideIcon,
} from "lucide-react";

/**
 * The full family of XGate gates, each in one plain-English line. Shown on the
 * public XGate brochure page under the four headline gate groups. Every gate is
 * a check that runs BEFORE a risky action, so nothing happens that you would
 * not allow.
 */
type Gate = { icon: LucideIcon; name: string; desc: string };

const GATES: Gate[] = [
  { icon: Terminal, name: "CommandGate", desc: "Blocks dangerous terminal commands before they run." },
  { icon: GitBranch, name: "GitGate", desc: "Stops risky code changes reaching your repo." },
  { icon: Database, name: "DataGate", desc: "Guards against wiping or leaking your data." },
  { icon: KeyRound, name: "SecretGate", desc: "Keeps API keys and passwords from slipping out." },
  { icon: Crosshair, name: "ScopeGate", desc: "Keeps work inside the agreed boundaries." },
  { icon: Eraser, name: "TrendSlopGate", desc: "Catches low-effort, padded, or off-brand output." },
  { icon: Rocket, name: "ShipGate", desc: "No release goes live without a clear OK." },
  { icon: CreditCard, name: "SpendGate", desc: "Caps cost, so there are no surprise bills." },
  { icon: Gauge, name: "RateGate", desc: "Stops runaway loops and request floods." },
  { icon: Ban, name: "KillGate", desc: "One switch halts everything, instantly." },
];

export default function XGateGates() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {GATES.map((gate) => (
        <div
          key={gate.name}
          className="flex h-full flex-col gap-2 rounded-xl border border-[#86dadd]/12 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-white/[0.05]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <gate.icon className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-heading">{gate.name}</h3>
          <p className="text-xs leading-relaxed text-body">{gate.desc}</p>
        </div>
      ))}
    </div>
  );
}
