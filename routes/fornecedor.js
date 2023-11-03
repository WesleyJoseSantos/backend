const express = require('express')
const db = require('../sql/sql.js')
const router = express.Router()
const fs = require("fs")

router.post('/fornecedor', (req, res) => {
    var fornecedor = req.body
    var sql = `insert into fornecedor
      (razao,
      cpf_cnpj,
      contato,
      logradouro,
      cidade,
      uf)   
      values
      ('${fornecedor.razao}',
       '${fornecedor.cpf_cnpj}',
       '${fornecedor.contato}',
       '${fornecedor.logradouro}',
       '${fornecedor.cidade}',
       '${fornecedor.uf}');`
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else {
                if(req.files.avatar != undefined)
                {
                    var caminhoTemp = req.files.avatar.path
                    var caminhoNovo = `./uploads/fornecedor/${results.insertId}.png`
                    fs.copyFile(caminhoTemp, caminhoNovo, (err) => {
                        if (err) res.status(500).send(err)
                        else res.send(results)
                    })
                }
                else
                {
                    res.send(results)
                }
            }
        }
    )
});

router.get('/fornecedor', (req, res) => {
    var sql = 'select * from fornecedor';
    db.query(
        sql,
        function (err, results, fields) {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    );
})

router.get('/fornecedor/:id', (req, res) => {
    var id = req.params.id
    var sql = `select * from fornecedor where (id_fornecedor = ${id})`;
    db.query(
        sql, (err, results, fields) => {
            if (err) res.status(500).send(err)
            else res.send(results)
        }
    )
});

router.patch('/fornecedor/:id', (req, res) => {
    var id = req.params.id
    var user = req.body
    var sql = `update fornecedor set
    razao = '${user.razao}',
    cpf_cnpj = '${user.cpf_cnpj}',
    contato = '${user.contato}',
    logradouro = '${user.logradouro}',
    cidade = '${user.cidade}',
    uf = '${user.uf}'
    where (id_fornecedor = ${id});`
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else {
                if(req.files.avatar != undefined)
                {
                    var caminhoTemp = req.files.avatar.path
                    var caminhoNovo = `./uploads/fornecedor/${results.insertId}.png`
                    fs.copyFile(caminhoTemp, caminhoNovo, (err) => {
                        if (err) res.status(500).send(err)
                        else res.send(results)
                    })
                }
                else
                {
                    res.send(results)
                }
            }
        }
    )
});

router.delete('/fornecedor/:id', (req, res) => {
    var id = req.params.id
    var sql = `delete from fornecedor where (id_fornecedor = ${id});`;
    db.query(
        sql, function (err, results, fields) {
            if (err) res.status(500).send(err)
            else {
                var file = `./uploads/fornecedor/${id}.png`
                if (fs.existsSync(file)) {
                    fs.unlink(file, (err) => {
                        if (err) res.status(500).send(err)
                        else res.send(results)
                    })
                }
                else {
                    res.send(results)
                }
            }
        }
    )
});

module.exports = router;
