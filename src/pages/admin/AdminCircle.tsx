/**
 * AdminCircle - the Circle landing surface (/admin/circle).
 *
 * Circle is the people you have connected with under UnClick Connections.
 * This page shows the roster with live "you share / they share with you"
 * counts, and the entry point to the deterministic Permissions matrix.
 */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, UserPlus, UsersRound } from "lucide-react";
import { cellKey, getShare, type ShareLedger } from "@/lib/circle/permissions";
import {
  PEERS,
  PEER_TABLES,
  YOUR_TABLES,
  loadLedger,
  type CircleMember,
} from "@/lib/circle/circleData";

function memberSummary(ledger: ShareLedger, member: CircleMember): { youShare: number; theyShare: number } {
  let youShare = 0;
  let theyShare = 0;
  for (const table of YOUR_TABLES) {
    for (const row of table.rows) {
      const state = getShare(ledger, cellKey(table.id, row.id, member.id));
      if (state.youShares) youShare += 1;
      if (state.peerShares) theyShare += 1;
    }
  }
  for (const table of PEER_TABLES) {
    if (table.owner !== member.id) continue;
    for (const row of table.rows) {
      const state = getShare(ledger, cellKey(table.id, row.id, "you"));
      if (state.youShares) youShare += 1; // you sharing back / accepting their app
      if (state.peerShares) theyShare += 1; // they offered it into the circle
    }
  }
  return { youShare, theyShare };
}

export default function AdminCircle() {
  const ledger = useMemo(() => loadLedger(), []);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Circle</h1>
          <p className="mt-1 text-sm text-[#888]">
            The people you have connected with under UnClick Connections. {PEERS.length} member{PEERS.length === 1 ? "" : "s"}.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Invite flow coming soon"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#666] opacity-60"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Invite to circle (soon)
        </button>
      </div>

      <Link
        to="/admin/circle/permissions"
        className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.06] p-4 transition-colors hover:border-[#61C1C4]/40 hover:bg-[#61C1C4]/[0.1]"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#61C1C4]" />
          <div>
            <p className="text-sm font-semibold text-white">Permissions</p>
            <p className="mt-1 text-xs leading-5 text-[#aaa]">
              Decide exactly what each member can see: memory layers, the orchestrator, and connected apps. Enforced by a fixed rule engine, never by an AI.
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs font-medium text-[#61C1C4]">Open</span>
      </Link>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-white">Members</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {PEERS.map((member) => {
            const { youShare, theyShare } = memberSummary(ledger, member);
            return (
              <div key={member.id} className="rounded-xl border border-white/[0.06] bg-[#111111] p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
                    style={{ borderColor: member.accent, color: member.accent, background: `${member.accent}1a` }}
                  >
                    {member.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{member.name}</p>
                    {member.handle && <p className="truncate text-[11px] text-[#666]">@{member.handle}</p>}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.04] pt-3 text-[11px]">
                  <div>
                    <p className="text-[#555]">You share</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#3FB950]">{youShare}</p>
                  </div>
                  <div>
                    <p className="text-[#555]">Shares with you</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#61C1C4]">{theyShare}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex items-center gap-2 text-[11px] text-[#555]">
        <UsersRound className="h-3.5 w-3.5" />
        Counts reflect the current permission ledger on this device.
      </div>
    </div>
  );
}
