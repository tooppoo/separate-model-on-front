import { CartItem as CartItemObj, CountInCart } from '@example/domain-cart/dist/model'
import React, { ChangeEvent } from 'react'

export interface CartItemProps {
  cartItem: CartItemObj
  onRemove: () => void
  onBuyLater: () => void
  onBuyNow: () => void
  onChangeCount: (newCount: CountInCart) => void
}

export function CartItem(props: CartItemProps) {
  const cartItem = props.cartItem

  const handleChangeCount = ({ target }: ChangeEvent<HTMLInputElement>) =>
    props.onChangeCount(CountInCart.parse(target.value))

  return (
    <li className="cart-item" key={cartItem.id}>
      {cartItem.name}
      <div className="cart-item__image" style={itemImageClass(cartItem)} />
      <div className="cart-item__editor">
        <div className="cart-item__editor__unit">
          <span className="cart-item__editor__unit__price">
            {cartItem.unitPrice.toNumber()}円
          </span>
          &nbsp;×&nbsp;
          <label>
            <input
              className="cart-item__editor__unit__count"
              type="number"
              value={cartItem.count.toNumber()}
              min="1"
              onChange={handleChangeCount}
            />個
          </label>
        </div>
        <div className="cart-item__editor__price">計{cartItem.payment}円</div>
        <button onClick={props.onRemove}>カートから取り除く</button>
        {
          cartItem.willBuyNow ?
            <button onClick={props.onBuyLater}>後で買う</button> :
            <button onClick={props.onBuyNow}>今すぐ買う</button>
        }
      </div>
    </li>
  )
}

const itemImageClass = (cartItem: CartItemObj): Record<string, string> => {
  const base = {
    backgroundImage: `url(${cartItem.picture.url})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "300px",
    height: "300px",
  };

  if (cartItem.willBuyNow) {
    return base;
  }

  return {
    ...base,
    backgroundColor: "lightgray",
    backgroundBlendMode: "multiply",
  };
}
