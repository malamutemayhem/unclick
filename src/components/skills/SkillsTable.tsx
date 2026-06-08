// The Skills library table. Same layout language as the Apps table (AppsTable):
// one compact, full-width, single-line row per skill, instant search + category
// chips, a per-row enable checkbox, and "turn all on/off". Two differences that
// fit skills:
//   - Rows are GROUPED into "Recommended (leave on)" (the native rails UnClick
//     leans on every session) and "Optional", instead of the old
//     hardwired/hybrid/skill mode filter.
//   - Clicking a row expands it to reveal the full SKILL.md text inline (with a
//     copy button), plus what it needs to run and, behind "Show details", its
//     provenance. Column widths are fixed so expanding never shifts the layout.
//
// Skills are on by default. The checkbox only turns one on/off; everything else
// in a row is about reading what the skill does before you decide.

import { useMemo, useState } from "react";
import { ChevronRight, Copy, FileText, Search, SlidersHorizontal, Star } from "lucide-react";
import {
  filterSkills,
  skillCategoryLabel,
  type SkillPackage,
  type SkillSafetyLevel,
} from "@/lib/skillLibrary";
import { SkillIcon } from "./SkillIcon";

interface SkillsTableProps {
  skills: SkillPackage[];
  /** slug -> enabled. A missing slug is treated as enabled (all on by default). */
  enabled?: Record<string, boolean>;
  onToggle?: (slug: string, next: boolean) => void;
  onToggleAll?: (next: boolean) => void;
  busy?: boolean;
}

// Safety shows as a quiet pill. "Safe" is the common case, so it reads as muted
// text with no chrome; anything that needs a second look gets a tinted pill.
const SAFETY: Record<SkillSafetyLevel, { label: string; tone: string }> = {
  safe: { label: "Safe", tone: "text-white/30" },
  cautious: { label: "Caution", tone: "rounded border border-amber-300/25 bg-amber-300/10 px-1.5 py-0.5 text-amber-100" },
  restricted: { label: "Restricted", tone: "rounded border border-rose-300/25 bg-rose-300/10 px-1.5 py-0.5 text-rose-100" },
  blocked: { label: "Blocked", tone: "rounded border border-red-400/25 bg-red-400/10 px-1.5 py-0.5 text-red-100" },
};

// [check] Skill | Category | What it does | Safety | chevron
const COLS =
  "grid-cols-[28px_minmax(150px,1.5fr)_minmax(120px,0.9fr)_minmax(0,2.4fr)_84px_28px]";

