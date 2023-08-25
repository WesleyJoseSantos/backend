const express = require('express')
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
const mysql = require('mysql2');

const app = express()
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` })

const port = process.env.PORT
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Backend Wesley José Santos Rodando...')
})

app.post('/cliente', (req, res) => {
  var user = req.body
  var sql = `insert into 
    cliente(
      nome, 
      sobrenome, 
      email, 
      salario, 
      data_cadastro)
    values(
      "${user.nome}", 
      "${user.sobrenome}", 
      "${user.email}" 
      "${user.salario}", 
      "${(new Date()).toISOString()}"
    )`
  connection.query(
    sql, function (err, results, fields) {
      if(err) console.error(err)
      res.send(results)
    }
  )
});

app.delete('/cliente/:id', (req, res) => {
  var sql = 'select * from cliente';
  res.send(req.body);
});

app.get('/cliente', (req, res) => {
  var sql = 'select * from cliente';
  connection.query(
    sql,
    function (err, results, fields) {
      if(err) console.error(err)
      res.send(results)
    }
  );
})

app.get('/cliente/:id', (req, res) => {
  var id = req.params.id
  var sql = `select * from cliente where id_cliente = ${id}`;
  connection.query(
    sql, (err, results, fields) => {
      if(err) console.error(err)
      res.send(results)
    }
  )
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
