import { describe, it, expect } from "vitest";
import { PIDController } from "../pid-controller.js";

describe("PIDController", () => {
  it("proportional control drives output toward setpoint", () => {
    const pid = new PIDController({ kp: 1, ki: 0, kd: 0 });
    pid.setSetpoint(10);
    const output = pid.update(0, 1);
    expect(output).toBe(10);
  });

  it("integral accumulates over time", () => {
    const pid = new PIDController({ kp: 0, ki: 1, kd: 0 });
    pid.setSetpoint(5);
    pid.update(0, 1);
    const output = pid.update(0, 1);
    expect(output).toBe(10);
  });

  it("derivative responds to error change rate", () => {
    const pid = new PIDController({ kp: 0, ki: 0, kd: 1 });
    pid.setSetpoint(10);
    pid.update(0, 1);
    const output = pid.update(5, 1);
    expect(output).toBe(-5);
  });

  it("output clamps to min/max", () => {
    const pid = new PIDController({ kp: 100, ki: 0, kd: 0, outputMin: -10, outputMax: 10 });
    pid.setSetpoint(100);
    expect(pid.update(0, 1)).toBe(10);
  });

  it("reset clears state", () => {
    const pid = new PIDController({ kp: 1, ki: 1, kd: 1 });
    pid.setSetpoint(10);
    pid.update(0, 1);
    pid.reset();
    expect(pid.getError()).toBe(0);
    expect(pid.getIntegral()).toBe(0);
  });

  it("tune changes gains", () => {
    const pid = new PIDController({ kp: 1, ki: 0, kd: 0 });
    pid.tune(2, 3, 4);
    expect(pid.getGains()).toEqual({ kp: 2, ki: 3, kd: 4 });
  });

  it("simulate returns output sequence", () => {
    const pid = new PIDController({ kp: 1, ki: 0, kd: 0 });
    pid.setSetpoint(10);
    const outputs = pid.simulate([0, 5, 8, 10], 1);
    expect(outputs[0]).toBe(10);
    expect(outputs[3]).toBe(0);
  });

  it("integral windup is limited", () => {
    const pid = new PIDController({ kp: 0, ki: 1, kd: 0, integralMax: 5 });
    pid.setSetpoint(100);
    for (let i = 0; i < 20; i++) pid.update(0, 1);
    expect(pid.getIntegral()).toBe(5);
  });

  it("getOutput returns last computed output", () => {
    const pid = new PIDController({ kp: 2, ki: 0, kd: 0 });
    pid.setSetpoint(5);
    pid.update(0, 1);
    expect(pid.getOutput()).toBe(10);
  });
});
