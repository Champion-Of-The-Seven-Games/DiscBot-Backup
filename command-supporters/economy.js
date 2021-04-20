// import mogo and the proile schema to use them
const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')
// create cache for faster operations if repeated
const coinsCache = {} // { 'guildId-userId': coins }

// placeholder for later stuff
module.exports = (client) => {}

// function to add coins to a user
module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      coinsCache[`${guildId}-${userId}`] = result.coins

      return result.coins
    } finally {
      mongoose.connection.close()
    }
  })
}

// funciton to get coins of a user
module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOne({
        guildId,
        userId,
      })

      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        await new profileSchema({
          guildId,
          userId,
          coins,
        }).save()
      }

      coinsCache[`${guildId}-${userId}`] = coins

      return coins
    } finally {
      mongoose.connection.close()
    }
  })
}