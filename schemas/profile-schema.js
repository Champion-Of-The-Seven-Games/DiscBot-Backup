// import mongoose to store data in the mongo database
const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}

// store the data in this schema
const profileSchema = mongoose.Schema({
  // the guild and user id to use later for finding
  guildId: reqString,
  userId: reqString,
  // coins for the economy system
  coins: {
    type: Number,
    default: 0,
  },
  // xp and level for the leveling system
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