const mongo = require('../../mongo')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')

const commandBase = require('../command-base')

module.exports = {
  commands: ['Prefix', 'prefix', 'SetPrefix', 'setprefix'],
  description: 'Sets a prefix for this server',
  expectedArgs: '<the new prefix>',
  minArgs: 1,
  maxArgs: 1,
  permissionError: 'You need administrator permission run this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id
        const prefix = arguments[0]

        await commandPrefixSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            prefix,
          },
          {
            upsert: true,
          }
        )

        message.reply(`The prefix for this bot is now ${prefix}`)

        // Update the cache
        commandBase.updateCache(guildId, prefix)
      } finally {
        mongoose.connection.close()
      }
    })
  },
}