const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Customer = require('./models/customer')

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

const customer = new Customer({
    name: "Mohit",
    industry: "Varied"
})

// customer.save();

app.get('/', (req, res) => {
    // res.send('<script> function redirect(){window.location.href = "/post"}</script><h1>Customers Express App</h1><button onclick="redirect()">Post request</button>')
    res.send(customer)
})

app.get('/api/customers', async (req, res) => {
    // console.log(await mongoose.connection.db.listCollections().toArray())
    try {
        const result = await Customer.find()
        res.send({"customers": result})
    } catch(error){
        res.status(500).json({error: error.message})
    }
})

app.post('/', (req, res) => {
    res.send("Plain text")
})

app.post('/api/customers', async (req, res) => {
    console.log("req.body", req.body)
    const customer = new Customer(req.body)
    try{
        await customer.save();
        res.status(201).json({customer}); // 201 is the code for creation
    }
    catch(e) {
        res.status(400).json({error: e})
    }
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