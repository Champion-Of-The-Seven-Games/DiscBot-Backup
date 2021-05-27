const Discord = require('discord.js')
const loadCommands = require('../commands/load-commands')

module.exports = {
  commands: ['Help', 'help', 'Commands', 'commands'],
  description: 'Displays all the commands',
  expectedArgs: '<command or category(optional)>',
  minArgs: 0,
  maxArgs: 1,
  useDm: true,
  cooldown: 5,
  callback: (message, arguments, text) => {
    const request = text.toLowerCase()
    let reply = ``
    let found = false
    const commands = loadCommands()
    
    for (const command of commands) {
      const mainCommand = command.commands[0]
      const args = command.expectedArgs ? command.expectedArgs : 'No arguments needed'
      const alias = command.commands[3] ? command.commands[3] : 'No alias'
      const {description} = command
      const miArgs = command.minArgs ? command.minArgs : 'none nessescary'
      const maArgs = command.maxArgs ? command.maxArgs : 'infinite'

      if (request === command.commands[1]) {
        const comEmbed = new Discord.MessageEmbed()
          .setTitle(`${command.commands[1]} command`)
          .setDescription(`${description}`)
          .setFooter('Use ~ or guild prefix if any before the command')
          .setColor('#00AAFF')
          .addFields(
          {
            name: 'Aliases',
            value: `${alias}`,
            inline: true,
          },
          {
            name: `Arguments (min: ${miArgs}, max: ${maArgs})`,
            value: `${args}`,
            inline: true,
          },
          )
        message.channel.send(comEmbed)
        found = true
      }
      if (found) {
        break
      }
    }
    if (found != true) {
      switch (request) {
        case 'all':
          const allEmbed = new Discord.MessageEmbed()
            .setTitle('All the commands')
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
            .addFields(
            {
              name: 'Economy',
              value: `
Balance - Displays the balance of a user
Daily - Gives a reward to user once in every 24 hours
Give - Transfers money from one user to another
Steal - Robs a user
              `,
            },
            {
              name: 'Moderation',
              value: `
Mute - mutes the mentioned user
UnMute - unmutes the mentioned user if they are muted
Kick - Kicks the mentioned user
Ban - Bans the mentioned user
              `,
            },
            {
              name: 'Images',
              value: `
Avatar - Display the avatar of a user
Cat - Display the pic of a cute cat
Meme - Sends memes from reddit
              `,
            },
            {
              name: 'Utility',
              value: `
Clear - Clears a certain amount of messages
Prefix - Changes the prefix of the bot
Giveaway - starts a giveaway
Timer - Set a  message to be sent after a specific time
              `,
            },
            {
              name: 'Misc',
              value: `
Info - Displays information about the bot
UserInfo - Displays information about a user
ServerInfo - Displays information about the server
Avatar - Displays the avatar of a user
Invite - Displays the link to invite the bot to any server
Latency - Checks the connection strength of the bot
Magic - Does magic, just try
              `,
            }
          )
          message.channel.send(allEmbed)
          break
        case 'economy':
          const ecoEmbed = new Discord.MessageEmbed()
            .setTitle('All the economy commands')
            .setDescription(`
Balance - Displays the balance of a user
Daily - Gives a reward to user once in every 24 hours
Give - Transfers money from one user to another
Steal - Robs a user
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
          message.channel.send(ecoEmbed)
          break
        case 'moderation':
          const modEmbed = new Discord.MessageEmbed()
            .setTitle('All the moderation commands')
            .setDescription(`
Mute - mutes the mentioned user
UnMute - unmutes the mentioned user if they are muted
Kick - Kicks the mentioned user
Ban - Bans the mentioned user
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
          message.channel.send(modEmbed)
          break
        case 'image':
          const imgEmbed = new Discord.MessageEmbed()
            .setTitle('All the images commands')
            .setDescription(`
Avatar - Display the avatar of a user
Cat - Display the pic of a cute cat
Meme - Sends memes from reddit
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
          message.channel.send(imgEmbed)
          break
        case 'utility':
          const utilEmbed = new Discord.MessageEmbed()
            .setTitle('All the images commands')
            .setDescription(`
Clear - Clears a certain amount of messages
Prefix - Changes the prefix of the bot
Giveaway - starts a giveaway
Timer - Set a  message to be sent after a specific time
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
          message.channel.send(utilEmbed)
          break
        case 'misc':
          const miscEmbed = new Discord.MessageEmbed()
            .setTitle('All the images commands')
            .setDescription(`
Info - Displays information about the bot
UserInfo - Displays information about a user
ServerInfo - Displays information about the server
Avatar - Displays the avatar of a user
Invite - Displays the link to invite the bot to any server
Latency - Checks the connection strength of the bot
Magic - Does magic, just try
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <command> for more info on the commands')
          message.channel.send(miscEmbed)
          break
        default:
          const catEmbed = new Discord.MessageEmbed()
            .setTitle('All the command categories')
            .setDescription(`
All
Economy
Moderation
Images
Utility
Misc
            `)
            .setColor('#00AAFF')
            .setFooter('use <prefix>help <category> or <prefix>help all for the commands')
          message.channel.send(catEmbed)
          break
      }
    }
  },
}