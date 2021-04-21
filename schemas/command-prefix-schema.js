// import mongoose to store data in the mongo database
const mongoose = require('mongoose')

// store the data in this schema
const commandPrefixSchema = mongoose.Schema({
  // Guild ID
  _id: {
    type: String,
    required: true,
  },

  // the guild's new prefix
  prefix: {
    type: String,
    required: true,
  },
})

// export the schema
module.exports = mongoose.model('guild-prefixes', commandPrefixSchema)