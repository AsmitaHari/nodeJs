const express = require('express')
const router = express.Router()
const Tasks = require('../models/tasks')
const auth = require('../middelware/auth')

router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed){
        match.completed = req.query.completed == 'true'
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            },
            sort:{
                createdAt: -1,
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


router.get('/tasks/:id',auth,async(req,res)=>{
    try{
     const result = await  req.user.populate('tasks').execPopulate()
     if(!result){
        return res.status(404).send('Task not found')
    }
    res.send(result)
    }catch (e) {
        res.status(500).send(error)
    }
})
router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
     const result = await  Tasks.findOne({_id:req.params.id,owner: req.params.id})
     if(!result){
        return res.status(404).send('Task not found')
    }
    res.send(result)
    }catch (e) {
        res.status(500).send(error)
    }
})
router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(200).send("error: Invalid updates")
    }
    try{
     const result = await  Tasks.findOne({_id:req.params.id,owner: req.params.id})
     updates.forEach(update=> result[update] = req.body[update])
     
     if(!result){
        return res.status(404).send('Task not found')
    }
     await result.save()
    
    res.send(result)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tasks',auth, async (req,res)=>{
    const newTasks = new Tasks({
        ...req.body,
        owner: req.user._id
    })
   
    try{
      await newTasks.save()
      res.status(200).send('Inserted')
    }catch (e) {
        res.status(400).send(e)
    }
   })

   module.exports = router
