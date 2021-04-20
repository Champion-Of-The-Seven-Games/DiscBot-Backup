module.exports = {
  commands: ['Invite', 'invite'],
  description: 'Displays the invite link of the bot',
  callback: (message) => {
    message.channel.send(`
This is the bot's invite link
<https://discord.com/api/oauth2/authorize?client_id=828225498714603521&permissions=4228377719&scope=bot>
    `)
  },
}