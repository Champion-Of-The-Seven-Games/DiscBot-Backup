module.exports = {
  commands: ['Kick', 'kick', 'Remove', 'remove'],
  description: 'Kicks the mentioned user unless they have a higher role than the bot',
  epextedArgs: '<mention the user to kick>',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'KICK_MEMBERS',
  permissionError: 'You do not have kick members permission',
  callback: (message, arguments) => {
    const {member, mentions} = message
    const tag = `<@${member.id}>`

    const target = mentions.users.first()
    if (target)
    {
      const targetMember = message.guild.members.cache.get(target.id)
      targetMember.kick()
      message.channel.send(`${tag} has been kicked`)
    }
  },
}