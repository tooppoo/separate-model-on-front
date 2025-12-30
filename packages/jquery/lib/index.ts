
import { buildCartItemList } from './cart-item'
import { buildSummary } from './cart-summary'
import { CountInCart } from '@example/domain/model/index'
import { CartInteraction } from '@example/domain/controller/interaction'
import { OnMemoryCartItemListRepository } from '@example/domain/infrastructure/repository/on-memory'
import $ from 'jquery'

$(async () => {
  const interaction = CartInteraction.create({ repository: new OnMemoryCartItemListRepository( )})

  await interaction.initialize()

  let list = interaction.cartItemList

  const setHandler = () => {
    list.toArray().forEach((item) => {
      $(`#remove__${item.id}`).on('click', () => {
        interaction.remove(item).then(update)
      })
      $(`#later__${item.id}`).on('click', () => {
        interaction.buyLater(item).then(update)
      })
      $(`#now__${item.id}`).on('click', () => {
        interaction.buyNow(item).then(update)
      })
      $(`#cart-item__editor__unit__count--${item.id}`).on('change', (event) => {
        const element = event.target as unknown as HTMLInputElement

        const newCount = CountInCart.parse(element.value)

        interaction.changeCount(item, newCount).then(update)
      })
    })
  }
  const render = () => {
    $('#cart-item-list').html(
      buildCartItemList(list)
    )
    $('#cart-summary').html(
      buildSummary(list)
    )

    setHandler()
  }
  const update = () => {
    list = interaction.cartItemList

    render()
  }

  render()
})
