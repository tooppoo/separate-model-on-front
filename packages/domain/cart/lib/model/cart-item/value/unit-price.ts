import { CountInCart } from './count-in-cart'

export class UnitPrice {
  static valueOf(value: number): UnitPrice {
    return new UnitPrice(value)
  }

  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error(`price must be >= 0, but ${ value }`)
    }
  }

  applyCount(count: CountInCart): number {
    return this.value * count.toNumber()
  }

  toNumber(): number {
    return this.value
  }

  toString(): string {
    return `${ this.value }`
  }
}
