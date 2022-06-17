import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import NotFound from 'http-errors'
import cpuDataRouter from './routes/cpu-data.route.js'

const app = express()
app.use(express.static('react-ui/build'))
app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/api/cpu-data', cpuDataRouter)

app.use((req, res, next) => {
  next(NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
