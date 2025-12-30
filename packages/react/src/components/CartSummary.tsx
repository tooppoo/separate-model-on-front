import type { CartItemList } from '@example/domain/model/index'

interface CartSummaryProps {
  list: CartItemList
}

export const CartSummary = ({ list }: CartSummaryProps) => {
  const buyNowList = list.onlyBuyNow()

  return (
    <div className="cart-summary">
      <div className="cart-summary__item-count">
        商品数: {buyNowList.totalCount.toString()}点
      </div>
      <div className="cart-summary__price">
        合計金額: {buyNowList.totalPayment}円
      </div>
    </div>
  )
}
