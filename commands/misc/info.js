module.exports = {
  commands: ['Info', 'Information'],
  description: 'Displays information about the bot',
  callback: (message) => {
    message.channel.send(`
Created by - Champion Of The Seven Games
Created on - April 17 2021

Bot status - Online
    `)
  },
}