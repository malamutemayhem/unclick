export type LightPipeType =
  | "rigid_acrylic_round"
  | "flexible_silicone"
  | "right_angle_prism"
  | "panel_mount_chrome"
  | "smd_surface_guide";

const DATA: Record<LightPipeType, {
  transmission: number; flexibility: number; alignment: number;
  sizeCompact: number; pipeCost: number; flexible: boolean;
  forPanel: boolean; material: string; bestUse: string;
}> = {
  rigid_acrylic_round: { transmission: 9, flexibility: 1, alignment: 8, sizeCompact: 6, pipeCost: 2, flexible: false, forPanel: true, material: "pmma_acrylic_clear", bestUse: "pcb_to_panel_led_route" },
  flexible_silicone: { transmission: 6, flexibility: 10, alignment: 4, sizeCompact: 5, pipeCost: 4, flexible: true, forPanel: false, material: "silicone_rubber_clear", bestUse: "curved_path_led_guide" },
  right_angle_prism: { transmission: 8, flexibility: 1, alignment: 9, sizeCompact: 7, pipeCost: 3, flexible: false, forPanel: true, material: "polycarbonate_prism", bestUse: "right_angle_indicator" },
  panel_mount_chrome: { transmission: 7, flexibility: 1, alignment: 9, sizeCompact: 4, pipeCost: 5, flexible: false, forPanel: true, material: "chrome_bezel_acrylic", bestUse: "professional_panel_led" },
  smd_surface_guide: { transmission: 7, flexibility: 1, alignment: 7, sizeCompact: 10, pipeCost: 2, flexible: false, forPanel: false, material: "clear_pc_micro_lens", bestUse: "smd_led_board_surface" },
};

const get = (t: LightPipeType) => DATA[t];

export const transmission = (t: LightPipeType) => get(t).transmission;
export const flexibility = (t: LightPipeType) => get(t).flexibility;
export const alignment = (t: LightPipeType) => get(t).alignment;
export const sizeCompact = (t: LightPipeType) => get(t).sizeCompact;
export const pipeCost = (t: LightPipeType) => get(t).pipeCost;
export const flexible = (t: LightPipeType) => get(t).flexible;
export const forPanel = (t: LightPipeType) => get(t).forPanel;
export const material = (t: LightPipeType) => get(t).material;
export const bestUse = (t: LightPipeType) => get(t).bestUse;
export const lightPipes = (): LightPipeType[] => Object.keys(DATA) as LightPipeType[];
