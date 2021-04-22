module.exports = {
  commands: ['Avatar', 'avatar', 'ProfilePic', 'profilepic'],
  description: 'Displays the avatar of a user',
  expectedArgs: '<mention the user to get his avatar>',
  minArgs: 0,
  maxArgs: 1,
  callback: (message, arguments) => {
    const target = message.mentions.users.first() || message.author
    const image = target.avatarURL()

    message.channel.send(image)
  },
}