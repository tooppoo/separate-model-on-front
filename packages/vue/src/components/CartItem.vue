<template>
  <li class="cart-item cart-item-list__item">
    <div class="cart-item__image" :style="imageStyle"></div>
    <div class="cart-item__editor">
      <div class="cart-item__editor__unit">
        <span class="cart-item__editor__unit__price">
          {{ item.unitPrice.toNumber() }}円
        </span>
        ×
        <label>
          <input
            :id="`cart-item__editor__unit__count--${item.id}`"
            type="number"
            min="1"
            class="cart-item__editor__unit__count"
            :value="item.count.toNumber()"
            @change="handleCountChange"
          >個
        </label>
      </div>
      <div class="cart-item__editor__price">計{{ item.payment }}円</div>
      <button @click="handleRemove">カートから取り除く</button>
      <button v-if="item.willBuyNow" @click="handleBuyLater">後で買う</button>
      <button v-else @click="handleBuyNow">今すぐ買う</button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CartItem, CountInCart } from '@example/domain/model/index'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  remove: [item: CartItem]
  buyLater: [item: CartItem]
  buyNow: [item: CartItem]
  changeCount: [item: CartItem, count: CountInCart]
}>()

const imageStyle = computed(() => {
  const base = {
    'background-image': `url(${props.item.picture.url})`,
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'width': '300px',
    'height': '300px'
  }

  if (props.item.willBuyNow) {
    return base
  }

  return {
    ...base,
    'background-color': 'lightgray',
    'background-blend-mode': 'multiply'
  }
})

const handleRemove = () => {
  emit('remove', props.item)
}

const handleBuyLater = () => {
  emit('buyLater', props.item)
}

const handleBuyNow = () => {
  emit('buyNow', props.item)
}

const handleCountChange = (event: Event) => {
  const element = event.target as HTMLInputElement
  const newCount = CountInCart.parse(element.value)
  emit('changeCount', props.item, newCount)
}
</script>
