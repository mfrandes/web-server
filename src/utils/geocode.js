const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWZyYW5kZXMiLCJhIjoiY2thcWd4OTczMDVnMDJwcWZsOGMxZWJhNSJ9.yX9TteM-K4iCyebpCfw97w`;
    request({ url, json: true }, (error, response) => {
        const data = response.body.features;
        if (error) {
            callback('Connection to server fail', undefined);
        } else if (!data || data.length === 0) {
            callback(`Location not found`);
        } else {
            const longitude = data[0].center[0]
            const latitude = data[0].center[1];
            const name = data[0].place_name;
            callback(error, {
                latitude,
                longitude,
                name
            })
        }
    })
}

module.exports = geocode;