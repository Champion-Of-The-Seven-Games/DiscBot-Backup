const Discord = require('discord.js')
module.exports = {
  commands: ['UserInfo', 'userinfo', 'UserInformation', 'userinformation'],
  description: 'Displays information about a user',
  expectedArgs: '<mention the user to get their info>',
  minArgs: 0,
  maxArgs: 1,
  callback: (message) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new Discord.MessageEmbed()
      .setTitle(`Information about ${user.username}`)
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'User tag',
          value: user.tag,
          inline: true,
        },
        {
          name: 'Is bot',
          value: user.bot,
          inline: true,
        },
        {
          name: 'Nickname',
          value: member.nickname || 'None',
          inline: true,
        },
        {
          name: 'Joined Server',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: 'Joined Discord',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: 'Roles',
          value: member.roles.cache.size - 1,
        }
      )
    channel.send(embed)
  },
}