export type FpgaFamily =
  | "sram_lut_based"
  | "flash_non_volatile"
  | "antifuse_otp"
  | "soc_fpga_hybrid"
  | "eprom_uv_erase";

const DATA: Record<FpgaFamily, {
  density: number; speed: number; powerEff: number;
  reconfigurable: number; fpgaCost: number; instantOn: boolean;
  forPrototype: boolean; config: string; bestUse: string;
}> = {
  sram_lut_based: {
    density: 10, speed: 9, powerEff: 5,
    reconfigurable: 10, fpgaCost: 6, instantOn: false,
    forPrototype: true, config: "bitstream_sram_load",
    bestUse: "datacenter_accelerator",
  },
  flash_non_volatile: {
    density: 6, speed: 7, powerEff: 8,
    reconfigurable: 8, fpgaCost: 4, instantOn: true,
    forPrototype: false, config: "flash_cell_program",
    bestUse: "industrial_motor_control",
  },
  antifuse_otp: {
    density: 5, speed: 8, powerEff: 9,
    reconfigurable: 1, fpgaCost: 3, instantOn: true,
    forPrototype: false, config: "one_time_fuse_blow",
    bestUse: "space_rad_hard_mission",
  },
  soc_fpga_hybrid: {
    density: 9, speed: 8, powerEff: 6,
    reconfigurable: 9, fpgaCost: 8, instantOn: false,
    forPrototype: true, config: "arm_plus_fabric_boot",
    bestUse: "embedded_vision_edge",
  },
  eprom_uv_erase: {
    density: 3, speed: 5, powerEff: 7,
    reconfigurable: 3, fpgaCost: 2, instantOn: true,
    forPrototype: false, config: "uv_window_reprogram",
    bestUse: "legacy_glue_logic_replace",
  },
};

const get = (t: FpgaFamily) => DATA[t];

export const density = (t: FpgaFamily) => get(t).density;
export const speed = (t: FpgaFamily) => get(t).speed;
export const powerEff = (t: FpgaFamily) => get(t).powerEff;
export const reconfigurable = (t: FpgaFamily) => get(t).reconfigurable;
export const fpgaCost = (t: FpgaFamily) => get(t).fpgaCost;
export const instantOn = (t: FpgaFamily) => get(t).instantOn;
export const forPrototype = (t: FpgaFamily) => get(t).forPrototype;
export const config = (t: FpgaFamily) => get(t).config;
export const bestUse = (t: FpgaFamily) => get(t).bestUse;
export const fpgaFamilies = (): FpgaFamily[] => Object.keys(DATA) as FpgaFamily[];
