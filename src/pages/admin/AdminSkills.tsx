import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  FileText,
  GitBranch,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  filterSkills,
  type SkillNativeMode,
  type SkillPackage,
  type SkillSafetyLevel,
} from "@/lib/skillLibrary";
import { getSkillBySlug, STARTER_SKILL_SUMMARY, STARTER_SKILLS } from "@/lib/skillLibrarySeeds";

const MODE_FILTERS: Array<{ value: SkillNativeMode | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "hardwired", label: "Hardwired" },
  { value: "hybrid", label: "Hybrid" },
  { value: "skill", label: "Skills" },
];

const DEFAULT_SELECTED_SKILL = getSkillBySlug("coordinator-router") ?? STARTER_SKILLS[0];

const SAFETY_STYLE: Record<SkillSafetyLevel, string> = {
  safe: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  cautious: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  restricted: "border-rose-300/20 bg-rose-300/10 text-rose-100",
  blocked: "border-red-400/20 bg-red-400/10 text-red-100",
};

const MODE_STYLE: Record<SkillNativeMode, string> = {
  hardwired: "border-[#61C1C4]/25 bg-[#61C1C4]/10 text-[#9be4e6]",
  hybrid: "border-[#E2B93B]/25 bg-[#E2B93B]/10 text-[#f0d577]",
  skill: "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100",
};

function modeLabel(mode: SkillNativeMode) {
  if (mode === "hardwired") return "Hardwire";
  if (mode === "hybrid") return "Hybrid";
  return "Skill";
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase text-white/35">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-white/70">{children}</dd>
    </div>
  );
}

function SkillCard({
  skill,
  selected,
  onSelect,
}: {
  skill: SkillPackage;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        selected
          ? "border-[#61C1C4]/55 bg-[#61C1C4]/10"
          : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{skill.name}</p>
          <p className="mt-1 text-xs text-white/45">{skill.category}</p>
        </div>
        <span className={`shrink-0 rounded border px-2 py-1 text-[10px] font-semibold ${MODE_STYLE[skill.nativeMode]}`}>
          {modeLabel(skill.nativeMode)}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/55">{skill.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded border px-2 py-1 text-[10px] font-medium ${SAFETY_STYLE[skill.safetyLevel]}`}>
          {skill.safetyLevel}
        </span>
        <span className="rounded border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10px] font-medium text-white/45">
          U{skill.unclickUsefulness}
        </span>
        <span className="rounded border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10px] font-medium text-white/45">
          {skill.reviewState}
        </span>
      </div>
    </button>
  );
}

