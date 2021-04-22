const mongo = require('../../mongo')
const dailyRewardsSchema = require('../../schemas/daily-rewards-schema')
const economy = require('../../command-supporters/economy')

let claimedCache = []
const clearCache = () => {
  claimedCache = []
  setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = {
  commands: ['Daily', 'daily', 'ClaimDaily', 'claimdaily'],
  description: 'gives daily rewards once in 24 hours',
  callback: async (message) => {
    const {guild, member} = message
    const {id} = member

    if (claimedCache.includes(id)) {
      message.reply('You have already claimed your rewards in the past 24 hours')
      return
    }

    await mongo().then(async mongoose => {
      try {
        const results = await dailyRewardsSchema.findOne(
          { guildId: guild.id,
            userId: id,
          }
        )
        if (results) {
          const then = new Date(results.updatedAt).getTime()
          const now = new Date().getTime()

          const diffTime = Math.abs(now - then)
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays <= 1) {
            claimedCache.push(id)
            message.reply('You have already claimed your rewards in the past 24 hours')
            return
          }
        }

        await dailyRewardsSchema.findOneAndUpdate(
          {
            guildId: guild.id,
            userId: id,
          },
          {
            guildId: guild.id,
            userId: id,
          },
          {
          upsert: true,
          })
          
        claimedCache.push(id)
        await economy.addCoins(
          guild.id,
          id,
          1000
        )
        message.reply('1000 coins have been successfully added to your account')
      }
      finally {mongoose.connection.close()}
    })
  },
}