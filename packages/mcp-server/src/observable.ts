type Observer<T> = (value: T) => void;
type Unsubscribe = () => void;

export class Observable<T> {
  private observers = new Set<Observer<T>>();

  subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.add(observer);
    return () => { this.observers.delete(observer); };
  }

  protected emit(value: T): void {
    for (const observer of this.observers) observer(value);
  }

  get subscriberCount(): number {
    return this.observers.size;
  }

  pipe<U>(transform: (value: T) => U): Observable<U> {
    const result = new Subject<U>();
    this.subscribe((v: T) => result.next(transform(v)));
    return result;
  }

  filter(predicate: (value: T) => boolean): Observable<T> {
    const result = new Subject<T>();
    this.subscribe((v: T) => { if (predicate(v)) result.next(v); });
    return result;
  }
}

export class Subject<T> extends Observable<T> {
  private lastValue: T | undefined;
  private hasValue = false;

  next(value: T): void {
    this.lastValue = value;
    this.hasValue = true;
    this.emit(value);
  }

  get value(): T | undefined {
    return this.lastValue;
  }

  get hasEmitted(): boolean {
    return this.hasValue;
  }
}

export class BehaviorSubject<T> extends Observable<T> {
  private currentValue: T;

  constructor(initial: T) {
    super();
    this.currentValue = initial;
  }

  next(value: T): void {
    this.currentValue = value;
    this.emit(value);
  }

  get value(): T {
    return this.currentValue;
  }

  subscribe(observer: Observer<T>): Unsubscribe {
    observer(this.currentValue);
    return super.subscribe(observer);
  }
}

export class ReplaySubject<T> extends Observable<T> {
  private buffer: T[] = [];
  private readonly bufferSize: number;

  constructor(bufferSize: number) {
    super();
    this.bufferSize = bufferSize;
  }

  next(value: T): void {
    this.buffer.push(value);
    if (this.buffer.length > this.bufferSize) this.buffer.shift();
    this.emit(value);
  }

  subscribe(observer: Observer<T>): Unsubscribe {
    for (const v of this.buffer) observer(v);
    return super.subscribe(observer);
  }
}
