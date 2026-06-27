export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

export interface EmitterConfig {
  x: number;
  y: number;
  rate: number;
  spread: number;
  speed: number;
  minLife: number;
  maxLife: number;
  size: number;
  color: string;
  gravity: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private config: EmitterConfig;
  private elapsed = 0;
  private totalEmitted = 0;

  constructor(config: Partial<EmitterConfig> = {}) {
    this.config = {
      x: config.x ?? 0,
      y: config.y ?? 0,
      rate: config.rate ?? 10,
      spread: config.spread ?? Math.PI * 2,
      speed: config.speed ?? 100,
      minLife: config.minLife ?? 1,
      maxLife: config.maxLife ?? 3,
      size: config.size ?? 4,
      color: config.color ?? "#ffffff",
      gravity: config.gravity ?? 0,
    };
  }

  emit(count = 1): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() - 0.5) * this.config.spread;
      const speed = this.config.speed * (0.5 + Math.random() * 0.5);
      const life = this.config.minLife + Math.random() * (this.config.maxLife - this.config.minLife);
      this.particles.push({
        x: this.config.x,
        y: this.config.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size: this.config.size,
        color: this.config.color,
        alpha: 1,
      });
      this.totalEmitted++;
    }
  }

  update(dt: number): void {
    this.elapsed += dt;

    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += this.config.gravity * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
    }

    this.particles = this.particles.filter((p) => p.life > 0);
  }

  tick(dt: number): void {
    const count = Math.floor(this.config.rate * dt);
    this.emit(count);
    this.update(dt);
  }

  count(): number {
    return this.particles.length;
  }

  getParticles(): Particle[] {
    return [...this.particles];
  }

  clear(): void {
    this.particles = [];
  }

  setPosition(x: number, y: number): void {
    this.config.x = x;
    this.config.y = y;
  }

  getTotalEmitted(): number {
    return this.totalEmitted;
  }

  getElapsed(): number {
    return this.elapsed;
  }

  bounds(): { minX: number; minY: number; maxX: number; maxY: number } {
    if (this.particles.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of this.particles) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY };
  }
}
