const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const users = []

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

//Register a new user
app.post('/users', (req, res) => {
    const newUserId = req.body.userId;
    if(!newUserId) {
       return res.status(400).send('UserId is required')
    }

    const registered = users.includes(newUserId);
    if(registered) {
        return res.status(400).send('UserId already exists')
    }

    users.push(newUserId)
    return res.status(201).send('UserId registered successfully')
})

//Get registered users
app.get('/users', (req, res) => {
    return res.status(200).json({users})
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})