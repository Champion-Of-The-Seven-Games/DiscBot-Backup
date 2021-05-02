const economy = require('../../command-supporters/economy')

module.exports = {
  commands: ['Balance', 'balance', 'Bal', 'bal'],
  description: 'Shows the balance of a user',
  expectedArgs: '<mention the user(optional)>',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id
    const userId = target.id
    const money = await economy.getCoins(userId)

    message.reply(`The user has ${money} coins`)
  },
}