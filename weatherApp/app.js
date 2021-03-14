const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('New York', (error,data)=>{
 forecast(data.latitude,data.longitude, (fErrpr,fData)=>{
      console.log("Forecast Data",fData )
  })
})