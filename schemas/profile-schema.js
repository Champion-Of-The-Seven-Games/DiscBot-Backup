// import mongoose to store data in the mongo database
const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}

// store the data in this schema
const profileSchema = mongoose.Schema({
  userId: reqString,
  // coins for the economy system
  coins: {
    type: Number,
    default: 0,
  },
})

// export the schema
module.exports = mongoose.model('profiles', profileSchema)