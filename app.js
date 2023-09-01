const package = require('./package.json')
const express = require('express')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const env = require('./env_prod.js')
const app = express()

const cliente = require('./routes/cliente.js')
const fornecedor = require('./routes/fornecedor.js')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formData.parse())
app.use(bodyParser.json())

app.use('/', cliente)
app.use('/', fornecedor)

app.get('/', (req, res) => {
  res.send(`Backend Wesley José Santos Rodando... (v${package.version}-${env.ENV})`)
})

app.listen(env.PORT, () => {
  console.log(`Backend listening on port ${env.PORT}`)
})
