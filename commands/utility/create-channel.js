module.exports = {
  commands: ['CreateChannel', 'CreatetChnl'],
  description: 'Creates a text or voice channel',
  expectedArgs: '<channel type> <channel name>',
  minArgs: 2,
  maxArgs :10,
  permissions: 'MANAGE_CHANNELS',
  permissionError: 'You do not have manage channel permission in any of your roles',
  callback: (message, arguments) => {
    const ctype = arguments[0]
    const name = `${arguments[1]} ${arguments[2]}`

    if (ctype === 'voice') {
      message.guild.channels
      .create(name, {
          type: 'voice',
        }, 
      )
      message.channel.send(`created voice channel '${name}'`)
     }
     if (ctype === 'text') {
      message.guild.channels
      .create(name, {
          type: 'text',
        }, 
      )
      message.channel.send(`created text channel '${name}'`)
     }
  },
}