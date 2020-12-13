import { CartItemList } from '@example/domain-cart/model'

export const buildSummary = (list: CartItemList) => `
<div class="cart-summary__item-count">
  商品数: ${ list.onlyBuyNow().totalCount }点
</div>
<div class="cart-summary__price">
  合計金額: ${ list.onlyBuyNow().totalPayment }円
</div>`
