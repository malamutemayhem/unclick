// src/pages/admin/fishbowl/Settings.tsx
//
// Boardroom "View settings" panel - collapsible, dark theme.
//
// This used to be a placebo: it wrote prefs to localStorage that nothing read.
// It is now fully controlled by the parent page via the useFishbowlViewPrefs
// hook, and every control here actually changes what the viewer sees (the feed
// and the agent presence surfaces). Controls that the viewer could not
// influence (pulse cadence, an unbuilt events bot) were removed.
//
// "Fishbowl" is the load-bearing internal name; the user-facing surface is the
// Boardroom.

import { useMemo } from "react";
import { ChevronDown, ChevronRight, Settings as SettingsIcon } from "lucide-react";
import { findDuplicateProfileAgentIds } from "./clusterProfiles";
import { CANONICAL_TAGS, type FishbowlViewPrefs } from "./prefs";

interface FishbowlProfile {
  agent_id: string;
  emoji: string;
  display_name: string | null;
  last_seen_at: string | null;
}

interface SettingsProps {
  profiles: FishbowlProfile[];
  prefs: FishbowlViewPrefs;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onToggleHideIdle: (value: boolean) => void;
  onToggleTag: (tag: string) => void;
  onToggleMute: (agentId: string) => void;
  onClearTags: () => void;
}

export default function FishbowlSettings({
  profiles,
  prefs,
  collapsed,
  onToggleCollapsed,
  onToggleHideIdle,
  onToggleTag,
  onToggleMute,
  onClearTags,
}: SettingsProps) {
  // Only real (non-human) agents can be muted.
  const agentProfiles = useMemo(
    () => profiles.filter((p) => !p.agent_id.startsWith("human-")),
    [profiles],
  );
  const duplicateAgentIds = useMemo(
    () => findDuplicateProfileAgentIds(agentProfiles),
    [agentProfiles],
  );

  const activeFilterCount =
    prefs.tagFilters.length + prefs.mutedAgentIds.length + (prefs.hideIdleAgents ? 1 : 0);

  return (
    <section className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggleCollapsed}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        aria-expanded={!collapsed}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#ccc]">
          <SettingsIcon className="h-3.5 w-3.5 text-[#888]" />
          <span>View settings</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#E2B93B]/15 px-2 py-0.5 text-[10px] font-medium text-[#E2B93B]">
              {activeFilterCount} active
            </span>
          )}
        </span>
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-[#555]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#555]" />
        )}
      </button>

      {!collapsed && (
        <div className="space-y-5 border-t border-white/[0.06] px-4 py-4">
          <p className="text-xs text-[#888]">
            These filters only change what you see here. Your agents still post
            everything; nothing is deleted.
          </p>

          {/* Hide idle agents */}
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[#ccc]">
            <input
              type="checkbox"
              checked={prefs.hideIdleAgents}
              onChange={(e) => onToggleHideIdle(e.target.checked)}
              className="accent-[#E2B93B]"
            />
            Hide idle agents from Now Playing
          </label>

          {/* Tag filters */}
          <fieldset>
            <legend className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#888]">
              Only show these tags
              {prefs.tagFilters.length > 0 && (
                <button
                  type="button"
                  onClick={onClearTags}
                  className="ml-2 text-[10px] text-[#E2B93B] hover:underline"
                >
                  clear
                </button>
              )}
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {CANONICAL_TAGS.map((tag) => {
                const active = prefs.tagFilters.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                      active
                        ? "border-[#E2B93B]/40 bg-[#E2B93B]/15 text-[#E2B93B]"
                        : "border-white/[0.08] bg-white/[0.03] text-[#666] hover:text-[#888]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-[10px] text-[#555]">
              {prefs.tagFilters.length === 0
                ? "Showing every message."
                : `Showing only: ${prefs.tagFilters.join(", ")}.`}
            </p>
          </fieldset>

          {/* Mute agents */}
          {agentProfiles.length > 0 && (
            <fieldset>
              <legend className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#888]">
                Mute agents
              </legend>
              <div className="flex flex-wrap gap-2">
                {agentProfiles.map((p) => {
                  const muted = prefs.mutedAgentIds.includes(p.agent_id);
                  const duplicate = duplicateAgentIds.has(p.agent_id);
                  return (
                    <button
                      key={p.agent_id}
                      type="button"
                      onClick={() => onToggleMute(p.agent_id)}
                      className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition ${
                        muted
                          ? "border-red-400/30 bg-red-400/10 text-red-300 line-through"
                          : "border-white/[0.08] bg-white/[0.03] text-[#888] hover:text-[#ccc]"
                      }`}
                    >
                      <span>{p.emoji}</span>
                      <span className="max-w-[100px] truncate">
                        {p.display_name ?? p.agent_id}
                      </span>
                      {duplicate && (
                        <span
                          className="rounded bg-white/[0.05] px-1 py-0.5 font-mono text-[9px] text-[#888]"
                          title={p.agent_id}
                        >
                          {p.agent_id.slice(0, 6)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-[10px] text-[#555]">
                Muted agents are hidden from Now Playing, the feed, and the
                roster.
              </p>
            </fieldset>
          )}
        </div>
      )}
    </section>
  );
}
