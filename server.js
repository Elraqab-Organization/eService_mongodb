require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://demo:demo1234@cluster0.07bdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
const usersRouter = require("./routes/user");
app.use('/subscribers', subscribersRouter)
app.use('/users', usersRouter)


app.listen(3000, () => console.log('Server Started'))