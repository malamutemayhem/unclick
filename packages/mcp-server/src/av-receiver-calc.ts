export type AvReceiverType = "stereo_two_channel" | "five_one_surround" | "seven_two_atmos" | "nine_two_flagship" | "network_streamer";

export function channelCount(t: AvReceiverType): number {
  const m: Record<AvReceiverType, number> = {
    stereo_two_channel: 2, five_one_surround: 6, seven_two_atmos: 9, nine_two_flagship: 11, network_streamer: 2,
  };
  return m[t];
}

export function wattPerChannel(t: AvReceiverType): number {
  const m: Record<AvReceiverType, number> = {
    stereo_two_channel: 8, five_one_surround: 6, seven_two_atmos: 7, nine_two_flagship: 10, network_streamer: 4,
  };
  return m[t];
}

export function roomCalibration(t: AvReceiverType): number {
  const m: Record<AvReceiverType, number> = {
    stereo_two_channel: 3, five_one_surround: 7, seven_two_atmos: 9, nine_two_flagship: 10, network_streamer: 5,
  };
  return m[t];
}

export function streamingBuiltIn(t: AvReceiverType): number {
  const m: Record<AvReceiverType, number> = {
    stereo_two_channel: 4, five_one_surround: 6, seven_two_atmos: 8, nine_two_flagship: 9, network_streamer: 10,
  };
  return m[t];
}

export function receiverCost(t: AvReceiverType): number {
  const m: Record<AvReceiverType, number> = {
    stereo_two_channel: 4, five_one_surround: 5, seven_two_atmos: 7, nine_two_flagship: 10, network_streamer: 6,
  };
  return m[t];
}

export function hdmiPassthrough(t: AvReceiverType): boolean {
  const m: Record<AvReceiverType, boolean> = {
    stereo_two_channel: false, five_one_surround: true, seven_two_atmos: true, nine_two_flagship: true, network_streamer: false,
  };
  return m[t];
}

export function atmosHeight(t: AvReceiverType): boolean {
  const m: Record<AvReceiverType, boolean> = {
    stereo_two_channel: false, five_one_surround: false, seven_two_atmos: true, nine_two_flagship: true, network_streamer: false,
  };
  return m[t];
}

export function ampTopology(t: AvReceiverType): string {
  const m: Record<AvReceiverType, string> = {
    stereo_two_channel: "class_ab_analog",
    five_one_surround: "class_ab_multi_channel",
    seven_two_atmos: "class_d_efficient",
    nine_two_flagship: "class_a_reference",
    network_streamer: "class_d_digital_dac",
  };
  return m[t];
}

export function bestRoom(t: AvReceiverType): string {
  const m: Record<AvReceiverType, string> = {
    stereo_two_channel: "music_listening_purist",
    five_one_surround: "living_room_movie_night",
    seven_two_atmos: "dedicated_theater_room",
    nine_two_flagship: "reference_cinema_install",
    network_streamer: "multi_room_wireless",
  };
  return m[t];
}

export function avReceivers(): AvReceiverType[] {
  return ["stereo_two_channel", "five_one_surround", "seven_two_atmos", "nine_two_flagship", "network_streamer"];
}
