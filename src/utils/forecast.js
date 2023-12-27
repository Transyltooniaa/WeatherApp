'use strict';
const request = require('request');

const forecast = (latitude,longitude,callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=6e01670af7ba77b467405ed183eac941&query=${latitude},${longitude}&units=m`;
    request({url:url,json:true},(error,{body})=>{

        if(error)
            callback("Unable to connect to weather service",undefined);

        else if(body.error)
            callback("Unable to find the locations",undefined);

        else
        {
            const data = body
            callback(undefined,
                {
                weather : data.current.weather_descriptions[0],
                temperature : data.current.temperature,
                feelsLike : data.current.feelslike
            })
        }
    })
}



module.exports = forecast