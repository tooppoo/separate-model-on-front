
import { buildCartItemList } from './cart-item'
import { CartInteraction } from '@example/domain-cart/controller/interaction'
import { OnMemoryCartItemListRepository } from '@example/domain-cart/infrastructure/repository/on-memory'
import $ from 'jquery'
import 'regenerator-runtime'
import { buildSummary } from './cart-summary'

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

