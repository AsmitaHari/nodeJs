const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {addUser, removeUser,getUsersInRoom,getUser} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io =socketio(server)

let message = "Welcome!!"
const publicDir = path.join(__dirname,'../public')
app.use(express.static(publicDir))

io.on('connection',(socket)=>{
  console.log('new socket connection')

  socket.on('join', ({username, room}, callback)=>{

   const {error, user} = addUser({id: socket.id, username, room})
    
   if(error){
     return callback(error)
   }
    
    socket.join(user.room)
    socket.emit('message',generateMessage(message))
    socket.broadcast.to(user.room).emit('message', generateMessage(user.username,`${user.username} has joined`))

    io.to(user.room).emit('roomData',{
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callback()

  })
  
 

  socket.on('clientMessage', (clientMessage, callback)=>{
      const user = getUser(socket.id)
      const filter = new Filter()

      if(filter.isProfane(clientMessage)){
          return callback('Profanity not allowed')
      }
      io.to(user.room).emit('message',generateMessage(user.username,clientMessage))
      callback()
  })
  socket.on('location', ({lattitude, longitude})=>{
    const user = getUser(socket.id)
    io.to(user.room).emit('location',generateMessage(username,`Joined From Lat: ${lattitude}, Long: ${longitude}`))
})
  socket.on('disconnect',()=>{
   const user=  removeUser(socket.id)

   if(user){
    io.to(user.room).emit('message',generateMessage(user.username,` ${user.username} has left the room`))

    io.to(user.room).emit('roomData',{
      room: user.room,
      users: getUsersInRoom(user.room)
    })

   }

    
   
  })

})
server.listen(3000, () => {
    console.log("server")
})