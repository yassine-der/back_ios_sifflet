const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const {notFound,errorHandler} = require('./middlware/errorMiddlware')
const path = require('path')
var bodyParser = require('body-parser')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const morgan = require('morgan')

const joueurRouter = require('./routes/joueurRoutes')
const userRouter = require('./routes/userRoute')
const equipeRouter = require('./routes/equipeRoutes')
const ligueRouter = require('./routes/ligueRoutes')
const matchRouter = require('./routes/matchRoutes')
const uploadRouter = require('./routes/uploadsRoutes')
const stadeRouter = require('./routes/stadeRoutes')
const { protect } = require('./middlware/authmiddlware')

dotenv.config()

connectDB()


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


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
app.use('/match',matchRouter)
//app.use('/upload',uploadRouter)
app.use('/stade',stadeRouter)

//app.use(express.static(path.join(__dirname, "/uploads")))
//app.use('/uploads', express.static("./uploads"))


//const __dirname = path.resolve()
app.use('/uploads',express.static('uploads'))

app.use(notFound)

app.use(errorHandler)


 


const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)) 