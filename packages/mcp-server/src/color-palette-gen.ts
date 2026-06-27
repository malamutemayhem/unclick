export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export class ColorPaletteGen {
  static hslToRgb(hsl: HSL): RGB {
    const { h, s, l } = hsl;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
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

  static rgbToHex(rgb: RGB): string {
    const toHex = (n: number): string => n.toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  static hexToRgb(hex: string): RGB {
    const h = hex.replace("#", "");
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  }

  static complementary(hsl: HSL): HSL {
    return { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l };
  }

  static analogous(hsl: HSL, angle: number = 30): HSL[] {
    return [
      { h: (hsl.h - angle + 360) % 360, s: hsl.s, l: hsl.l },
      hsl,
      { h: (hsl.h + angle) % 360, s: hsl.s, l: hsl.l },
    ];
  }

  static triadic(hsl: HSL): HSL[] {
    return [
      hsl,
      { h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l },
      { h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l },
    ];
  }

  static tetradic(hsl: HSL): HSL[] {
    return [
      hsl,
      { h: (hsl.h + 90) % 360, s: hsl.s, l: hsl.l },
      { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l },
      { h: (hsl.h + 270) % 360, s: hsl.s, l: hsl.l },
    ];
  }

  static monochromatic(hsl: HSL, steps: number = 5): HSL[] {
    const result: HSL[] = [];
    for (let i = 0; i < steps; i++) {
      const l = (i + 1) / (steps + 1);
      result.push({ h: hsl.h, s: hsl.s, l });
    }
    return result;
  }

  static splitComplementary(hsl: HSL, angle: number = 30): HSL[] {
    return [
      hsl,
      { h: (hsl.h + 180 - angle + 360) % 360, s: hsl.s, l: hsl.l },
      { h: (hsl.h + 180 + angle) % 360, s: hsl.s, l: hsl.l },
    ];
  }

  static contrastRatio(rgb1: RGB, rgb2: RGB): number {
    const luminance = (rgb: RGB): number => {
      const srgb = [rgb.r, rgb.g, rgb.b].map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    };
    const l1 = luminance(rgb1);
    const l2 = luminance(rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  static paletteToHex(palette: HSL[]): string[] {
    return palette.map((hsl) => this.rgbToHex(this.hslToRgb(hsl)));
  }
}
