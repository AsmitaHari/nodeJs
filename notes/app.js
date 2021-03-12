const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./utils.js')
const fs =require('fs')


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
        
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    'command':'remove',
    'describe': 'Remove a new note',
    builder:{
        title:{
            describe:"Note title",
            type: 'string',
            demandOption: true,
        },
     },
    handler: (argv) =>{
        console.log("Remove new note " + argv.title)

        notes.removeNote(argv.title)
    }
})

yargs.command({
    'command':'list',
    'describe': 'Lists note',
    handler: () =>{
        notes.listNote()
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
 




