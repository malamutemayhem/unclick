/**
 * Circle data layer - members, the resources that can be shared, the table
 * definitions, the demo seed, the editability policy, and localStorage I/O.
 *
 * This is front-end prototype data. There is no circle/connections/sharing
 * backend yet (that needs DB tables + RLS, a hard stop that needs sign-off),
 * so the ledger persists to localStorage. localStorage is a control surface,
 * NOT a security boundary: real enforcement must run the same isSharedWith
 * predicate server-side before any data crosses a member line. The engine in
 * permissions.ts is side-effect free precisely so it can be lifted into that
 * server gate untouched.
 */

import {
  BookOpen,
  FileStack,
  FileText,
  Fingerprint,
  FolderKanban,
  MessagesSquare,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  cellKey,
  type ShareLedger,
  type ShareState,
  type ShareVisual,
} from "./permissions";

export interface CircleMember {
  id: string;
  name: string;
  initials: string;
  handle?: string;
  isYou?: boolean;
  /** Hex accent for the member avatar ring. */
  accent: string;
}

export interface ResourceRow {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Account email/username so duplicate connections are tellable apart. */
  account?: string;
}

export type TableKind = "memory" | "orchestrator" | "apps";

/** "you" for a table you own, otherwise the owning member id. */
export type TableOwner = "you" | string;

export interface PermissionTable {
  id: string;
  title: string;
  kind: TableKind;
  owner: TableOwner;
  collapsible?: boolean;
  blurb?: string;
  rows: ResourceRow[];
}

// Members

export const MEMBERS: CircleMember[] = [
  { id: "you",   name: "You",   initials: "Y", isYou: true,    accent: "#61C1C4" },
  { id: "priya", name: "Priya", initials: "P", handle: "priya", accent: "#A78BFA" },
  { id: "sam",   name: "Sam",   initials: "S", handle: "sam",   accent: "#F472B6" },
  { id: "david", name: "David", initials: "D", handle: "david", accent: "#34D399" },
  { id: "leo",   name: "Leo",   initials: "L", handle: "leo",   accent: "#FBBF24" },
  { id: "mia",   name: "Mia",   initials: "M", handle: "mia",   accent: "#60A5FA" },
];

export const YOU = MEMBERS[0];
export const PEERS = MEMBERS.slice(1);

export function memberById(id: string): CircleMember | undefined {
  return MEMBERS.find((m) => m.id === id);
}

// Tables

export const MEMORY_TABLE: PermissionTable = {
  id: "memory",
  title: "Memory",
  kind: "memory",
  owner: "you",
  collapsible: true,
  blurb: "What your AI remembers about you. Share a layer to let a member's AI read it.",
  rows: [
    { id: "saved-facts",    label: "Saved Facts",    icon: FileText },
    { id: "library",        label: "Library",        icon: BookOpen },
    { id: "chats",          label: "Chats",          icon: MessagesSquare },
    { id: "files-notes",    label: "Files & Notes",  icon: FileStack },
    { id: "project-briefs", label: "Project Briefs", icon: FolderKanban },
    { id: "preferences",    label: "Preferences",    icon: SlidersHorizontal },
    { id: "recall-check",   label: "Recall Check",   icon: Fingerprint },
  ],
};

export const ORCHESTRATOR_TABLE: PermissionTable = {
  id: "orchestrator",
  title: "Orchestrator",
  kind: "orchestrator",
  owner: "you",
  blurb: "Let a member's AI coordinate with yours through the orchestrator.",
  rows: [
    { id: "orchestrator", label: "Orchestrator handoff", icon: Terminal },
  ],
};

export const YOUR_APPS_TABLE: PermissionTable = {
  id: "your-apps",
  title: "Apps (You connected)",
  kind: "apps",
  owner: "you",
  blurb: "Apps you signed into UnClick. Share one to let a member's AI use your connection.",
  rows: [
    { id: "dropbox",  label: "Dropbox",      account: "david.s@gmail.com" },
    { id: "gdrive",   label: "Google Drive", account: "sam.tech@outlook.com" },
    { id: "gmail",    label: "Gmail",        account: "johndohe@work.com" },
    { id: "spotify",  label: "Spotify",      account: "johndoh@gmail.com" },
    { id: "onedrive", label: "OneDrive",     account: "johndoh@gmail.com" },
    { id: "xero",     label: "Xero",         account: "johndoh@gmail.com" },
    { id: "github",   label: "GitHub",       account: "johndoh@gmail.com" },
  ],
};

export const DAVID_APPS_TABLE: PermissionTable = {
  id: "david-apps",
  title: "Apps (David connected)",
  kind: "apps",
  owner: "david",
  blurb: "Apps David connected and shared into the circle. You can only accept or decline your own access.",
  rows: [
    { id: "dropbox", label: "Dropbox",      account: "johndoh@gmail.com" },
    { id: "gdrive",  label: "Google Drive", account: "johndoh@gmail.com" },
    { id: "gmail",   label: "Gmail",        account: "johndoh@gmail.com" },
    { id: "spotify", label: "Spotify",      account: "johndoh@gmail.com" },
  ],
};

export const MIA_APPS_TABLE: PermissionTable = {
  id: "mia-apps",
  title: "Apps (Mia connected)",
  kind: "apps",
  owner: "mia",
  blurb: "Apps Mia connected and shared into the circle. You can only accept or decline your own access.",
  rows: [
    { id: "gdrive", label: "Google Drive", account: "johndoh@gmail.com" },
    { id: "notion", label: "Notion",       account: "johndoh@gmail.com" },
  ],
};

