// setTimeout(() => {to do after time}, time)
const Discord = require('discord.js')

module.exports = {
  commands: ['Timer', 'timer', 'Alarm', 'alarm'],
  description: 'sends a message after a specific time',
  useDm: true,
  expectedArgs: '<time(min)> <message>',
  minArgs: 2,
  callback: (message, arguments, text) => {
    const rawTime = arguments[0]
    const afterTime = text.replace(rawTime, '')

    const {author} = message
    const tag = `<@${author.id}>`

    if (isNaN(rawTime)) {
      message.reply('Please provide a valid number to set as timer')
      return
    }
    if (rawTime > 60 * 24) {
      message.reply('You cant set a timer for more then 1 day')
      return
    }
    const realTime = rawTime * 1000 * 60

    const embed = new Discord.MessageEmbed()
      .setTitle(`Timed message`)
      .setDescription(`${afterTime}`)
      .setColor('#00AAFF')
      .setFooter('Time is over')

    setTimeout(() => {
      message.channel.send(`${tag}`)
      message.channel.send(embed)
    }, realTime)
  },
}