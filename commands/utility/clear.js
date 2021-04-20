module.exports = {
  commands: ['Clear', 'clear', 'Purge', 'purge'],
  description: 'Clears a certain amount of messages',
  expectedArgs: '<number of messages to clear>',
  minArgs: 1,
  maxArgs: 1,
  permissions: 'MANAGE_MESSAGES',
  permissionError: 'You dont have manage messages permission',
  callback: (message, arguments) => {
    if (isNaN(arguments[0])) {
      message.reply('Please type a proper number')
      return
    }
    if (arguments[0] > 99) {
      message.reply('please type a value lesser than 100')
      return
    }
    if (arguments[0] < 1) {
      message.reply('please type a value of atleast 1')
      return
    }

    const delmsg = +arguments[0] + 1
    message.channel.messages.fetch({limit: delmsg}).then(messages => {
      message.channel.bulkDelete(messages)
    })
  },
}