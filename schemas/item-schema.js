// import mongoose to store data in the mongo database
const mongoose = require('mongoose')

// store the data in this schema
const itemSchema = mongoose.Schema({
  userId: reqString,
  // normal loot box for the item system
  normLootBox: {
    type: Number,
    default: 0,
  },
})

// export the schema
module.exports = mongoose.model('items', itemSchema)