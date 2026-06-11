import { describe, it, expect } from "vitest";
import {
  density, airflow, expansion, serviceability,
  formCost, toolless, forAi, standard,
  bestUse, serverForms,
} from "../server-form-calc.js";

describe("density", () => {
  it("blade chassis highest density", () => {
    expect(density("blade_chassis")).toBeGreaterThan(density("edge_rugged"));
  });
});

describe("airflow", () => {
  it("ocp open rack best airflow", () => {
    expect(airflow("ocp_open_rack")).toBeGreaterThan(airflow("edge_rugged"));
  });
});

describe("expansion", () => {
  it("rack 2u gpu most expansion", () => {
    expect(expansion("rack_2u_gpu")).toBeGreaterThan(expansion("edge_rugged"));
  });
});

describe("serviceability", () => {
  it("ocp open rack best serviceability", () => {
    expect(serviceability("ocp_open_rack")).toBeGreaterThan(serviceability("edge_rugged"));
  });
});

describe("formCost", () => {
  it("blade chassis most expensive", () => {
    expect(formCost("blade_chassis")).toBeGreaterThan(formCost("ocp_open_rack"));
  });
});

describe("toolless", () => {
  it("rack 1u dual is toolless", () => {
    expect(toolless("rack_1u_dual")).toBe(true);
  });
  it("edge rugged not toolless", () => {
    expect(toolless("edge_rugged")).toBe(false);
  });
});

describe("forAi", () => {
  it("rack 2u gpu is for ai", () => {
    expect(forAi("rack_2u_gpu")).toBe(true);
  });
  it("rack 1u dual not for ai", () => {
    expect(forAi("rack_1u_dual")).toBe(false);
  });
});

describe("standard", () => {
  it("ocp open rack uses ocp 21in ou power", () => {
    expect(standard("ocp_open_rack")).toBe("ocp_21in_ou_power");
  });
});

describe("bestUse", () => {
  it("ocp open rack best for hyperscale custom", () => {
    expect(bestUse("ocp_open_rack")).toBe("hyperscale_custom");
  });
});

describe("serverForms", () => {
  it("returns 5 types", () => {
    expect(serverForms()).toHaveLength(5);
  });
});
