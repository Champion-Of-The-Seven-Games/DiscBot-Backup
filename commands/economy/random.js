module.exports = {
  commands: ['Random', 'random'],
  description: 'sends a random number',
  callback: (message) => {
    const possibleResults = ['Fail', 'Fine', 'Pay', 'Success']
    const stealResult = possibleResults[Math.floor(Math.random() * possibleResults.length)]
    message.channel.send(0.2 * 200)
  },
}