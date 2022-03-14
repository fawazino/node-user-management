require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./src/routes/authRoutes')
const port = process.env.PORT || 3000

const app = express()

mongoose.connect(process.env.MONGO_URI,  { useUnifiedTopology: true, useNewUrlParser: true, })
.then((result) => {app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
})
.catch((err) => console.log(err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('./src/uploads'));



app.get('/', (req,res)=>{
    res.send('hello world')
})
app.use(authRoutes)

