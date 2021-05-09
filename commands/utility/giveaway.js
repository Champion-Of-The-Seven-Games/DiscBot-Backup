const Discord = require('discord.js')
module.exports = {
  commands: ['Giveaway', 'giveaway', 'Gaw', 'gaw'],
  description: 'Starts a giveaway',
  permissions: 'ADMINISTRATOR',
  permissionError: 'You do not have administrator permission in any of your roles',
  callback: async (message, arguments, text) => {
    const host = message.author
    const authortag = `<@${message.author.id}>`

    const data = []
    const questions = [
      'What should be the giveaway name',
      'How long should the giveaway last',
      'what text do u want in the embed',
    ]
    let qcounter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new Discord.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 30, // 15s
    })

    message.channel.send(questions[qcounter++])
    collector.on('collect', (m) => {
      if (qcounter < questions.length) {
        m.channel.send(questions[qcounter++])
      }
    })

    collector.on('end', (collected) => {
      if (collected.size < questions.length) {
        message.reply('You did not reply in time')
        return
      }

      collected.forEach((value) => {
        data.push(value.content)
      })
    })

    setTimeout(() => {
      const gawName = data[0]
      const rawTime = data[1]
      const gawtext = data[2]

      if (isNaN(rawTime)) {
        message.reply('Please provide a valid number to set as timer')
        return
      }
      if (rawTime > 60 * 24) {
        message.reply('You cant set a giveaway timer for more then 1 day')
        return
      }
      const realTime = rawTime * 1000 * 60

      embed = new Discord.MessageEmbed()
        .setTitle(`Giveaway: ${gawName}`)
        .setColor('#00AAFF')
        .setDescription(`
This giveaway has been hosted by ${host.username}
React with ⏰ to enter

${gawtext}
        `)
        .setFooter(`1 winner will be randomly choosen once the timer ends`)
      message.channel.send(embed).then(async (gawmessage) => {
        gawmessage.react('⏰')

        setTimeout( async () => {
        const { users } = await gawmessage.reactions.cache.first().fetch()
        const reactionUsers = await users.fetch()
        const possibleWinners = reactionUsers.array().filter((user) => {
          return !user.bot
        })

        const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]
        const tag = `<@${winner.id}>`

        message.channel.send(`${tag} has won the giveaway`)
        try {
          host.send(`${winner.username} has won the giveaway "${gawName}", give them their prize`)
        }catch {}
      }, realTime)
    })
    }, 1000 * 30)
  },
}