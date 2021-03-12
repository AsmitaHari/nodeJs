const chalk = require('chalk')
const fs = require('fs')
const addNote= (title,body) =>{
    const notes = loadNotes()
    const dup = notes.find(note=>{
       return note.title === title 
    })
    if(!dup){
        notes.push({
            title,
            body
        })
        saveNotes(notes)
    }
    

}

const removeNote= (title) =>{
    const notes = loadNotes()
    const list = notes.filter(note=>{
       return note.title !== title 
    })
    if(notes.length> list.length){
        console.log(chalk.green.inverse("Removed"))
        saveNotes(list)
    }else{
        console.log(chalk.inverse.red("No note found"))
    }
   
    

}
const listNote= () =>{
    const notes = loadNotes()
    const list = notes.forEach(note=>{
       console.log(chalk.blue.inverse(note.title))
    })
        

}
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}
const loadNotes = ()=>{
    try{

     const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
    }catch{
         return []
    }
    

}
const getNotes = ()=>{
    return "Notes"
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNote
}