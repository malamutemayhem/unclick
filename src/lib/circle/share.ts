// Declarative "share registry" for Circle.
//
// Every shareable thing describes its own permission as a bolt-on entry. The
// Circle matrix renders itself from this list, so shipping a new feature is one
// entry here (no UI rewrite): give it an id, a parent for grouping, a label,
// and the backend permission key it maps to. Entries whose backendKey is null
// are shown for structure and transparency (so advanced users can see what a
// parent covers) but are not independently wired yet; fine-grained control goes
// live the moment that key plus its access rule ship - flip backendKey from
// null and it becomes a real toggle, no further UI work.

export type PermissionKey = "shared_memory" | "shared_orchestrator";

export interface PermissionState {
  give_enabled: boolean;
  give_accepted: boolean;
  give_active: boolean;
  receive_enabled: boolean;
  receive_offered: boolean;
  receive_active: boolean;
}

export interface ShareResource {
  id: string;
  parentId: string | null;
  label: string;
  description: string;
  // The backend link_permissions key this maps to, or null when the resource
  // is structure-only (shown, but finer control is not stored yet).
  backendKey: PermissionKey | null;
  // Sensitive resources (e.g. sharing access to a connected account) stay
  // gated until a security review signs them off.
  sensitive?: boolean;
}

// The single source of truth for what can be shared. Add a row to extend Circle.
export const SHARE_RESOURCES: ShareResource[] = [
  {
    id: "memory",
    parentId: null,
    label: "Memory",
    description: "Facts, preferences, and session summaries.",
    backendKey: "shared_memory",
  },
  { id: "memory.facts", parentId: "memory", label: "Saved Facts", description: "Durable facts you have saved.", backendKey: null },
  { id: "memory.library", parentId: "memory", label: "Library", description: "Reference docs and snapshots.", backendKey: null },
  { id: "memory.chats", parentId: "memory", label: "Chats", description: "Conversation summaries.", backendKey: null },
  { id: "memory.files", parentId: "memory", label: "Files & Notes", description: "Stored files and notes.", backendKey: null },
  { id: "memory.briefs", parentId: "memory", label: "Project Briefs", description: "Project context and briefs.", backendKey: null },
  { id: "memory.preferences", parentId: "memory", label: "Preferences", description: "Standing rules and preferences.", backendKey: null },
  { id: "memory.recall", parentId: "memory", label: "Recall Check", description: "Recall-quality signals.", backendKey: null },
  {
    id: "orchestrator",
    parentId: null,
    label: "Orchestrator",
    description: "Live chat continuity across sessions.",
    backendKey: "shared_orchestrator",
  },
  {
    id: "apps",
    parentId: null,
    label: "Connected apps",
    description: "Access to apps you have connected (Dropbox, Gmail, Drive, and more).",
    backendKey: null,
    sensitive: true,
  },
];

export type SideState = "off" | "pending" | "active";

export interface PillState {
  // give = outgoing: you share yours to them (the ">" arrow).
  give: SideState;
  // receive = incoming: you receive theirs (the "<" arrow).
  receive: SideState;
}

// Maps the backend's per-direction handshake flags onto the pill's two arrows.
// active = both sides opted in; pending = one side is waiting on the other.
export function derivePillState(state: PermissionState | undefined): PillState {
  if (!state) return { give: "off", receive: "off" };
  const give: SideState = state.give_active ? "active" : state.give_enabled ? "pending" : "off";
  const receive: SideState = state.receive_active
    ? "active"
    : state.receive_enabled || state.receive_offered
      ? "pending"
      : "off";
  return { give, receive };
}

// True when both directions are live: the full two-way handshake.
export function isTwoWay(state: PillState): boolean {
  return state.give === "active" && state.receive === "active";
}

// True when nothing is shared in either direction.
export function isNeutral(state: PillState): boolean {
  return state.give === "off" && state.receive === "off";
}

// Top-level groups paired with their child resources, in registry order.
export function shareGroups(): Array<{ group: ShareResource; children: ShareResource[] }> {
  return SHARE_RESOURCES.filter((resource) => resource.parentId === null).map((group) => ({
    group,
    children: SHARE_RESOURCES.filter((resource) => resource.parentId === group.id),
  }));
}

// Whether a resource is wired to the backend today (a live, clickable toggle).
export function isWired(resource: ShareResource): boolean {
  return resource.backendKey !== null && !resource.sensitive;
}
