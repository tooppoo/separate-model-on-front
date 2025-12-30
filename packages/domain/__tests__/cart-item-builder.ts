import { CountInCart } from '../lib/model'
import { CartItem, Item } from '../lib/model/cart-item/cart-item'
import { CartItemState } from '../lib/model/cart-item/value/state'
import { UnitPrice } from '../lib/model/cart-item/value/unit-price'

export class CartItemBuilder {
  static create (): CartItemBuilder {
    return new CartItemBuilder(
      {
        id: 'test',
        name: 'てすと',
        image: 'image.png',
        unitPrice: UnitPrice.valueOf(1000)
      },
      CountInCart.valueOf(1),
      {
        buyNow: true
      }
    )
  }

  private constructor (
    private item: Item,
    private count: CountInCart,
    private state: CartItemState
  ) { }

  idIs (id: string): CartItemBuilder {
    return new CartItemBuilder(
      {
        ...this.item,
        id
      },
      this.count,
      this.state
    )
  }

  itemPriceIs (price: number): CartItemBuilder {
    return new CartItemBuilder(
      {
        ...this.item,
        unitPrice: UnitPrice.valueOf(price)
      },
      this.count,
      this.state
    )
  }

  countIs (count: number): CartItemBuilder {
    return new CartItemBuilder(
      this.item,
      CountInCart.valueOf(count),
      this.state
    )
  }

  build (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count: this.count,
      state: this.state
    })
  }
}
