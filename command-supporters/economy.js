// import mogo and the proile schema to use them
const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

// placeholder for later stuff
module.exports = (client) => {}

// export the function getMoney to check the money of a user
module.exports.getMoney = async (guildId, userId) => {
  return await mongo().then(async mongoose => {
    try {
      // wait till found guild id and user id in profile schema
      const result = await profileSchema.findOne({
        guildId,
        userId
      })

      // set money temporarily to 0
      let money = 0
      // if data already exists then import it
      if (result) {money = result.money}
      // if data doesnt exist then create new
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
      // close the mongo connection once all tasks are completed
      mongoose.connection.close()
    }
  })
}