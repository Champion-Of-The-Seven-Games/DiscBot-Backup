const economy = require('../../command-supporters/economy')

module.exports = {
  commands: ['Give', 'give', 'Transfer', 'transfer'],
  description: 'Transfers money from your account to others',
  expectedArgs: '<mention the user to transfer to> <ammount>',
  minArgs: 2,
  maxArgs: 2,
  callback: async (message, arguments) => {
    const {guild, member} = message
    const target = message.mentions.users.first()

    if (!target) {
      message.reply('please mention someone to transfer to')
      return
    }

    const coinsToGive = arguments[1]
    if (isNaN(coinsToGive)) {
      messge.reply('please provide a valid number of coins to transfer')
      return
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`You do not have ${coinsToGive} coins!!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalalnce = await economy.addCoins(
      guild.id,
      target.id,
      coinsToGive
    )

    message.reply(`you have given ${coinsToGive} coins to <@${target.id}>, they now have ${newBalalnce} and you have ${remainingCoins}`)
  },
}