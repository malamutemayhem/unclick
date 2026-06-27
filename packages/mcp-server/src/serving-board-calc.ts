export type ServingBoardType =
  | "wooden_board_standard"
  | "metal_board_durable"
  | "ratchet_board_tension"
  | "clamp_board_grip"
  | "powered_board_electric";

const specs: Record<ServingBoardType, {
  wrapTight: number; tensionControl: number; speedServe: number;
  ropeRange: number; cost: number; powered: boolean; ratchet: boolean;
  boardMaterial: string; use: string;
}> = {
  wooden_board_standard: {
    wrapTight: 75, tensionControl: 72, speedServe: 65,
    ropeRange: 70, cost: 25, powered: false, ratchet: false,
    boardMaterial: "hardwood_smooth", use: "general_rope_serve",
  },
  metal_board_durable: {
    wrapTight: 82, tensionControl: 78, speedServe: 70,
    ropeRange: 75, cost: 50, powered: false, ratchet: false,
    boardMaterial: "steel_chrome_plate", use: "heavy_wire_serve",
  },
  ratchet_board_tension: {
    wrapTight: 90, tensionControl: 95, speedServe: 72,
    ropeRange: 80, cost: 80, powered: false, ratchet: true,
    boardMaterial: "steel_ratchet_mech", use: "tight_serve_wrap",
  },
  clamp_board_grip: {
    wrapTight: 85, tensionControl: 82, speedServe: 68,
    ropeRange: 85, cost: 60, powered: false, ratchet: false,
    boardMaterial: "steel_clamp_jaw", use: "adjustable_serve",
  },
  powered_board_electric: {
    wrapTight: 80, tensionControl: 85, speedServe: 95,
    ropeRange: 90, cost: 300, powered: true, ratchet: false,
    boardMaterial: "motor_drive_spool", use: "production_serve",
  },
};

export function wrapTight(t: ServingBoardType): number { return specs[t].wrapTight; }
export function tensionControl(t: ServingBoardType): number { return specs[t].tensionControl; }
export function speedServe(t: ServingBoardType): number { return specs[t].speedServe; }
export function ropeRange(t: ServingBoardType): number { return specs[t].ropeRange; }
export function boardCost(t: ServingBoardType): number { return specs[t].cost; }
export function powered(t: ServingBoardType): boolean { return specs[t].powered; }
export function ratchet(t: ServingBoardType): boolean { return specs[t].ratchet; }
export function boardMaterial(t: ServingBoardType): string { return specs[t].boardMaterial; }
export function bestUse(t: ServingBoardType): string { return specs[t].use; }
export function servingBoards(): ServingBoardType[] { return Object.keys(specs) as ServingBoardType[]; }
