require('dotenv').config()
require('express-async-errors')

// security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const morgan = require('morgan')
const express = require('express')
const app = express()

// connectDB
const connectDB = require('./database/connect')
const authenticationUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const questionsRouter = require('./routes/question')
const answersRouter = require('./routes/answer')
const examsRouter = require('./routes/exam')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const methodNotAllowedMiddleware = require('./middleware/methodRequest')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
)

app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(
  cors({
    origin: '*'
  })
)
app.use(xss())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/questions', authenticationUser, questionsRouter)
app.use('/api/v1/answers', authenticationUser, answersRouter)
app.use('/api/v1/exams', authenticationUser, examsRouter)

app.use(notFoundMiddleware)
app.use(methodNotAllowedMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
