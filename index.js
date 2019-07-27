const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5000

const socketSend = require('./socketSend')
const { loadDataOnRedis, getSymbols } = require('./loadDataOnRedis')
const config = require('./config')


app.use(cors())

app.get('/', (req, res) => {
  getSymbols().then((resp) => {
    res.send(resp)
  })
})

socketSend(io)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

config.availableServices.forEach((service) => {
  setInterval(() => {
    loadDataOnRedis(service.url)
  }, service.reloadOnMilliseconds);
});
