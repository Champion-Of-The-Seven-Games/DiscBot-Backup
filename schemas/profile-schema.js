// import mongoose to store data in the mongo database
const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}

// store the guild id, user id, xp, level and money
const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  coins: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
})

// export the schema
module.exports = mongoose.model('profiles', profileSchema)