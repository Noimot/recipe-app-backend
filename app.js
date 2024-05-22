const express = require('express');
const config =  require('./utils/config');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const recipeRouter = require('./routes/recipeRoute');
const commentRouter = require('./routes/commentRoute');
const morgan = require('morgan');
const middleware = require('./utils/middleware')
const cors = require('cors')


const app = express();
const port = config.port || 4000;

mongoose.set('strictQuery', false)
console.log('Connecting to', config.DB)

mongoose
  .connect(config.DB, {
    // useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
// //   GLOBAL MIDDLEWARE
app.use(express.static('build'))
app.use(middleware.requestLogger)

// app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use('/api/recipes/comment', commentRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/users', userRouter)
app.get('/', (req, res) => {
  res.send('Staring recipe app')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})