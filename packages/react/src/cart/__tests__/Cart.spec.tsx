import { CartItem, CartItemList, CartItemListRepository, CountInCart } from '@example/domain-cart/dist/model'
import { UnitPrice } from '@example/domain-cart/dist/model/cart-item/value/unit-price'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Cart } from '../Cart'

export {}

describe("Cart", () => {
  let container: HTMLElement|null = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    unmountComponentAtNode(container!)
    container!.remove()
    container = null
  })

  describe("empty cart", () => {
    const repository: CartItemListRepository = {
      list: async () => CartItemList.empty(),
      save: async () => void 0,
      delete: async () => void 0,
    }

    describe("cart item list view", () => {
      it("should be 0", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        expect(container?.getElementsByClassName('cart-item').length).toBe(0)
      })
    })
    describe("total price", () => {
      it("should be 0", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        expect(container?.textContent?.includes("合計金額: 0円")).toBe(true)
      })
    })
    describe("total count", () => {
      it("should be 0", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        expect(container?.textContent?.includes("商品数: 0点")).toBe(true)
      })
    })
  })
  describe("some items in cart", () => {
    const repository: CartItemListRepository = {
      list: async () => CartItemList.valueOf([
        TestCartItemBuilder.init().idIs("cart-1").unitPriceIs(1000).unitCountIs(3).build(),
        TestCartItemBuilder.init().idIs("cart-2").unitPriceIs(2000).unitCountIs(2).build(),
        TestCartItemBuilder.init().idIs("cart-3").unitPriceIs(3000).unitCountIs(1).build(),
      ]),
      save: async () => void 0,
      delete: async () => void 0,
    }

    describe("cart item list view", () => {
      it("should be 3", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        expect(container?.getElementsByClassName('cart-item').length).toBe(3)
      })
    })
    describe("total price", () => {
      it("should be 1000 * 3 + 2000 * 2 + 3000 * 1", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        const expected = `合計金額: ${1000 * 3 + 2000 * 2 + 3000}円`

        expect(container?.textContent?.includes(expected)).toBe(true)
      })
    })
    describe("total count", () => {
      it("should be 3 + 2 + 1", async () => {
        await act(async () => {
          render((<Cart repository={repository} />), container)
        })

        expect(container?.textContent?.includes(`商品数: ${3 + 2 + 1}点`)).toBe(true)
      })
    })
  })
})

class TestCartItemBuilder {
  static init(): TestCartItemBuilder {
    return new this()
  }

  private constructor(
    private readonly id: string = "cart-item",
    private readonly unitPrice: number = 1000,
    private readonly unitCount: number = 1
  ) {}

  idIs(id: string): TestCartItemBuilder {
    return new TestCartItemBuilder(id, this.unitPrice, this.unitCount)
  }
  unitPriceIs(p: number): TestCartItemBuilder {
    return new TestCartItemBuilder(this.id, p, this.unitCount)
  }
  unitCountIs(c: number): TestCartItemBuilder {
    return new TestCartItemBuilder(this.id, this.unitPrice, c)
  }

  build(): CartItem {
    return CartItem.valueOf({
      item: {
        id: this.id,
        name: "cart item",
        image: "",
        unitPrice: UnitPrice.valueOf(this.unitPrice),
      },
      count: CountInCart.valueOf(this.unitCount),
      state: {
        buyNow: true,
      },
    })
  }
}
