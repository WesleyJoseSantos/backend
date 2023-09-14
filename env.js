const fs = require('fs')

const file = fs.readFileSync('env.prod.json', 'utf-8')

const obj = JSON.parse(file)

const env = {
    ENV: obj.ENV ?? "",
    PORT: obj.PORT ?? "",
    DB_HOST: obj.DB_HOST ?? "",
    DB_USER: obj.DB_USER,
    DB_PASS: obj.DB_PASS,
    DB_DATABASE: obj.DB_DATABASE ?? "",
}

module.exports = env;