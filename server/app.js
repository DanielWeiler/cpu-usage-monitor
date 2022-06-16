import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import os from 'os-utils'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  const intervalID = setInterval(() => {
    os.cpuUsage((usageValue) => {
      const cpuUsage = Math.round(100 * usageValue)
      socket.emit('cpuUsage', {
        value: cpuUsage
      })
    })
  }, 1000)

  // Listens to when the client is closed and, when activated, disconnects the
  // socket connection and stops the interval process of getting the CPU usage
  socket.on('disconnect', function () {
    socket.disconnect()
    clearInterval(intervalID)
  })
})

io.use((socket, next) => {
  if (socket.conn) {
    next()
  } else {
    const err = new Error('A server error occured.')
    err.data = { content: 'Please retry later.' }
    next(err)
  }
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
