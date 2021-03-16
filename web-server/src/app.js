const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicDir = path.join(__dirname,'../public')
const  viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index',{
        title:"Weather app",
        name:"Asmita"
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:"About app",
        name:"Asmita"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:"Help",
        name:"Asmita",
        helpText: "Help Text"
    })
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
       return res.send({
           error: 'No address mentioned'
       }) 
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast:forecastData,
                location
            })
        })
    })
    
})

app.get('*', (req, res)=>{
    res.send('Sorry!! You are lost.')
})

app.listen(3000, () => {
    console.log("server")
})
