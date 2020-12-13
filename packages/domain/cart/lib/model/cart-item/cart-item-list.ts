import { CartItem} from './cart-item'
import { CountInCart } from './value/count-in-cart'

export class CartItemList {
  static valueOf(items: CartItem[]): CartItemList {
    return new CartItemList(items)
  }

  static empty(): CartItemList {
    return new CartItemList([])
  }

  private constructor(private readonly cartItems: CartItem[]) {
  }

  get totalPayment(): number {
    return this.cartItems.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.payment,
      0
    )
  }

  get totalCount(): CountInCart {
    return this.cartItems.reduce(
      (total: CountInCart, cartItem: CartItem) => total.plus(cartItem.count),
      CountInCart.zero
    )
  }

  get length(): number {
    return this.cartItems.length
  }

  onlyBuyNow(): CartItemList {
    return this.filter(cartItem => cartItem.willBuyNow)
  }

  remove(target: CartItem): CartItemList {
    return this.filter(stored => !stored.equals(target))
  }

  replace(target: CartItem): CartItemList {
    return new CartItemList(
      this.cartItems.map(cartItem => cartItem.equals(target) ? target : cartItem)
    )
  }

  toArray(): CartItem[] {
    return [...this.cartItems] // shallow copy
  }

  private filter(filter: (cartItem: CartItem) => boolean): CartItemList {
    return new CartItemList(
      this.cartItems.filter(filter)
    )
  }
}
