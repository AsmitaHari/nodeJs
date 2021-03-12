const fs = require('fs')
// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',

// }

// const bookJson = JSON.stringify(book)
// fs.writeFileSync('1-json.json',bookJson)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJson = dataBuffer.toString()
const data = JSON.parse(dataJson)
data.name = "Asmita"
data.planet = "Mars"
data.age =26

console.log(data)

const dataStringify = JSON.stringify(data)
fs.writeFileSync('1-json.json',dataStringify)
