module.exports = {
  commands: ['Help', 'Commands'],
  description: 'Displays all the valid commands of the bot',
  expectedArgs: '<Category> <Command>',
  minArgs: 0,
  maxArgs: 2,
  callback: (message, arguments) => {
    message.channel.send('I dont have a single command other than help')
  },
}