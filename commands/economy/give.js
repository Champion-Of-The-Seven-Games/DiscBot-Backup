const Discord = require('discord.js')
const economy = require('../../command-supporters/economy')

module.exports = {
  commands: ['Give', 'give', 'Transfer', 'transfer'],
  description: 'Transfers money from your account to others',
  expectedArgs: '<mention the user to transfer to> <ammount>',
  minArgs: 2,
  maxArgs: 2,
  callback: async (message, arguments) => {
    const {member} = message
    const data = []

    if (message.mentions.users.first()) {
      const target = message.mentions.users.first()

      if (target.id === message.author.id) {
        message.reply('why do u want to give money to yourself')
        return
      }

      const coinsToGive = Math.trunc(arguments[1])
      if (!isNaN(coinsToGive)) {
        const coinsOwned = await economy.getCoins(member.id)
        if (coinsOwned < coinsToGive) {
          message.reply(`You do not have ${coinsToGive} coins!!`)
          return
        }

        const questions = [
          'Are you sure? type yes (case sensitive) in the chat within the next 10 seconds'
        ]
        let qcounter = 0

        const filter = (m) => {
          return m.author.id === message.author.id
        }

        const collector = new Discord.MessageCollector(message.channel, filter, {
          max: questions.length,
          time: 1000 * 10,
        })

        message.channel.send(questions[qcounter++])
        collector.on('collect', (m) => {
          if (qcounter < questions.length) {
            m.channel.send(questions[qcounter++])
          }
        })

        collector.on('end', (collected) => {
          if (collected.size < questions.length) {
            message.reply('cancelled the transaction')
            return
          }

          collected.forEach((value) => {
            data.push(value.content)
          })
        })

        setTimeout( async () => {
          if (data[0] === 'yes') {
            const remainingCoins = await economy.addCoins(
              member.id,
              coinsToGive * -1
            )
            const newBalalnce = await economy.addCoins(
              target.id,
              coinsToGive
            )

            message.reply(`you have given ${coinsToGive} coins to <@${target.id}>, they now have ${newBalalnce} and you have ${remainingCoins} coins`)

            try {
              if (target.id === '828225498714603521') {
                return
              }
              target.send(`You have been given ${coinsToGive} coins by ${message.author.username} in ${message.guild.name}, you now have ${newBalalnce} coins`)
            }catch{}
          }
          else {
            message.reply('cancelled the transaction')
          }
        }, 1000 * 10)
      }
      else if (isNaN(coinsToGive)) {
        message.reply('please provide a valid number of coins to transfer')
        return
      }
    }
    else {
      message.reply('please mention someone to give coins to')
    }
  },
}