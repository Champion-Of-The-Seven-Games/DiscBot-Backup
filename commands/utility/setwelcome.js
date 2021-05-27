/* const welcomeSchema = require('../../schemas/welcome-schema')

const cache = new Map()
const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData() */

module.exports = {
  commands: ['SetWelcome', 'setwelcome', 'SetWelcomeChannel', 'setwelcomechannel'],
  description: 'Set the channel to welcome when someone joins the server',
  /* permissions: 'ADMINISTRATOR',
  permissionError: 'you dont have administrator permission in any of your roles', */
  callback: async (message) => {
    /* const { guild, channel } = message

    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id)

    message.reply('This channel is now set to send welcome card whenever someone joins the server') */
  },
}

/* module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
} */