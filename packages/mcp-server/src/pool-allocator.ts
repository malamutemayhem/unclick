export class PoolAllocator {
  private buffer: Float64Array;
  private readonly slotSize: number;
  private readonly capacity: number;
  private freeSlots: number[] = [];
  private allocated = 0;

  constructor(slotSize: number, capacity: number) {
    this.slotSize = slotSize;
    this.capacity = capacity;
    this.buffer = new Float64Array(slotSize * capacity);
    for (let i = capacity - 1; i >= 0; i--) this.freeSlots.push(i);
  }

  alloc(): number {
    if (this.freeSlots.length === 0) throw new Error("Pool exhausted");
    const slot = this.freeSlots.pop()!;
    this.allocated++;
    return slot;
  }

  free(slot: number): void {
    if (slot < 0 || slot >= this.capacity) throw new Error("Invalid slot");
    const offset = slot * this.slotSize;
    this.buffer.fill(0, offset, offset + this.slotSize);
    this.freeSlots.push(slot);
    this.allocated--;
  }

  getView(slot: number): Float64Array {
    const offset = slot * this.slotSize;
    return this.buffer.subarray(offset, offset + this.slotSize);
  }

  setValue(slot: number, index: number, value: number): void {
    this.buffer[slot * this.slotSize + index] = value;
  }

  getValue(slot: number, index: number): number {
    return this.buffer[slot * this.slotSize + index];
  }

  get usedCount(): number {
    return this.allocated;
  }

  get freeCount(): number {
    return this.freeSlots.length;
  }

  get totalCapacity(): number {
    return this.capacity;
  }
}
