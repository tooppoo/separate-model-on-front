import { CountInCart } from './value/count-in-cart'
import { Picture } from './value/picture'
import { CartItemState } from './value/state'
import { UnitPrice } from './value/unit-price'

export class CartItem {
  static valueOf (
    { item, count, state }: { item: Item, count: CountInCart, state: CartItemState }
  ): CartItem {
    return new CartItem(item, count, state)
  }

  private constructor (
    private readonly item: Item,
    readonly count: CountInCart,
    private readonly state: CartItemState
  ) {}

  get id (): string {
    return this.item.id
  }

  get name (): string {
    return this.item.name
  }

  get unitPrice (): UnitPrice {
    return this.item.unitPrice
  }

  get payment (): number {
    return this.item.unitPrice.applyCount(this.count)
  }

  get picture (): Picture {
    return new Picture(this.item.image)
  }

  equals (other: CartItem): boolean {
    return this.id === other.id
  }

  get willBuyNow (): boolean {
    return this.state.buyNow
  }

  changeCount (count: CountInCart): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count,
      state: this.state
    })
  }

  buyNow (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count: this.count,
      state: {
        buyNow: true
      }
    })
  }

  buyLater (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count: this.count,
      state: {
        buyNow: false
      }
    })
  }
}

export interface Item {
  id: string
  image: string
  name: string
  unitPrice: UnitPrice
}

