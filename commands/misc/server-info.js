const Discord = require('discord.js')

module.exports = {
commands: ['ServerInfo', 'serverinfo', 'ServerInformation', 'serverinformation'],
description: 'Displays information about the server',
callback: (message) => {
  const { guild } = message
  const {name, region, memberCount, owner} = guild

  const embed = new Discord.MessageEmbed()
    .setTitle(`Server info for "${name}"`)
    .setThumbnail(guild.iconURL())
    .setFooter('Information about this server')
    .addFields(
      {
        name: 'Owner',
        value: owner.user.tag,
      },
      {
        name: 'Members',
        value: memberCount,
      },
      {
        name: 'Region',
        value: region,
      },
      )
    message.channel.send(embed)
  },
}