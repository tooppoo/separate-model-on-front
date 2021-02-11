import { CartInteraction } from '@example/domain-cart/dist/controller/interaction';
import { CartItemListRepository } from '@example/domain-cart/dist/model'
import React, { useEffect, useState } from 'react'
import { CartItem } from './CartItem'
import './cart.css'

export interface CartProps {
  repository: CartItemListRepository
}

export function Cart(props: CartProps) {
  const [interaction] = useState(CartInteraction.create(props))
  const [list, setList] = useState(() => {
    interaction.initialize().then(() =>setList(interaction.cartItemList))

    return interaction.cartItemList
  })
  const [onlyBuyNow, setOnlyBuyNow] = useState(list.onlyBuyNow())

  useEffect(() => setOnlyBuyNow(list.onlyBuyNow()), [list])

  const handler = createUpdateHandler(() => {
    setList(interaction.cartItemList)
  })

  return (
    <div className="cart">
      <div className="cart-summary">
        <div className="cart-summary__item-count">
          商品数: {onlyBuyNow.totalCount.toNumber()}点
        </div>
        <div className="cart-summary__price">
          合計金額: {onlyBuyNow.totalPayment}円
        </div>
      </div>
      <ul className="cart-item-list">
        {
          list.map(cartItem => CartItem({
            cartItem,
            onRemove: () => handler(interaction.remove(cartItem)),
            onBuyNow: () => handler(interaction.buyNow(cartItem)),
            onBuyLater: () => handler(interaction.buyLater(cartItem)),
            onChangeCount: count => handler(interaction.changeCount(cartItem, count)),
          }))
        }
      </ul>
    </div>
  )
}

const createUpdateHandler = (update: () => void) => (cmd: Promise<void>) => {
  cmd.then(() => {
    update()
  }).catch(error => {
    alert(error.toString())
  })
}
