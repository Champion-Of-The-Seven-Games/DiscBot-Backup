const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

module.exports = (client) => {}

module.exports.getMoney = async (guildId, userId) => {
  return await mongo().then(async mongoose => {
    try {
      const result = await profileSchema.findOne({
        guildId,
        userId
      })
      let money = 0
      if (result) {money = result.money}
      else {
        await new profileSchema({
          guildId,
          userId,
          money
        }).save()
      }
      return money
    }
    finally {
      mongoose.connection.close()
    }
  })
}