const muteSchema = require('../../schemas/mute-schema')

module.exports = {
  commands: ['Mute', 'mute'],
  description: 'mutes the mentioned user for a specific time',
  expectedArgs: '<mention the user to mute> <duration in hours> <reason>',
  minArgs: 3,
  permissions: 'MANAGE_GUILD',
  permissionError: 'You do not have permission to mute members',
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please mention someone to mute')
      return
    }
    const ownerId = '724216829639262238'
    if (target.id === ownerId) {
      console.log('u criminal, i saved u from being muted in a server')
      message.reply('hey, i cant mute my creator')
      return
    }

    const duration = arguments[1]
    if(isNaN(duration)) {
      message.reply('Please provide a valid duration in hours')
      return
    }

    const sreason = `${arguments[0]} ${arguments[1]}`
    const reason = text.replace(sreason, '')

    const previousMutes = await muteSchema.find({
      userId: target.id
    })
    const currentlyMuted = previousMutes.filter(mute => {
      return mute.current === true
    })
    if (currentlyMuted.length) {
      message.reply('The user is already muted')
      return
    }

    const expires = new Date()
    expires.setHours(expires.getHours() + duration)

    const mutedRole = message.guild.roles.cache.find(role => {
      return role.name === 'Muted'
    })
    if (!mutedRole) {
      message.reply('There is no role in the server which exactly matches "Muted"')
      return
    }

    const targetMember = (await message.guild.members.fetch()).get(target.id)
    targetMember.roles.add(mutedRole)

    await new muteSchema({
      userId: target.id,
      guildId: message.guild.id,
      reason,
      staffId: message.author.id,
      staffTag: message.author.tag,
      expires,
      current: true,
    }).save()

    message.reply(`You have muted <@${target.id}> for the reason "${reason}", their mute will end in ${duration} hours`)
  },
}