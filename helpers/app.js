const express = require('express')
const app = express()

app.use(express.json())

const db = require('./db')

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.post('/students', db.deleteAndCreateStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
app.get('/students/:email', db.selectStudent)


app.listen(5000)