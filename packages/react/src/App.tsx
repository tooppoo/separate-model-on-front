import { useEffect, useState } from 'react'
import { CartItemComponent } from './components/CartItem'
import { CartSummary } from './components/CartSummary'
import type { CartItem, CountInCart, CartItemList } from '@example/domain/model/index'
import { CartInteraction } from '@example/domain/controller/interaction'
import { OnMemoryCartItemListRepository } from '@example/domain/infrastructure/repository/on-memory'
import './style/cart.css'

const interaction = CartInteraction.create({ repository: new OnMemoryCartItemListRepository() })

export const App = () => {
  const [cartItemList, setCartItemList] = useState<CartItemList>(interaction.cartItemList)

  const update = () => {
    setCartItemList(interaction.cartItemList)
  }

  const handleRemove = async (item: CartItem) => {
    await interaction.remove(item)
    update()
  }

  const handleBuyLater = async (item: CartItem) => {
    await interaction.buyLater(item)
    update()
  }

  const handleBuyNow = async (item: CartItem) => {
    await interaction.buyNow(item)
    update()
  }

  const handleChangeCount = async (item: CartItem, newCount: CountInCart) => {
    await interaction.changeCount(item, newCount)
    update()
  }

  useEffect(() => {
    const initialize = async () => {
      await interaction.initialize()
      update()
    }
    initialize()
  }, [])

  return (
    <div className="cart">
      <CartSummary list={cartItemList} />
      <ul className="cart-item-list">
        {cartItemList.toArray().map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onBuyLater={handleBuyLater}
            onBuyNow={handleBuyNow}
            onChangeCount={handleChangeCount}
          />
        ))}
      </ul>
    </div>
  )
}
