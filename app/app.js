const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())
app.use('/src' ,express.static(__dirname + '/src/'))
app.use('/index' ,express.static(__dirname + '/public/'))

// app.use(express.static('/'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/main.js')
})
app.listen(60800, () => {
    console.log('ta a correr')
})
