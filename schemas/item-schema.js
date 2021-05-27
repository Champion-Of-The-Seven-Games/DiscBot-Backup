// import mongoose to store data in the mongo database
const mongoose = require('mongoose')

const defNum = {
  type: Number,
  default: 0,
}

// store the data in this schema
const itemSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  // normal loot box for the item system
  normalLootBox: defNum,
  phoneTextCard: defNum,
})

// export the schema
module.exports = mongoose.model('items', itemSchema)