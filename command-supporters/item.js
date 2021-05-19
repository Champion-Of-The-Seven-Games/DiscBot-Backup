/*// import mogo and the item schema to use them
const mongo = require('../mongo')
const profileSchema = require('../schemas/item-schema')
// create cache for faster operations if repeated
const coinsCache = {} // { 'guildId-userId': coins }

// function to add coins to a user
module.exports.addItems = async (userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          userId,
        },
        {
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

      coinsCache[`${userId}`] = result.coins

      return result.coins
    } finally {
      mongoose.connection.close()
    }
  })
}

// funciton to get coins of a user
module.exports.getCoins = async (userId) => {
  const cachedValue = coinsCache[`${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOne({
        userId,
      })

      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        await new profileSchema({
          userId,
          coins,
        }).save()
      }

      coinsCache[`${userId}`] = coins

      return coins
    } finally {
      mongoose.connection.close()
    }
  })
} */