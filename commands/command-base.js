// import mongo, command prefix schema, global prefix and guild prefixes to use different prefix
const mongo = require('../mongo')
const {globalPrefix} = require('../config.json')
const commandPrefixSchema = require('/home/runner/DiscBot/schemas/command-prefix-schema')
const guildPrefixes = {} // { 'guildId' : 'prefix' }

// check if the given permission is valid
const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  // if permission doesnt exist then throw an error
  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`"${permission}" Doesnt exist as a valid permission`)
    }
  }
}

// save commands inside an object
const allCommands = {}

// export and check all the command options
module.exports = (commandOptions) => {
  let {
    commands,
    permissions = [],
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }
  console.log(`Registered "${commands[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }
    validatePermissions(permissions)
  }
  for (const command of commands) {
    allCommands[command] = {
      ...commandOptions,
      commands,
      permissions
    }
  }
}

module.exports.listen = (client) => {
  // listen for commands
  client.on('message', (message) => {
    const { member, content, guild } = message

    let guildPrefs = ''
    guild ? guildPrefs = guildPrefixes[guild.id] : guildPrefs = globalPrefix
    const prefix = guildPrefs || globalPrefix

    const arguments = content.split(/[ ]+/)
    const cname = arguments.shift()
    const name = cname.toLowerCase()

    if (name.startsWith(prefix)) {
      const command = allCommands[name.replace(prefix, '')]
      if (!command) {
        message.reply(`That is not a command, please use <prefix>Help all for a list of all valid commands`)
        return
      }

      const {
        commands,
        description = 'no information available on this command',
        useDm = false,
        expextedArgs,
        minArgs = 0,
        maxArgs = null,
        permissions,
        permissionError = 'You do not have permission to use this command',
        callback
      } = command

      // A command has been ran
      // Make sure its an actual person uusing the command
      if (member.user.bot) {
        message.reply('Stop fellow bot, i know your owner is trying to cheat')
        return
      }

      // make sure the command is ran in a server if required
      if (useDm != true && !guild) {
        message.channel.send('You can use this command only in a server')
        return
      }

      // Ensure the user has the required permissions
      for (const permission of permissions) {
        if (!member.hasPermission(permission)) {
          const {member} = message
          const ownerId = '724216829639262238'
          if (member.id === ownerId) {
            console.log('u criminal, u overrided your permission in a server')
          }
          else {
          message.reply(permissionError)
          return
          }
        }
      }

      // Ensure that the user types in correct number of arguments
      if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs))
      {
        message.reply(
          `Incorrect syntax! Please use ${prefix}${command.commands[0]} ${command.expectedArgs}`
        )
        return
      }

      // Finally handle the command if all requirements are met
      callback(message, arguments, arguments.join(' '), client)
    }
  })
}

// load the guild prefix if exists or else use the global prefix
module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix
}

module.exports.loadPrefixes = async (client) => {
  await mongo().then(async (mongoose) => {
    try {
      for (const guild of client.guilds.cache) {
        const guildId = guild[1].id

        const result = await commandPrefixSchema.findOne({ _id: guildId })
        guildPrefixes[guildId] = result ? result.prefix : globalPrefix
      }
    }
    finally {
      mongoose.connection.close()
    }
  })
}
