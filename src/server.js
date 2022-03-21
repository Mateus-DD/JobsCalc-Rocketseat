const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//usar o req.body
server.use(express.urlencoded( { extended: true }))

//usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta Views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estáticos (static)
server.use(express.static("public"))

server.use(routes)
server.listen(3000, () => console.log('rodando'))