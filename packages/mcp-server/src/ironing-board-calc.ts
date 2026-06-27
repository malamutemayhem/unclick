export type IroningBoardType = "full_size_stand" | "tabletop_mini" | "over_door_fold" | "built_in_wall_cabinet" | "sleeve_board";

export function ironingSurface(t: IroningBoardType): number {
  const m: Record<IroningBoardType, number> = {
    full_size_stand: 10, tabletop_mini: 4, over_door_fold: 6, built_in_wall_cabinet: 8, sleeve_board: 2,
  };
  return m[t];
}

export function stability(t: IroningBoardType): number {
  const m: Record<IroningBoardType, number> = {
    full_size_stand: 8, tabletop_mini: 6, over_door_fold: 5, built_in_wall_cabinet: 10, sleeve_board: 7,
  };
  return m[t];
}

export function storageEase(t: IroningBoardType): number {
  const m: Record<IroningBoardType, number> = {
    full_size_stand: 3, tabletop_mini: 9, over_door_fold: 10, built_in_wall_cabinet: 10, sleeve_board: 9,
  };
  return m[t];
}

export function heightAdjust(t: IroningBoardType): number {
  const m: Record<IroningBoardType, number> = {
    full_size_stand: 10, tabletop_mini: 2, over_door_fold: 5, built_in_wall_cabinet: 7, sleeve_board: 1,
  };
  return m[t];
}

export function boardCost(t: IroningBoardType): number {
  const m: Record<IroningBoardType, number> = {
    full_size_stand: 4, tabletop_mini: 2, over_door_fold: 5, built_in_wall_cabinet: 10, sleeve_board: 2,
  };
  return m[t];
}

export function foldFlat(t: IroningBoardType): boolean {
  const m: Record<IroningBoardType, boolean> = {
    full_size_stand: true, tabletop_mini: true, over_door_fold: true, built_in_wall_cabinet: true, sleeve_board: false,
  };
  return m[t];
}

export function ironRest(t: IroningBoardType): boolean {
  const m: Record<IroningBoardType, boolean> = {
    full_size_stand: true, tabletop_mini: false, over_door_fold: true, built_in_wall_cabinet: true, sleeve_board: false,
  };
  return m[t];
}

export function coverType(t: IroningBoardType): string {
  const m: Record<IroningBoardType, string> = {
    full_size_stand: "cotton_pad_reflective",
    tabletop_mini: "heat_resist_foam_pad",
    over_door_fold: "compact_cotton_cover",
    built_in_wall_cabinet: "premium_thick_pad",
    sleeve_board: "fitted_mini_pad",
  };
  return m[t];
}

export function bestSetup(t: IroningBoardType): string {
  const m: Record<IroningBoardType, string> = {
    full_size_stand: "dedicated_laundry_room",
    tabletop_mini: "apartment_dorm_travel",
    over_door_fold: "small_closet_space_save",
    built_in_wall_cabinet: "custom_laundry_remodel",
    sleeve_board: "dress_shirt_detail_press",
  };
  return m[t];
}

export function ironingBoards(): IroningBoardType[] {
  return ["full_size_stand", "tabletop_mini", "over_door_fold", "built_in_wall_cabinet", "sleeve_board"];
}
