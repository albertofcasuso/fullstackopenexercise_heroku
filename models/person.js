const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useUnifiedTopology', true)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })


const noteSchema = new mongoose.Schema({
  name: {type:String,required:true,unique:true,minlength:3},
  number: {type:String,required:true,minlength:8}
})
noteSchema.plugin(uniqueValidator)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//con module. exports se hace una interfaz publica
// la que puedes usar en otros programas
module.exports = mongoose.model('Person', noteSchema)