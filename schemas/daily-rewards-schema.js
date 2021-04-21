// import mongoose to store data in the mongo database
const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}

// store the data in this schema
const dailyRewardsSchema = mongoose.Schema(
  {
  guildId: reqString,
  userId: reqString,
  },
  {
    timestamps: true,
  }
)

// export the schema
module.exports = mongoose.model('daily-rewards', dailyRewardsSchema)