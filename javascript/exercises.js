import exp from "node:constants"
import { open } from "node:fs/promises"

export function change(amount) {
  if (!Number.isInteger(amount)) {
    throw new TypeError("Amount must be an integer")
  }
  if (amount < 0) {
    throw new RangeError("Amount cannot be negative")
  }
  let [counts, remaining] = [{}, amount]
  for (const denomination of [25, 10, 5, 1]) {
    counts[denomination] = Math.floor(remaining / denomination)
    remaining %= denomination
  }
  return counts
}

// Write your first then lower case function here
export function firstThenLowerCase(sequence, predicate) {
  for (const letters of sequence) {
    if (predicate?.(letters)) {
      return letters.toLowerCase()
    }
  }
  return undefined
}
// Write your powers generator here

export function* powersGenerator({ ofBase, upTo }) {
  let power = 0
  let result = 1
  while (result <= upTo) {
    yield result
    result = Math.pow(ofBase, ++power)
  }
}
// Write your say function here
export function say(word) {
  let words = ""
  function sayNext(nextWord) {
    if (nextWord !== undefined) {
      words += " " + nextWord
      return sayNext
    }
    return words
  }
  if (word !== undefined) {
    words = word
    return sayNext
  }
  return words
}
// Write your line count function here
export async function meaningfulLineCount(filename) {
  let count = 0
  const file = await open(filename, "r")
  for await (const line of file.readLines()) {
    // Note that readLines will autoclose the file, yay
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      count++
    }
  }
  return count
}

// Write your Quaternion class here///
export class Quaternion {
  constructor(a, b, c, d) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
    Object.freeze(this)
  }

  get coefficients() {
    return [this.a, this.b, this.c, this.d]
  }

  plus(anotherQuaternion) {
    return new Quaternion(
      this.a + anotherQuaternion.a,
      this.b + anotherQuaternion.b,
      this.c + anotherQuaternion.c,
      this.d + anotherQuaternion.d
    )
  }

  get conjugate() {
    return new Quaternion(this.a, -this.b, -this.c, -this.d)
  }

  times(anotherQuaternion) {
    const theNewA =
      this.a * anotherQuaternion.a -
      this.b * anotherQuaternion.b -
      this.c * anotherQuaternion.c -
      this.d * anotherQuaternion.d
    const theNewB =
      this.a * anotherQuaternion.b +
      this.b * anotherQuaternion.a +
      this.c * anotherQuaternion.d -
      this.d * anotherQuaternion.c
    const theNewC =
      this.a * anotherQuaternion.c -
      this.b * anotherQuaternion.d +
      this.c * anotherQuaternion.a +
      this.d * anotherQuaternion.b
    const theNewD =
      this.a * anotherQuaternion.d +
      this.b * anotherQuaternion.c -
      this.c * anotherQuaternion.b +
      this.d * anotherQuaternion.a
    return new Quaternion(theNewA, theNewB, theNewC, theNewD)
  }

  toString() {
    if (this.a === 0 && this.b === 0 && this.c === 0 && this.d === 0) {
      return "0"
    }
    const aTemplate = `${this.a === 0 ? "" : this.a}`
    const bTemplate = `${
      this.b === 0
        ? ""
        : `${this.b < 0 ? "-" : this.a !== 0 ? "+" : ""}${
            this.b === 1 || this.b === -1 ? "" : Math.abs(this.b)
          }i`
    }`
    const cTemplate = `${
      this.c === 0
        ? ""
        : `${this.c < 0 ? "-" : this.a !== 0 || this.b !== 0 ? "+" : ""}${
            this.c === 1 || this.c === -1 ? "" : Math.abs(this.c)
          }j`
    }`
    const dTemplate = `${
      this.d === 0
        ? ""
        : `${
            this.d < 0
              ? "-"
              : this.a !== 0 || this.b !== 0 || this.c !== 0
              ? "+"
              : ""
          }${this.d === 1 || this.d === -1 ? "" : Math.abs(this.d)}k`
    }`

    return aTemplate + bTemplate + cTemplate + dTemplate
  }
}
