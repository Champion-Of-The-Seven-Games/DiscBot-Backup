module.exports = {
  commands: ['Latency', 'latency', 'Ping', 'ping'],
  description: 'Checks the latency of the bot',
  callback: (message) => {
    message.channel.send('calculating the latency...').then((resultMessage) => {
      const botLatency = resultMessage.createdTimestamp - message.createdTimestamp
      resultMessage.edit(`Bot latency: ${botLatency}ms`)
      if (botLatency <= 100) {
        resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is lower than usual (very good)
        `)
      }
      if (botLatency > 100 && botLatency < 200) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is normal (good)
        `)
      }
      if (botLatency >= 200) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is higher than usual (bad)
        `)
      }
    })
  },
}