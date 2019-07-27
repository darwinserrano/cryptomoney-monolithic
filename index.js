const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5000
const path = require('path')

const socketSend = require('./socketSend')
const { loadDataOnRedis, getSymbols } = require('./loadDataOnRedis')
const config = require('./config')

app.use(cors())

app.get('/data', async (req, res, next) => {
  const resp = await getSymbols()
  res.send(resp)
})

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'front/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front/build/index.html'))
})

socketSend(io)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

config.availableServices.forEach((service) => {
  setInterval(() => {
    loadDataOnRedis(service.url)
  }, service.reloadOnMilliseconds);
});
