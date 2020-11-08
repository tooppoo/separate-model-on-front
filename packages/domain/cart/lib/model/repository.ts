import { CartItem, CartItemList } from './cart-item'

export interface CartItemListRepository {
  list(): Promise<CartItemList>

  save(cartItem: CartItem): Promise<void>

  delete(cartItem: CartItem): Promise<void>
}