export const YOUR_TABLES: PermissionTable[] = [MEMORY_TABLE, ORCHESTRATOR_TABLE, YOUR_APPS_TABLE];
export const PEER_TABLES: PermissionTable[] = [DAVID_APPS_TABLE, MIA_APPS_TABLE];
export const ALL_TABLES: PermissionTable[] = [...YOUR_TABLES, ...PEER_TABLES];

// Editability policy. The whole point: which cells a human may change is a
// fixed rule, not an AI judgement call.

export function isYouOwned(table: PermissionTable): boolean {
  return table.owner === "you";
}

/**
 * You-owned table: every peer column is editable (the You column is the row
 * master, handled separately). Peer-owned table: only your own column is
 * editable, because every other column is the owner-to-other-member
 * relationship and none of your business to change.
 */
export function isCellEditable(table: PermissionTable, member: CircleMember): boolean {
  if (isYouOwned(table)) return !member.isYou;
  return Boolean(member.isYou);
}

/** Member ids whose cells you may flip in this table. */
export function rowEditableMemberIds(table: PermissionTable): string[] {
  if (isYouOwned(table)) return PEERS.map((m) => m.id);
  return ["you"];
}

/** Keys the You-column row master governs (you-owned tables). */
export function rowMasterKeys(table: PermissionTable, row: ResourceRow): string[] {
  return rowEditableMemberIds(table).map((memberId) => cellKey(table.id, row.id, memberId));
}

/** Every editable key in the table, for the table master. */
export function tableMasterKeys(table: PermissionTable): string[] {
  const keys: string[] = [];
  for (const row of table.rows) {
    for (const memberId of rowEditableMemberIds(table)) {
      keys.push(cellKey(table.id, row.id, memberId));
    }
  }
  return keys;
}

// Seeding. Inverse of deriveVisual, used ONLY to build the demo ledger.

export function bitsFor(visual: ShareVisual): ShareState {
  switch (visual) {
    case "both": return { youShares: true, peerShares: true };
    case "out":  return { youShares: true, peerShares: false };
    case "in":   return { youShares: false, peerShares: true };
    default:     return { youShares: false, peerShares: false };
  }
}

/**
 * Demo seed so the prototype shows all four visuals on first load. In
 * production this should be EMPTY (nothing shared until a switch is flipped).
 */
const SEED: Array<[string, string, string, ShareVisual]> = [
  // Memory (you-owned)
  ["memory", "saved-facts", "priya", "both"],
  ["memory", "saved-facts", "sam", "both"],
  ["memory", "saved-facts", "david", "both"],
  ["memory", "saved-facts", "mia", "out"],
  ["memory", "library", "priya", "out"],
  ["memory", "library", "david", "both"],
  ["memory", "chats", "sam", "in"],
  ["memory", "chats", "leo", "both"],
  ["memory", "files-notes", "sam", "in"],
  ["memory", "files-notes", "leo", "both"],
  ["memory", "project-briefs", "david", "both"],
  ["memory", "preferences", "priya", "out"],
  ["memory", "preferences", "leo", "both"],
  ["memory", "recall-check", "priya", "in"],
  // Orchestrator (you-owned)
  ["orchestrator", "orchestrator", "priya", "both"],
  ["orchestrator", "orchestrator", "sam", "both"],
  ["orchestrator", "orchestrator", "david", "both"],
  ["orchestrator", "orchestrator", "leo", "both"],
  ["orchestrator", "orchestrator", "mia", "both"],
  // Apps you connected (you-owned)
  ["your-apps", "dropbox", "priya", "both"],
  ["your-apps", "dropbox", "sam", "both"],
  ["your-apps", "dropbox", "david", "in"],
  ["your-apps", "dropbox", "leo", "both"],
  ["your-apps", "gdrive", "priya", "both"],
  ["your-apps", "gdrive", "sam", "both"],
  ["your-apps", "gmail", "priya", "both"],
  ["your-apps", "spotify", "priya", "both"],
  ["your-apps", "github", "priya", "both"],
  ["your-apps", "github", "david", "both"],
  // Apps David connected (peer-owned). The "you" column is the only one you
  // can change; it records whether you accepted David's share.
  ["david-apps", "dropbox", "you", "in"],
  ["david-apps", "gdrive", "you", "both"],
  ["david-apps", "gmail", "you", "both"],
  ["david-apps", "spotify", "you", "out"],
  // A couple of owner-to-other-member bits so the view-only columns are not blank.
  ["david-apps", "gdrive", "sam", "both"],
  ["david-apps", "gmail", "priya", "in"],
  // Apps Mia connected (peer-owned)
  ["mia-apps", "gdrive", "you", "in"],
  ["mia-apps", "notion", "you", "both"],
];

export const STORAGE_KEY = "unclick_circle_permissions_v1";

export function buildDefaultLedger(): ShareLedger {
  const ledger: ShareLedger = {};
  for (const [tableId, resourceId, memberId, visual] of SEED) {
    ledger[cellKey(tableId, resourceId, memberId)] = bitsFor(visual);
  }
  return ledger;
}

function isShareState(value: unknown): value is ShareState {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as ShareState).youShares === "boolean" &&
    typeof (value as ShareState).peerShares === "boolean"
  );
}

/** Defaults, then any sanitized localStorage entries layered on top. */
export function loadLedger(): ShareLedger {
  const base = buildDefaultLedger();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return base;
    const merged: ShareLedger = { ...base };
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (isShareState(value)) {
        merged[key] = { youShares: value.youShares, peerShares: value.peerShares };
      }
    }
    return merged;
  } catch {
    return base;
  }
}

export function saveLedger(ledger: ShareLedger): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
  } catch {
    // ignore quota / unavailable storage
  }
}

export function clearLedger(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore unavailable storage
  }
}
