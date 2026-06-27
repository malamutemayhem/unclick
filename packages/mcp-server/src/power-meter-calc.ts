export type PowerMeterType =
  | "revenue_grade_ct"
  | "branch_circuit_panel"
  | "portable_clamp_on"
  | "submeter_tenant_billing"
  | "iot_cloud_wireless";

interface PowerMeterData {
  accuracy: number;
  granularity: number;
  connectivity: number;
  installEase: number;
  pmCost: number;
  revenueGrade: boolean;
  forTenant: boolean;
  interface_: string;
  bestUse: string;
}

const DATA: Record<PowerMeterType, PowerMeterData> = {
  revenue_grade_ct: {
    accuracy: 10, granularity: 7, connectivity: 7, installEase: 4, pmCost: 8,
    revenueGrade: true, forTenant: false,
    interface_: "modbus_rtu_rs485_pulse",
    bestUse: "utility_billing_main_service",
  },
  branch_circuit_panel: {
    accuracy: 8, granularity: 10, connectivity: 8, installEase: 5, pmCost: 7,
    revenueGrade: false, forTenant: false,
    interface_: "modbus_tcp_ip_multi_ct",
    bestUse: "data_center_panel_monitoring",
  },
  portable_clamp_on: {
    accuracy: 6, granularity: 4, connectivity: 5, installEase: 10, pmCost: 3,
    revenueGrade: false, forTenant: false,
    interface_: "bluetooth_usb_local_logging",
    bestUse: "energy_audit_spot_check",
  },
  submeter_tenant_billing: {
    accuracy: 9, granularity: 6, connectivity: 8, installEase: 6, pmCost: 6,
    revenueGrade: true, forTenant: true,
    interface_: "modbus_rtu_bacnet_billing",
    bestUse: "multi_tenant_office_billing",
  },
  iot_cloud_wireless: {
    accuracy: 7, granularity: 8, connectivity: 10, installEase: 8, pmCost: 5,
    revenueGrade: false, forTenant: false,
    interface_: "wifi_lora_cloud_api_rest",
    bestUse: "retrofit_monitoring_analytics",
  },
};

function get(t: PowerMeterType): PowerMeterData {
  return DATA[t];
}

export const accuracy = (t: PowerMeterType) => get(t).accuracy;
export const granularity = (t: PowerMeterType) => get(t).granularity;
export const connectivity = (t: PowerMeterType) => get(t).connectivity;
export const installEase = (t: PowerMeterType) => get(t).installEase;
export const pmCost = (t: PowerMeterType) => get(t).pmCost;
export const revenueGrade = (t: PowerMeterType) => get(t).revenueGrade;
export const forTenant = (t: PowerMeterType) => get(t).forTenant;
export const interface_ = (t: PowerMeterType) => get(t).interface_;
export const bestUse = (t: PowerMeterType) => get(t).bestUse;
export const powerMeterTypes = (): PowerMeterType[] =>
  Object.keys(DATA) as PowerMeterType[];
