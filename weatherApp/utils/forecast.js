const request = require('postman-request')


const forecast = (lat,long, callback)=>{
    
    const url = `http://api.weatherstack.com/current?access_key=5c30f7edd0c126139e2ab9e9b047b318&query=${lat},${long}&units=f`

    request({url,json:true}, (error,response)=>{
        console.log(lat , long)
        if(error){
            callback(error,undefined)
        } else if(response.body.current==undefined){
            callback('Unable to find location. Try another',undefined)
        }
        else{
            
            callback(error,response.body.current)
        }

    })
}

module.exports= forecast