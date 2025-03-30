const {v4: uuidv4} = require('uuid')
const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Customers App</h1>')
})

const PORT = 3000;

server.listen(PORT, '127.0.0.1', () => {
    console.log("uuid v4", uuidv4())
    console.log("Server is running on port " + PORT)

})