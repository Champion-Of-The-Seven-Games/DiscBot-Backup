const Discord = require('discord.js')

module.exports = {
  commands: ['Help', 'help', 'Commands', 'commands'],
  description: 'Displays all the commands',
  expectedArgs: '<category> <command>',
  minArgs: 0,
  maxArgs: 2,
  callback: (message, arguments, text) => {
    const helpText = text.toLowerCase()
    if (helpText === 'all') {
      const allEmbed = new Discord.MessageEmbed()
        .setTitle('All the commands')
        .setColor('#00AAFF')
        .setFooter('use the guild prefix else if any or else use ~ before every commmand')
        .addFields(
          {
            name: 'Economy',
            value: `
Balance - Displays the balance of a user
Daily - Gives a reward to user once in every 24 hours
Give - transfers money from one user to another
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
            name: 'Utility',
            value: `
Clear - Clears a certain amount of messages
CreateChannel - Creates a text or voice channel
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
          },
          {
            name: 'Images',
            value: `
Cat - Display the pic of a cute cat
Meme - Sends memes from reddit
            `,
          }
        )
      message.channel.send(allEmbed)
    }
    else if (helpText === 'Economy') {
      const economyEmbed = new Discord.MessageEmbed()
        .setTitle('All the economy commands')
        .setDescription(`
Balance - Displays the balance of a user
Daily - Gives a reward to user once in every 24 hours
Give - transfers money from one user to another
        `)
        .setColor('#00AAFF')
        .setFooter('use help economy <command> or help <command>')
      message.channel.send(economyEmbed)
    }
    else if (helpText === 'Moderation' || 'moderation') {
      const moderationEmbed = new Discord.MessageEmbed()
        .setTitle('All the moderation commands')
        .setDescription(`
Mute - mutes the mentioned user
UnMute - unmutes the mentioned user else if they are muted
Kick - Kicks the mentioned user
Ban - Bans the mentioned user
        `)
        .setColor('#00AAFF')
        .setFooter('use help moderation <command> or help <command>')
      message.channel.send(moderationEmbed)
    }
    else if (helpText === 'Utility' || 'utility') {
      const utilityEmbed = new Discord.MessageEmbed()
        .setTitle('All the utility commands')
        .setDescription(`
Clear - Clears a certain amount of messages
CreateChannel - Creates a text or voice channel
Prefix - Changes the prefix of the bot
Giveaway - starts a giveaway
Timer - Set a  message to be sent after a specific time
        `)
        .setColor('#00AAFF')
        .setFooter('use help utility <command> or help <command>')
      message.channel.send(utilityEmbed)
    }
    else if (helpText === 'Misc' || 'misc') {
      const miscEmbed = new Discord.MessageEmbed()
        .setTitle('All the misc commands')
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
        .setFooter('use help misc <command> or help <command>')
      message.channel.send(miscEmbed)
    }
    else if (helpText === 'Image' || 'image') {
      const imageEmbed = new Discord.MessageEmbed()
        .setTitle('All the image commands')
        .setDescription(`
Cat - Display the pic of a cute cat
Meme - Sends memes from reddit
        `)
        .setColor('#00AAFF')
        .setFooter('use help image <command> or help <command>')
      message.channel.send(imageEmbed)
    }
    else {
      const categoriesEmbed = new Discord.MessageEmbed()
        .setTitle('All the command categories')
        .setDescription(`
All
Economy
Moderation
Utility
Misc
Images
        `)
        .setColor('#00AAFF')
        .setFooter('use help <category> or help all')
      message.channel.send(categoriesEmbed)
    }
  },
}