const axios = require("axios")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1Ijoic29oaWw0M3BhdGVsIiwiYSI6ImNtNWduMG8xMTBhdDkycXBybnN3dzZiZDkifQ.4iPNcFnY0zi3LEi_qVHpJA&limit=1'
    axios.get(url)
    .then( ({ data }) => {
        if(data.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            const latitude = data.features[0].properties.coordinates.latitude
            const longitude = data.features[0].properties.coordinates.longitude
            const placeFormat = data.features[0].properties.full_address
            callback(undefined,{
                latitude: latitude,
                longitude: longitude,
                place: placeFormat
            })
        }

    } )
    .catch ( (error) => {
        callback('Unable to connect to location services!', undefined)
    })

}


module.exports = geocode