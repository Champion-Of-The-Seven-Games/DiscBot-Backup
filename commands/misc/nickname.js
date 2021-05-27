module.exports = {
  commands: ['Nickname', 'nickname', 'SetNickname', 'setnickname'],
  description: 'changes the nickname of the user',
  expectedArgs: '<nickname>',
  minArgs: 1,
  permissions: 'CHANGE_NICKNAME',
  permissionError: 'You do not have the permission to change your nickname',
  callback: (message, arguments, text) => {
    if (message.author.id === message.guild.owner.id) {
      message.reply('i cannot change the server owners  nickname due to discords functoinality')
      return
    }
    try {
      message.member.setNickname(text)
    } catch {}

    if (mesage.member.nickname === text) {message.reply(`your nickname is now set to ${text}`)}
    else {message.reply('something went wrong')}
  },
}