const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cc4bdbd131fafb1701fc12c6a312817c&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Connection to server fail');
        } else if (response.body.error) {
            callback(`Error: ${response.body.error.info}`)
        }
        else {
            console.log(response.body);
            
            const { weather_descriptions: description, temperature, feelslike, humidity } = response.body.current;
            callback(error, `${description[0]}. It's currentrly ${temperature} degrees out and it feels like ${feelslike} degrees. Humidity is ${humidity}%`);
        }
    })
}

module.exports = forecast;