fetch('http://puzzle.mead.io/puzzle').then((response) =>{
  response.json().then((data)=>{
    console.log(data)
  })
});



const weatherForm = document.querySelector('form')
const searchEle = document.querySelector('input')
const error = document.querySelector('#error')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
message1.textContent = "Loading...."
    const location = searchEle.value

    fetch(`http://localhost:3000/weather?address=${location}`)
.then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            error.textContent=error
           } else{
               message1.textContent = data.location
               message2.textContent= data.forecast
           } 
    })

           
})
    console.log(location)
})