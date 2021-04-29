module.exports = {
  commands: ['Kick', 'kick', 'Remove', 'remove'],
  description: 'Kicks the mentioned user unless they have a higher role than the bot',
  expectedArgs: '<mention the user to kick> <reason>',
  minArgs: 1,
  permissions: 'KICK_MEMBERS',
  permissionError: 'You do not have kick members permission',
  callback: (message, arguments, text) => {
    const {member, mentions} = message
    const target = mentions.users.first()
    const reason = text.replace(target, '')
    const ownerId = '724216829639262238'
    if (target.id === ownerId) {
      console.log('u criminal, i saved u from being kicked from a server')
      message.reply('hey, i cant kick my creator')
      return
    }

    try {
    if (target)
    {
      const targetMember = message.guild.members.cache.get(target.id)
      targetMember.kick(reason)
      message.channel.send('The user has been kicked')
    }
    }
    catch(err) {
      message.channel.send(err.name)
    }
  },
}