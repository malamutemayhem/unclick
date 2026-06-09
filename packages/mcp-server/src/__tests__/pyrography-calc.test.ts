import { describe, it, expect } from "vitest";
import {
  burnTemp, burnSpeed, tipSelection, projectTime,
  sandingPrep, sealerCoats, carbonTransferTime, finishType,
  contrastLevel, ventilationNeeded, sessionLength,
  cooldownMinutes, woodSurfaces,
} from "../pyrography-calc.js";

describe("burnTemp", () => {
  it("maple needs highest temp", () => {
    expect(burnTemp("maple").idealC).toBeGreaterThan(burnTemp("basswood").idealC);
  });
});

describe("burnSpeed", () => {
  it("basswood is fast", () => {
    expect(burnSpeed("basswood")).toBe("fast");
  });

  it("maple is slow", () => {
    expect(burnSpeed("maple")).toBe("slow");
  });
});

describe("tipSelection", () => {
  it("outlining uses universal", () => {
    expect(tipSelection("outlining")).toBe("universal");
  });

  it("shading uses shading tip", () => {
    expect(tipSelection("shading")).toBe("shading");
  });
});

describe("projectTime", () => {
  it("more detail = more time", () => {
    expect(projectTime(100, "high")).toBeGreaterThan(projectTime(100, "low"));
  });
});

describe("sandingPrep", () => {
  it("returns ascending grits", () => {
    const grits = sandingPrep("birch");
    for (let i = 1; i < grits.length; i++) {
      expect(grits[i]).toBeGreaterThan(grits[i - 1]);
    }
  });
});

describe("sealerCoats", () => {
  it("pine needs 2 coats", () => {
    expect(sealerCoats("pine")).toBe(2);
  });

  it("maple needs 1 coat", () => {
    expect(sealerCoats("maple")).toBe(1);
  });
});

describe("carbonTransferTime", () => {
  it("positive hours", () => {
    expect(carbonTransferTime(200)).toBeGreaterThan(0);
  });
});

describe("finishType", () => {
  it("pine uses polyurethane", () => {
    expect(finishType("pine")).toBe("polyurethane");
  });
});

describe("contrastLevel", () => {
  it("dark at high temp", () => {
    expect(contrastLevel(500, "basswood")).toBe("dark");
  });

  it("light at low temp", () => {
    expect(contrastLevel(250, "basswood")).toBe("light");
  });
});

describe("ventilationNeeded", () => {
  it("true for large projects", () => {
    expect(ventilationNeeded(100)).toBe(true);
  });

  it("false for small projects", () => {
    expect(ventilationNeeded(30)).toBe(false);
  });
});

describe("sessionLength", () => {
  it("45 minutes", () => {
    expect(sessionLength()).toBe(45);
  });
});

describe("cooldownMinutes", () => {
  it("5 minutes", () => {
    expect(cooldownMinutes()).toBe(5);
  });
});

describe("woodSurfaces", () => {
  it("returns 6 surfaces", () => {
    expect(woodSurfaces()).toHaveLength(6);
    expect(woodSurfaces()).toContain("basswood");
  });
});
