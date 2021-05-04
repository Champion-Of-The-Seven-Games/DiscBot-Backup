module.exports = {
  commands: ['Steal', 'steal', 'Rob', 'rob'],
  description: 'sends a random number',
  callback: (message) => {
    const possibleResults = ['Fail', 'Fine', 'Pay', 'Success']
    const stealResult = possibleResults[Math.floor(Math.random() * possibleResults.length)]
    message.channel.send(stealResult)
  },
}