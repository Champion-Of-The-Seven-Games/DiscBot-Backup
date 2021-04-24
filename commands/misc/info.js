const Discord = require('discord.js')
module.exports = {
  commands: ['Info', 'info', 'Information', 'information'],
  description: 'Displays information about the bot',
  callback: (message) => {
    embed = new Discord.MessageEmbed()
      .setTitle('Information about the bot')
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'Name',
          value: 'DiscBot',
          inline: true,
        },
        {
          name: 'Bot tag',
          value: '6079',
          inline: true,
        },
        {
          name: 'Global Prefix',
          value: '~',
          inline: true,
        },
        {
          name: 'Time since last restart',
          value: `${process.uptime().toFixed(2)}s`,
          inline: true,
        },
        {
          name: 'Version',
          value: '1.0.0',
          inline: true,
        }
      )
    message.channel.send(embed)
  },
}