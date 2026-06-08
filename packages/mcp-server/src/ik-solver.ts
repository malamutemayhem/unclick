export interface Joint {
  x: number;
  y: number;
  angle: number;
  length: number;
}

export class IKSolver {
  static forward(joints: Joint[]): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];
    let x = joints[0].x;
    let y = joints[0].y;
    let totalAngle = 0;
    positions.push({ x, y });

    for (const joint of joints) {
      totalAngle += joint.angle;
      x += joint.length * Math.cos(totalAngle);
      y += joint.length * Math.sin(totalAngle);
      positions.push({
        x: Math.round(x * 10000) / 10000,
        y: Math.round(y * 10000) / 10000,
      });
    }
    return positions;
  }

  static endEffector(joints: Joint[]): { x: number; y: number } {
    const positions = IKSolver.forward(joints);
    return positions[positions.length - 1];
  }

  static fabrik(
    joints: { x: number; y: number }[],
    lengths: number[],
    target: { x: number; y: number },
    iterations = 10,
    tolerance = 0.001,
  ): { x: number; y: number }[] {
    const n = joints.length;
    const points = joints.map(j => ({ x: j.x, y: j.y }));
    const baseX = points[0].x;
    const baseY = points[0].y;

    for (let iter = 0; iter < iterations; iter++) {
      points[n - 1].x = target.x;
      points[n - 1].y = target.y;
      for (let i = n - 2; i >= 0; i--) {
        const dx = points[i].x - points[i + 1].x;
        const dy = points[i].y - points[i + 1].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const ratio = lengths[i] / dist;
        points[i].x = points[i + 1].x + dx * ratio;
        points[i].y = points[i + 1].y + dy * ratio;
      }

      points[0].x = baseX;
      points[0].y = baseY;
      for (let i = 1; i < n; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const ratio = lengths[i - 1] / dist;
        points[i].x = points[i - 1].x + dx * ratio;
        points[i].y = points[i - 1].y + dy * ratio;
      }

      const endDx = points[n - 1].x - target.x;
      const endDy = points[n - 1].y - target.y;
      if (Math.sqrt(endDx * endDx + endDy * endDy) < tolerance) break;
    }

    return points.map(p => ({
      x: Math.round(p.x * 10000) / 10000,
      y: Math.round(p.y * 10000) / 10000,
    }));
  }

  static ccd(
    joints: Joint[],
    target: { x: number; y: number },
    iterations = 20,
    tolerance = 0.01,
  ): Joint[] {
    const result = joints.map(j => ({ ...j }));

    for (let iter = 0; iter < iterations; iter++) {
      const end = IKSolver.endEffector(result);
      const dx = end.x - target.x;
      const dy = end.y - target.y;
      if (Math.sqrt(dx * dx + dy * dy) < tolerance) break;

      for (let i = result.length - 1; i >= 0; i--) {
        const positions = IKSolver.forward(result);
        const pivot = positions[i];
        const endPos = positions[positions.length - 1];

        const toEnd = Math.atan2(endPos.y - pivot.y, endPos.x - pivot.x);
        const toTarget = Math.atan2(target.y - pivot.y, target.x - pivot.x);
        result[i].angle += toTarget - toEnd;
      }
    }
    return result;
  }

  static reachable(joints: Joint[], target: { x: number; y: number }): boolean {
    const totalLength = joints.reduce((sum, j) => sum + j.length, 0);
    const dx = target.x - joints[0].x;
    const dy = target.y - joints[0].y;
    return Math.sqrt(dx * dx + dy * dy) <= totalLength;
  }

  static totalLength(joints: Joint[]): number {
    return Math.round(joints.reduce((sum, j) => sum + j.length, 0) * 10000) / 10000;
  }
}
