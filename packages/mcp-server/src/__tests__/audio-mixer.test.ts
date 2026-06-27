import { describe, it, expect } from "vitest";
import { AudioMixer } from "../audio-mixer.js";

describe("AudioMixer", () => {
  it("adds and tracks tracks", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("drums", [1, 0.5, 0.3]);
    mixer.addTrack("bass", [0.2, 0.4, 0.6]);
    expect(mixer.trackCount()).toBe(2);
    expect(mixer.getTrackNames()).toContain("drums");
  });

  it("removes tracks", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("drums", [1]);
    expect(mixer.removeTrack("drums")).toBe(true);
    expect(mixer.trackCount()).toBe(0);
  });

  it("mixes mono output", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [1, 1, 1], 1, 0);
    const mono = mixer.mixMono();
    expect(mono).toHaveLength(3);
    for (const s of mono) {
      expect(s).toBeGreaterThan(0);
    }
  });

  it("mixes stereo output", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("center", [1], 1, 0);
    const { left, right } = mixer.mixDown();
    expect(left[0]).toBeGreaterThan(0);
    expect(right[0]).toBeGreaterThan(0);
  });

  it("respects muting", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [1, 1]);
    mixer.mute("a");
    const mono = mixer.mixMono();
    expect(mono.every((s) => s === 0)).toBe(true);
  });

  it("respects solo", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [1]);
    mixer.addTrack("b", [0.5]);
    mixer.solo("a");
    const mono = mixer.mixMono();
    expect(mono[0]).toBeGreaterThan(0.4);
  });

  it("applies master volume", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [1]);
    mixer.setMasterVolume(0.5);
    const { left } = mixer.mixDown();
    expect(left[0]).toBeLessThan(1);
  });

  it("adjusts track volume", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [1], 1);
    mixer.setVolume("a", 0.5);
    const track = mixer.getTrack("a");
    expect(track!.volume).toBe(0.5);
  });

  it("pans left and right", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("left", [1], 1, -1);
    const { left, right } = mixer.mixDown();
    expect(left[0]).toBeGreaterThan(right[0]);
  });

  it("reports peak levels", () => {
    const mixer = new AudioMixer();
    mixer.addTrack("a", [0.5, -0.8, 0.3]);
    const peak = mixer.peakLevel();
    expect(peak.left).toBeGreaterThan(0);
    expect(peak.right).toBeGreaterThan(0);
  });
});
