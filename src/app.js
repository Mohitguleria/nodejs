const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

mongoose.set('strictQuery', false)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

const PORT = process.env.PORT || 8000;
const CONNECTION = process.env.CONNECTION;
const customers = [
    {"name": "Mohit Guleria", industry: "IT Industry" },
    {"name": "Montie", industry: "Spiritual Industry" },
    {"name": "MonT", industry: "Beauty Industry" }
]

app.get('/', (req, res) => {
    res.send('<script> function redirect(){window.location.href = "/post"}</script><h1>Customers Express App</h1><button onclick="redirect()">Post request</button>')
})

app.get('/api/customers', (req, res) => {
    res.send({"customers": customers})
})

app.post('/', (req, res) => {
    res.send("Plain text")
})

app.post('/api/customers', (req, res) => {
    console.log("req.body", req.body)
    res.send(req.body);
})

const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT)
        })
    }
    catch(error){
        console.log("Error: ", error.message)
    }
}

start();