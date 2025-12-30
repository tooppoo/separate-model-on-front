<template>
  <div class="cart-summary">
    <div class="cart-summary__item-count">
      商品数: {{ buyNowList.totalCount }}点
    </div>
    <div class="cart-summary__price">
      合計金額: {{ buyNowList.totalPayment }}円
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItemList } from '@example/domain/model/index'

const props = defineProps<{
  list: CartItemList
}>()

const buyNowList = computed(() => props.list.onlyBuyNow())
</script>
