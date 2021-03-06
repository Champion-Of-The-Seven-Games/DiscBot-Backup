const axios = require('axios')
module.exports = {
  commands: ['Cat', 'cat', 'CatPic', 'catpic'],
  description: 'Displays a picture of a cat',
  useDm: true,
  callback: (message) => {
    axios
      .get('https://api.thecatapi.com/v1/images/search').then((res) => {
        message.channel.send(res.data[0].url)
    } )
    .catch(console.error)
  },
}