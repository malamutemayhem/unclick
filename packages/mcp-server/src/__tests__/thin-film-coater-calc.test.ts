import { describe, it, expect } from "vitest";
import {
  filmDensity, throughput, thicknessControl, adhesion,
  tfCost, highEnergy, forAntiReflect, coaterConfig,
  bestUse, thinFilmCoaterTypes,
} from "../thin-film-coater-calc.js";

describe("filmDensity", () => {
  it("sputter coat best film density", () => {
    expect(filmDensity("sputter_coat")).toBeGreaterThan(filmDensity("dip_sol_gel"));
  });
});

describe("throughput", () => {
  it("sputter coat highest throughput", () => {
    expect(throughput("sputter_coat")).toBeGreaterThan(throughput("dip_sol_gel"));
  });
});

describe("thicknessControl", () => {
  it("iad coat best thickness control", () => {
    expect(thicknessControl("iad_coat")).toBeGreaterThan(thicknessControl("dip_sol_gel"));
  });
});

describe("adhesion", () => {
  it("sputter coat best adhesion", () => {
    expect(adhesion("sputter_coat")).toBeGreaterThan(adhesion("dip_sol_gel"));
  });
});

describe("tfCost", () => {
  it("iad coat most expensive", () => {
    expect(tfCost("iad_coat")).toBeGreaterThan(tfCost("dip_sol_gel"));
  });
});

describe("highEnergy", () => {
  it("ebeam evaporate is high energy", () => {
    expect(highEnergy("ebeam_evaporate")).toBe(true);
  });
  it("thermal evaporate not high energy", () => {
    expect(highEnergy("thermal_evaporate")).toBe(false);
  });
});

describe("forAntiReflect", () => {
  it("sputter coat for anti reflect", () => {
    expect(forAntiReflect("sputter_coat")).toBe(true);
  });
  it("dip sol gel not for anti reflect", () => {
    expect(forAntiReflect("dip_sol_gel")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("iad coat uses ion assist deposit dense shift free film", () => {
    expect(coaterConfig("iad_coat")).toBe("iad_thin_film_coater_ion_assist_deposit_dense_shift_free_film");
  });
});

describe("bestUse", () => {
  it("sputter coat for durable optics dense hard multilayer", () => {
    expect(bestUse("sputter_coat")).toBe("durable_optics_sputter_thin_film_coater_dense_hard_multilayer");
  });
});

describe("thinFilmCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(thinFilmCoaterTypes()).toHaveLength(5);
  });
});
