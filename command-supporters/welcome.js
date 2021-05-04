const Discord = require('discord.js')
const mongo = require('../mongo')
const welcomeSchema = require('../schemas/welcome-schema')
const canvacord = require('canvacord')

module.exports = (client) => {
  const onJoin = async (member) => {
    const { guild } = member

    const welcomeCard = new canvacord.Welcomer()
      .setUsername(member.user.username)
      .setDiscoriminator(member.user.discriminator)
      .setAvatar(member.user.displayAvatarURL({format: 'png'}))
      .setColor('title', '#00AAFF')
      .setColor('username-box', '#00AAFF')
      .setColor('discriminator-box', '#00AAFF')
      .setColor('border', '#000000')
      .setBackground('https://www.enasco.com/medias/9728706N-main-530Wx530H?context=bWFzdGVyfHJvb3R8NDYxMnxpbWFnZS9qcGVnfGg2ZS9oYjMvODg4OTY4NjQ5MTE2Ni5qcGd8NDA5NDIyZDA4Njk4M2RhYWMwOGYxNTQ3NjZlMzk2OGIyYTk4ZGUwZDYxMTNlZGQ1MDczNzAyNDAzNDg0NzA4ZQ')
      .setMemberCount(message.guild.meberCount)

    let card = new Discord.MessageAttachments(await welcomeCard.build(), 'card.png')

    let data = cache[guild.id]

    if (!data) {
      await mongo().then(async (mongoose) => {
        try {
          const result = await welcomeSchema.findOne({ _id: guild.id })

          cache[guild.id] = data = [result.channelId]
        } finally {
          mongoose.connection.close()
        }
      })
    }

    const channelId = data[0]
    console.log(channelId)

    const channel = guild.channels.cache.get(channelId)
    channel.send(card)
  }

  client.on('guildMemberAdd', (member) => {
    onJoin(member)
  })
}