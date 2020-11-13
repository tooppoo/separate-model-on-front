
import { buildCartItemList } from './cart-item'
import { CartInteraction } from '@example/domain-cart/controller/interaction'
import { OnMemoryCartItemListRepository } from '@example/domain-cart/infrastructure/repository/on-memory'
import $ from 'jquery'
import 'regenerator-runtime'
import { buildSummary } from './cart-summary'

$(async () => {
  const interaction = CartInteraction.create({ repository: new OnMemoryCartItemListRepository( )})

  await interaction.initialize()

  const list = interaction.cartItemList

  $('#cart-item-list').html(
    buildCartItemList(list)
  )
  $('#cart-summary').html(
    buildSummary(list)
  )
})

