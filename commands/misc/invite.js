const Discord = require('discord.js')

module.exports = {
  commands: ['Invite', 'invite'],
  description: 'Displays the invite link of the bot',
  callback: (message) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Invite link of the bot')
      .setColor('#00AAFF')
      .setDescription(`
<https://discord.com/api/oauth2/authorize?client_id=828225498714603521&permissions=8&scope=bot>
      `)
      .setFooter('click the link or copy and paste it in your browser')
    message.channel.send(embed)
  },
}