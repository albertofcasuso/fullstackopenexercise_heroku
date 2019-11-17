const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//Modulo para permitir la comunicacion de diferentes orígenes
const cors = require('cors')

//modulo para importar dotenv con variables globales
require('dotenv').config()

// modulo que se conecta con la base de datos
const Person = require('./models/person')

//Acaba conexion con mongo db
const app = express()

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())

//Console logs with morgan
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms, :body'))



let persons = [
  {
    "name": "marian",
    "number": "23329823",
    "id": 1
  },
  {
    "name": "mazdey",
    "number": "2913892819",
    "id": 2
  },
  {
    "name": "casuso",
    "number": "666",
    "id": 3
  },
  {
    "name": "alberto",
    "number": "5542438754",
    "id": 4
  },
  {
    "name": "satan",
    "number": "666",
    "id": 5
  }
]

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person =>res.json(person.map(person => person.toJSON())) )
})

app.get('/info',(req, res)=>{
  const length = persons.length
  const fecha = new Date()
  res.send(`
    <p>The page has info for ${length} people</p>
    <p>${fecha}</p>`)
})

app.get('/api/persons/:id',(request, response)=>{
  const id = Number(request.params.id)
  const person = persons.find(person=>person.id === id)
  person?
  response.json(person)
  :response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


// POST operation
app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson=>{
    response.json(savedPerson.toJSON())
  })
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
