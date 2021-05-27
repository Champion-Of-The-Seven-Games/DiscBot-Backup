const request = require('request')

module.exports = {
  commands: ['Dog', 'dog', 'DogPic', 'dogpic'],
  description: 'sends a picture of a dog',
  callback: (message) => {
    //Send the request to the API website.
    request.get('https://dog.ceo/api/breeds/image/random', {

    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          var parsedData = JSON.parse(body); //Parse the json data.
          message.channel.send(parsedData.message);
        } else {}
    })
  },
}