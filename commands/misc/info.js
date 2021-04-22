const Discord = require('discord.js')
module.exports = {
  commands: ['Info', 'info', 'Information', 'information'],
  description: 'Displays information about the bot',
  callback: (message) => {
    embed = new Discord.MessageEmbed()
      .setTitle('Information about the bot')
      .setColor('#00AAFF')
      .setDescription(`
Created by - Champion Of The Seven Games
Created on - April 17 2021

Bot status - Online
      `)
    message.channel.send(embed)
  },
}