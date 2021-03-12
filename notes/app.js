const validator = require('validator')
const add = require('./utils.js')
const fs =require('fs')

const nameIn = "Asmita"
fs.writeFileSync("notes.txt", add())
console.log(nameIn)


