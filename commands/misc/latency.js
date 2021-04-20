module.exports = {
  commands: ['Latency', 'Ping'],
  description: 'Checks the latency of the bot',
  callback: (message) => {
    message.channel.send('calculating the latency...').then((resultMessage) => {
      const botLatency = resultMessage.createdTimestamp - message.createdTimestamp
      resultMessage.edit(`Bot latency: ${botLatency}ms`)
    })
  },
}