module.exports = {
  commands: ['Test', 'Check'],
  description: 'Tests if the bot is working',
  expectedArgs: '<text>',
  minArgs: 1,
  maxArgs: 100,
  callback: (message, arguments, text) => {
    message.channel.send(`u typed ${text}`)
  },
}