export const CIRCLE_PERMISSIONS = ["shared_memory", "shared_orchestrator", "shared_chat"] as const;

export type CirclePermission = (typeof CIRCLE_PERMISSIONS)[number];

export interface LinkPermissionRow {
  link_id: string;
  permission: string;
  owner_user_id: string;
  grantee_user_id: string;
  owner_enabled: boolean | null;
  grantee_enabled: boolean | null;
}

export interface CirclePermissionState {
  give_enabled: boolean;
  give_accepted: boolean;
  give_active: boolean;
  receive_enabled: boolean;
  receive_offered: boolean;
  receive_active: boolean;
}

export type CirclePermissionMap = Record<CirclePermission, CirclePermissionState>;

export function normalizeCircleEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isCirclePermission(value: unknown): value is CirclePermission {
  return typeof value === "string" && CIRCLE_PERMISSIONS.includes(value as CirclePermission);
}

export function blankCirclePermissionState(): CirclePermissionMap {
  return Object.fromEntries(
    CIRCLE_PERMISSIONS.map((permission) => [
      permission,
      {
        give_enabled: false,
        give_accepted: false,
        give_active: false,
        receive_enabled: false,
        receive_offered: false,
        receive_active: false,
      },
    ]),
  ) as CirclePermissionMap;
}

export function buildCirclePermissionState(
  callerUserId: string,
  otherUserId: string | null,
  rows: LinkPermissionRow[],
): CirclePermissionMap {
  const state = blankCirclePermissionState();
  if (!otherUserId) return state;

  for (const permission of CIRCLE_PERMISSIONS) {
    const give = rows.find(
      (row) =>
        row.permission === permission &&
        row.owner_user_id === callerUserId &&
        row.grantee_user_id === otherUserId,
    );
    const receive = rows.find(
      (row) =>
        row.permission === permission &&
        row.owner_user_id === otherUserId &&
        row.grantee_user_id === callerUserId,
    );

    const giveEnabled = Boolean(give?.owner_enabled);
    const giveAccepted = Boolean(give?.grantee_enabled);
    const receiveOffered = Boolean(receive?.owner_enabled);
    const receiveEnabled = Boolean(receive?.grantee_enabled);

    state[permission] = {
      give_enabled: giveEnabled,
      give_accepted: giveAccepted,
      give_active: giveEnabled && giveAccepted,
      receive_enabled: receiveEnabled,
      receive_offered: receiveOffered,
      receive_active: receiveOffered && receiveEnabled,
    };
  }

  return state;
}

export function countActiveOutboundShares(permissionMaps: CirclePermissionMap[]): number {
  return permissionMaps.filter((permissions) =>
    CIRCLE_PERMISSIONS.some((permission) => permissions[permission].give_active),
  ).length;
}
