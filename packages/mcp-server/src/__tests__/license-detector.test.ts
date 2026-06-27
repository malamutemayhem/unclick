import { describe, it, expect } from "vitest";
import { LicenseDetector } from "../license-detector.js";

describe("LicenseDetector", () => {
  it("detects MIT license from text", () => {
    const result = LicenseDetector.detect("Permission is hereby granted, free of charge...");
    expect(result).not.toBeNull();
    expect(result!.id).toBe("MIT");
  });

  it("detects Apache 2.0 license", () => {
    const result = LicenseDetector.detect("Licensed under the Apache License, Version 2.0");
    expect(result).not.toBeNull();
    expect(result!.id).toBe("Apache-2.0");
  });

  it("detects GPL-3.0", () => {
    const result = LicenseDetector.detect("GNU GENERAL PUBLIC LICENSE Version 3");
    expect(result).not.toBeNull();
    expect(result!.id).toBe("GPL-3.0");
  });

  it("returns null for unrecognized text", () => {
    expect(LicenseDetector.detect("This is just random text")).toBeNull();
  });

  it("gets license by ID", () => {
    const mit = LicenseDetector.getById("MIT");
    expect(mit).not.toBeNull();
    expect(mit!.name).toBe("MIT License");
    expect(mit!.category).toBe("permissive");
  });

  it("gets license by name", () => {
    const result = LicenseDetector.getByName("Apache");
    expect(result).not.toBeNull();
    expect(result!.id).toBe("Apache-2.0");
  });

  it("checks compatibility between permissive licenses", () => {
    expect(LicenseDetector.isCompatible("MIT", "Apache-2.0")).toBe(true);
    expect(LicenseDetector.isCompatible("BSD-2-Clause", "ISC")).toBe(true);
  });

  it("checks permissive compatible with copyleft", () => {
    expect(LicenseDetector.isCompatible("MIT", "GPL-3.0")).toBe(true);
  });

  it("checks copyleft incompatible with different copyleft", () => {
    expect(LicenseDetector.isCompatible("GPL-2.0", "GPL-3.0")).toBe(false);
  });

  it("filters by category", () => {
    const copyleft = LicenseDetector.byCategory("copyleft");
    expect(copyleft.every((l) => l.category === "copyleft")).toBe(true);
    expect(copyleft.length).toBeGreaterThan(0);
  });

  it("lists OSI approved licenses", () => {
    const osi = LicenseDetector.osiApproved();
    expect(osi.every((l) => l.osiApproved)).toBe(true);
  });

  it("lists licenses with patent grants", () => {
    const patent = LicenseDetector.withPatentGrant();
    expect(patent.every((l) => l.patent)).toBe(true);
    expect(patent.some((l) => l.id === "Apache-2.0")).toBe(true);
  });

  it("searches licenses", () => {
    const results = LicenseDetector.search("bsd");
    expect(results.length).toBe(2);
  });

  it("lists all licenses", () => {
    expect(LicenseDetector.all().length).toBeGreaterThan(10);
  });
});
