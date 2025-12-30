import type { CSSProperties } from 'react'
import { CartItem, CountInCart } from '@example/domain/model/index'

interface CartItemProps {
  item: CartItem
  onRemove: (item: CartItem) => void
  onBuyLater: (item: CartItem) => void
  onBuyNow: (item: CartItem) => void
  onChangeCount: (item: CartItem, count: CountInCart) => void
}

export const CartItemComponent = ({
  item,
  onRemove,
  onBuyLater,
  onBuyNow,
  onChangeCount
}: CartItemProps) => {
  const imageStyle: CSSProperties = {
    backgroundImage: `url(${item.picture.url})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '300px',
    height: '300px',
    ...(item.willBuyNow ? {} : {
      backgroundColor: 'lightgray',
      backgroundBlendMode: 'multiply'
    })
  }

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = CountInCart.parse(event.target.value)
    onChangeCount(item, newCount)
  }

  return (
    <li className="cart-item cart-item-list__item">
      <div className="cart-item__image" style={imageStyle}></div>
      <div className="cart-item__editor">
        <div className="cart-item__editor__unit">
          <span className="cart-item__editor__unit__price">
            {item.unitPrice.toNumber()}円
          </span>
          ×
          <label>
            <input
              id={`cart-item__editor__unit__count--${item.id}`}
              type="number"
              min="1"
              className="cart-item__editor__unit__count"
              value={item.count.toNumber()}
              onChange={handleCountChange}
            />個
          </label>
        </div>
        <div className="cart-item__editor__price">計{item.payment}円</div>
        <button onClick={() => onRemove(item)}>カートから取り除く</button>
        {item.willBuyNow ? (
          <button onClick={() => onBuyLater(item)}>後で買う</button>
        ) : (
          <button onClick={() => onBuyNow(item)}>今すぐ買う</button>
        )}
      </div>
    </li>
  )
}
