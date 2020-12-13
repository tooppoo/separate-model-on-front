<template>
  <li class="cart-item">
    {{ cartItem.name }}
    <div class="cart-item__image" :style="itemImageClass" />
    <div class="cart-item__editor">
      <div class="cart-item__editor__unit">
        <span class="cart-item__editor__unit__price">
          {{ cartItem.unitPrice }}円
        </span>
        &nbsp;×&nbsp;
        <label>
          <input
            class="cart-item__editor__unit__count"
            type="number"
            min="0"
            :value="count"
            @change="onChangeCount($event.target.value)"
          />個
        </label>
      </div>
      <div class="cart-item__editor__price">計{{ cartItem.payment }}円</div>
      <button @click="onRemove(cartItem)">
        カートから取り除く
      </button>
      <button v-if="willPurchase" @click="onBuyLater(cartItem)">
        後で買う
      </button>
      <button v-else @click="onBuyNow(cartItem)">
        今すぐ買う
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import { CartItem, CountInCart } from "@example/domain-cart/model";

@Component
export default class CartItemView extends Vue {
  @Prop({ required: true })
  cartItem!: CartItem;

  get willPurchase(): boolean {
    return this.cartItem.willBuyNow;
  }

  get count(): CountInCart {
    return this.cartItem.count;
  }

  get itemImageClass(): object {
    const base = {
      "background-image": `url(${this.cartItem.picture.url})`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      width: "300px",
      height: "300px"
    };

    if (this.willPurchase) {
      return base;
    }

    return {
      ...base,
      "background-color": "lightgray",
      "background-blend-mode": "multiply"
    };
  }

  @Emit("remove")
  onRemove(_item: CartItem) {}

  @Emit("buy-later")
  onBuyLater(_item: CartItem) {}

  @Emit("buy-now")
  onBuyNow(_item: CartItem) {}

  onChangeCount(newCount: string) {
    this.emitChangeCount(
      this.cartItem,
      CountInCart.valueOf(parseInt(newCount, 10))
    );
  }

  @Emit("change-count")
  emitChangeCount(_item: CartItem, _newCount: CountInCart) {}
}
</script>

<style scoped>
.cart-item {
  font-size: 24px;
  list-style: none;
  width: 300px;
}
.cart-item__editor__unit {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.cart-item__editor__unit__count {
  font-size: 20px;
  width: 50px;
}
.cart-item__editor__price {
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}
button {
  font-size: 20px;
  width: 220px;
}
</style>
