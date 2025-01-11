const axios = require('axios')

const forecast = (addresslat, addresslong, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33021d28aae22e47dc871a6ee836bc15&query=' + addresslat + ',' + addresslong + '&units=f'
     axios.get(url)
    .then( ({ data}) => {
        if (data.error){
            callback('Unable to Find location!', undefined)
        }
        else {
            callback(undefined, 'It is currently ' + data.current.temperature + ' degrees out. It feels like ' + data.current.feelslike + ' degrees out')
        }
    })
    .catch ((error) => {
        callback('Unable to connect to Weather services!', undefined)
    })
}

module.exports = forecast