const express = require('express')
const mongosse = require('mongoose')
const Books = require('./models/Books')

const port = process.env.PORT || 8080

//DH7O5swQ3QeSyAtZ
const app = express()
app.use(express.json())

mongosse.connect('mongodb+srv://bookservice:DH7O5swQ3QeSyAtZ@cluster0.jnjgn.mongodb.net/books?retryWrites=true&w=majority', ()=>{
    console.log("Connected to db")
})

app.get('/', (req,res)=>{
    res.send("Books end point")
})

app.post('/books', (req,res)=>{
     console.log(req.body)
     const book = new Books(req.body)
     try{

        book.save().then((data)=>{
            res.status(200).send(data)
        }).catch(e=>{
            res.send(e)
        })
        
    }catch (e){
      res.status(400).send(e)
    }
})
app.get('/books',(req,res)=>{
    try{

        Books.find().then((data)=>{
            res.status(200).send(data)
        }).catch(e=>{
            res.send(e)
        })
        
    }catch (e){
      res.status(400).send(e)
    }
})
app.get('/books/:id',(req,res)=>{
    try{

        Books.findById({_id: req.params.id}).then((data)=>{
            res.status(200).send(data)
        }).catch(e=>{
            res.send(e)
        })
        
    }catch (e){
      res.status(400).send(e)
    }
})

app.listen(port, ()=>{
    console.log('book service running at port ',port)
})