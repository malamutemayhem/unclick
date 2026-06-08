import { describe, it, expect } from "vitest";
import { ADSREnvelope, MultiEnvelope } from "../audio-envelope.js";

describe("ADSREnvelope", () => {
  it("starts idle", () => {
    const env = new ADSREnvelope();
    expect(env.getPhase()).toBe("idle");
    expect(env.getLevel()).toBe(0);
    expect(env.isActive()).toBe(false);
  });

  it("progresses through attack phase", () => {
    const env = new ADSREnvelope({ attack: 0.1, decay: 0.1, sustain: 0.5, release: 0.1 });
    env.noteOn();
    expect(env.getPhase()).toBe("attack");
    env.process(0.05);
    expect(env.getLevel()).toBeCloseTo(0.5, 1);
    env.process(0.05);
    expect(env.getLevel()).toBeCloseTo(1.0, 1);
  });

  it("progresses through decay to sustain", () => {
    const env = new ADSREnvelope({ attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.1 });
    env.noteOn();
    env.process(0.01); // through attack
    env.process(0.1); // through decay
    expect(env.getPhase()).toBe("sustain");
    expect(env.getLevel()).toBeCloseTo(0.5, 1);
  });

  it("releases and returns to idle", () => {
    const env = new ADSREnvelope({ attack: 0.01, decay: 0.01, sustain: 0.5, release: 0.1 });
    env.noteOn();
    env.process(0.02);
    env.noteOff();
    expect(env.getPhase()).toBe("release");
    env.process(0.1);
    expect(env.getLevel()).toBeCloseTo(0, 1);
    expect(env.getPhase()).toBe("idle");
  });

  it("resets to idle", () => {
    const env = new ADSREnvelope();
    env.noteOn();
    env.process(0.01);
    env.reset();
    expect(env.getPhase()).toBe("idle");
    expect(env.getLevel()).toBe(0);
  });

  it("reports total duration", () => {
    const env = new ADSREnvelope({ attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.3 });
    expect(env.totalDuration()).toBeCloseTo(0.6);
  });

  it("returns config", () => {
    const cfg = { attack: 0.1, decay: 0.2, sustain: 0.7, release: 0.3 };
    const env = new ADSREnvelope(cfg);
    expect(env.getConfig()).toEqual(cfg);
  });
});

describe("MultiEnvelope", () => {
  it("allocates voices", () => {
    const multi = new MultiEnvelope({}, 4);
    const v1 = multi.noteOn();
    const v2 = multi.noteOn();
    expect(v1).not.toBe(v2);
    expect(multi.activeVoices()).toBe(2);
  });

  it("reuses released voices", () => {
    const multi = new MultiEnvelope({ attack: 0.01, decay: 0.01, sustain: 0.5, release: 0.01 }, 2);
    const v1 = multi.noteOn();
    multi.noteOff(v1);
    multi.process(0.1); // let it finish releasing
    expect(multi.activeVoices()).toBe(0);
  });

  it("processes all voices", () => {
    const multi = new MultiEnvelope({}, 4);
    multi.noteOn();
    multi.noteOn();
    const levels = multi.process(0.01);
    expect(levels.length).toBe(4);
  });

  it("reports voice count", () => {
    const multi = new MultiEnvelope({}, 8);
    expect(multi.voiceCount()).toBe(8);
  });
});
