const muteSchema = require('../../schemas/mute-schema')

module.exports = {
  commands: ['UnMute', 'Unmute', 'unmute'],
  description: 'unmutes the mentioned user',
  expectedArgs: '<mention the user to unmute>',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'MANAGE_GUILD',
  permissionError: 'You do not have permission to mute members',
  callback: async (message, arguments) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('please mention someone to unmute')
      return
    }

    const result = await muteSchema.updateOne({
      guildId: message.guild.id,
      userId: target.id,
      current: true
    }, {
      current: false
    })

    if (result.nModified === 1) {
      const mutedRole = message.guild.roles.cache.find(role => {
      return role.name === 'Muted'
      })

      if (mutedRole) {
        const guildMember = message.guild.members.cache.get(target.id)
        guildMember.roles.remove(mutedRole)
      }

      message.reply(`You unmuted <@${target.id}>`)
    }
    else {
      message.reply('The user is not currently muted')
    }
  },
}