function SkillDetail({ skill }: { skill: SkillPackage }) {
  const [copied, setCopied] = useState(false);

  async function copySkill() {
    await navigator.clipboard?.writeText(skill.markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="min-w-0">
      <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded border px-2 py-1 text-[10px] font-semibold ${MODE_STYLE[skill.nativeMode]}`}>
                {modeLabel(skill.nativeMode)}
              </span>
              <span className={`rounded border px-2 py-1 text-[10px] font-semibold ${SAFETY_STYLE[skill.safetyLevel]}`}>
                {skill.safetyLevel}
              </span>
              {skill.reviewState === "verified" && (
                <span className="inline-flex items-center gap-1 rounded border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[10px] font-semibold text-emerald-100">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">{skill.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">{skill.description}</p>
          </div>
          <button
            type="button"
            onClick={copySkill}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#61C1C4]/35 bg-[#61C1C4]/10 px-3 py-2 text-sm font-semibold text-[#9be4e6] transition-colors hover:bg-[#61C1C4]/15"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-md border border-white/[0.06] bg-[#0D0D0D] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Wrench className="h-4 w-4 text-[#61C1C4]" />
              Install State
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">{skill.installState}</p>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-[#0D0D0D] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-200" />
              Proof Boundary
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Skill text is never a permission grant. Apps, browser, shell, and write scopes stay behind UnClick policy.
            </p>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-[#0D0D0D] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <GitBranch className="h-4 w-4 text-[#E2B93B]" />
              Provenance
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              {skill.sourceKind}. {skill.sourceLicense}. {skill.reuse}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 md:grid-cols-2">
          <DetailRow label="Worker Roles">
            {skill.requiredWorkerRoles.length ? skill.requiredWorkerRoles.join(", ") : "None declared"}
          </DetailRow>
          <DetailRow label="Tools">
            {skill.requiredMcpTools.length ? skill.requiredMcpTools.join(", ") : "No direct tools"}
          </DetailRow>
          <DetailRow label="Apps">
            {skill.requiredApps.length ? skill.requiredApps.join(", ") : "No app dependency"}
          </DetailRow>
          <DetailRow label="Hash">
            <span className="font-mono text-xs">{skill.contentHash}</span>
          </DetailRow>
        </dl>

        {skill.validationIssues.length > 0 && (
          <div className="mt-6 rounded-md border border-amber-300/20 bg-amber-300/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
              <AlertTriangle className="h-4 w-4" />
              Review Notes
            </div>
            <ul className="mt-2 space-y-1 text-xs text-amber-50/75">
              {skill.validationIssues.map((issue) => (
                <li key={issue.code}>{issue.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-white/[0.07] bg-[#0D0D0D]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 text-sm font-semibold text-white">
          <FileText className="h-4 w-4 text-white/45" />
          SKILL.md
        </div>
        <pre className="max-h-[34rem] overflow-auto p-4 text-xs leading-5 text-white/70">
          {skill.markdown}
        </pre>
      </div>
    </section>
  );
}

export default function AdminSkills() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [mode, setMode] = useState<SkillNativeMode | "all">("all");
  const [selectedSlug, setSelectedSlug] = useState(DEFAULT_SELECTED_SKILL?.slug ?? "");

  const filtered = useMemo(
    () => filterSkills(STARTER_SKILLS, query, category, mode),
    [category, mode, query],
  );
  const selected = STARTER_SKILLS.find((skill) => skill.slug === selectedSlug) ?? filtered[0] ?? STARTER_SKILLS[0];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#61C1C4]/10">
              <Sparkles className="h-5 w-5 text-[#61C1C4]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Skills Library</h1>
              <p className="text-sm text-white/50">UnClick-native starter pack</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-md border border-white/[0.07] bg-white/[0.025] px-3 py-2">
            <p className="text-[10px] uppercase text-white/35">Skills</p>
            <p className="mt-1 text-lg font-semibold text-white">{STARTER_SKILL_SUMMARY.total}</p>
          </div>
          <div className="rounded-md border border-[#61C1C4]/20 bg-[#61C1C4]/10 px-3 py-2">
            <p className="text-[10px] uppercase text-[#9be4e6]/70">Hardwire</p>
            <p className="mt-1 text-lg font-semibold text-[#9be4e6]">{STARTER_SKILL_SUMMARY.hardwired}</p>
          </div>
          <div className="rounded-md border border-[#E2B93B]/20 bg-[#E2B93B]/10 px-3 py-2">
            <p className="text-[10px] uppercase text-[#f0d577]/70">Hybrid</p>
            <p className="mt-1 text-lg font-semibold text-[#f0d577]">{STARTER_SKILL_SUMMARY.hybrid}</p>
          </div>
          <div className="rounded-md border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-2">
            <p className="text-[10px] uppercase text-fuchsia-100/70">Skill</p>
            <p className="mt-1 text-lg font-semibold text-fuchsia-100">{STARTER_SKILL_SUMMARY.skillOnly}</p>
          </div>
          <div className="rounded-md border border-rose-300/20 bg-rose-300/10 px-3 py-2">
            <p className="text-[10px] uppercase text-rose-100/70">Guarded</p>
            <p className="mt-1 text-lg font-semibold text-rose-100">{STARTER_SKILL_SUMMARY.cautiousOrRestricted}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[25rem_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search Skills"
                placeholder="Search skills"
                className="w-full rounded-md border border-white/[0.08] bg-[#111] px-9 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {MODE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setMode(filter.value)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    mode === filter.value
                      ? "border-[#61C1C4]/50 bg-[#61C1C4]/10 text-[#9be4e6]"
                      : "border-white/[0.07] bg-white/[0.025] text-white/50 hover:bg-white/[0.045]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <label className="mt-4 block text-xs font-semibold text-white/45" htmlFor="skills-category">
              Category
            </label>
            <select
              id="skills-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-md border border-white/[0.08] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#61C1C4]/50"
            >
              <option value="all">All categories</option>
              {STARTER_SKILL_SUMMARY.categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filtered.map((skill) => (
              <SkillCard
                key={skill.slug}
                skill={skill}
                selected={skill.slug === selected.slug}
                onSelect={() => setSelectedSlug(skill.slug)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-6 text-sm text-white/50">
                No matching skills.
              </div>
            )}
          </div>
        </div>

        {selected ? (
          <SkillDetail skill={selected} />
        ) : (
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-6 text-sm text-white/50">
            Select a skill.
          </div>
        )}
      </section>

      <section className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <LockKeyhole className="h-4 w-4 text-[#E2B93B]" />
          Native Boundary
        </div>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/55">
          Worker routing, proof rules, heartbeat liveness, safety gates, and memory distillation are marked hardwired when they belong in UnClick itself. The skill file is the inspectable playbook; the authority stays in native code and policy.
        </p>
      </section>
    </div>
  );
}
