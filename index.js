const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


//Modulo para permitir la comunicacion de diferentes orígenes
const cors = require('cors')

//modulo para importar dotenv con variables globales
//Solo requiere cargar este modulo si no está en producción
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// modulo que se conecta con la base de datos
const Person = require('./models/person')

//Acaba conexion con mongo db
const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

//Console logs with morgan
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms, :body'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(person =>res.json(person.map(person => person.toJSON())) )
})

app.get('/info',(req, res)=>{
  Person.find({}).then(person=>{
    const length = person.length
    const fecha = new Date()
    res.send(`
      <p>The page has info for ${length} people</p>
      <p>${fecha}</p>`).end()
  })
})

app.get('/api/persons/:id',(request, response, next)=>{
  Person.findById(request.params.id).then(person=>{
    if(person){response.json(person.toJSON())}
    else{
      response.status(404).send({error:'unknownEndpoint'}).end()
    }
  })
  .catch(error=>{
    next(error)
  })
})
//DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person=>{
    response.status(204).end()
  }).catch(error=>{
    next(error)
  })
})


// POST operation
app.post('/api/persons', (request, response,next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson=>{
      response.json(savedPerson.toJSON())
  }).catch(error=>next(error))
/*
  const randomId =(max) =>{
    return Math.floor(Math.random()*Math.floor(max))
  }
  const existeNombre = persons.some(person=>person.name === request.body.name)
  const hasName = request.body.name.length
  const hasNumber = request.body.number.length

  const person = request.body
  person.id = randomId(5000)

  if(existeNombre){
  response.status(400).json({
    error: 'name already exists'
  })}else if(hasName>0 && hasNumber>0){
    persons = persons.concat(person)
    response.json(person)
  }else{
    hasName===0?
    response.status(400).json({
      error: 'name is missing'
    })
    :hasNumber===0?
    response.status(400).json({
      error: 'number is missing'
    })
    :null
  }
*/
})

app.put('/api/persons/:id',(request,response,next)=>{
  const body = request.body

//findByIdAndUpdate no va a recibir un nuevo objeto persona, si no un objeto de javascript normal.
  const newPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id,newPerson,{new:true}).then(person=>{
    if(person){
      response.json(person.toJSON())
    }else{
      response.status(404).end()
    }
  }).catch(error =>{
    console.log('error aqui')
    next(error)
  })
})

const errorHandler = (error,request,response,next) => {
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    
    return response.status(400).json({ error: error.message })  }
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})