const Discord = require('discord.js')

module.exports = {
  commands: ['Test', 'test'],
  decription: 'tests message collectors',
  useDm: true,
  callback: async (message) => {
    const questions = [
      'What should i call you?',
      'u gud or no?',
    ]
    let qcounter = 0

    const answerStart = [
      'I will call you',
      'u say',
    ]
    let acounter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new Discord.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 10, // 15s
    })

    message.channel.send(questions[qcounter++])
    collector.on('collect', (m) => {
      if (qcounter < questions.length) {
        m.channel.send(questions[qcounter++])
      }
    })

    collector.on('end', (collected) => {
      if (collected.size < questions.length) {
        message.reply('You did not answer the question in time')
        return
      }

      da = []
      collected.forEach((value) => {
        let data = `${answerStart[acounter]} ${value.content}`
        acounter++
        da.push(data)
      })
      message.channel.send(da[0])
      message.channel.send(da[1])
    })
  },
}