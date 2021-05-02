// import mongoose to store data in the mongo database
const mongoose = require('mongoose')

// store the data in this schema
const dailyRewardsSchema = mongoose.Schema(
  {
  userId: {
    type: String,
    required: true
  },
  },
  {
    timestamps: true,
  }
)

// export the schema
module.exports = mongoose.model('daily-rewards', dailyRewardsSchema)