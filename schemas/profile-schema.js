// import mongoose to store data in the mongo database
const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}

// store the guild id, use id and money
const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  coins: {
    type: Number,
    required: true
  }
})

// export all the required data to the mongo database
module.exports = mongoose.model('profiles', profileSchema)