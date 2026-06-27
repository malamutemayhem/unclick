export type PmicType =
  | "discrete_multi_rail"
  | "integrated_soc_pmic"
  | "companion_processor"
  | "charger_gauge_combo"
  | "digital_pmbus_vr";

const DATA: Record<PmicType, {
  integration: number; flexibility: number; efficiency: number;
  railCount: number; pmicCost: number; programmable: boolean;
  forMobile: boolean; interface_: string; bestUse: string;
}> = {
  discrete_multi_rail: {
    integration: 2, flexibility: 10, efficiency: 9,
    railCount: 4, pmicCost: 5, programmable: false,
    forMobile: false, interface_: "analog_enable_pgood",
    bestUse: "server_board_custom_rail",
  },
  integrated_soc_pmic: {
    integration: 10, flexibility: 4, efficiency: 7,
    railCount: 10, pmicCost: 7, programmable: true,
    forMobile: true, interface_: "i2c_otp_register_map",
    bestUse: "smartphone_tablet_main",
  },
  companion_processor: {
    integration: 8, flexibility: 6, efficiency: 8,
    railCount: 8, pmicCost: 6, programmable: true,
    forMobile: false, interface_: "spi_sequence_engine",
    bestUse: "application_processor_pair",
  },
  charger_gauge_combo: {
    integration: 7, flexibility: 5, efficiency: 8,
    railCount: 3, pmicCost: 4, programmable: true,
    forMobile: true, interface_: "i2c_smbus_alert",
    bestUse: "wearable_battery_system",
  },
  digital_pmbus_vr: {
    integration: 6, flexibility: 9, efficiency: 10,
    railCount: 5, pmicCost: 8, programmable: true,
    forMobile: false, interface_: "pmbus_avs_telemetry",
    bestUse: "datacenter_vcore_adaptive",
  },
};

const get = (t: PmicType) => DATA[t];

export const integration = (t: PmicType) => get(t).integration;
export const flexibility = (t: PmicType) => get(t).flexibility;
export const efficiency = (t: PmicType) => get(t).efficiency;
export const railCount = (t: PmicType) => get(t).railCount;
export const pmicCost = (t: PmicType) => get(t).pmicCost;
export const programmable = (t: PmicType) => get(t).programmable;
export const forMobile = (t: PmicType) => get(t).forMobile;
export const interface_ = (t: PmicType) => get(t).interface_;
export const bestUse = (t: PmicType) => get(t).bestUse;
export const pmicTypes = (): PmicType[] => Object.keys(DATA) as PmicType[];
