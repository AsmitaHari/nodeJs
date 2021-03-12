const chalk = require('chalk')
const yargs = require('yargs')

const add = require('./utils.js')
const fs =require('fs')
const nameIn = "Asmita"

yargs.version('1.1.0')
yargs.command({
    'command':'add',
    'describe': 'Add a new note',
    builder:{
        title:{
            describe:"Note title",
            type: 'string'
        },
        body:{
            describe:"Note title",
            type: 'string',
            demandOption: true
        }
     },
    handler: (argv) =>{
        console.log('Title: '+ argv.title +" Description: "+ argv.body)
    }
})

yargs.command({
    'command':'remove',
    'describe': 'Remove a new note',
    handler: () =>{
        console.log("Remove new note")
    }
})

yargs.command({
    'command':'list',
    'describe': 'Lists note',
    handler: () =>{
        console.log("Lists new note")
    }
})

yargs.command({
    'command':'read',
    'describe': 'Read note',
    handler: () =>{
        console.log("Reads new note")
    }
})

yargs.parse()
fs.writeFileSync("notes.txt", add())
console.log(chalk.green(nameIn))





