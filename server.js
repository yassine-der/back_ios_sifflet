const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const {notFound,errorHandler} = require('./middlware/errorMiddlware')
const path = require('path')
const morgan = require('morgan')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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




app.use(express.json())


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));




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





const PORT = process.env.PORT || 3000;

app.use(notFound)

app.use(errorHandler)

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)) 