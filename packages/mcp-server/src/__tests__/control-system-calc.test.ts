import { describe, it, expect } from "vitest";
import {
  tuningComplexity, steadyStateAccuracy, computationalLoad,
  disturbanceRejection, robustness, requiresModel,
  linearOnly, commonIndustry, responseCharacteristic, controlSystems,
} from "../control-system-calc.js";

describe("tuningComplexity", () => {
  it("bang_bang simplest to tune", () => {
    expect(tuningComplexity("bang_bang")).toBeLessThan(
      tuningComplexity("pid")
    );
  });
});

describe("steadyStateAccuracy", () => {
  it("model_predictive most accurate", () => {
    expect(steadyStateAccuracy("model_predictive")).toBeGreaterThan(
      steadyStateAccuracy("bang_bang")
    );
  });
});

describe("computationalLoad", () => {
  it("model_predictive highest load", () => {
    expect(computationalLoad("model_predictive")).toBeGreaterThan(
      computationalLoad("pid")
    );
  });
});

describe("disturbanceRejection", () => {
  it("adaptive best rejection", () => {
    expect(disturbanceRejection("adaptive")).toBeGreaterThan(
      disturbanceRejection("bang_bang")
    );
  });
});

describe("robustness", () => {
  it("adaptive most robust", () => {
    expect(robustness("adaptive")).toBeGreaterThan(
      robustness("model_predictive")
    );
  });
});

describe("requiresModel", () => {
  it("model_predictive requires model", () => {
    expect(requiresModel("model_predictive")).toBe(true);
  });
  it("pid does not", () => {
    expect(requiresModel("pid")).toBe(false);
  });
});

describe("linearOnly", () => {
  it("pid is linear only", () => {
    expect(linearOnly("pid")).toBe(true);
  });
  it("fuzzy_logic is not", () => {
    expect(linearOnly("fuzzy_logic")).toBe(false);
  });
});

describe("commonIndustry", () => {
  it("pid used in process control", () => {
    expect(commonIndustry("pid")).toBe("process_control");
  });
});

describe("responseCharacteristic", () => {
  it("bang_bang has on_off_oscillation", () => {
    expect(responseCharacteristic("bang_bang")).toBe("on_off_oscillation");
  });
});

describe("controlSystems", () => {
  it("returns 5 systems", () => {
    expect(controlSystems()).toHaveLength(5);
  });
});
