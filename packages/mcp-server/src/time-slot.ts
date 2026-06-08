export interface TimeSlot {
  start: number;
  end: number;
  label?: string;
}

export class TimeSlotManager {
  private slots: TimeSlot[] = [];

  addSlot(start: number, end: number, label?: string): boolean {
    if (start >= end) return false;
    const slot: TimeSlot = { start, end, label };
    if (this.overlapsAny(slot)) return false;
    this.slots.push(slot);
    this.slots.sort((a, b) => a.start - b.start);
    return true;
  }

  removeSlot(index: number): boolean {
    if (index < 0 || index >= this.slots.length) return false;
    this.slots.splice(index, 1);
    return true;
  }

  getSlots(): TimeSlot[] {
    return [...this.slots];
  }

  slotCount(): number {
    return this.slots.length;
  }

  overlaps(a: TimeSlot, b: TimeSlot): boolean {
    return a.start < b.end && b.start < a.end;
  }

  overlapsAny(slot: TimeSlot): boolean {
    return this.slots.some((s) => this.overlaps(s, slot));
  }

  findFreeSlots(rangeStart: number, rangeEnd: number, minDuration = 0): TimeSlot[] {
    const free: TimeSlot[] = [];
    let cursor = rangeStart;

    for (const slot of this.slots) {
      if (slot.start > cursor) {
        const gap = slot.start - cursor;
        if (gap >= minDuration) {
          free.push({ start: cursor, end: slot.start });
        }
      }
      cursor = Math.max(cursor, slot.end);
    }

    if (rangeEnd > cursor) {
      const gap = rangeEnd - cursor;
      if (gap >= minDuration) {
        free.push({ start: cursor, end: rangeEnd });
      }
    }

    return free;
  }

  totalBooked(): number {
    return this.slots.reduce((sum, s) => sum + (s.end - s.start), 0);
  }

  totalFree(rangeStart: number, rangeEnd: number): number {
    const totalRange = rangeEnd - rangeStart;
    return totalRange - this.totalBooked();
  }

  utilization(rangeStart: number, rangeEnd: number): number {
    const totalRange = rangeEnd - rangeStart;
    if (totalRange <= 0) return 0;
    return this.totalBooked() / totalRange;
  }

  merge(): TimeSlot[] {
    if (this.slots.length === 0) return [];
    const sorted = [...this.slots].sort((a, b) => a.start - b.start);
    const merged: TimeSlot[] = [{ ...sorted[0] }];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      if (sorted[i].start <= last.end) {
        last.end = Math.max(last.end, sorted[i].end);
      } else {
        merged.push({ ...sorted[i] });
      }
    }

    return merged;
  }

  findSlot(time: number): TimeSlot | null {
    for (const slot of this.slots) {
      if (time >= slot.start && time < slot.end) return slot;
    }
    return null;
  }
}
