// import mogo and the item schema to use them
const mongo = require('../mongo')
const itemSchema = require('../schemas/item-schema')

/*// function to add items to a user
module.exports.addItems = async (userId, normalLootBox, phoneTextCard) => {
  return await mongo().then(async (mongoose) => {
    try {
      const result = await itemSchema.findOneAndUpdate(
        {
          userId,
        },
        {
          userId,
          $inc: {
            normalLootBox,
            phoneTextCard,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      return result
    } finally {
      mongoose.connection.close()
    }
  })
} */

// funciton to get coins of a user
module.exports.getItems = async (userId) => {
  return await mongo().then(async (mongoose) => {
    try {
      const result = await itemSchema.findOne({
        userId,
      })

      let normalLootBox = 0
      let phoneTextCard = 0

      if (!result) {
        await new itemSchema({
          userId,
          normalLootBox,
          phoneTextCard,
        }).save()
      } else {}

      return result
    } finally {
      mongoose.connection.close()
    }
  })
}