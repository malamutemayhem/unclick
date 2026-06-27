import { describe, it, expect } from "vitest";
import {
  accuracy, range, realtime, reusability,
  dmCost, digital, forPersonnel, readout,
  bestUse, dosimeterTypes,
} from "../dosimeter-type-calc.js";

describe("accuracy", () => {
  it("osl most accurate", () => {
    expect(accuracy("osl_optically_stimulated")).toBeGreaterThan(accuracy("film_badge_photographic"));
  });
});

describe("range", () => {
  it("osl widest range", () => {
    expect(range("osl_optically_stimulated")).toBeGreaterThan(range("ion_chamber_pen"));
  });
});

describe("realtime", () => {
  it("electronic epd best realtime", () => {
    expect(realtime("electronic_personal_epd")).toBeGreaterThan(realtime("tld_thermoluminescent"));
  });
});

describe("reusability", () => {
  it("osl most reusable", () => {
    expect(reusability("osl_optically_stimulated")).toBeGreaterThan(reusability("film_badge_photographic"));
  });
});

describe("dmCost", () => {
  it("electronic epd most expensive", () => {
    expect(dmCost("electronic_personal_epd")).toBeGreaterThan(dmCost("film_badge_photographic"));
  });
});

describe("digital", () => {
  it("electronic epd is digital", () => {
    expect(digital("electronic_personal_epd")).toBe(true);
  });
  it("tld not digital", () => {
    expect(digital("tld_thermoluminescent")).toBe(false);
  });
});

describe("forPersonnel", () => {
  it("osl for personnel", () => {
    expect(forPersonnel("osl_optically_stimulated")).toBe(true);
  });
  it("ion chamber not for personnel", () => {
    expect(forPersonnel("ion_chamber_pen")).toBe(false);
  });
});

describe("readout", () => {
  it("film badge uses optical density", () => {
    expect(readout("film_badge_photographic")).toBe("optical_density_darkening");
  });
});

describe("bestUse", () => {
  it("ion chamber best for emergency responder", () => {
    expect(bestUse("ion_chamber_pen")).toBe("emergency_responder_pocket_check");
  });
});

describe("dosimeterTypes", () => {
  it("returns 5 types", () => {
    expect(dosimeterTypes()).toHaveLength(5);
  });
});
