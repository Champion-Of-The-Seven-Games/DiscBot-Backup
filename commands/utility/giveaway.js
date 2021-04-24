const Discord = require('discord.js')
module.exports = {
  commands: ['Giveaway', 'giveaway', 'Gaw', 'gaw'],
  description: 'Starts a giveaway',
  expectedArgs: '<name> <time in min> <text>',
  minArgs: 3,
  permissions: 'ADMINISTRATOR',
  permissionError: 'You do not have administrator permission in any of your roles',
  callback: async (message, arguments, text) => {
    const author = message.author.username
    const authortag = `<@${message.author.id}>`
    setTimeout(() => {message.delete()}, 1000)
    
    const gawName  = arguments[0]
    const rawTime = arguments[1]
    const realTime = rawTime * 1000 * 60
    const gawuntext = text.replace(gawName, '')
    const gawtext = gawuntext.replace(rawTime, '')

    if (isNaN(rawTime)) {
      message.reply('Please provide a valid number to set as timer')
      return
    }
    if (rawTime > 60 * 24) {
      message.reply('You cant set a giveaway timer for more then 1 day')
      return
    }

    embed = new Discord.MessageEmbed()
      .setTitle(`Giveaway: ${gawName}`)
      .setColor('#00AAFF')
      .setDescription(`
This giveaway has been hosted by ${author}
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

      message.channel.send(`${authortag}, ${tag} has won the giveaway, give them their award`)
      }, realTime)
    })
  },
}