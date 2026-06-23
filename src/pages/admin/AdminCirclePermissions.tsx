/**
 * AdminCirclePermissions - the sharing matrix (/admin/circle/permissions).
 *
 * This page only renders the ledger and forwards clicks. It contains zero
 * permission logic; every transition runs through the deterministic engine in
 * lib/circle/permissions.ts. The ledger persists to localStorage (a control
 * surface, not a security boundary - see the banner copy and circleData.ts).
 *
 * Cell rules:
 *   - You-owned table: the You column is a per-row master; each peer column is
 *     an editable share toggle. A section master governs the whole table.
 *   - Peer-owned table (amber): only your own column is clickable (accept or
 *     decline the owner's share). The owner column shows an Owner badge; every
 *     other column is view-only and faded, because it is the owner-to-other
 *     relationship and not yours to change.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, RotateCcw, ShieldCheck } from "lucide-react";
import ShareToggle from "@/components/circle/ShareToggle";
import {
  cellKey,
  deriveVisual,
  getShare,
  isFullyShared,
  isPartiallyShared,
  toggleMaster,
  toggleYourShare,
  type ShareLedger,
  type ShareVisual,
} from "@/lib/circle/permissions";
import {
  MEMBERS,
  PEER_TABLES,
  YOUR_TABLES,
  clearLedger,
  isYouOwned,
  loadLedger,
  memberById,
  rowMasterKeys,
  saveLedger,
  tableMasterKeys,
  type CircleMember,
  type PermissionTable,
  type ResourceRow,
} from "@/lib/circle/circleData";

// Keep the column template in one place so the header row and every table row
// line up. Label column, then one column per member.
const GRID_COLS = `minmax(8.5rem, 1.3fr) repeat(${MEMBERS.length}, minmax(3.25rem, 1fr))`;

function MemberHeader() {
  return (
    <div className="grid items-end gap-1.5 pb-2" style={{ gridTemplateColumns: GRID_COLS }}>
      <div />
      {MEMBERS.map((member) => (
        <div key={member.id} className="flex flex-col items-center gap-1">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold"
            style={{ borderColor: member.accent, color: member.accent, background: `${member.accent}1a` }}
          >
            {member.initials}
          </span>
          <span className="max-w-full truncate text-[10px] font-medium text-[#aaa]">{member.name}</span>
        </div>
      ))}
    </div>
  );
}

function RowLabel({ row }: { row: ResourceRow }) {
  const Icon = row.icon;
  return (
    <div className="flex min-w-0 items-center gap-2 py-1.5">
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0 text-[#888]" />
      ) : (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/[0.05] text-[9px] font-semibold text-[#888]">
          {row.label.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-xs font-medium text-white">{row.label}</span>
        {row.account && <span className="block truncate text-[10px] text-[#555]">{row.account}</span>}
      </span>
    </div>
  );
}

export default function AdminCirclePermissions() {
  const [ledger, setLedger] = useState<ShareLedger>(() => loadLedger());
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function commit(next: ShareLedger) {
    setLedger(next);
    saveLedger(next);
  }

  function handleCellToggle(table: PermissionTable, row: ResourceRow, memberId: string) {
    commit(toggleYourShare(ledger, cellKey(table.id, row.id, memberId)));
  }
  function handleRowMaster(table: PermissionTable, row: ResourceRow) {
    commit(toggleMaster(ledger, rowMasterKeys(table, row)));
  }
  function handleTableMaster(table: PermissionTable) {
    commit(toggleMaster(ledger, tableMasterKeys(table)));
  }
  function handleReset() {
    clearLedger();
    setLedger(loadLedger());
  }

  function renderCell(table: PermissionTable, row: ResourceRow, member: CircleMember) {
    const key = cellKey(table.id, row.id, member.id);
    const visual: ShareVisual = deriveVisual(getShare(ledger, key));

    if (isYouOwned(table)) {
      if (member.isYou) {
        const keys = rowMasterKeys(table, row);
        return (
          <div key={member.id} className="flex justify-center py-1">
            <ShareToggle
              mode="master"
              on={isFullyShared(ledger, keys)}
              mixed={isPartiallyShared(ledger, keys)}
              interactive
              onToggle={() => handleRowMaster(table, row)}
              label={`Share all of ${row.label}`}
            />
          </div>
        );
      }
      return (
        <div key={member.id} className="flex justify-center py-1">
          <ShareToggle
            visual={visual}
            interactive
            onToggle={() => handleCellToggle(table, row, member.id)}
            label={`Share ${row.label} with ${member.name}`}
          />
        </div>
      );
    }

    // Peer-owned table.
    const ownerName = memberById(table.owner)?.name ?? "Owner";
    if (member.isYou) {
      return (
        <div key={member.id} className="flex justify-center py-1">
          <ShareToggle
            visual={visual}
            interactive
            onToggle={() => handleCellToggle(table, row, member.id)}
            label={`Accept ${row.label} from ${ownerName}`}
          />
        </div>
      );
    }
    if (member.id === table.owner) {
      return (
        <div key={member.id} className="flex justify-center py-1">
          <span className="rounded-full border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#E2B93B]">
            Owner
          </span>
        </div>
      );
    }
    return (
      <div key={member.id} className="flex justify-center py-1">
        <ShareToggle
          visual={visual}
          interactive={false}
          dimmed
          label={`${ownerName} shares ${row.label} with ${member.name}, view only`}
        />
      </div>
    );
  }

  function renderTable(table: PermissionTable) {
    const youOwned = isYouOwned(table);
    const isCollapsed = Boolean(collapsed[table.id]);
    const masterKeys = tableMasterKeys(table);

    return (
      <section
        key={table.id}
        className={`mb-4 overflow-hidden rounded-xl border ${
          youOwned ? "border-white/[0.07] bg-[#111111]" : "border-[#E2B93B]/25 bg-[#E2B93B]/[0.04]"
        }`}
      >
        {/* Section header row, aligned to the grid so the table master sits under You. */}
        <div
          className={`grid items-center gap-1.5 px-3 py-2.5 ${youOwned ? "bg-white/[0.02]" : "bg-[#E2B93B]/[0.06]"}`}
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <div className="flex min-w-0 items-center gap-1.5">
            {table.collapsible ? (
              <button
                type="button"
                onClick={() => setCollapsed((prev) => ({ ...prev, [table.id]: !prev[table.id] }))}
                aria-expanded={!isCollapsed}
                aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${table.title}`}
                className="rounded p-0.5 text-[#888] transition-colors hover:text-white"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            ) : (
              <span className="w-0.5" />
            )}
            <span className={`truncate text-xs font-semibold ${youOwned ? "text-white" : "text-[#E2B93B]"}`}>
              {table.title}
            </span>
          </div>
          {MEMBERS.map((member) => {
            if (youOwned && member.isYou) {
              return (
                <div key={member.id} className="flex justify-center">
                  <ShareToggle
                    mode="master"
                    on={isFullyShared(ledger, masterKeys)}
                    mixed={isPartiallyShared(ledger, masterKeys)}
                    interactive
                    onToggle={() => handleTableMaster(table)}
                    label={`Share all ${table.title}`}
                  />
                </div>
              );
            }
            return <div key={member.id} />;
          })}
        </div>

        {table.blurb && (
          <p className="px-3 pb-2 pt-1 text-[11px] leading-4 text-[#777]">{table.blurb}</p>
        )}

        {!isCollapsed && (
          <div className="px-3 pb-2">
            {table.rows.map((row) => (
              <div
                key={row.id}
                className="grid items-center gap-1.5 border-t border-white/[0.04]"
                style={{ gridTemplateColumns: GRID_COLS }}
              >
                <RowLabel row={row} />
                {MEMBERS.map((member) => renderCell(table, row, member))}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <div className="mb-2">
        <Link to="/admin/circle" className="text-xs text-[#666] transition-colors hover:text-[#61C1C4]">
          &larr; Circle
        </Link>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Permissions</h1>
          <p className="mt-1 text-sm text-[#888]">
            Choose exactly what each circle member can see. Turn a row on to share it out; a two-way handshake forms where the other side already shares back.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] transition-colors hover:border-[#61C1C4]/30 hover:text-[#61C1C4]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset to defaults
        </button>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#3FB950]/25 bg-[#3FB950]/[0.06] p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3FB950]" />
        <div>
          <p className="text-sm font-semibold text-white">Enforced by a fixed rule engine, not by an AI.</p>
          <p className="mt-1 text-xs leading-5 text-[#aaa]">
            Your AI reads these switches and follows them. It cannot change them, talk its way around them, or grant itself access. Sharing here is a control surface on this device; full server-side enforcement runs the same rule before any data crosses a member line.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <MemberHeader />
          {YOUR_TABLES.map(renderTable)}
          {PEER_TABLES.length > 0 && (
            <p className="mb-2 mt-6 text-[11px] font-medium uppercase tracking-wide text-[#E2B93B]">
              Shared into your circle by others
            </p>
          )}
          {PEER_TABLES.map(renderTable)}
        </div>
      </div>

      <Legend />
    </div>
  );
}

function Legend() {
  const items: Array<{ visual: ShareVisual; label: string }> = [
    { visual: "off", label: "Neutral, nothing is shared" },
    { visual: "both", label: "Handshake, two way shared" },
    { visual: "in", label: "Third party requesting handshake" },
    { visual: "out", label: "You sharing to a third party" },
  ];
  return (
    <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#111111] p-4">
      <p className="text-xs font-semibold text-white">Key</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.visual} className="flex items-center gap-3">
            <ShareToggle visual={item.visual} label={item.label} />
            <span className="text-[11px] text-[#aaa]">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-white/[0.04] pt-3 text-[11px] leading-5 text-[#666]">
        Bright switches are clickable. Faded switches are view only: they show a relationship between two other members and are not yours to change.
      </p>
    </div>
  );
}
