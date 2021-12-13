const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const {notFound,errorHandler} = require('./middlware/errorMiddlware')
const path = require('path')
const morgan = require('morgan')

const joueurRouter = require('./routes/joueurRoutes')
const userRouter = require('./routes/userRoute')
const equipeRouter = require('./routes/equipeRoutes')
const ligueRouter = require('./routes/ligueRoutes')
const arbitreRouter = require('./routes/arbitreRoutes')
const matchRouter = require('./routes/matchRoutes')
const uploadRouter = require('./routes/uploadsRoutes')
const stadeRouter = require('./routes/stadeRoutes')
const { protect } = require('./middlware/authmiddlware')





dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())




app.get('/',(req,res) =>{
    res.send('API is running...')
})

app.use('/joueur',joueurRouter)
app.use('/user',userRouter)
app.use('/equipe',equipeRouter)
app.use('/ligue',ligueRouter)
app.use('/arbitre',arbitreRouter)
app.use('/match',matchRouter)
app.use('/upload',uploadRouter)
app.use('/stade',stadeRouter)

//const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname)))





const PORT = process.env.PORT || 3000


//*************************   swag */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound)

app.use(errorHandler)

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)) 