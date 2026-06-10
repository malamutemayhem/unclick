export type WatchComplication = "chronograph" | "tourbillon" | "perpetual_calendar" | "minute_repeater" | "moon_phase";

export function mechanicalComplexity(c: WatchComplication): number {
  const m: Record<WatchComplication, number> = {
    chronograph: 5, tourbillon: 9, perpetual_calendar: 8, minute_repeater: 10, moon_phase: 4,
  };
  return m[c];
}

export function pricePremium(c: WatchComplication): number {
  const m: Record<WatchComplication, number> = {
    chronograph: 4, tourbillon: 9, perpetual_calendar: 8, minute_repeater: 10, moon_phase: 5,
  };
  return m[c];
}

export function practicalUtility(c: WatchComplication): number {
  const m: Record<WatchComplication, number> = {
    chronograph: 10, tourbillon: 3, perpetual_calendar: 8, minute_repeater: 5, moon_phase: 4,
  };
  return m[c];
}

export function visualAppeal(c: WatchComplication): number {
  const m: Record<WatchComplication, number> = {
    chronograph: 7, tourbillon: 10, perpetual_calendar: 6, minute_repeater: 5, moon_phase: 9,
  };
  return m[c];
}

export function serviceComplexity(c: WatchComplication): number {
  const m: Record<WatchComplication, number> = {
    chronograph: 6, tourbillon: 9, perpetual_calendar: 10, minute_repeater: 10, moon_phase: 4,
  };
  return m[c];
}

export function visibleOnDial(c: WatchComplication): boolean {
  const m: Record<WatchComplication, boolean> = {
    chronograph: true, tourbillon: true, perpetual_calendar: true, minute_repeater: false, moon_phase: true,
  };
  return m[c];
}

export function audibleFunction(c: WatchComplication): boolean {
  const m: Record<WatchComplication, boolean> = {
    chronograph: false, tourbillon: false, perpetual_calendar: false, minute_repeater: true, moon_phase: false,
  };
  return m[c];
}

export function primaryPurpose(c: WatchComplication): string {
  const m: Record<WatchComplication, string> = {
    chronograph: "elapsed_time_measurement", tourbillon: "gravity_compensation",
    perpetual_calendar: "date_tracking_leap_year", minute_repeater: "audible_time_telling",
    moon_phase: "lunar_cycle_display",
  };
  return m[c];
}

export function inventionEra(c: WatchComplication): string {
  const m: Record<WatchComplication, string> = {
    chronograph: "1816_louis_moinet", tourbillon: "1801_breguet",
    perpetual_calendar: "1762_mudge", minute_repeater: "1680s_barlow",
    moon_phase: "1600s_pocket_watches",
  };
  return m[c];
}

export function watchComplications(): WatchComplication[] {
  return ["chronograph", "tourbillon", "perpetual_calendar", "minute_repeater", "moon_phase"];
}
