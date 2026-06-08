export interface SvgPoint {
  x: number;
  y: number;
}

export class SvgPathBuilder {
  private commands: string[] = [];

  moveTo(x: number, y: number): this {
    this.commands.push(`M ${x} ${y}`);
    return this;
  }

  lineTo(x: number, y: number): this {
    this.commands.push(`L ${x} ${y}`);
    return this;
  }

  horizontalTo(x: number): this {
    this.commands.push(`H ${x}`);
    return this;
  }

  verticalTo(y: number): this {
    this.commands.push(`V ${y}`);
    return this;
  }

  cubicBezier(cx1: number, cy1: number, cx2: number, cy2: number, x: number, y: number): this {
    this.commands.push(`C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`);
    return this;
  }

  quadraticBezier(cx: number, cy: number, x: number, y: number): this {
    this.commands.push(`Q ${cx} ${cy}, ${x} ${y}`);
    return this;
  }

  arc(rx: number, ry: number, rotation: number, largeArc: boolean, sweep: boolean, x: number, y: number): this {
    this.commands.push(`A ${rx} ${ry} ${rotation} ${largeArc ? 1 : 0} ${sweep ? 1 : 0} ${x} ${y}`);
    return this;
  }

  close(): this {
    this.commands.push("Z");
    return this;
  }

  build(): string {
    return this.commands.join(" ");
  }

  commandCount(): number {
    return this.commands.length;
  }

  static rectangle(x: number, y: number, width: number, height: number): string {
    return new SvgPathBuilder()
      .moveTo(x, y)
      .horizontalTo(x + width)
      .verticalTo(y + height)
      .horizontalTo(x)
      .close()
      .build();
  }

  static circle(cx: number, cy: number, r: number): string {
    return new SvgPathBuilder()
      .moveTo(cx - r, cy)
      .arc(r, r, 0, true, true, cx + r, cy)
      .arc(r, r, 0, true, true, cx - r, cy)
      .close()
      .build();
  }

  static polygon(points: SvgPoint[]): string {
    if (points.length < 3) return "";
    const builder = new SvgPathBuilder();
    builder.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      builder.lineTo(points[i].x, points[i].y);
    }
    builder.close();
    return builder.build();
  }

  static star(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
    const builder = new SvgPathBuilder();
    const angleStep = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      if (i === 0) builder.moveTo(x, y);
      else builder.lineTo(x, y);
    }

    builder.close();
    return builder.build();
  }

  static roundedRect(x: number, y: number, width: number, height: number, radius: number): string {
    const r = Math.min(radius, width / 2, height / 2);
    return new SvgPathBuilder()
      .moveTo(x + r, y)
      .horizontalTo(x + width - r)
      .arc(r, r, 0, false, true, x + width, y + r)
      .verticalTo(y + height - r)
      .arc(r, r, 0, false, true, x + width - r, y + height)
      .horizontalTo(x + r)
      .arc(r, r, 0, false, true, x, y + height - r)
      .verticalTo(y + r)
      .arc(r, r, 0, false, true, x + r, y)
      .close()
      .build();
  }
}
