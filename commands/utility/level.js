const levels = require('../../command-supporters/levels')

module.exports = {
  commands: ['Level', 'level', 'Exp', 'exp'],
  description: 'Displays level and xp of a user',
  callback: async (message) => {
    /*const level = await levels.getLevel(message.guild.id, message.member.id)
    const xp = await levels.getXp(message.guild.id, message.member.id)

    message.reply(`The user is currently on "level: ${level}" with "xp: ${xp}"`) */
  },
}