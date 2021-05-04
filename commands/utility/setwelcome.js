const mongo = require('../../mongo')
const welcomeSchema = require('../../schemas/welcome-schema')

module.exports = {
  commands: ['SetWelcome', 'Setwelcome', 'setwelcome'],
  description: 'Sets the channel to send crd when someone joins',
  permissions: 'MANAGE_GUILD',
  permissionError: 'You dont have manage guild permission',
  callback: async (message, client) => {
    const { channel, guild } = message

    await mongo().then(async (mongoose) => {
      try {
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
      } finally {
        mongoose.connection.close()
      }
    })
    message.reply('this channel is now set to send welcome cards whenever someone joins this server')
  },
}