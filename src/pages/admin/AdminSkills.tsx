import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AppWindow, KeyRound, PenSquare, ShieldCheck, Sparkles } from "lucide-react";
import { STARTER_SKILLS, STARTER_SKILL_SUMMARY } from "@/lib/skillLibrarySeeds";
import { useSkillEnablement } from "@/lib/skillPrefs";
import { SkillsTable } from "@/components/skills/SkillsTable";

function SkillsIntro() {
  return (
    <div className="mb-6 rounded-2xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#61C1C4]" />
        <div>
          <p className="text-sm font-semibold text-white">Skills are playbooks your agents follow.</p>
          <p className="mt-1 text-sm leading-6 text-white/55">
            The recommended ones power UnClick's core behaviour, so leave them on. Everything else is
            optional. Click any row to read its full SKILL.md, or untick one to stop your agents using
            it. A skill is never a permission grant: app, browser, and shell access always stay behind
            your Passport and policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminSkills() {
  const allSlugs = useMemo(() => STARTER_SKILLS.map((skill) => skill.slug), []);
  const { enabled, toggle, toggleAll } = useSkillEnablement(allSlugs);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#61C1C4]/10">
          <Sparkles className="h-5 w-5 text-[#61C1C4]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Skills</h1>
          <p className="text-sm text-white/50">
            {STARTER_SKILL_SUMMARY.total} playbooks your agents can run. All on by default. Turn any off
            and your agents leave it alone.
          </p>
        </div>
      </div>

      <SkillsIntro />

      <SkillsTable skills={STARTER_SKILLS} enabled={enabled} onToggle={toggle} onToggleAll={toggleAll} />

      {/* Why the Recommended group exists, in plain terms. */}
      <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#E2B93B]" />
          <div>
            <p className="text-sm font-semibold text-white">Why some skills are recommended</p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/55">
              Worker routing, memory distilling, safety gates, heartbeat liveness, and proof rules are
              recommended on because UnClick relies on them every session. You can still turn them off,
              but expect your agents to lose those behaviours. The skill file is the inspectable
              playbook; the authority stays in UnClick's own code and policy.
            </p>
          </div>
        </div>
      </div>

      {/* Where related surfaces live, mirroring the Apps page footer. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <FooterLink to="/admin/apps" icon={<AppWindow className="h-4 w-4 text-[#61C1C4]" />} title="Apps" desc="Every action your AI can reach. Turn apps on or off." />
        <FooterLink to="/admin/keychain" icon={<KeyRound className="h-4 w-4 text-[#E2B93B]" />} title="Passport" desc="Add API keys and logins for apps that need them." />
        <FooterLink to="/admin/copypass" icon={<PenSquare className="h-4 w-4 text-fuchsia-300" />} title="CopyPass" desc="Quality checks for writing and copy." />
      </div>
    </>
  );
}

function FooterLink({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/45">{desc}</p>
    </Link>
  );
}
