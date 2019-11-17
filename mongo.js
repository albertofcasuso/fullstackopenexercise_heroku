const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://casuso:${password}@cluster0-mmulw.mongodb.net/phonebook-app?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true })

//Se define un esquema para la nota
// esto le dice a la base de datos como va a almacenar los datos
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//defines el modelo como nombre en singular, mongo hace las colecciones en plural, en este caso notes
const Person = mongoose.model('Person', personSchema)

if ( process.argv.length<4 ) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
})} else {
/*
Note.find({important:true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/
//Para crear una nota:

const person = new Person({
  name: name,
  number: number,
})

person.save().then(response => {
  console.log(`added ${name} ${number} to phonebook`)
  mongoose.connection.close()
})
}
