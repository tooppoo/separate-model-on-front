import { CartItem, CartItemCount, CartItemState, Item, UnitPrice } from '../lib/model/cart-item'

export class CartItemBuilder {
  static create (): CartItemBuilder {
    return new CartItemBuilder(
      {
        id: 'test',
        name: 'てすと',
        image: 'image.png',
        unitPrice: UnitPrice.valueOf(1000)
      },
      CartItemCount.valueOf(1),
      {
        buyNow: true
      }
    )
  }

  private constructor (
    private item: Item,
    private count: CartItemCount,
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
      CartItemCount.valueOf(count),
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
