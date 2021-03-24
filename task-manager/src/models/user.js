const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const Tasks = require('./tasks')
 
 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  
  age :{
      type: Number,
      default: 0,
      validate(value) {
        if(value<0){
            throw new Error('Age must be positive')
        }
      }
  },
  email:{
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
      }

  },
  password:{
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      validate(value){
          if(value ==="password") {
        
            throw new Error('Password cannot be password')
          }
      }

  },
  avatar :{
    type: Buffer
  },
  tokens:[{
    token:{
      type: String,
      required: true,
    }
  }],
},
{
  timestamps: true,
})

userSchema.virtual('tasks', {
  ref: 'tasks',
  localField: '_id',
  foreignField: 'owner'
})


userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function (){
   const user = this
   const userObj = user.toObject()
   delete userObj.password
   delete userObj.tokens
   return userObj
}
userSchema.statics.findByCredentials = async(email,password)=>{
   const user = await User.findOne({email})

   if(!user){
     throw new Error('Unable to Login')
   }
   const isMatch = await bcrypt.compare(password,user.password)

   if(!isMatch){
    throw new Error('Unable to Login')
  }
  return user;

}


userSchema.pre('save', async function(next){
   const user = this
   if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password,8)
   }
   next()
})
userSchema.post('remove', async function(next){
  const user = this
  await Tasks.deleteMany({owner: user._id})
  next()
})

const User = mongoose.model('User',userSchema)

module.exports= User