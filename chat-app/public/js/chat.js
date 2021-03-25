const socket = io()

const messageForm = document.querySelector('form')
const formInput = messageForm.querySelector('input')
const formButton = messageForm.querySelector('button')
const messages = document.querySelector('#messages')
const sidebar = document.querySelector('#sidebar')

const messageTemplate = document.querySelector('#message-template').innerHTML
const linkTemplate = document.querySelector('#link-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})


const autoScroll = () =>{
   // new message ele
   const messageEle = messages.lastElementChild

   // height of new message
   const newMessageStyles = getComputedStyle(messageEle)
   const newMessageMargin = parseInt(newMessageStyles.marginBottom)
   const newMessageHeight = messageEle.offsetHeight + newMessageMargin

   const visbleHeight = messages.offsetHeight

   const containerHeight = messages.scrollHeight

   const scrollOffset = messages.scrollTop + visbleHeight

   if(containerHeight - newMessageHeight <= scrollOffset){
      messages.scrollTop = messages.scrollHeight
   }

}

socket.on('message',(message)=>{
    console.log("Message", message.text)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm:ss a')
    })
    messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
    
})

socket.on('location',(location)=>{
    console.log(location)
    const html = Mustache.render(linkTemplate, {
        username: location.username,
        text: location.text,
        link: "https://www.google.com",
        createdAt: moment(location.createdAt).format('h:mm:ss a')

    })
    messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData', ({room, users})=>{
  console.log(users)
  const html = Mustache.render(sidebarTemplate, {
      room,
      users
  })
  document.querySelector('#sidebar').innerHTML = html

})

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    formButton.setAttribute('disabled','disabled')
    socket.emit('clientMessage',e.target.elements.message.value, (error)=>{
        formButton.removeAttribute('disabled','disabled')
        formInput.value=''
        formInput.focus()
        if(error){
            return console.log(error)
        }
        console.log('message delivered')
    })
})


document.querySelector('#sendLocation').addEventListener('click',()=>{
   if(!navigator.geolocation) {
       return alert('Geo location Not supported');
   }
   navigator.geolocation.getCurrentPosition((position)=>{
       const coords = position['coords']
     socket.emit("location",{lattitude: coords.latitude, longitude: coords.longitude})
   })
})

socket.emit('join', {username, room}, (error)=>{
   if(error){
       alert(error)
       location.href = '/'
   } 
})