const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://Champion_Of_The_Seven_Games:39713971@multi-purpose-discord-b.ucb7j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopolgy: true,
  })
  return mongoose
}