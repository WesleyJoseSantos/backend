const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2');
const bodyParser = require('body-parser')

const app = express()
const env = process.env

dotenv.config({ path: `.env.${env.NODE_ENV || 'local'}` })

const port = env.PORT
const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`Backend Wesley José Santos Rodando... (v${env.VERSION}-${env.ENV})`)
})

app.post('/cliente', (req, res) => {
  var user = req.body
  var date = (new Date()).toISOString().split("T")[0]
  var sql = `insert into cliente
    (nome,
    sobrenome,
    email,
    data_cadastro,
    salario)
    values
    ('${user.nome}',
     '${user.sobrenome}',
     '${user.email}',
     '${date}',
      ${user.salario});`
  connection.query(
    sql, function (err, results, fields) {
      if(err) res.status(500).send(err)
      else res.send(results)
    }
  )
});

app.get('/cliente', (req, res) => {
  var sql = 'select * from cliente';
  connection.query(
    sql,
    function (err, results, fields) {
      if(err) res.status(500).send(err)
      else res.send(results)
    }
  );
})

app.get('/cliente/:id', (req, res) => {
  var id = req.params.id
  var sql = `select * from cliente where (id_cliente = ${id})`;
  connection.query(
    sql, (err, results, fields) => {
      if(err) res.status(500).send(err)
      else res.send(results)
    }
  )
});

app.patch('/cliente/:id', (req, res) => {
  var id = req.params.id
  var user = req.body
  var sql = `update cliente set
  nome = '${user.nome}',
  sobrenome = '${user.sobrenome}',
  email = '${user.email}',
  salario = ${user.salario}
  where (id_cliente = ${id});`
  connection.query(
    sql, function (err, results, fields) {
      if(err) res.status(500).send(err)
      else res.send(results)
    }
  )
});

app.delete('/cliente/:id', (req, res) => {
  var id = req.params.id
  var sql = `delete from cliente where (id_cliente = ${id});`;
  connection.query(
    sql, function (err, results, fields) {
      if(err) res.status(500).send(err)
      else res.send(results)
    }
  )
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
