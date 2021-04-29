// import discord.js and create client to interact with the api
const Discord = require('discord.js')
const client = new Discord.Client()
// import config.json to use the login token and prefix
const config = require('./config.json')
// import path and fs to use the command handler
const loadCommands = require('./commands/load-commands')
// import levels to use the levelling system
const levels = require('./command-supporters/levels')

// https://www.youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe

// import and use express for the website
const express = require('express')
const app = express()
app.get("/", (req, res) => {
  res.send('Website still under construction, check in later')
})
app.listen(3000, () => {
  console.log("Website is ready!")
})

// import and use mongo to connect to the mongo database
const mongo = require('./mongo')
const connectToMongoDB = async () => {
  await mongo().then((mongoose) => {
    try 
  {
    console.log('Connected to MongoDB!')
  }
  finally
  {
    mongoose.connection.close()
  }
  })
}


// use the client for the bot's main functionality
client.on('ready', async () => {
  console.log('The bot is ready!')
  console.log(' ')

  await mongo()

  // set the bot's status
  client.user.setPresence({
      activity: {
        name: 'Use ~Help for help',
        type: 0,
      },
    }
  )
  
  loadCommands(client)
  levels(client)
})

// login to the bot and get it online
client.login(config.token)
connectToMongoDB()
