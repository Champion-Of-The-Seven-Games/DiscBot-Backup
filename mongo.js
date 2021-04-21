// import mongoose to connect to mongoDB and import database url from config.json
const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')

// connect to the mongo database
module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopolgy: true,
  })
  return mongoose
}