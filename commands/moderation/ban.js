module.exports = {
  commands: ['Ban', 'ban', 'Block', 'block'],
  description: 'bans the mentioned user unless they have a higher role than the bot',
  epextedArgs: '<mention the user to ban>',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'BAN_MEMBERS',
  permissionError: 'You do not have ban members permission',
  callback: (message, arguments, client) => {
    const {member, mentions} = message
    const tag = `<@${member.id}>`

    if (!client.user.hasPermission('BAN_MEMBERS')) {
      message.channel.send('The bot doesnt have ban members permission')
    }
    const target = mentions.users.first()
    if (target)
    {
      const targetMember = message.guild.members.cache.get(target.id)
      targetMember.ban()
      message.channel.send(`${tag} has been banned`)
    }
  },
}