const request = require('postman-request')

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?&access_token=pk.eyJ1IjoiYXNtaXRhLTIzMSIsImEiOiJja205Z3Y2bmgwdmd1MnhudXk0anZ6cXp3In0.4XuNd7-9GaELvuuXvUwYog&limit=1`

    request({url,json:true}, (error,response)=>{
        
        if(error){
            callback(error,undefined)
        } else if(response.body.features.length==0){
            callback('Unable to find location. Try another',undefined)
        }
        else{
            callback(error,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }

    })
}

module.exports= geocode