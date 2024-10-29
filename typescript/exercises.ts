import { error } from "node:console";
import { open } from "node:fs/promises";

export function change(amount: bigint): Map<bigint, bigint> {
  if (amount < 0) {
    throw new RangeError("Amount cannot be negative");
  }
  let counts: Map<bigint, bigint> = new Map();
  let remaining = amount;
  for (const denomination of [25n, 10n, 5n, 1n]) {
    counts.set(denomination, remaining / denomination);
    remaining %= denomination;
  }
  return counts;
}

export function firstThenApply<T, U>(
  sequence: T[],
  predicate: (element: T) => boolean,
  apply: (item: T) => U
): U | undefined {
  for (const item of sequence) {
    if (predicate(item)) {
      return apply(item);
    }
  }
  return undefined;
}

export function* powersGenerator(base: bigint): Generator<bigint> {
  for (let power = 1n; ; power *= base) {
    yield power;
  }
}

export async function meaningfulLineCount(filename: string): Promise<number> {
  let count = 0;
  const file = await open(filename, "r");
  for await (const line of file.readLines()) {
    // Note that readLines will autoclose the file, yay
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      count++;
    }
  }
  return count;
}

interface Sphere {
  kind: "Sphere";
  radius: number;
}

interface Box {
  kind: "Box";
  width: number;
  length: number;
  depth: number;
}

export type Shape = Sphere | Box;

export function surfaceArea(shape: Shape): number {
  switch (shape.kind) {
    case "Box":
      return (
        2 * shape.width * shape.depth +
        2 * shape.length * shape.width +
        2 * shape.depth * shape.length
      );
    case "Sphere":
      return 4 * Math.PI * shape.radius ** 2;
  }
}

export function volume(shape: Shape): number {
  switch (shape.kind) {
    case "Box":
      return shape.width * shape.length * shape.depth;
    case "Sphere":
      return (4 / 3) * Math.PI * shape.radius ** 3;
  }
}

export interface BinarySearchTree<T> {
  size(): number;
  insert(value: T): BinarySearchTree<T>;
  contains(value: T): boolean;
  inorder(): Iterable<T>;
}

export class Empty<T> implements BinarySearchTree<T> {
  size(): number {
    return 0;
  }

  insert(value: T): BinarySearchTree<T> {
    return new Node<T>(value, new Empty(), new Empty());
  }

  contains(value: T): boolean {
    return false;
  }

  *inorder(): Iterable<T> {}

  toString(): string {
    return "()";
  }

  constructor() {
    Object.freeze(this);
  }
}

class Node<T> implements BinarySearchTree<T> {
  left: BinarySearchTree<T>;
  right: BinarySearchTree<T>;
  value: T;

  constructor(value: T, left: BinarySearchTree<T>, right: BinarySearchTree<T>) {
    this.left = left;
    this.right = right;
    this.value = value;
    Object.freeze(this);
  }

  insert(value: T): BinarySearchTree<T> {
    if (value === this.value) {
      return this;
    } else if (value < this.value) {
      return new Node(this.value, this.left.insert(value), this.right);
    } else {
      return new Node(this.value, this.left, this.right.insert(value));
    }
  }

  contains(value: T): boolean {
    if (value == this.value) {
      return true;
    } else if (value < this.value) {
      return this.left.contains(value);
    } else {
      return this.right.contains(value);
    }
  }

  size(): number {
    return 1 + this.left.size() + this.right.size();
  }

  *inorder(): Iterable<T> {
    yield* this.left.inorder();
    yield this.value;
    yield* this.right.inorder();
  }

  toString(): string {
    return `(${this.left.toString().replace("()", "")}${this.value}${this.right.toString().replace("()", "")})`;
  }
}
