// import mongo and profile schema for the leveling system
const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

// listen for messages and add xp every time a message is sent
module.exports = (client) => {
  client.on('message', (message) => {
    const { guild, member } = message

    addXP(guild.id, member.id, 2, message)
  })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
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
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      let { xp, level } = result
      const needed = getNeededXP(level)

      if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
          `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
            level
          )} XP to level up again.`
        )

        await profileSchema.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        )
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.addXP = addXP

// funciton to get the level of a user
module.exports.getLevel = async (guildId, userId) => {

  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOne({
        guildId,
        userId,
      })
      if (result) {
        level = result.level
        return level
      }
      else {
        console.log('no data found')
        return
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

// funciton to get the xp of a user
module.exports.getXp = async (guildId, userId) => {

  return await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOne({
        guildId,
        userId,
      })
      if (result) {
        xp = result.xp
        return xp
      }
      else {
        console.log('no xp found')
        return
      }
    } finally {
      mongoose.connection.close()
    }
  })
}