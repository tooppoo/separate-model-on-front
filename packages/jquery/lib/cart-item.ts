import { CartItem, CartItemList } from '@example/domain-cart/model'

export const buildCartItemList = (list: CartItemList): string => list.toArray().map(buildCartItem).join('')

const buildCartItem = (cartItem: CartItem): string => `
<li class="cart-item cart-item-list__item">
    <div class="cart-item__image" style="${buildImageStyle(cartItem)}"></div>
    <div class="cart-item__editor">
        <div class="cart-item__editor__unit">
            <span class="cart-item__editor__unit__price">
                ${cartItem.unitPrice.toNumber()}円
            </span>
            ×
            <label >
                <input
                    id="cart-item__editor__unit__count--${cartItem.id}"
                    type="number"
                    min="0"
                    class="cart-item__editor__unit__count"
                    value="${cartItem.count.toNumber()}"
                >個
            </label>
        </div>
        <div class="cart-item__editor__price">計${cartItem.payment}円</div>
        <button id="remove__${cartItem.id}">カートから取り除く</button>
        ${selectButton(cartItem)}
    </div>
</li>`

const selectButton = (cartItem: CartItem): string =>
  cartItem.willBuyNow ?
    '<button id="later__' + cartItem.id + '">後で買う</button>' :
  '<button id="now__' + cartItem.id + '">今すぐ買う</button>'

const buildImageStyle = (cartItem: CartItem): string => {
  const base = {
    "background-image": `url(${cartItem.picture.url})`,
    "background-position": "center",
    "background-repeat": "no-repeat",
    "background-size": "contain",
    width: "300px",
    height: "300px"
  };

  if (cartItem.willBuyNow) {
    return objectToStyle(base);
  }

  return objectToStyle({
    ...base,
    "background-color": "lightgray",
    "background-blend-mode": "multiply"
  });
}
const objectToStyle = (src: object): string => Object.entries(src).map(([key, value]) => `${key}: ${value};`).join(' ')
