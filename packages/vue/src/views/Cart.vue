<template>
  <div class="cart">
    <div class="cart-summary">
      <div class="cart-summary__item-count">
        商品数: {{ onlyBuyNow.totalCount }}点
      </div>
      <div class="cart-summary__price">
        合計金額: {{ onlyBuyNow.totalPayment }}円
      </div>
    </div>
    <ul class="cart-item-list">
      <cart-item
        class="cart-item-list__item"
        v-for="cartItem in cartItems.toArray()"
        :key="cartItem.id"
        :cartItem="cartItem"
        @remove="remove"
        @buy-later="buyLater"
        @buy-now="buyNow"
        @change-count="changeCount"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { CartInteraction } from "@example/domain-cart/controller/interaction";
import {
  CartItem,
  CartItemList,
  CartItemListRepository,
  CountInCart,
} from "@example/domain-cart/model";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import CartItemView from "./cart/CartItem.vue";

@Component({
  components: {
    CartItem: CartItemView,
  },
})
export default class Cart extends Vue {
  @Prop({ required: true })
  private readonly repository!: CartItemListRepository;

  private cartItems: CartItemList = this.interaction.cartItemList;

  get interaction(): CartInteraction {
    return CartInteraction.create({ repository: this.repository });
  }

  created(): void {
    this.initialize();
  }

  @Watch("$route")
  async initialize(): Promise<void> {
    this.handleUpdate(() => this.interaction.initialize());
  }

  get onlyBuyNow(): CartItemList {
    return this.cartItems.onlyBuyNow();
  }

  remove(cartItem: CartItem): void {
    this.handleUpdate(() => this.interaction.remove(cartItem));
  }

  buyLater(cartItem: CartItem): void {
    this.handleUpdate(() => this.interaction.buyLater(cartItem));
  }

  buyNow(cartItem: CartItem): void {
    this.handleUpdate(() => this.interaction.buyNow(cartItem));
  }

  changeCount(cartItem: CartItem, newCount: CountInCart): void {
    this.handleUpdate(() => this.interaction.changeCount(cartItem, newCount));
  }

  private handleUpdate(command: () => Promise<void>): void {
    command()
      .then(() => {
        // リアクティブ検知のため、更新の都度再代入
        this.cartItems = this.interaction.cartItemList;
      })
      .catch((error) => {
        alert(error.toString());
      });
  }
}
</script>

<style scoped>
.cart-summary {
  border-width: 3px;
  border-style: solid;
  margin-bottom: 30px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
}
.cart-summary__item-count {
  font-size: 24px;
}
.cart-summary__price {
  font-size: 24px;
}
.cart-item-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 600px;
}
.cart-item-list__item {
  margin-bottom: 20px;
}
</style>
