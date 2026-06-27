import { describe, it, expect } from "vitest";
import {
  pickRate, throughput, payload, workspace,
  dpCost_, washdown, forFood, pickerConfig,
  bestUse, deltaPickerTypes,
} from "../delta-picker-calc.js";

describe("pickRate", () => {
  it("high speed delta best pick rate", () => {
    expect(pickRate("high_speed_delta")).toBeGreaterThan(pickRate("heavy_payload_delta"));
  });
});

describe("throughput", () => {
  it("high speed delta highest throughput", () => {
    expect(throughput("high_speed_delta")).toBeGreaterThan(throughput("heavy_payload_delta"));
  });
});

describe("payload", () => {
  it("heavy payload delta best payload", () => {
    expect(payload("heavy_payload_delta")).toBeGreaterThan(payload("high_speed_delta"));
  });
});

describe("workspace", () => {
  it("heavy payload delta best workspace", () => {
    expect(workspace("heavy_payload_delta")).toBeGreaterThan(workspace("high_speed_delta"));
  });
});

describe("dpCost_", () => {
  it("vision guided delta most expensive", () => {
    expect(dpCost_("vision_guided_delta")).toBeGreaterThan(dpCost_("standard_delta"));
  });
});

describe("washdown", () => {
  it("hygienic delta has washdown", () => {
    expect(washdown("hygienic_delta")).toBe(true);
  });
  it("standard delta no washdown", () => {
    expect(washdown("standard_delta")).toBe(false);
  });
});

describe("forFood", () => {
  it("hygienic delta for food", () => {
    expect(forFood("hygienic_delta")).toBe(true);
  });
  it("standard delta not for food", () => {
    expect(forFood("standard_delta")).toBe(false);
  });
});

describe("pickerConfig", () => {
  it("vision guided delta uses camera track conveyor pick random pose", () => {
    expect(pickerConfig("vision_guided_delta")).toBe("vision_guided_delta_picker_camera_track_conveyor_pick_random_pose");
  });
});

describe("bestUse", () => {
  it("high speed delta for blister pack 200 picks min light item", () => {
    expect(bestUse("high_speed_delta")).toBe("blister_pack_high_speed_delta_picker_200_picks_min_light_item");
  });
});

describe("deltaPickerTypes", () => {
  it("returns 5 types", () => {
    expect(deltaPickerTypes()).toHaveLength(5);
  });
});
