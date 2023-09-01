const express = require('express')
const db = require('../sql/sql.js')
const router = express.Router()

router.post('/cliente', (req, res) => {
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
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    )
});

router.get('/cliente', (req, res) => {
    var sql = 'select * from cliente';
    db.query(
        sql,
        function (err, results, fields) {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    );
})

router.get('/cliente/:id', (req, res) => {
    var id = req.params.id
    var sql = `select * from cliente where (id_cliente = ${id})`;
    db.query(
        sql, (err, results, fields) => {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    )
});

router.patch('/cliente/:id', (req, res) => {
    var id = req.params.id
    var user = req.body
    var sql = `update cliente set
    nome = '${user.nome}',
    sobrenome = '${user.sobrenome}',
    email = '${user.email}',
    salario = ${user.salario}
    where (id_cliente = ${id});`
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    )
});

router.delete('/cliente/:id', (req, res) => {
    var id = req.params.id
    var sql = `delete from cliente where (id_cliente = ${id});`;
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    )
});

module.exports = router;
