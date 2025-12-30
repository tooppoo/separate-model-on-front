import { CartItem, CartItemList } from '..'

export interface CartItemListRepository {
  list(): Promise<CartItemList>

  save(cartItem: CartItem): Promise<void>

  delete(cartItem: CartItem): Promise<void>
}
