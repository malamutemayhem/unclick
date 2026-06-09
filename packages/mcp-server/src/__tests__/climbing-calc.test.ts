import { describe, it, expect } from "vitest";
import {
  convertGrade, gradeNumeric, isHarder, fallFactor, impactForce,
  ropeStretch, climbingTime, caloriesBurned, ropeDrag, gearWeight,
  rackWeight, approachTime, hydrationNeeded, sunExposure, restDays,
} from "../climbing-calc.js";

describe("convertGrade", () => {
  it("YDS to French", () => {
    expect(convertGrade("5.10a", "yds", "french")).toBe("6a");
  });

  it("French to YDS", () => {
    expect(convertGrade("7a", "french", "yds")).toBe("5.11c");
  });

  it("same system returns same", () => {
    expect(convertGrade("5.9", "yds", "yds")).toBe("5.9");
  });

  it("null for unknown", () => {
    expect(convertGrade("5.15z", "yds", "french")).toBeNull();
  });
});

describe("gradeNumeric", () => {
  it("V scale", () => {
    expect(gradeNumeric("V5", "v_scale")).toBe(5);
  });

  it("YDS numeric", () => {
    expect(gradeNumeric("5.10a", "yds")).toBeGreaterThan(gradeNumeric("5.9", "yds"));
  });
});

describe("isHarder", () => {
  it("5.12a harder than 5.10a", () => {
    expect(isHarder("5.12a", "5.10a", "yds")).toBe(true);
  });
});

describe("fallFactor", () => {
  it("max fall factor is 2", () => {
    expect(fallFactor(20, 10)).toBe(2);
  });

  it("0 for no rope", () => {
    expect(fallFactor(5, 0)).toBe(0);
  });
});

describe("impactForce", () => {
  it("higher for higher fall factor", () => {
    expect(impactForce(2, 80)).toBeGreaterThan(impactForce(0.5, 80));
  });

  it("positive value", () => {
    expect(impactForce(1, 75)).toBeGreaterThan(0);
  });
});

describe("ropeStretch", () => {
  it("increases with fall factor", () => {
    expect(ropeStretch(2, 30)).toBeGreaterThan(ropeStretch(0.5, 30));
  });
});

describe("climbingTime", () => {
  it("multi-pitch takes longer", () => {
    expect(climbingTime(5, 10)).toBeGreaterThan(climbingTime(1, 10));
  });
});

describe("caloriesBurned", () => {
  it("harder burns more", () => {
    expect(caloriesBurned(70, 60, "hard")).toBeGreaterThan(caloriesBurned(70, 60, "easy"));
  });
});

describe("ropeDrag", () => {
  it("more bends = more drag", () => {
    expect(ropeDrag(30, [30, 45, 60])).toBeGreaterThan(ropeDrag(30, [15]));
  });
});

describe("gearWeight", () => {
  it("sums weighted quantities", () => {
    const items = [
      { name: "Cam", weightG: 95, quantity: 4 },
      { name: "Nut", weightG: 35, quantity: 6 },
    ];
    expect(gearWeight(items)).toBe(590);
  });
});

describe("rackWeight", () => {
  it("computes total", () => {
    const w = rackWeight(6, 8, 12, 4);
    expect(w).toBe(6 * 95 + 8 * 35 + 12 * 100 + 4 * 70);
  });
});

describe("approachTime", () => {
  it("longer for unfit", () => {
    expect(approachTime(5, 500, "low")).toBeGreaterThan(approachTime(5, 500, "high"));
  });
});

describe("hydrationNeeded", () => {
  it("more in heat", () => {
    expect(hydrationNeeded(4, 35)).toBeGreaterThan(hydrationNeeded(4, 15));
  });
});

describe("sunExposure", () => {
  it("south wall gets sun", () => {
    expect(sunExposure(10, 4, "south")).toBe("sun");
  });

  it("north wall is shade", () => {
    expect(sunExposure(10, 4, "north")).toBe("shade");
  });
});

describe("restDays", () => {
  it("more rest for hard sessions", () => {
    expect(restDays(4, "hard")).toBeGreaterThanOrEqual(restDays(4, "easy"));
  });
});
