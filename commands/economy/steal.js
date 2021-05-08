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

      if (target.id === '828225498714603521') {
        message.reply(`hey, i wont let u rob me`)
        return
      }

      const possibleResults = ['Fail', 'Fine', 'Pay', 'Success', 'lost', 'useless', 'loose']
      const stealResult = possibleResults[Math.floor(Math.random() * possibleResults.length)]

      if (stealResult === 'Success') {
        const targetCMoney = await economy.getCoins(target.id)
        const coinsToSteal = targetCmoney * 0.02

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
        const coinsToPay = userCMoney * 0.005

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