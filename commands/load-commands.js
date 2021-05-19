// import path and fs to read commands
const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const baseFile = 'command-base.js'
  const commandBase = require(`./${baseFile}`)
  const commands = []

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    // loop through every file and load it
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      // if found directory then join the path to files inside
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      }

      // when found command-base or load-commands then ignore
      else if (file !== baseFile && file !== 'load-commands.js') {
        const option = require(path.join(__dirname, dir, file))
        commands.push(option)
        if (client) {
          commandBase(option)
        }
        else {}
      }
    }
  }

  readCommands('../commands')
  
  if (client) {commandBase.listen(client)}
  else {}

  return commands
}