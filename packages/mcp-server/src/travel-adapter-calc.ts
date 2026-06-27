export type TravelAdapterType = "universal_all_in_one" | "usb_c_gan_charger" | "plug_only_no_convert" | "voltage_converter_heavy" | "multi_port_power_strip";

export function countryCompat(t: TravelAdapterType): number {
  const m: Record<TravelAdapterType, number> = {
    universal_all_in_one: 10, usb_c_gan_charger: 6, plug_only_no_convert: 7, voltage_converter_heavy: 8, multi_port_power_strip: 5,
  };
  return m[t];
}

export function chargingPorts(t: TravelAdapterType): number {
  const m: Record<TravelAdapterType, number> = {
    universal_all_in_one: 6, usb_c_gan_charger: 8, plug_only_no_convert: 2, voltage_converter_heavy: 3, multi_port_power_strip: 10,
  };
  return m[t];
}

export function compactness(t: TravelAdapterType): number {
  const m: Record<TravelAdapterType, number> = {
    universal_all_in_one: 7, usb_c_gan_charger: 10, plug_only_no_convert: 9, voltage_converter_heavy: 2, multi_port_power_strip: 4,
  };
  return m[t];
}

export function safetyRating(t: TravelAdapterType): number {
  const m: Record<TravelAdapterType, number> = {
    universal_all_in_one: 8, usb_c_gan_charger: 9, plug_only_no_convert: 5, voltage_converter_heavy: 7, multi_port_power_strip: 6,
  };
  return m[t];
}

export function adapterCost(t: TravelAdapterType): number {
  const m: Record<TravelAdapterType, number> = {
    universal_all_in_one: 4, usb_c_gan_charger: 6, plug_only_no_convert: 1, voltage_converter_heavy: 7, multi_port_power_strip: 5,
  };
  return m[t];
}

export function convertsVoltage(t: TravelAdapterType): boolean {
  const m: Record<TravelAdapterType, boolean> = {
    universal_all_in_one: false, usb_c_gan_charger: true, plug_only_no_convert: false, voltage_converter_heavy: true, multi_port_power_strip: false,
  };
  return m[t];
}

export function surgeProtect(t: TravelAdapterType): boolean {
  const m: Record<TravelAdapterType, boolean> = {
    universal_all_in_one: true, usb_c_gan_charger: true, plug_only_no_convert: false, voltage_converter_heavy: true, multi_port_power_strip: true,
  };
  return m[t];
}

export function plugDesign(t: TravelAdapterType): string {
  const m: Record<TravelAdapterType, string> = {
    universal_all_in_one: "sliding_prong_multi_socket",
    usb_c_gan_charger: "folding_prong_gan_brick",
    plug_only_no_convert: "fixed_prong_single_type",
    voltage_converter_heavy: "transformer_coil_heavy",
    multi_port_power_strip: "cord_strip_multi_outlet",
  };
  return m[t];
}

export function bestTrip(t: TravelAdapterType): string {
  const m: Record<TravelAdapterType, string> = {
    universal_all_in_one: "multi_country_backpack",
    usb_c_gan_charger: "laptop_phone_fast_charge",
    plug_only_no_convert: "single_country_budget",
    voltage_converter_heavy: "hair_dryer_appliance",
    multi_port_power_strip: "family_hotel_room",
  };
  return m[t];
}

export function travelAdapters(): TravelAdapterType[] {
  return ["universal_all_in_one", "usb_c_gan_charger", "plug_only_no_convert", "voltage_converter_heavy", "multi_port_power_strip"];
}
