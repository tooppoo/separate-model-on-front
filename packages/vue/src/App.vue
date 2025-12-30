<template>
  <div class="cart">
    <CartSummary :list="cartItemList" />
    <ul class="cart-item-list">
      <CartItem
        v-for="item in cartItemList.toArray()"
        :key="item.id"
        :item="item"
        @remove="handleRemove"
        @buy-later="handleBuyLater"
        @buy-now="handleBuyNow"
        @change-count="handleChangeCount"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import CartItem from './components/CartItem.vue'
import CartSummary from './components/CartSummary.vue'
import type { CartItem as CartItemModel, CountInCart, CartItemList } from '@example/domain/model/index'
import { CartInteraction } from '@example/domain/controller/interaction'
import { OnMemoryCartItemListRepository } from '@example/domain/infrastructure/repository/on-memory'

const interaction = CartInteraction.create({ repository: new OnMemoryCartItemListRepository() })
const cartItemList = shallowRef<CartItemList>(interaction.cartItemList)

const update = () => {
  cartItemList.value = interaction.cartItemList
}

const handleRemove = async (item: CartItemModel) => {
  await interaction.remove(item)
  update()
}

const handleBuyLater = async (item: CartItemModel) => {
  await interaction.buyLater(item)
  update()
}

const handleBuyNow = async (item: CartItemModel) => {
  await interaction.buyNow(item)
  update()
}

const handleChangeCount = async (item: CartItemModel, newCount: CountInCart) => {
  await interaction.changeCount(item, newCount)
  update()
}

onMounted(async () => {
  await interaction.initialize()
  update()
})
</script>
