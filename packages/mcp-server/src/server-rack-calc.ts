export type ServerRackType =
  | "open_frame_2post"
  | "enclosed_4post_42u"
  | "wall_mount_12u"
  | "portable_rolling_18u"
  | "colocation_cage_42u";

const DATA: Record<ServerRackType, {
  rackUnits: number; loadCapacity: number; airflow: number;
  security: number; rackCost: number; enclosed: boolean;
  portable: boolean; mountStyle: string; bestUse: string;
}> = {
  open_frame_2post: { rackUnits: 7, loadCapacity: 5, airflow: 10, security: 2, rackCost: 3, enclosed: false, portable: false, mountStyle: "two_post_bolt", bestUse: "telecom_patch_frame" },
  enclosed_4post_42u: { rackUnits: 10, loadCapacity: 10, airflow: 7, security: 8, rackCost: 7, enclosed: true, portable: false, mountStyle: "four_post_cage_nut", bestUse: "datacenter_server_host" },
  wall_mount_12u: { rackUnits: 4, loadCapacity: 4, airflow: 6, security: 6, rackCost: 4, enclosed: true, portable: false, mountStyle: "wall_bracket_swing", bestUse: "closet_network_switch" },
  portable_rolling_18u: { rackUnits: 5, loadCapacity: 5, airflow: 7, security: 5, rackCost: 6, enclosed: true, portable: true, mountStyle: "caster_four_post", bestUse: "mobile_av_broadcast" },
  colocation_cage_42u: { rackUnits: 10, loadCapacity: 10, airflow: 8, security: 10, rackCost: 10, enclosed: true, portable: false, mountStyle: "bolted_cage_lock", bestUse: "colo_secure_tenant" },
};

const get = (t: ServerRackType) => DATA[t];

export const rackUnits = (t: ServerRackType) => get(t).rackUnits;
export const loadCapacity = (t: ServerRackType) => get(t).loadCapacity;
export const airflow = (t: ServerRackType) => get(t).airflow;
export const security = (t: ServerRackType) => get(t).security;
export const rackCost = (t: ServerRackType) => get(t).rackCost;
export const enclosed = (t: ServerRackType) => get(t).enclosed;
export const portable = (t: ServerRackType) => get(t).portable;
export const mountStyle = (t: ServerRackType) => get(t).mountStyle;
export const bestUse = (t: ServerRackType) => get(t).bestUse;
export const serverRacks = (): ServerRackType[] => Object.keys(DATA) as ServerRackType[];
