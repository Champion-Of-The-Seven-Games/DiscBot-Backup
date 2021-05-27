const itemSchema = require('../../schemas/item-schema')
const item = require('../../command-supporters/item')

module.exports = {
  commands: ['Buy', 'buy', 'Purchase', 'purchase'],
  description: 'Shows the balance of a user',
  useDm: true,
  expectedArgs: '<quantity> <item to buy>',
  minArgs: 2,
  callback: async (message, arguments, text) => {
    const quantity = arguments[0]
    if (isNaN(quantity)) {
      message.reply('Please type a valid quantity to purchase')
      return
    }
    if (quantity < 1) {
      message.reply('you have to buy atleast 1 of those')
      return
    }

    let costPerPeice = 0
    let normalLootBox = 0
    let phoneTextCard = 0

    let itemFinal = 0
    const numOfItem = await item.getItems(message.member.id)

    let valid = true
    const itemToBuy = text.replace(arguments[0], '').toLowerCase()

    switch (itemToBuy) {
      case ' normal loot box':
        normalLootBox = quantity
        costPerPeice = 2000
        itemFinal = numOfItem.normalLootBox
        break
      case ' phone text card':
        phoneTextCard = quantity
        costPerPeice = 100
        break
      default:
        message.reply('That is not an item in the shop')
        valid = false
        break
    }

    const totalPrice = costPerPeice * quantity

    if (valid != false) {
      await itemSchema.findOneAndUpdate(
        {
          userId: message.member.id,
        },
        {
          userId: message.member.id,
          $inc: {
            normalLootBox,
            phoneTextCard,
          },
        },
        {
          upsert: true,
        }
      )

      const itemFinally = itemFinal + quantity
      message.reply(`Successfully bought ${quantity}${itemToBuy} for ${totalPrice} coins, you now have ${itemFinally} of those`)
    } else {}
  },
}