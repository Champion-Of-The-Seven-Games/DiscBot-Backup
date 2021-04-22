module.exports = {
  commands: ['Latency', 'latency', 'Ping', 'ping'],
  description: 'Checks the latency of the bot',
  callback: (message) => {
    message.channel.send('calculating the latency...').then((resultMessage) => {
      const botLatency = resultMessage.createdTimestamp - message.createdTimestamp
      resultMessage.edit(`Bot latency: ${botLatency}ms`)
      if (botLatency <= 50) {
        resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is very low (very good)
        `)
      }
      if (botLatency > 50 && botLatency < 100) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is low (good)
        `)
      }
      if (botLatency >= 100 && botLatency < 150) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is normal (ok)
        `)
      }
      if (botLatency >= 150 && botLatency < 200) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is high (bad)
        `)
      }
      if (botLatency >= 200) {
      resultMessage.edit(`
Bot latency: ${botLatency}ms
the latency is very high (very bad)
        `)
      }
    })
  },
}