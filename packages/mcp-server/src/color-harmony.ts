export interface HSL {
  h: number;
  s: number;
  l: number;
}

export class ColorHarmony {
  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  static rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l: Math.round(l * 10000) / 10000 };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
    return {
      h: Math.round(h * 10000) / 10000,
      s: Math.round(s * 10000) / 10000,
      l: Math.round(l * 10000) / 10000,
    };
  }

  static complementary(h: number, s: number, l: number): HSL[] {
    return [
      { h, s, l },
      { h: (h + 180) % 360, s, l },
    ];
  }

  static analogous(h: number, s: number, l: number, angle = 30): HSL[] {
    return [
      { h: (h - angle + 360) % 360, s, l },
      { h, s, l },
      { h: (h + angle) % 360, s, l },
    ];
  }

  static triadic(h: number, s: number, l: number): HSL[] {
    return [
      { h, s, l },
      { h: (h + 120) % 360, s, l },
      { h: (h + 240) % 360, s, l },
    ];
  }

  static tetradic(h: number, s: number, l: number): HSL[] {
    return [
      { h, s, l },
      { h: (h + 90) % 360, s, l },
      { h: (h + 180) % 360, s, l },
      { h: (h + 270) % 360, s, l },
    ];
  }

  static splitComplementary(h: number, s: number, l: number, angle = 30): HSL[] {
    return [
      { h, s, l },
      { h: (h + 180 - angle + 360) % 360, s, l },
      { h: (h + 180 + angle) % 360, s, l },
    ];
  }

  static monochromatic(h: number, s: number, l: number, count = 5): HSL[] {
    const result: HSL[] = [];
    for (let i = 0; i < count; i++) {
      const li = 0.1 + (0.8 * i) / (count - 1);
      result.push({ h, s, l: Math.round(li * 10000) / 10000 });
    }
    return result;
  }

  static warmCool(h: number): "warm" | "cool" {
    return (h >= 0 && h < 180) ? "warm" : "cool";
  }

  static hexToHsl(hex: string): HSL {
    const cleaned = hex.replace("#", "");
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    return ColorHarmony.rgbToHsl(r, g, b);
  }

  static hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = ColorHarmony.hslToRgb(h, s, l);
    return "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
  }
}
