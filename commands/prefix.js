/*const mongo = require('../mongo')
const commandPrefixSchema = require('../schemas/command-prefix-schema')

module.exports = {
  commands: ['Prefix', 'SetPrefix'],
  description: 'Changes the prefix of the bot',
  expectedArgs: '<new prefix>',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'ADMINISTRATOR',
  permissionError: 'You do not have administrator permission',
  callback: async (message, arguments, text, client) => {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id
        const prefix = arguments[0]
        await commandPrefixSchema.findOneAndUpdate({
          _id: guildId
        }, {
          _id: guildId,
          prefix
        }, {
          upsert: true
        })
        message.reply(`The prefix has now been changed to '${prefix}'`)

        // Update the cache
        commandBase.updateCache(guildId, prefix)
      }
      finally {
        mongoose.connection.close()
      }
    })
  },
} */