export function SkillsTable({ skills, enabled, onToggle, onToggleAll, busy }: SkillsTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [...new Set(skills.map((s) => s.category))].sort(),
    [skills],
  );

  const filtered = useMemo(
    () => filterSkills(skills, query, category ?? "all"),
    [skills, query, category],
  );

  const isOn = (slug: string) => (enabled ? enabled[slug] !== false : true);
  const onCount = filtered.filter((s) => isOn(s.slug)).length;

  const recommended = filtered.filter((s) => s.recommended);
  const optional = filtered.filter((s) => !s.recommended);

  function toggleExpand(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search skills"
            placeholder="Search skills (try 'ci', 'review', 'memory')"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 focus:border-[#61C1C4]/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <label className="flex cursor-pointer select-none items-center gap-1.5">
            <input
              type="checkbox"
              checked={showDetails}
              onChange={(e) => setShowDetails(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#61C1C4]"
              aria-label="Show skill details"
            />
            Show details
          </label>
          <span>{onCount} of {filtered.length} on</span>
          <button
            type="button"
            disabled={busy}
            onClick={() => onToggleAll?.(true)}
            className="rounded-md border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 disabled:opacity-50"
          >
            Turn all on
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onToggleAll?.(false)}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-semibold text-white/60 transition-colors hover:bg-white/[0.07] disabled:opacity-50"
          >
            Turn all off
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Chip label="All" active={category === null} onClick={() => setCategory(null)} />
        {categories.map((c) => (
          <Chip
            key={c}
            label={skillCategoryLabel(c)}
            active={category === c}
            onClick={() => setCategory(category === c ? null : c)}
          />
        ))}
      </div>

      {/* Header row */}
      <div className={`grid ${COLS} items-center gap-3 border-b border-white/[0.08] px-3 py-2`}>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">On</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">Skill</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">Category</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">What it does</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">Safety</span>
        <span aria-hidden />
      </div>

      <Group
        title="Recommended"
        hint="UnClick leans on these every session. Leave them on."
        Icon={Star}
        accent="text-[#61C1C4]"
        skills={recommended}
        isOn={isOn}
        expanded={expanded}
        showDetails={showDetails}
        busy={busy}
        onToggle={onToggle}
        onToggleExpand={toggleExpand}
      />
      <Group
        title="Optional"
        hint="On by default. Add what you need, turn off the rest."
        Icon={SlidersHorizontal}
        accent="text-white/40"
        skills={optional}
        isOn={isOn}
        expanded={expanded}
        showDetails={showDetails}
        busy={busy}
        onToggle={onToggle}
        onToggleExpand={toggleExpand}
      />

      {filtered.length === 0 && (
        <div className="px-3 py-8 text-center text-xs text-white/40">No skills match that search.</div>
      )}
    </div>
  );
}

function Group({
  title,
  hint,
  Icon,
  accent,
  skills,
  isOn,
  expanded,
  showDetails,
  busy,
  onToggle,
  onToggleExpand,
}: {
  title: string;
  hint: string;
  Icon: typeof Star;
  accent: string;
  skills: SkillPackage[];
  isOn: (slug: string) => boolean;
  expanded: Set<string>;
  showDetails: boolean;
  busy?: boolean;
  onToggle?: (slug: string, next: boolean) => void;
  onToggleExpand: (slug: string) => void;
}) {
  if (skills.length === 0) return null;
  const on = skills.filter((s) => isOn(s.slug)).length;
  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 pb-1 pt-4">
        <Icon className={`h-3.5 w-3.5 ${accent}`} />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-white/55">{title}</span>
        <span className="text-[10px] tabular-nums text-white/30">{on} of {skills.length} on</span>
        <span className="text-[11px] text-white/30">· {hint}</span>
      </div>
      <div className="divide-y divide-white/[0.04] border-t border-white/[0.04]">
        {skills.map((skill) => (
          <SkillRow
            key={skill.slug}
            skill={skill}
            on={isOn(skill.slug)}
            open={expanded.has(skill.slug)}
            showDetails={showDetails}
            busy={busy}
            onToggle={onToggle}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </div>
    </section>
  );
}

function SkillRow({
  skill,
  on,
  open,
  showDetails,
  busy,
  onToggle,
  onToggleExpand,
}: {
  skill: SkillPackage;
  on: boolean;
  open: boolean;
  showDetails: boolean;
  busy?: boolean;
  onToggle?: (slug: string, next: boolean) => void;
  onToggleExpand: (slug: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const safety = SAFETY[skill.safetyLevel];

  async function copy() {
    await navigator.clipboard?.writeText(skill.markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => onToggleExpand(skill.slug)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
            e.preventDefault();
            onToggleExpand(skill.slug);
          }
        }}
        className={`grid ${COLS} cursor-pointer items-center gap-3 px-3 py-1.5 text-xs transition-colors hover:bg-white/[0.02] focus:bg-white/[0.03] focus:outline-none ${on ? "" : "opacity-45"}`}
      >
        <input
          type="checkbox"
          checked={on}
          disabled={busy}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onToggle?.(skill.slug, e.target.checked)}
          className="h-3.5 w-3.5 accent-[#61C1C4]"
          aria-label={`Turn ${skill.name} ${on ? "off" : "on"}`}
        />
        <span className="flex min-w-0 items-center gap-2">
          <SkillIcon category={skill.category} />
          <span className="truncate font-medium text-white">{skill.name}</span>
        </span>
        <span className="truncate text-white/45">{skillCategoryLabel(skill.category)}</span>
        <span className="truncate text-white/50">{skill.description}</span>
        <span className={`justify-self-start text-[10px] font-medium ${safety.tone}`}>{safety.label}</span>
        <ChevronRight
          className={`h-3.5 w-3.5 justify-self-end transition-transform ${open ? "rotate-90 text-[#61C1C4]" : "text-white/30"}`}
        />
      </div>

      {/* Inline detail: the SKILL.md text plus what it needs to run. */}
      {open && (
        <div className={`grid ${COLS} gap-3 bg-white/[0.015] px-3 pb-3`}>
          <div style={{ gridColumn: "2 / -1" }} className="min-w-0 space-y-3 pt-1">
            <NeedsLine skill={skill} />

            <div className="rounded-md border border-white/[0.06] bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <FileText className="h-3.5 w-3.5 text-white/45" />
                  SKILL.md
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void copy();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#61C1C4]/35 bg-[#61C1C4]/10 px-2 py-1 text-[11px] font-semibold text-[#9be4e6] transition-colors hover:bg-[#61C1C4]/15"
                >
                  <Copy className="h-3 w-3" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap p-3 text-[11px] leading-5 text-white/70">
                {skill.markdown}
              </pre>
            </div>

            {showDetails && <DetailMeta skill={skill} />}
          </div>
        </div>
      )}
    </div>
  );
}

function NeedsLine({ skill }: { skill: SkillPackage }) {
  const parts: Array<{ label: string; value: string }> = [];
  if (skill.requiredWorkerRoles.length) parts.push({ label: "Workers", value: skill.requiredWorkerRoles.join(", ") });
  if (skill.requiredMcpTools.length) parts.push({ label: "Tools", value: skill.requiredMcpTools.join(", ") });
  if (skill.requiredApps.length) parts.push({ label: "Apps", value: skill.requiredApps.join(", ") });

  if (parts.length === 0) {
    return <p className="text-[11px] text-white/40">Runs with no extra tools or app access.</p>;
  }
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/50">
      {parts.map((p) => (
        <span key={p.label}>
          <span className="text-white/30">{p.label}:</span> {p.value}
        </span>
      ))}
    </p>
  );
}

function DetailMeta({ skill }: { skill: SkillPackage }) {
  return (
    <div className="space-y-3">
      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <Meta label="Provenance">{skill.sourceKind}. {skill.sourceLicense}.</Meta>
        <Meta label="Reuse">{skill.reuse}</Meta>
        <Meta label="Setup">{skill.installState}</Meta>
        <Meta label="Hash"><span className="font-mono">{skill.contentHash}</span></Meta>
      </dl>
      {skill.validationIssues.length > 0 && (
        <ul className="space-y-1 rounded-md border border-amber-300/20 bg-amber-300/[0.06] p-2.5 text-[11px] text-amber-50/80">
          {skill.validationIssues.map((issue) => (
            <li key={issue.code}>{issue.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-white/30">{label}</dt>
      <dd className="mt-0.5 text-[11px] leading-5 text-white/55">{children}</dd>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-[#61C1C4]/40 bg-[#61C1C4]/15 text-[#9be4e6]"
          : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/65"
      }`}
    >
      {label}
    </button>
  );
}
