const Discord = require('discord.js')
module.exports = {
  commands: ['Help', 'help', 'Commands', 'commands'],
  description: 'Displays all the commands',
  callback: (message) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('All the commands')
      .setColor('#00AAFF')
      .setFooter('use the guild prefix if any or else use ~ before every commmand')
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
    message.channel.send(embed)
  },
}