const economy = require('../../command-supporters/economy')

module.exports = {
  commands: ['Steal', 'steal', 'Rob', 'rob'],
  description: 'robs a user',
  expectedArgs: '<mention the user to rob>',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message) => {
    if (message.mentions.users.first()) {
      const target = message.mentions.users.first()

      if (target.bot) {
        message.reply(`I wont let you rob me or my kind, back off!!`)
        return
      }

      const possibleResults = ['Fail', 'Fine', 'Pay', 'Success', 'lost', 'useless', 'loose']
      const stealResult = possibleResults[Math.floor(Math.random() * possibleResults.length)]

      if (stealResult === 'Success') {
        if (target.id === '724216829639262238') {
          message.reply(`you cant rob ${message.author.username}`)
          return
        }
        const targetCMoney = await economy.getCoins(target.id)
        const coinsToSteal = Math.trunc(targetCMoney * 0.05)

        await economy.addCoins(
          target.id,
          coinsToSteal * -1
        )
        await economy.addCoins(
          message.member.id,
          coinsToSteal
        )

        message.channel.send(`Successfully robbed ${coinsToSteal} coins from ${target.username}`)
        try {
          target.send(`You were robbed of ${coinsToSteal} coins in ${message.guild.name} by ${message.author.username}`)
        }catch{}
      }
      else {
        const userCMoney = await economy.getCoins(message.member.id)
        const coinsToPay = Math.trunc(userCMoney * 0.01)

        await economy.addCoins(
          message.member.id,
          coinsToPay * -1
        )
        await economy.addCoins(
          target.id,
          coinsToPay
        )

        message.channel.send(`Failed in robbing the user, you had to pay ${coinsToPay} coins to ${target.username}`)
        try {
          target.send(`${message.author.username} tried to steal from you in ${message.guild.name}, they failed and had to pay ${coinsToPay} coins to you`)
        }catch{}
      }
    }
    else {
      message.reply('mention someone to rob')
    }
  },
}