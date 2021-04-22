// https://media.discordapp.net/attachments/679450620079636491/799143607856267264/image0.gif
module.exports = {
  commands: ['Magic', 'magic'],
  description: 'Does magic',
  callback: (message) => {
    message.channel.send('https://media.discordapp.net/attachments/679450620079636491/799143607856267264/image0.gif')
    message.channel.send('This image is magical, you can only see it in discords light theme, just try it')
    console.log('Haha, someone just got rickrolled')
  },
}