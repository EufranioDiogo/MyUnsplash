const express = require('express')
const mongoose = require('mongoose')
const Photo = require('./models/photo')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const DBURI = `mongodb+srv://USER:USERPASSWORD@cluster0.dfuhn.mongodb.net/DB?retryWrites=true&w=majority`
const photoRoutes = require('./api/routes/photo')

mongoose.connect(DBURI, ()=>{
    app.listen(PORT, () => {
        console.log('Server is running')
    })
})

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./public/HTML/index.html', { root: __dirname })
})


app.use('/photo', photoRoutes)

