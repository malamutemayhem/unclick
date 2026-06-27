export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Ray {
  origin: Vec3;
  direction: Vec3;
}

export interface HitRecord {
  t: number;
  point: Vec3;
  normal: Vec3;
  material: string;
}

export interface Sphere {
  center: Vec3;
  radius: number;
  material: string;
}

function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

function add(a: Vec3, b: Vec3): Vec3 {
  return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}

function mul(a: Vec3, t: number): Vec3 {
  return vec3(a.x * t, a.y * t, a.z * t);
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function length(v: Vec3): number {
  return Math.sqrt(dot(v, v));
}

function normalize(v: Vec3): Vec3 {
  const len = length(v);
  return len > 0 ? mul(v, 1 / len) : vec3(0, 0, 0);
}

function at(ray: Ray, t: number): Vec3 {
  return add(ray.origin, mul(ray.direction, t));
}

export function hitSphere(sphere: Sphere, ray: Ray, tMin = 0.001, tMax = Infinity): HitRecord | null {
  const oc = sub(ray.origin, sphere.center);
  const a = dot(ray.direction, ray.direction);
  const halfB = dot(oc, ray.direction);
  const c = dot(oc, oc) - sphere.radius * sphere.radius;
  const disc = halfB * halfB - a * c;

  if (disc < 0) return null;

  const sqrtD = Math.sqrt(disc);
  let t = (-halfB - sqrtD) / a;
  if (t < tMin || t > tMax) {
    t = (-halfB + sqrtD) / a;
    if (t < tMin || t > tMax) return null;
  }

  const point = at(ray, t);
  const normal = normalize(sub(point, sphere.center));
  return { t, point, normal, material: sphere.material };
}

export class Scene {
  private spheres: Sphere[] = [];

  addSphere(center: Vec3, radius: number, material = "default"): void {
    this.spheres.push({ center: { ...center }, radius, material });
  }

  trace(ray: Ray): HitRecord | null {
    let closest: HitRecord | null = null;
    let closestT = Infinity;

    for (const sphere of this.spheres) {
      const hit = hitSphere(sphere, ray, 0.001, closestT);
      if (hit) {
        closestT = hit.t;
        closest = hit;
      }
    }

    return closest;
  }

  render(width: number, height: number, cameraPos: Vec3 = vec3(0, 0, 0)): number[][] {
    const image: number[][] = [];
    const aspect = width / height;

    for (let j = 0; j < height; j++) {
      const row: number[] = [];
      for (let i = 0; i < width; i++) {
        const u = (2 * (i + 0.5) / width - 1) * aspect;
        const v = 1 - 2 * (j + 0.5) / height;
        const dir = normalize(vec3(u, v, -1));
        const ray: Ray = { origin: cameraPos, direction: dir };
        const hit = this.trace(ray);

        if (hit) {
          const shade = Math.max(0, dot(hit.normal, normalize(vec3(1, 1, 1))));
          row.push(Math.round(shade * 255));
        } else {
          row.push(0);
        }
      }
      image.push(row);
    }

    return image;
  }

  get sphereCount(): number {
    return this.spheres.length;
  }

  clear(): void {
    this.spheres = [];
  }
}

export { vec3, add, sub, mul, dot, length, normalize };
