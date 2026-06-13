import { describe, it, expect } from "vitest";
import { wavelengthConvert } from "./wavelength-tool.js";

describe("wavelengthConvert", () => {
  it("converts visible light wavelength", async () => {
    const r = await wavelengthConvert({ wavelength_m: 5.5e-7 }) as any;
    expect(r.wavelength_nm).toBeCloseTo(550, 0);
    expect(r.spectrum_band).toBe("visible light");
  });

  it("converts from frequency", async () => {
    const r = await wavelengthConvert({ frequency_hz: 1e9 }) as any;
    expect(r.spectrum_band).toBe("microwave");
  });

  it("returns error for missing input", async () => {
    const r = await wavelengthConvert({}) as any;
    expect(r.error).toBeTruthy();
  });
});
