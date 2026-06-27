import { describe, it, expect } from "vitest";
import {
  channelCount, wattPerChannel, roomCalibration, streamingBuiltIn,
  receiverCost, hdmiPassthrough, atmosHeight, ampTopology,
  bestRoom, avReceivers,
} from "../av-receiver-calc.js";

describe("channelCount", () => {
  it("nine two flagship most channels", () => {
    expect(channelCount("nine_two_flagship")).toBeGreaterThan(channelCount("stereo_two_channel"));
  });
});

describe("wattPerChannel", () => {
  it("nine two flagship most watts per channel", () => {
    expect(wattPerChannel("nine_two_flagship")).toBeGreaterThan(wattPerChannel("network_streamer"));
  });
});

describe("roomCalibration", () => {
  it("nine two flagship best room calibration", () => {
    expect(roomCalibration("nine_two_flagship")).toBeGreaterThan(roomCalibration("stereo_two_channel"));
  });
});

describe("streamingBuiltIn", () => {
  it("network streamer best streaming built in", () => {
    expect(streamingBuiltIn("network_streamer")).toBeGreaterThan(streamingBuiltIn("stereo_two_channel"));
  });
});

describe("receiverCost", () => {
  it("nine two flagship most expensive", () => {
    expect(receiverCost("nine_two_flagship")).toBeGreaterThan(receiverCost("stereo_two_channel"));
  });
});

describe("hdmiPassthrough", () => {
  it("five one surround has hdmi passthrough", () => {
    expect(hdmiPassthrough("five_one_surround")).toBe(true);
  });
  it("stereo two channel does not", () => {
    expect(hdmiPassthrough("stereo_two_channel")).toBe(false);
  });
});

describe("atmosHeight", () => {
  it("seven two atmos has atmos height", () => {
    expect(atmosHeight("seven_two_atmos")).toBe(true);
  });
  it("five one surround does not", () => {
    expect(atmosHeight("five_one_surround")).toBe(false);
  });
});

describe("ampTopology", () => {
  it("nine two flagship uses class a reference", () => {
    expect(ampTopology("nine_two_flagship")).toBe("class_a_reference");
  });
});

describe("bestRoom", () => {
  it("network streamer for multi room wireless", () => {
    expect(bestRoom("network_streamer")).toBe("multi_room_wireless");
  });
});

describe("avReceivers", () => {
  it("returns 5 types", () => {
    expect(avReceivers()).toHaveLength(5);
  });
});
