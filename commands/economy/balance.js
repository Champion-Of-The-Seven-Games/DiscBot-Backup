const economy = require('../../command-supporters/economy')

module.exports = {
  commands: ['Balance', 'balance', 'Bal', 'bal'],
  description: 'Shows the balance of a user',
  useDm: true,
  expectedArgs: '<mention the user(optional)>',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message) => {
    let target = ``
    if (message.guild) {target = message.mentions.users.first() || message.author}
    else {target = message.author}
    
    const money = await economy.getCoins(target.id)

    message.reply(`The user has ${money} coins`)
  },
}