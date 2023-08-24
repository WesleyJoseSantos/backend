const express = require('express')
const mysql = require('mysql2');

const app = express()
const port = 3014
const connection = mysql.createConnection({
  host: 'aulascefet.c8tuthxylqic.sa-east-1.rds.amazonaws.com',
  user: 'aluno',
  password: 'alunoc3f3t',
  database: 'aulas_web'
});

app.get('/', (req, res) => {
  res.send('Backend Wesley José Santos Rodando...')
})

app.get('/cliente', (req, res) => {
  connection.query(
    'SELECT * FROM `cliente`',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.send(JSON.stringify(results))
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
