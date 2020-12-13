export class CountInCart {
  static readonly zero: CountInCart = new CountInCart(0)

  static valueOf(value: number): CountInCart {
    if (value === 0) {
      return CountInCart.zero
    }

    return new CountInCart(value)
  }

  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error(`cart item count must be >= 0, but ${ value }`)
    }
  }

  plus(other: CountInCart): CountInCart {
    return CountInCart.valueOf(this.value + other.value)
  }

  toNumber(): number {
    return this.value
  }

  toString(): string {
    return `${ this.value }`
  }
}
